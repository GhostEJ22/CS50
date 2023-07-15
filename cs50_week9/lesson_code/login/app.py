from flask import Flask, redirect, render_template, request, session
from flask_session import Session

# Configure app
app = Flask(__name__)

# Configure session - how to enable sessions information storage(shopping cart)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)



@app.route("/")
def index():
    #if there is not a name in the session(nothin in shopping cart), redirect to log in automatically
    if not session.get("name"):
        return redirect("/login")
    return render_template("index.html")


#if the user has gone to /login via get or post, do this.
@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        #Store user name in session[name] and redirect them to home page
        session["name"] = request.form.get("name")
        return redirect("/")
    #if you get there via GET, take them to login
    return render_template("login.html")


@app.route("/logout")
def logout():
    session["name"] = None
    return redirect("/")