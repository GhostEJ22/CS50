--SELECT AVG(energy) from songs WHERE artist_id IN
  --(SELECT id from artists where name = "Drake");
--OR
SELECT AVG(energy) FROM songs JOIN artists ON artist_id = artists.id WHERE artists.name = "Drake";