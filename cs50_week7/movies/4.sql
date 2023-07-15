SELECT COUNT(title) FROM movies JOIN ratings on id = ratings.movie_id WHERE rating = 10.0;

--OR

--SELECT COUNT(title) FROM movies WHERE id IN
    --(SELECT movie_id FROM ratings WHERE rating = 10.0);