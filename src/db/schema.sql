CREATE TABLE users(
  id INTEGER AUTO_INCREMENT,
  first_name TEXT NOT NULL,
  surname TEXT NOT NULL,
  username TEXT NOT NULL,
  pw TEXT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE visited_locations(
  id INTEGER AUTO_INCREMENT,
  username TEXT NOT NULL,
  visited_on TIMESTAMP NOT NULL,
  duration INT NOT NULL,
  location_x INT NOT NULL,
  location_y INT NOT NULL,
  PRIMARY KEY (id)
);
