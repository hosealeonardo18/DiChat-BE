CREATE DATABASE dichat;

CREATE TABLE users (
  id VARCHAR(255) PRIMARY KEY NOT NULL , 
  fullname VARCHAR(100) NOT NULL,
  email VARCHAR(50) NOT NULL ,
  password VARCHAR(255) NOT NULL,
  no_telp VARCHAR(14) NULL,
  description text NULL,
  image VARCHAR(255) NULL
);

CREATE TABLE contacts (
  id VARCHAR(255) PRIMARY KEY NOT NULL , 
  id_user VARCHAR(255) NOT NULL,
  id_people VARCHAR(255) NOT NULL,

  CONSTRAINT fk_users
  FOREIGN KEY (id_user) 
  REFERENCES users(id) ON DELETE CASCADE,
  
  CONSTRAINT fk_people
  FOREIGN KEY (id_people) 
  REFERENCES users(id) ON DELETE CASCADE
  );

CREATE TABLE messages (
  id VARCHAR(255) PRIMARY KEY NOT NULL , 
  id_sender VARCHAR(255) NOT NULL,
  id_receiver VARCHAR(255) NOT NULL,
  message text,
  created_at VARCHAR(128),

  CONSTRAINT fk_sender
  FOREIGN KEY (id_sender) 
  REFERENCES users(id) ON DELETE CASCADE,

  CONSTRAINT fk_receiver
  FOREIGN KEY (id_receiver) 
  REFERENCES users(id) ON DELETE CASCADE
);



SELECT * FROM messages where (id_sender = '2c4d6a38-ab9c-45fc-87cf-ed11b68e785d' AND id_receiver = 'c0a02e84-5bc0-4639-81de-c0b01dde06c4') OR (id_sender = '2c4d6a38-ab9c-45fc-87cf-ed11b68e785d' AND id_receiver = 'c0a02e84-5bc0-4639-81de-c0b01dde06c4') ORDER BY created_at ASC;