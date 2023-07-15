#include <cs50.h>
#include <stdio.h>
#include <string.h>
#include<math.h>
#include <stdlib.h>

const int BITS_IN_BYTE = 8;

void print_bulb(int bit);

int main(void)
{
    string input = get_string("Message: ");
    for (int i = 0; i < strlen(input); i++)
    {

        int binary[] = {0, 0, 0, 0, 0, 0, 0, 0};
        int ascii = input[i];
        int k = 0;
        while (ascii > 0)
        {
            binary[k] = ascii % 2;
            ascii = ascii / 2;
            k++;
        }
        for (int j = BITS_IN_BYTE-1; j >= 0; j--)
        {

            print_bulb(binary[j]);
        }
        printf("\n");

    }


}

void print_bulb(int bit)
{
    if (bit == 0)
    {
        // Dark emoji
        printf("\U000026AB");
    }
    else if (bit == 1)
    {
        // Light emoji
        printf("\U0001F7E1");
    }
}
