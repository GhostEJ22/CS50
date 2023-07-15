#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include "wav.h"

int check_format(WAVHEADER header);
int get_block_size(WAVHEADER header);

int main(int argc, char *argv[])
{
    // Ensure proper usage
    // TODO #1
    if (argc != 3)
    {
        return 1;
    }
    char *infile = argv[1];
    // Open input file for reading
    // TODO #2
    FILE *inptr = fopen(infile, "r");
    if (inptr == NULL) return 1;

    // Read header
    // TODO #3
    WAVHEADER header;
    fread(&header, sizeof(WAVHEADER), 1, inptr);

    // Use check_format to ensure WAV format
    // TODO #4
    if(check_format(header) == 1)
    {
        printf("not what we are looking for\n");
        return 1;
    }

    // Open output file for writing
    // TODO #5
    char *outfile = argv[2];
    FILE *outptr = fopen(outfile, "w");
    if (outptr == NULL) return 1;

    // Write header to file
    // TODO #6
    fwrite(&header, sizeof(WAVHEADER), 1, outptr);

    // Use get_block_size to calculate size of block
    // TODO #7
    int block_size = get_block_size(header);

    // Write reversed audio to file
    // TODO #8
    if(fseek(inptr, block_size, SEEK_END)) {
        return 1;
    }
    BYTE buffer[block_size];
    while(ftell(inptr) - block_size > sizeof(header))
    {
        if(fseek(inptr, block_size * -2,SEEK_CUR)) {
            return 1;
        }
        fread(buffer, block_size, 1, inptr);
        fwrite(buffer, block_size, 1, outptr);

    }
    fclose(outptr);
    fclose(inptr);
}

int check_format(WAVHEADER header)
{
    if(header.format[0] == 'W' && header.format[1] == 'A' && header.format[2] == 'V' && header.format[3] == 'E') return 0;
    return 1;
}

int get_block_size(WAVHEADER header)
{
    int block = round(header.numChannels * (header.bitsPerSample * 0.125));
    return block;
}