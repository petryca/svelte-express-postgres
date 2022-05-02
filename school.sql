DROP TABLE IF EXISTS students;

CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL
);

INSERT INTO students(name)
VALUES
('Adam'),
('Anastasia'),
('Ani'),
('Artem'),
('Erica'),
('Kevin'),
('Linda'),
('Liza'),
('Luyi'),
('Samuel'),
('Martin'),
('Gabriel'),
('Emmanuel'),
('Jan'),
('Sarjo'),
('Anothjeev');
