import os

from cs50 import SQL
from flask import Flask, flash, redirect, render_template, request, session
from flask_session import Session
from tempfile import mkdtemp
from werkzeug.security import check_password_hash, generate_password_hash
import datetime

from helpers import apology, login_required, lookup, usd

# Configure application
app = Flask(__name__)

# Custom filter
app.jinja_env.filters["usd"] = usd

# Configure session to use filesystem (instead of signed cookies)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# Configure CS50 Library to use SQLite database
db = SQL("sqlite:///finance.db")


@app.after_request
def after_request(response):
    """Ensure responses aren't cached"""
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response


@app.route("/")
@login_required
def index():
    """Show portfolio of stocks"""
    user_id = session["user_id"]

    transactions_db = db.execute(
        "SELECT symbol, SUM(shares) AS shares, price FROM transactions WHERE user_id = ? GROUP BY symbol", user_id)
    cash_db = db.execute("SELECT cash from users where id = ?", user_id)
    cash = cash_db[0]["cash"]

    return render_template("index.html", database=transactions_db, cash=cash)


@app.route("/buy", methods=["GET", "POST"])
@login_required
def buy():
    """Buy shares of stock"""
    if request.method == "GET":
        return render_template("buy.html")

    symbol = request.form.get("symbol")
    try:
        shares = int(request.form.get("shares"))
    except ValueError:
        return apology("No letters dawg")

    if not symbol:
        return apology("Symbol required")
    if not shares:
        return apology("Shares required")

    if shares < 0:
        return apology("Bro it has to be positive")

    # returns the name, the price, and the symbol as a list
    stock = lookup(symbol.upper())

    if stock == None:
        return apology("Symbol doesn't exist")

    cost = stock["price"] * shares

    user_id = session["user_id"]
    # This creates a dict with "cash", money
    money_held_db = db.execute("SELECT cash FROM users WHERE id = (?)", user_id)
    money_held = money_held_db[0]["cash"]
    if money_held < cost:
        return apology("You broke")

    update_money_held = money_held - cost

    db.execute("UPDATE users SET cash = (?) WHERE id = (?)", update_money_held, user_id)
    date = datetime.datetime.now()

    db.execute("INSERT INTO transactions (user_id, symbol, shares, price, date) VALUES (?,?,?,?,?)",
               user_id, stock["symbol"], shares, stock["price"], date)

    flash("bought!")

    return redirect("/")


@app.route("/history")
@login_required
def history():
    """Show history of transactions"""
    user_id = session["user_id"]
    transactions_db = db.execute("SELECT * FROM transactions WHERE user_id = :id", id=user_id)
    return render_template("history.html", transactions=transactions_db)


@app.route("/login", methods=["GET", "POST"])
def login():
    """Log user in"""

    # Forget any user_id
    session.clear()

    # User reached route via POST (as by submitting a form via POST)
    if request.method == "POST":

        # Ensure username was submitted
        if not request.form.get("username"):
            return apology("must provide username", 403)

        # Ensure password was submitted
        elif not request.form.get("password"):
            return apology("must provide password", 403)

        # Query database for username
        rows = db.execute("SELECT * FROM users WHERE username = ?", request.form.get("username"))

        # Ensure username exists and password is correct
        if len(rows) != 1 or not check_password_hash(rows[0]["hash"], request.form.get("password")):
            return apology("invalid username and/or password", 403)

        # Remember which user has logged in
        session["user_id"] = rows[0]["id"]

        # Redirect user to home page
        return redirect("/")

    # User reached route via GET (as by clicking a link or via redirect)
    else:
        return render_template("login.html")


@app.route("/logout")
def logout():
    """Log user out"""

    # Forget any user_id
    session.clear()

    # Redirect user to login form
    return redirect("/")


@app.route("/quote", methods=["GET", "POST"])
@login_required
def quote():
    """Get stock quote."""
    if request.method == "GET":
        return render_template("quote.html")

    symbol = request.form.get("symbol")

    if not symbol:
        return apology("Symbol is required")

    stock = lookup(symbol.upper())

    if stock == None:
        return apology("Symbol doesn't exist")

    return render_template("quoted.html", name=stock["name"], price=stock["price"], symbol=stock["symbol"])


@app.route("/register", methods=["GET", "POST"])
def register():
    """Register user"""
    if request.method == "GET":
        return render_template("register.html")
    username = request.form.get("username")
    password = request.form.get("password")
    confirmation = request.form.get("confirmation")
    if not username:
        return apology("Username required")
    if not password:
        return apology("Password required")
    if not confirmation:
        return apology("Confirmation required")
    if password != confirmation:
        return apology("Passwords do not match")
    special_characters = ['"', '"', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '+', '?', '_', '=', ',', '<', '>', '/']
    if len(password) < 8 or not any(c in special_characters for c in password) or not any(char.isdigit() for char in password):
        return apology("Password must be at least 8 letters, and contain numbers and symbols")

    # makes the password a series of short strings to encrypt it
    hash = generate_password_hash(password)

    try:
        new_user = db.execute("INSERT INTO users (username, hash) VALUES (?,?)", username, hash)
    except:
        return apology("Username already exists")

    session["user_id"] = new_user

    return redirect("/")


@app.route("/sell", methods=["GET", "POST"])
@login_required
def sell():
    """Sell shares of stock"""
    if request.method == "GET":
        user_id = session["user_id"]
        symbols_user = db.execute(
            "SELECT symbol FROM transactions WHERE user_id = :id GROUP BY symbol HAVING SUM(shares) > 0", id=user_id)
        return render_template("sell.html", symbols=[row["symbol"] for row in symbols_user])

    symbol = request.form.get("symbol")
    try:
        shares_being_sold = int(request.form.get("shares"))
    except ValueError:
        return apology("No letters dawg")

    if not symbol:
        return apology("Symbol required")

    if not shares_being_sold:
        return apology("Shares required")

    if shares_being_sold < 0:
        return apology("Bro it has to be positive")

    user_id = session["user_id"]
    symbol = symbol.upper()
    shares_owned = 0.0
    try:
        shares_owned_db = db.execute("SELECT shares FROM transactions WHERE user_id = (?) AND symbol = (?)", user_id, symbol)

    except:
        return apology("You don't own that stock")
    length = len(shares_owned_db)
    if length == 0:
        return apology("You don't own that stock")
    shares_owned += shares_owned_db[0]["shares"]

    if shares_owned == 0:
        return apology("You already sold all your shares of that stock")

    if shares_being_sold > shares_owned:
        return apology("You don't own that many shares")

    stock = lookup(symbol.upper())

    stock_price_db = db.execute("SELECT price FROM transactions WHERE symbol = (?)", symbol)
    stock_price = int(stock_price_db[0]["price"])

    money_made = shares_being_sold * stock_price

    old_money_db = db.execute("SELECT cash FROM users WHERE id = (?)", user_id)
    old_money = float(old_money_db[0]["cash"])
    total_money = money_made + old_money

    db.execute("UPDATE users SET cash = (?) WHERE id = (?)", total_money, user_id)
    date = datetime.datetime.now()

    db.execute("INSERT INTO transactions (user_id, symbol, shares, price, date) VALUES (?,?,?,?,?)",
               user_id, stock["symbol"], "{:.2f}".format(-1*shares_being_sold), stock["price"], date)

    flash("sold!")

    return redirect("/")