#include <cs50.h>
#include <stdio.h>

int main(void)
{
    int pyramidHeight = 0;
    do
    {
        //get user input
        pyramidHeight = get_int("How tall should the pyramid be? ");
    }
    while (pyramidHeight < 1 || pyramidHeight > 8);

    for (int row = 0; row < pyramidHeight; row++)
    {
        for (int spaces = 0; spaces < pyramidHeight - row - 1; spaces++)
        {
            printf(" ");
        }
        //first side
        for (int column = 0; column <= row; column++)
        {
            printf("#");
        }
        printf("  ");
        //second side
        for (int column = 0; column <= row; column++)
        {
            printf("#");
        }
        printf("\n");
    }
}