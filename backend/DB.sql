create database Sistema_manutenzione;

create table utente(
id_utente varchar(6) primary key,
nome varchar(40) not null,
email varchar(30) not null,
password varchar(256) not null,
ruolo int not null
);

create table ruolo(
id_ruolo int primary key,
nome varchar(20) not null,
descrizioni varchar(100)
);

create table impianto(
id_impianto int primary key,
nome varchar(20) not null,
descrizioni varchar(100)
-- da verificare
);