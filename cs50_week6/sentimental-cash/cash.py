from cs50 import get_float
while True:
    value = get_float("Change owed: ")
    if(value>-1):
        break

total = 0

value = (int)(value * 100)
total += (int)(value / 25)
value = (int)(value % 25)
if value > 0:
    total += (int)(value / 10)
    value = (int)(value % 10)
if value > 0:
    total += (int)(value / 5)
    value = (int)(value % 5)
if value > 0:
    total += value
print(total)