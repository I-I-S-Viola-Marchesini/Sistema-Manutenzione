<h1 align="center">Sistema Manutenzione</h1>
<p align="center">
Software Web per gestire le ispezioni e la manutenzione dei materiali per l'I.I.S. Viola Marchesini
</p>

## Il Progetto

### Autori:

- Giovanni Marchetto - *[@gmarck04](https://github.com/gmarck04)*
- Alex Niccolò Ferrari - *[@PaninoCode](https://github.com/PaninoCode)*
- Angelo Pavan - *[@AngeloPavan](https://github.com/AngeloPavan)*

---

## Come contribuire

### Preparare lo spazio di lavoro:

- Clonare la repo in locale con il comando:

        git clone git@github.com:I-I-S-Viola-Marchesini/Sistema-Manutenzione.git

- Scaricare e installare Composer da: [getcomposer.org/download](https://getcomposer.org/download/)

- Scaricare le dependencies usando Composer:

        composer update

### Contenuti della repository:

#### `analisi`
Cartella contenente le analisi per il progetto.
> [ℹ️] I File .drawio.svg possono essere modificati usando [Diagrams.net](https://app.diagrams.net/), anche direttamente dal browser

#### `custom_libraries`
Librerie create appositamente per il progetto, da caricare usando composer ("composer update").

#### `custom_libraries\violabootstrap`
Modifiche apportate al tema di default di Bootstrap.
> ⚠️ Bootstrap va modificato usando **solo** i file nella cartella `custom_libraries\violabootstrap`, perché le cartelle `vendor\twbs\bootstrap` e `vendor\violamarchesini\violabootstrap` vengono entrambe ignorate da Git e non vengono incluse nei commit.

#### `src`
Cartella di sviluppo principale del progetto

#### `vendor`
Dependencies gestite da Composer

---
