# Analisi dei Requisiti

## API
- ### Login (GET)
- ### Recupero Password (GET)
- ### Cambio Password (SET)
- ### Registrazione (SET)
- ### Ruoli (GET / SET)
- ### Macchinari (GET / SET)
- ### Firme (GET / SET)
- ### Calendario Scadenze (GET / SET) 
- ### Dettagli Controllo (GET / SET) 
- ### Ticket (futura miglioria) (GET / SET) 
- ### Invio email (GET)
- ### Creazione PDF (GET)
- ### Permessi (GET (SET come futura miglioria))


## Permessi Utenti

|Permesso                   |Sviluppatore   |Admin  |Responsabile Sicurezza |Operatore  |Ufficio Tecnico    |
|:-                         |:-:            |:-:    |:-:                    |:-:        |:-:                |
|Modifica Utenti (limitata) |               |✔️     |                       |           |                   |
|Modifica Utenti (completa) |✔️            |       |                       |           |                   |
|Visualizzazione Utenti     |✔️            |✔️     |✔️                    |            |                  |
|Visualizzazione Scadenze   |✔️            |✔️     |✔️                    |✔️         |✔️                |
|Modifica Scadenze          |✔️            |✔️     |✔️                    |            |                  |
|Visualizzazione Macchinari |✔️            |✔️     |✔️                    |✔️         |✔️                |
|Modifica Macchinari        |✔️            |✔️     |✔️                    |            |                  |
|Visualizzazione Firme      |✔️            |✔️     |✔️                    |✔️         |✔️                |
|Aggiunta Firme             |✔️            |✔️     |✔️                    |✔️         |                   |
|Gestione Firme             |✔️            |✔️     |✔️                    |           |                   |

## Notifiche

**Per calendario**: Un cron-job per ogni scadenza (una settimana prima e un giorno prima).

**Per ticket**: Notifiche inviate istantaneamente. + (Cron job ogni giorno alle 8:00 che invia una mail con tutti i ticket aperti)

## Sistema di ticket

I ticket vengono aperti quando un utente segnala dei problemi con un controllo (oppure, eventualmente, con un tasto apposito) e vengono chiusi quando un utente (o un gruppo di utenti) ha risolto il problema.

Possono essere assegnati a un utente o a un gruppo di utenti. (di default, quando un ticket viene aperto tramite un controllo, viene assegnato al gruppo "operatore" e "ufficio tecnico").