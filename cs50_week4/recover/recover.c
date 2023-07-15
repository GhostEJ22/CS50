#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>
int main(int argc, char *argv[])
{
    int count = 0;
    if (argc != 2)
    {
        printf("correct usage\n");
        return 1;
    }

    FILE *input_file = fopen(argv[1], "r");

//does file exist
    if (input_file == NULL)
    {
        printf("No file found");
        return 1;
    }
    unsigned char buffer[512];
    FILE *img = NULL;
    char *filename = malloc(8 * sizeof(char));
    while (fread(buffer, sizeof(char), 512, input_file) == 512)
    {
        if (buffer[0] == 0xff && buffer[1] == 0xd8 && buffer[2] == 0xff && (buffer[3] & 0xf0) == 0xe0)
        {

            if (count > 0)
            {
                fclose(img);
            }
            sprintf(filename, "%03i.jpg", count);
            //output file for writing
            img = fopen(filename, "w");
            count++;
        }
        if (img != NULL)
        {
            fwrite(buffer, sizeof(char), 512, img);
        }
    }
    free(filename);
    fclose(img);
    fclose(input_file);
    return 0;

}