CREATE DATABASE SoccerGameDB;


CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  gmail VARCHAR(50) NOT NULL,
  password VARCHAR(50) NOT NULL
);

CREATE TABLE teams (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);

CREATE TABLE players (
  id SERIAL PRIMARY KEY,
  ci VARCHAR(50) NOT NULL,
  names VARCHAR(50) NOT NULL,
  lastnames VARCHAR(50) NOT NULL,
  age INT NOT NULL,
  date DATE NOT NULL,
  cellphone VARCHAR(15),
  photo TEXT,
  teamId INT REFERENCES teams(id)
);

CREATE TABLE champeonships (
  id SERIAL PRIMARY KEY,
  playerId INT REFERENCES players(id),
  name VARCHAR(50) NOT NULL,
  amountTeams INT NOT NULL,
  type VARCHAR(50) NOT NULL,
  dateStart DATE NOT NULL,
  dateEnd DATE NOT NULL
);

CREATE TABLE games (
  id SERIAL PRIMARY KEY,
  localTeamId INT REFERENCES teams(id),
  visitorTeamId INT REFERENCES teams(id),
  champeonshipId INT REFERENCES champeonships(id),
  date DATE NOT NULL
);