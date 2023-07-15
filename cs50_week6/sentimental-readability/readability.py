text = input("Text: ")

letters = 0
words = 1
sentences = 0
for element in text:
    if element.isalpha() == True:
        letters += 1
    if element == " ":
        words += 1
    if element == "!" or element == "?" or element == ".":
        sentences += 1

lettersPer100Words = letters / words * 100

sentencesPer100Words = sentences / words * 100

grade = round(0.0588 * lettersPer100Words - 0.296 * sentencesPer100Words - 15.8)

if grade < 1:
    print("Before Grade 1")
elif grade > 16:
    print("Grade 16+")
else:
    print(f"Grade {grade}")