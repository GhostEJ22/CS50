SELECT AVG(rating) FROM ratings WHERE movie_id IN
    (SELECT id FROM movies WHERE year = 2012);

    --OR

--SELECT AVG(rating) FROM ratings JOIN movies on movie_id = movies.id WHERE year = 2012;