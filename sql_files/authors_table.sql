INSERT INTO blog.authors (name, email) values ('Marcus', 'Marcus@test.com');

select * from  blog.authors; 

update authors set email = 'marcusfilms@test.com' where id = 3;