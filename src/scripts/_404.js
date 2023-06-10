// document.querySelectorAll(".hash-location-page").forEach(function (element) {
//     element.innerHTML = window.location.hash.replace("#", "");
// });

let errorPage = window.location.hash.replace("#", "");

printCommand("cd " + errorPage);
printOutput("'cd /" + errorPage + "' non è stato riconosciuto come un comando interno o esterno, un programma eseguibile o un file. Controlla di aver digitato correttamente il nome e prova ad eseguire il comando <span class='fw-bold'>help</span> per visualizzare l'elenco dei comandi disponibili.", "text-danger");

document.onkeydown = function (e) {
    if (e.key == "enter" || e.key == "Enter" || e.key == 13 || e.key == "13") {
        e.preventDefault();
        runCommand(document.querySelector("#terminal_user_input"));
    }
}

function runCommand(commandElement) {
    let command = commandElement.value;
    let commands = command.split(" ");
    commandElement.value = "";

    printCommand(command);

    switch (commands[0]) {
        case "help":
            printOutput("I comandi disponibili sono: <br><span class='fw-bold'>help</span> visualizza questo messaggio. <br><span class='fw-bold'>ls</span> visualizza listing directory. <br><span class='fw-bold'>cd /[page]</span> spostati nella directory.", "text-light");
            break;
        case "clear":
            document.getElementById("terminal_output").innerHTML = "";
            break;
        case "cd":
            printOutput("Sto per reindirizzarti alla pagina <span class='fw-bold'>" + commands[1] + "</span>.", "text-light");
            window.location.href = '#' + commands[1];
            break;
        case "ls":
            printOutput("Listing directory '/'", "text-light");
            for (let route in routes) {
                printOutput("<br>| " + route, "text-light");
                printOutput("|__ Titolo: " + routes[route].title, "text-light");
            }
            break;
        default:
            printOutput("'" + command + "' non è stato riconosciuto come un comando interno o esterno, un programma eseguibile o un file. Controlla di aver digitato correttamente il nome e prova ad eseguire il comando <span class='fw-bold'>help</span> per visualizzare l'elenco dei comandi disponibili.", "text-danger");      
    }

    //commandElement.scrollIntoView();
    commandElement.focus();
}

function printCommand(command) {
    let commandBlock = document.getElementById("terminal_example_command").innerHTML;
    document.getElementById("terminal_output").innerHTML += commandBlock.replace("{{command}}", command);
}

function printOutput(output, classNames) {
    document.getElementById("terminal_output").innerHTML += "<br><span class='" + classNames + "'>" + output + "</span>";
}