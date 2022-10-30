DROP TABLE IF EXISTS appuser CASCADE;
DROP SEQUENCE IF EXISTS appuser_SEQ CASCADE;

DROP TABLE IF EXISTS book CASCADE;
DROP SEQUENCE IF EXISTS book_SEQ CASCADE;

CREATE SEQUENCE appuser_SEQ INCREMENT BY 1 MINVALUE 0;
CREATE TABLE appUser
(
  email VARCHAR(200) NOT NULL,
  idUser INT NOT NULL DEFAULT nextval('appuser_SEQ'),
  firstName VARCHAR(50)  NOT NULL,
  lastName VARCHAR(50)  NOT NULL,
  username VARCHAR(100)  NOT NULL,
  password VARCHAR(200)  NOT NULL,
  PRIMARY KEY (idUser),
  UNIQUE (email)
);

CREATE SEQUENCE book_SEQ INCREMENT BY 1 MINVALUE 0;
CREATE TABLE book
(
  idBook INT NOT NULL DEFAULT nextval('book_SEQ'),
  nameBook VARCHAR(50) NOT NULL,
  author VARCHAR(100) NOT NULL,
  nbrPages INT NOT NULL,
  nativeLang VARCHAR(50) NOT NULL,
  genre VARCHAR(100) NOT NULL,
  PRIMARY KEY (idBook)
);

INSERT INTO appUser (email,firstname,lastname,username) 
VALUES ('mn92833@mailinator.com','Mark','Nieves','mn92833');
INSERT INTO appUser (email,firstname,lastname,username) 
VALUES ('hs65524@mailinator.com','Hannah','Sherman','hs65524');
INSERT INTO appUser (email,firstname,lastname,username) 
VALUES ('br72839@mailinator.com','Bob','Rhodes','br72839');
INSERT INTO appUser (email,firstname,lastname,username) 
VALUES ('ks64839@mailinator.com','Korina','Swain','ks64839');

INSERT INTO book (nameBook,author,nbrPages,nativeLang,genre) 
VALUES ('To Kill a Mockingbird','Harper Lee',364,'English','Thriller');
INSERT INTO book (nameBook,author,nbrPages,nativeLang,genre) 
VALUES ('1984','George Orwell',328,'English','Science fiction');
INSERT INTO book (nameBook,author,nbrPages,nativeLang,genre) 
VALUES ('Harry Potter and the Philosopher’s Stone','J.K. Rowling',223,'English','Fantasy Fiction');
INSERT INTO book (nameBook,author,nbrPages,nativeLang,genre) 
VALUES ('The Lord of the Rings','J.R.R. Tolkien',9250,'English','High Fantasy');
INSERT INTO book (nameBook,author,nbrPages,nativeLang,genre) 
VALUES ('The Great Gatsby','F. Scott Fitzgerald',115,'English','Tragedy');
INSERT INTO book (nameBook,author,nbrPages,nativeLang,genre) 
VALUES ('Pride and Prejudice','Jane Austen',328,'English','Romance novel');
INSERT INTO book (nameBook,author,nbrPages,nativeLang,genre) 
VALUES ('The Diary Of A Young Girl','Anne Frank',714,'Dutch','Biography');
INSERT INTO book (nameBook,author,nbrPages,nativeLang,genre) 
VALUES ('The Book Thief','Markus Zusak',584,'German','Historical Fiction');
INSERT INTO book (nameBook,author,nbrPages,nativeLang,genre) 
VALUES ('The Hobbit','J.R.R. Tolkien',310,'English','Fantasy Fiction');
INSERT INTO book (nameBook,author,nbrPages,nativeLang,genre) 
VALUES ('Little Women','Louisa May Alcott',759,'English','Novel');
INSERT INTO book (nameBook,author,nbrPages,nativeLang,genre) 
VALUES ('Fahrenheit 451','Ray Bradbury',256,'English','Science fiction');
INSERT INTO book (nameBook,author,nbrPages,nativeLang,genre) 
VALUES ('Jane Eyre','Charlotte Bronte',410,'English','Romance novel');
INSERT INTO book (nameBook,author,nbrPages,nativeLang,genre) 
VALUES ('Animal Farm','George Orwell',112,'English','Allegory');


-- INSERT INTO book (nameBook,author,nbrPages,nativeLang,genre) 
-- VALUES ('Gone with the Wind','Margaret Mitchell',410,'English','Romance novel')
-- INSERT INTO book (nameBook,author,nbrPages,nativeLang,genre) 
-- VALUES ('The Catcher in the Rye','J.D. Salinger',410,'English','Romance novel')
-- INSERT INTO book (nameBook,author,nbrPages,nativeLang,genre) 
-- VALUES ('Charlotte’s Web','E.B. White',410,'English','Romance novel')
-- INSERT INTO book (nameBook,author,nbrPages,nativeLang,genre) 
-- VALUES ('The Lion, the Witch, and the Wardrobe','C.S. Lewis',410,'English','Romance novel')
-- INSERT INTO book (nameBook,author,nbrPages,nativeLang,genre) 
-- VALUES ('The Grapes of Wrath','John Steinbeck',410,'English','Romance novel')
-- INSERT INTO book (nameBook,author,nbrPages,nativeLang,genre) 
-- VALUES ('Lord of the Flies','William Golding',410,'English','Romance novel')
-- INSERT INTO book (nameBook,author,nbrPages,nativeLang,genre) 
-- VALUES ('The Kite Runner','Khaled Hosseini',410,'English','Romance novel')
-- INSERT INTO book (nameBook,author,nbrPages,nativeLang,genre) 
-- VALUES ('Of Mice and Men','John Steinbeck',410,'English','Romance novel')
-- INSERT INTO book (nameBook,author,nbrPages,nativeLang,genre) 
-- VALUES ('A Tale of Two Cities','Charles Dickens',410,'English','Romance novel')
-- INSERT INTO book (nameBook,author,nbrPages,nativeLang,genre) 
-- VALUES ('Romeo and Juliet','William Shakespeare',410,'English','Romance novel')
