CREATE DATABASE sistema_manutenzione;

USE sistema_manutenzione;
CREATE TABLE utente(
    id_utente BIGINT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(40) NOT NULL,
    username VARCHAR(40) NOT NULL,
    email VARCHAR(100) NOT NULL,
    immagine_profilo VARCHAR(100),
    stile_immagine_profilo int NOT NULL DEFAULT 0,
    password VARCHAR(256) NOT NULL,
    id_ruolo INT NOT NULL
);

CREATE TABLE dati_smtp(
    id_dati_smtp INT PRIMARY KEY AUTO_INCREMENT,
    host VARCHAR(100) NOT NULL,
    porta INT NOT NULL,
    email VARCHAR(100) NOT NULL,
    nome_account VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL
);

CREATE TABLE hcaptcha_sitekey(
    id_hcaptcha_sitekey INT PRIMARY KEY AUTO_INCREMENT,
    sitekey VARCHAR(100) NOT NULL
);

CREATE TABLE token(
    id_token INT PRIMARY KEY AUTO_INCREMENT,
    token VARCHAR(256) NOT NULL UNIQUE,
    id_utente BIGINT NOT NULL,
    data_creazione DATETIME NOT NULL,
    data_ultima_attivita DATETIME NOT NULL
);

CREATE TABLE session(
    id_session INT PRIMARY KEY AUTO_INCREMENT,
    `session` VARCHAR(256) NOT NULL UNIQUE,
    id_token INT NOT NULL,
    data_creazione DATETIME NOT NULL
);

CREATE TABLE 2fa(
    id_2fa INT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    `secret` VARCHAR(64) NOT NULL,
    token VARCHAR(64) NOT NULL,
    `session` VARCHAR(64) NOT NULL,
    data_creazione DATETIME NOT NULL
);

CREATE TABLE ruolo(
    id_ruolo INT PRIMARY KEY,
    nome VARCHAR(20) NOT NULL,
    descrizione VARCHAR(100)
);
CREATE TABLE impianto(
    id_impianto INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(20) NOT NULL,
    descrizione VARCHAR(100),
    id_controllo VARCHAR(6) UNIQUE,
    id_manutenzione VARCHAR(6) UNIQUE
);
CREATE TABLE controllo_controllo_specifico(
    id_controllo_specifico VARCHAR(7),
    id_controllo VARCHAR(6) AUTO_INCREMENT,
    descrizione VARCHAR(100)
);
CREATE TABLE controllo_specifico(
    id_controllo VARCHAR(7) PRIMARY KEY,
    periodicita INT NOT NULL,
    descrizione_modalita VARCHAR(20),
    descrizione_controllo VARCHAR(20)
);
CREATE TABLE manutenzione_manutenzione_specifico(
    id_manutenzione_specifico VARCHAR(7),
    id_manutenzione VARCHAR(6) AUTO_INCREMENT,
    descrizione VARCHAR(100),
    ditta VARCHAR(30)
);
CREATE TABLE manutenzione_specifico(
    id_manutenzione VARCHAR(7) PRIMARY KEY,
    periodicita INT NOT NULL,
    descrizione_modalita VARCHAR(20),
    descrizione_manutenzione VARCHAR(20)
);
CREATE TABLE ticket_controllo(
    id_ticket INT PRIMARY KEY,
    id_controllo VARCHAR(7),
    inviato BOOLEAN,
    visto BOOLEAN,
    risolto BOOLEAN,
    provvedimenti_adottati VARCHAR(100)
);
CREATE TABLE ticket_manutenzione(
    id_ticket INT PRIMARY KEY AUTO_INCREMENT,
    id_manutenzione VARCHAR(7),
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
    id_controllore BIGINT NOT NULL,
    firma VARCHAR(20) NOT NULL
);
CREATE TABLE manutenzione_esterno(
    id_manutenzione VARCHAR(7) PRIMARY KEY,
    `data` DATE NOT NULL,
    id_tipo_manutenzione VARCHAR(7) NOT NULL, 
    esito_manutenzione BOOLEAN NOT NULL,
    irregolarita_riscontrate VARCHAR(100),
    id_controllore BIGINT NOT NULL,
    firma VARCHAR(20) NOT NULL
);

ALTER TABLE utente ADD CONSTRAINT FK_utente_ruolo
FOREIGN KEY (ruolo) REFERENCES ruolo(id_ruolo);

ALTER TABLE token ADD CONSTRAINT FK_token_utente
FOREIGN KEY (id_utente) REFERENCES utente(id_utente);

ALTER TABLE controllo_controllo_specifico ADD CONSTRAINT FK_impianto_controllo_controllo_specifico 
FOREIGN KEY (id_controllo) REFERENCES impianto(id_controllo);

ALTER TABLE manutenzione_manutenzione_specifico ADD CONSTRAINT FK_impianto_manutenzione_manutenzione_specifico 
FOREIGN KEY (id_manutenzione) REFERENCES impianto(id_manutenzione);

ALTER TABLE controllo_controllo_specifico ADD CONSTRAINT FK_controllo_specifico_controllo_controllo_specifico
FOREIGN KEY (id_controllo_specifico) REFERENCES controllo_specifico(id_controllo);

ALTER TABLE manutenzione_manutenzione_specifico ADD CONSTRAINT FK_manutenzione_specifico_manutenzione_manutenzione_specifico
FOREIGN KEY (id_manutenzione_specifico) REFERENCES manutenzione_specifico(id_manutenzione);

ALTER TABLE ticket_controllo ADD CONSTRAINT FK_ticket_controllo_manutenzione_esterno
FOREIGN KEY (id_controllo) REFERENCES controllo_esterno(id_controllo);

ALTER TABLE ticket_manutenzione ADD CONSTRAINT FK_ticket_manutenzione_manutenzione_esterno
FOREIGN KEY (id_manutenzione) REFERENCES manutenzione_esterno(id_manutenzione);

ALTER TABLE controllo_esterno ADD CONSTRAINT FK_controllo_esterno_controllo_controllo_specifico
FOREIGN KEY (id_tipo_controllo) REFERENCES controllo_controllo_specifico(id_controllo);

ALTER TABLE manutenzione_esterno ADD CONSTRAINT FK_manutenzione_esterno_manutenzione_manutenzione_specifico
FOREIGN KEY (id_tipo_manutenzione) REFERENCES manutenzione_manutenzione_specifico(id_manutenzione);

ALTER TABLE controllo_esterno ADD CONSTRAINT FK_controllo_esterno_utente
FOREIGN KEY (id_controllore) REFERENCES utente(id_utente);

ALTER TABLE manutenzione_esterno ADD CONSTRAINT FK_manutenzione_esterno_utente
FOREIGN KEY (id_controllore) REFERENCES utente(id_utente);