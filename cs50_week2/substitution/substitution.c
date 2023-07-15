#include <cs50.h>
#include <stdio.h>
#include <string.h>
#include <ctype.h>
int main(int argc, string argv[])
{

    if (argc != 2)
    {
        printf("Usage ./substitution key\n");
        return 1;
    }
    string key = argv[1];
    for (int i = 0; i < strlen(key); i++)
    {
        if (!isalpha(key[i]))
        {
            printf("Usage: ./substitution key\n");
            return 1;
        }
    }
    if (strlen(key) != 26)
    {
        printf("Key must contain 26 characters.\n");
        return 1;
    }
    for (int i = 0; i < strlen(key); i++)
    {
        for (int j = i + 1; j < strlen(key); j++)
        {
            if (toupper(key[i]) == toupper(key[j]))
            {
                printf("Usage: ./substitution key\n");
                return 1;
            }
        }
    }
    string ask = get_string("plaintext: ");
    for (int i = 0; i < strlen(key); i++)
    {
        if (islower(key[i]))
        {
            key[i] = key[i] - 32;
        }
    }

    printf("ciphertext: ");

    for (int i = 0; i < strlen(ask); i++)
    {
        if (isupper(ask[i]))
        {
            int let = ask[i] - 65;
            printf("%c", key[let]);
        }
        else if (islower(ask[i]))
        {
            int let = ask[i] - 97;
            printf("%c", key[let] + 32);
        }
        else
        {
            printf("%c", ask[i]);
        }
    }
    printf("\n");
}