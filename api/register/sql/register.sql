INSERT INTO users (first_name, surname, username, pw)
VALUES(?, ?, ?, ?)
RETURNING id, first_name, surname, username
