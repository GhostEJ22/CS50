#include <cs50.h>
#include <stdio.h>
#include <string.h>
#include<math.h>
#include <ctype.h>
int main(void)
{
    string input = get_string("Text: ");

    float letters = 0;
    float words = 0;
    float sentences = 0;
    for (int i = 0; i < strlen(input); i++)
    {
        if (isalpha(input[i]))
        {
            letters++;
        }
        if (isspace(input[i]) || i == strlen(input) - 1)
        {
            words++;
        }
        if (input[i] == '!' || input[i] == '?' || input[i] == '.')
        {
            sentences++;
        }
    }
    //lettters per 100 words
    float lettersPer = letters / words * 100.0;
    //sentences per 100 words
    float sentencesPer = sentences / words * 100.0;
    float grade = 0.0588 * lettersPer - 0.296 * sentencesPer - 15.8;
    int rounded = round(grade);
    if (rounded > 16)
    {
        printf("Grade 16+\n");
    }
    else if (rounded < 0)
    {
        printf("Before Grade 1\n");
    }
    else
    {
        printf("Grade %i\n", rounded);
    }

}