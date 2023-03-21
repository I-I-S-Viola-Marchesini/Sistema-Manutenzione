<h1 align="center"><a target="_blank" href="https://manutenzione.itisviola.it/#/">Sistema Manutenzione</a></h1>
<p align="center">
Software Web per gestire le ispezioni e la manutenzione dei materiali per l'I.I.S. Viola Marchesini
</p>

## Il Progetto

### Autori originali:

|Alex Niccolò Ferrari|Angelo Pavan|Giovanni Marchetto|
|:-:|:-:|:-:|
|![@PaninoCode](https://github.com/PaninoCode.png?size=50)|![@AngeloPavan](https://github.com/AngeloPavan.png?size=50)|![@gmarck04](https://github.com/gmarck04.png?size=50)|
|*[@PaninoCode](https://github.com/PaninoCode)*|*[@AngeloPavan](https://github.com/AngeloPavan)*|*[@gmarck04](https://github.com/gmarck04)*|

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
