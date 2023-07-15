answer = input("Greeting: ")

answer = answer.lower()
if(answer == "hello"):
   print("$0")
elif(answer.find('h') == 0):
    print("$20")
else:
    print("$100")