CREATE DATABASE Home CHARACTER SET 'utf8';

USE Home

CREATE TABLE Rooms(
    id INTEGER NOT NULL AUTO_INCREMENT,
    name VARCHAR(40),
    type VARCHAR(40),

    PRIMARY KEY(id)
)
ENGINE = INNODB;
CREATE INDEX name ON Rooms(name);


CREATE TABLE Profils(
    id INTEGER NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(40),
    last_name VARCHAR(40),

    PRIMARY KEY(id)
)
ENGINE = INNODB;
CREATE INDEX first_name ON Profils(first_name);
CREATE INDEX last_name ON Profils(last_name);


CREATE TABLE Events(
    id INTEGER NOT NULL AUTO_INCREMENT,
    type VARCHAR(40),
    datetime DATETIME,
    fk_room_id INTEGER,

    PRIMARY KEY(id)
)
ENGINE = INNODB;
CREATE INDEX type ON Events(type);
CREATE INDEX datetime ON Events(datetime);
CREATE INDEX fk_room_id ON Events(fk_room_id);


CREATE TABLE Inhabitants(
    id INTEGER NOT NULL AUTO_INCREMENT,
    fk_profil_id INTEGER,

    PRIMARY KEY(id)
)
ENGINE = INNODB;

CREATE TABLE Guests(
    id INTEGER NOT NULL AUTO_INCREMENT,
    fk_profil_id INTEGER,

    PRIMARY KEY(id)
)
ENGINE = INNODB;


CREATE TABLE Users(
    id INTEGER NOT NULL AUTO_INCREMENT,
    fk_profil_id INTEGER,
    pseudo VARCHAR(40),
    password VARCHAR(40),
    mail VARCHAR(100),
    rank VARCHAR(40),

    PRIMARY KEY(id)
)
ENGINE = INNODB;
CREATE INDEX pseudo ON Users(pseudo);
CREATE INDEX mail ON Users(mail);

ALTER TABLE Events
ADD FOREIGN KEY(fk_room_id) REFERENCES Rooms(id);

ALTER TABLE Inhabitants
ADD FOREIGN KEY(fk_profil_id) REFERENCES Profils(id);

ALTER TABLE Guests
ADD FOREIGN KEY(fk_profil_id) REFERENCES Profils(id);

ALTER TABLE Users
ADD FOREIGN KEY(fk_profil_id) REFERENCES Profils(id);