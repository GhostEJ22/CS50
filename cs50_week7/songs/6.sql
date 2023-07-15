--SELECT songs.name FROM songs JOIN artists on artist_id = artists.id WHERE artists.name =  "Post Malone";

--OR
SELECT name FROM songs WHERE artist_id IN
    (SELECT id FROM artists WHERE name = "Post Malone");

--When I did join, it autosorted the answers alphabetically. The second option does not.