SELECT title FROM movies
  JOIN stars on movies.id = stars.movie_id
  JOIN people on person_id = people.id
  WHERE name = "Johnny Depp" OR name = "Helena Bonham Carter"
  GROUP BY title HAVING count(*) > 1;