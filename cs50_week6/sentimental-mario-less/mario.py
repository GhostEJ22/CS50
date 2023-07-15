def main():
    while True:
        try:
            n = int(input("Height: "))
            if n > 0 and n < 9:
                pyramid(n)
                break
        except ValueError:
            print("Not an int")


def pyramid(n):
    for row in range(n):
        hashtag = row + 1
        spaces = n - row - 1
        print(" " * spaces, end="")
        print("#" * hashtag)


main()