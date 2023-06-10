<?php
header("HTTP/1.0 404 Not Found");
?>

<link rel="stylesheet" href="styles/pages/404.css">

<!-- <div class="container pt-4" style="display: none;">
    <h1 class="text-center">Errore 404</h1>
    <p class="text-center">
        Pagina&nbsp;<code id="hash_location_page"></code>&nbsp;non trovata
    </p>
</div> -->

<div class="container-fluid m-0 p-0 w-100 h-100 interactive-contents">
    <div class="overlay overlay-border-top"></div>
    <div class="overlay overlay-border-right"></div>
    <div class="overlay overlay-border-bottom"></div>
    <div class="overlay overlay-border-left"></div>
    <!-- <div class="alternative-gateway d-flex justify-content-center align-items-center w-100">
        <a href="/#/" class="text-center text-light p-2 mb-2 bg-black rounded-3">torna alla home</a>
    </div> -->
    <div class="crt d-flex flex-column justify-content-start align-items-start p-5 w-100 h-100 fs-6">
        <pre class="text-terminal-green">
        a8      ,a888a,            a8   
      ,d88    ,8P"' `"Y8,        ,d88   
     a8P88   ,8P       Y8,      a8P88   
   ,d8" 88   88         88    ,d8" 88   
  a8P'  88   88         88   a8P'  88   
,d8"    88   88         88 ,d8"    88   
888888888888 88         88 888888888888 
        88   `8b       d8'         88   
        88    `8ba, ,ad8'          88   
        88      "Y888P"            88
            </pre>
        <p class="text-terminal-green text-start" style="max-width: 800px;">

            <span id="terminal_example_command" style="display: none;">
                <br>
                <span class="text-terminal-highlight">guest@Sistema-Manutenzione</span>:<span class="text-terminal-blue">~</span>$
                {{command}}
            </span>

            <!-- <span class="text-danger">
                '<span class="hash-location-page"></span>' non è stato riconosciuto come un comando interno o esterno, un programma eseguibile o un file. Controlla di aver digitato correttamente il nome o prova ad eseguire il comando <span class="fw-bold">help</span> per visualizzare l'elenco dei comandi disponibili.
            </span> -->

            <span id="terminal_output">

            </span>

            <span id="terminal_block_input" class="w-100">
                <br>
                <span class="text-terminal-highlight">guest@Sistema-Manutenzione</span>:<span class="text-terminal-blue">~</span>$
                <input type="text" class="text-terminal-input crt" style="width: 300px;" id="terminal_user_input" value="cd /home" autofocus>
                <span class="blinking-cursor">|</span></span>
            </span>
        </p>
    </div>
</div>