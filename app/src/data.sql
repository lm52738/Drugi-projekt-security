DROP TABLE IF EXISTS appuser CASCADE;
DROP SEQUENCE IF EXISTS appuser_SEQ CASCADE;

DROP TABLE IF EXISTS book CASCADE;
DROP SEQUENCE IF EXISTS book_SEQ CASCADE;

CREATE SEQUENCE appuser_SEQ INCREMENT BY 1 MINVALUE 0;
CREATE TABLE appUser
(
  email VARCHAR(200) NOT NULL,
  idUser INT NOT NULL DEFAULT nextval('appuser_SEQ'),
  firstName VARCHAR(50),
  lastName VARCHAR(50),
  username VARCHAR(100)  NOT NULL,
  password VARCHAR(200)  NOT NULL,
  passwordHash VARCHAR(200)  NOT NULL,
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

-- lozinke iz riječnika, riječnik za korisnika (admin), jedna lozinka za više korisnika
INSERT INTO appUser (email,firstname,lastname,username,password,passwordHash) 
VALUES ('mn92833@mailinator.com','Mark','Nieves','mn92833','password123',
'$2b$10$JMs.oLAdhKdJDeXOohoXSeV8qy2568Mq2Mg4BuiCOk9EX.EApiV7G');
INSERT INTO appUser (email,firstname,lastname,username,password,passwordHash) 
VALUES ('hs65524@mailinator.com','Hannah','Sherman','hs65524','password123',
'$2b$10$Yg4DzOFGx0FhyyXstZmP9eLApoh6EcwlQXqeOTI5X5sd0GNK3vkzy');
INSERT INTO appUser (email,firstname,lastname,username,password,passwordHash) 
VALUES ('br72839@mailinator.com','Bob','Rhodes','br72839','overcoat-beckon-debtor-muddle',
'$2b$10$Us7TrgmkaTDcoWl2sF1EA.v4EjTjSRORF8jpQMJzlz3Z5FXuXVF.W');
INSERT INTO appUser (email,firstname,lastname,username,password,passwordHash) 
VALUES ('ks64839@mailinator.com','Korina','Swain','ks64839','iran-amortize-shortage-parlour',
'$2b$10$KSmNxwNGV3HUTWhi4xvcveM3WB2437aR6munBs5okYrTBDx6C1LVi');
INSERT INTO appUser (email,username,password,passwordHash) 
VALUES ('admin@mailinator.com','admin','admin123',
'$2b$10$bAublTl2LsAUf4BsyZdxvuI4V6..geS7LBgFKKlCjeC5wwWLooOsm');

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
INSERT INTO book (nameBook,author,nbrPages,nativeLang,genre) 
VALUES ('Gone with the Wind','Margaret Mitchell',1037,'English','Historical Fiction');
INSERT INTO book (nameBook,author,nbrPages,nativeLang,genre) 
VALUES ('The Catcher in the Rye','J.D. Salinger',234,'English','Novel');
INSERT INTO book (nameBook,author,nbrPages,nativeLang,genre) 
VALUES ('Charlotte’s Web','E.B. White',192,'English','Novel');
INSERT INTO book (nameBook,author,nbrPages,nativeLang,genre) 
VALUES ('The Lion, the Witch, and the Wardrobe','C.S. Lewis',208,'English','Fantasy Fiction');
INSERT INTO book (nameBook,author,nbrPages,nativeLang,genre) 
VALUES ('The Grapes of Wrath','John Steinbeck',464,'English','Historical Fiction');
INSERT INTO book (nameBook,author,nbrPages,nativeLang,genre) 
VALUES ('Lord of the Flies','William Golding',224,'English','Allegory');
INSERT INTO book (nameBook,author,nbrPages,nativeLang,genre) 
VALUES ('The Kite Runner','Khaled Hosseini',371,'English','Drama');
INSERT INTO book (nameBook,author,nbrPages,nativeLang,genre) 
VALUES ('Of Mice and Men','John Steinbeck',107,'English','Fiction');
INSERT INTO book (nameBook,author,nbrPages,nativeLang,genre) 
VALUES ('A Tale of Two Cities','Charles Dickens',288,'English','Historical Fiction');
INSERT INTO book (nameBook,author,nbrPages,nativeLang,genre) 
VALUES ('Romeo and Juliet','William Shakespeare',88,'English','Tragedy');