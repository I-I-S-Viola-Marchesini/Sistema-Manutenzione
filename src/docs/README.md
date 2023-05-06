# Introduzione

Sistema Manutenzione è un software creato specificatamente per [l'I.I.S. Viola Marchesini](https://iisviolamarchesini.edu.it) che facilita la gestione delle manutenzioni dei diversi apparati dei laboratori o degli edifici dell'istituto.

Lo sviluppo di questo progetto è nelle mani degli studenti delle classi quinte di informatica, e **questa documentazione è rivolta verso gli studenti che lavoreranno su questo progetto**.

# Come iniziare

Se siete in quinta di 

**Creare un fork della [repository](https://github.com/I-I-S-Viola-Marchesini/Sistema-Manutenzione)** e lavorare sul proprio fork, per poi creare una pull request per integrare le modifiche nel progetto principale.

o

**[Ottenere i permessi di collaboratore](https://github.com/I-I-S-Viola-Marchesini/Sistema-Manutenzione/settings/access)** per poter lavorare direttamente sul progetto principale.

## Preparazione dell'ambiente di sviluppo

Per poter sviluppare il progetto è necessario avere installato sul proprio computer:

- [Git](https://git-scm.com/) per il controllo di versione
- [PHP](https://www.php.net/) per il codice e gli strumenti di sviluppo
- [Composer](https://getcomposer.org/) per la gestione delle dependencies

Sarà necessario un ambiente come [XAMPP](https://www.apachefriends.org/download.html) (o [Laragon](https://laragon.org/download/) se preferite Nginx) per poter eseguire il progetto in locale.

In aggiunta il progetto utilizza una versione personalizzata di [Bootstrap](https://getbootstrap.com/) che è già inclusa nel progetto (in `src/styles`);
Per modificarla è necessario avere installato [Node.js](https://nodejs.org/it/) e [SASS](https://sass-lang.com/).

## Preparazione di Visual Studio Code

Per poter sviluppare il progetto è consigliato utilizzare [Visual Studio Code](https://code.visualstudio.com/).

Sono consigliate le seguenti estensioni:
- [PHP Intelephense](https://marketplace.visualstudio.com/items?itemName=bmewburn.vscode-intelephense-client) per il supporto al linguaggio PHP
- [HTML CSS Support](https://marketplace.visualstudio.com/items?itemName=ecmel.vscode-html-css) per il supporto al linguaggio HTML e CSS
- [Markdown All in One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one) per il supporto al linguaggio Markdown (tutta la documentazione è scritta in Markdown)

e visto che [GitHub Copilot](https://copilot.github.com/) è offerto gratuitamente con [Github Education](https://education.github.com/), è consigliato installarlo per avere un aiuto in più durante lo sviluppo.

## Preparazione del database

Per poter utilizzare il progetto è necessario creare un database MySQL, lo script per la creazione delle tabelle è attualmente disponibile in `backend/DB.sql`.

> ⚠️ **Attenzione**: XAMPP potrebbe dare problemi con il database visto che utilizza MariaDB, si può risolvere questo problema manualmente [modificando l'installazione di XAMPP](https://stackoverflow.com/questions/39654428/how-can-i-change-mariadb-to-mysql-in-xampp/58973750#58973750), oppure si può usare [MySQL Workbench](https://dev.mysql.com/downloads/workbench/) per gestire il database.

## Come funziona

Il progetto è formato da un backend PHP e un frontend web realizzato con una versione personalizzata di Bootstrap.