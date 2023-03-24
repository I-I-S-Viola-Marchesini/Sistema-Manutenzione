CREATE DATABASE sistema_manutenzione;

USE sistema_manutenzione;
CREATE TABLE utente(
    id_utente VARCHAR(6) PRIMARY KEY,
    nome VARCHAR(40) NOT NULL,
    email VARCHAR(30) NOT NULL,
    password VARCHAR(256) NOT NULL,
    ruolo INT NOT NULL
);
CREATE TABLE ruolo(
    id_ruolo INT PRIMARY KEY,
    nome VARCHAR(20) NOT NULL,
    descrizione VARCHAR(100)
);
CREATE TABLE impianto(
    id_impianto INT PRIMARY KEY,
    nome VARCHAR(20) NOT NULL,
    descrizione VARCHAR(100),
    id_controllo VARCHAR(6),
    id_manutenzione VARCHAR(6)
);
CREATE TABLE controllo_controllo_specifico(
    id_controllo_specifico VARCHAR(7) PRIMARY KEY,
    id_controllo VARCHAR(6),
    descrizione VARCHAR(100)
);
CREATE TABLE controllo_specifico(
    id_controllo VARCHAR(7) PRIMARY KEY,
    periodicita INT NOT NULL,
    descrizione_modalita VARCHAR(20),
    descrizione_controllo VARCHAR(20)
);
CREATE TABLE manutenzione_manutenzione_specifico(
    id_manutenzione_specifico VARCHAR(7) PRIMARY KEY,
    id_manutenzione VARCHAR(6),
    descrizione VARCHAR(100)
);
CREATE TABLE manutenzione_specifico(
    id_manutenzione VARCHAR(7) PRIMARY KEY,
    periodicita INT NOT NULL,
    descrizione_modalita VARCHAR(20),
    descrizione_manutenzione VARCHAR(20)
);
CREATE TABLE ticket(
    id_ticket INT PRIMARY KEY,
    id_controllo VARCHAR(7),
    inviato BOOLEAN,
    visto BOOLEAN,
    risolto BOOLEAN,
    provvedimenti_adottati VARCHAR(100)
);
CREATE TABLE controllo_esterno(
    id_controllo VARCHAR(7) PRIMARY KEY,
    `data` DATE NOT NULL,
    id_tipo_controllo VARCHAR(7) NOT NULL, 
    esito_controllo BOOLEAN NOT NULL,
    irregolarita_riscontrate VARCHAR(100),
    id_controllore VARCHAR(6) NOT NULL,
    firma VARCHAR(20) NOT NULL
);
CREATE TABLE manutenzione_esterno(
    id_manutenzione VARCHAR(7) PRIMARY KEY,
    `data` DATE NOT NULL,
    id_tipo_manutenzione VARCHAR(7) NOT NULL, 
    esito_manutenzione BOOLEAN NOT NULL,
    irregolarita_riscontrate VARCHAR(100),
    id_controllore VARCHAR(6) NOT NULL,
    firma VARCHAR(20) NOT NULL
);

ALTER TABLE impianto ADD CONSTRAINT FK_impianto_manutenzione_manutenzione_specifico 
FOREIGN KEY (id_manutenzione) REFERENCES manutenzione_manutenzione_specifico(id_manutenzione);

ALTER TABLE controllo_specifico ADD CONSTRAINT FK_controllo_specifico_controllo_controllo_specifico
FOREIGN KEY (id_controllo_specifico) REFERENCES controllo_specifico(id_controllo);

ALTER TABLE manutenzione_specifico ADD CONSTRAINT FK_manutenzione_specifico_manutenzione_manutenzione_specifico
FOREIGN KEY (id_manutenzione_specifico) REFERENCES manutenzione_specifico(id_manutenzione);

ALTER TABLE ticket ADD CONSTRAINT FK_ticket_controllo_controllo_specifico
FOREIGN KEY (id_controllo) REFERENCES controllo_esterno(id_controllo);

ALTER TABLE impianto ADD CONSTRAINT FK_impianto_controllo_controllo_specifico 
FOREIGN KEY (id_controllo) REFERENCES controllo_controllo_specifico(id_controllo);

ALTER TABLE controllo_esterno ADD CONSTRAINT FK_controllo_esterno_controllo_controllo_specifico
FOREIGN KEY (id_tipo_controllo) REFERENCES controllo_controllo_specifico(id_controllo);

ALTER TABLE manutenzione_esterno ADD CONSTRAINT FK_manutenzione_esterno_manutenzione_manutenzione_specifico
FOREIGN KEY (id_tipo_manutenzione) REFERENCES manutenzione_manutenzione_specifico(id_manutenzione);

ALTER TABLE controllo_esterno ADD CONSTRAINT FK_controllo_esterno_utente
FOREIGN KEY (id_controllore) REFERENCES utente(id_utente);

ALTER TABLE manutenzione_esterno ADD CONSTRAINT FK_manutenzione_esterno_utente
FOREIGN KEY (id_controllore) REFERENCES utente(id_utente);

ALTER TABLE utente ADD CONSTRAINT FK_utente_ruolo
FOREIGN KEY (ruolo) REFERENCES ruolo(id_ruolo);