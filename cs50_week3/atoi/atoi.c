#include <cs50.h>
#include <ctype.h>
#include <math.h>
#include <stdio.h>
#include <string.h>

int convert(string input);
//int number;
//THAT IS PART OF THE OR SCENARIO BELOW
int main(void)
{
    string input = get_string("Enter a positive integer: ");

    for (int i = 0, n = strlen(input); i < n; i++)
    {
        if (!isdigit(input[i]))
        {
            printf("Invalid Input!\n");
            return 1;
        }
    }

    // Convert string to int
    printf("%i\n", convert(input));
}

int convert(string input)
{
    int lastIndex = strlen(input);

    //base case. If we have only one character return it
    if (strlen(input) == 1)
    {
        return input[lastIndex - 1] - 48;
    }

    int currentChar = input[lastIndex - 1] - 48;

    //remove last char
    input[lastIndex - 1] = '\0';

    //return * 10 times the integer value of the new shortened string
    return currentChar + 10 * convert(input);

    ////ORRRRRR

    /*
    int count = strlen(input);
    int temporaryInt = 0;

    //recursive base case
    if (count == 0)
    {
        return number;
    }
    for (int i = count - 1; i >= 0; i--)
    {
        temporaryInt = input[i] - '0';
        input[i] = '\0';

        convert(input);

        number = number * 10 + temporaryInt;
        return number;
    }
    return number;
    */
}