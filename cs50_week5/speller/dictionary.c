// Implements a dictionary's functionality

#include <ctype.h>
#include <stdbool.h>
#include <stdio.h>
#include "dictionary.h"
#include <stdlib.h>
#include <string.h>
#include <strings.h>
// Represents a node in a hash table
typedef struct node
{
    char word[LENGTH + 1];
    struct node *next;
}
node;
//dictionary will only contain lowercase words
// TODO: Choose number of buckets in hash table
const unsigned int N = 25000;

// Hash table
node *table[N];

//my own word count
int word_count;
int hash_val;
// Returns true if word is in dictionary, else false
bool check(const char *word)
{
    hash_val = hash(word);
    node *cursor = table[hash_val];
    while (cursor != 0)
    {
        if (strcasecmp(word, cursor->word) == 0)
        {
            return true;
        }
        cursor = cursor->next;
    }

    return false;
}

// Hashes word to a number
unsigned int hash(const char *word)
{
    unsigned long index = 0;
    for (int i = 0, b = strlen(word); i < b; i ++)
    {
        index += tolower(word[i]);
    }
    return index % N;
}

// Loads dictionary into memory, returning true if successful, else false
bool load(const char *dictionary)
{
    FILE *infile = fopen(dictionary, "r");
    //did the dictionary load
    if (infile == NULL)
    {
        return false;
    }
    // Scans dictionary word by word (populating hash table with nodes containing words found in dictionary)
    char word[LENGTH + 1];
    while (fscanf(infile, "%s", word) != EOF)
    {
        node *n = malloc(sizeof(node));
        //do we have the memory for n
        if (n == NULL)
        {
            return false;
        }

        strcpy(n->word, word);
        //index for where to put word in hash table
        hash_val = hash(word);
        //new nodes next points to where current head points. Then Current head points to new node created
        n->next = table[hash_val];
        table[hash_val] = n;
        word_count++;
    }

    fclose(infile);
    return true;

}

// Returns number of words in dictionary if loaded, else 0 if not yet loaded
unsigned int size(void)
{
    if (word_count > 0)
    {
        return word_count;
    }
    return 0;
}

// Unloads dictionary from memory, returning true if successful, else false
bool unload(void)
{

    for (int i = 0; i < N; i++)
    {
        node *cursor = table[i];
        while (cursor != NULL)
        {
            node *temp = cursor;
            cursor = cursor->next;
            free(temp);
        }
    }
    return true;
}
