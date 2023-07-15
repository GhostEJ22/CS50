def main():
    total = 0.00
    while True:
        try:
            menuItem = input("Item: ").title()
        except EOFError:
            print()
            break
        if menuItem in menu:
            total += menu[menuItem]
            print(f"Total: ${total:.2f}")

menu = {
    "Baja Taco": 4.00,
    "Burrito": 7.50,
    "Bowl": 8.50,
    "Nachos": 11.00,
    "Quesadilla": 8.50,
    "Super Burrito": 8.50,
    "Super Quesadilla": 9.50,
    "Taco": 3.00,
    "Tortilla Salad": 8.00
}

main()
