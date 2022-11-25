select * from posts ;

posts.*, authors.name AS author_name, authors.email AS author_email


SELECT * from authors
  INNER JOIN posts on  posts.author_id = authors.id	
  WHERE id = 1;