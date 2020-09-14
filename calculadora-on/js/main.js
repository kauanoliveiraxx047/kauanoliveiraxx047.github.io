let calculaTotal = 0;
let armazenado = "0";
let operadorAnterior;
const visor = document.querySelector('.screen');

function iniciar() {
    document.querySelector('.calc-buttons').addEventListener('click', function(evento) {
        // console.log(`Botão Clicado: ${evento.target.innerText}`);
        botaoClicado(evento.target.innerText);
    });
}

function botaoClicado(valor) {
    if(isNaN(parseInt(valor))) {
        manipularSimbolo(valor);
    } else {
        manipularNumero(valor);
    }
    renderizar(); // Escrever na Tela
}

function manipularNumero(valor) {
    if(armazenado === "0") {
        armazenado = valor;
    } else {
        // Concatenar os números que aparecem na tela
        if(visor.innerText.length <= 12)
            armazenado += valor;
    }
}

function manipularSimbolo(valor) {
    switch (valor){
    case "C":
        armazenado = "0"; // String
        calculaTotal = 0; // Valor Numérico
        break;
    case "=":
        if (operadorAnterior === null)
            return
        executarOperacao(parseInt(armazenado));
        operadorAnterior = null;
        armazenado = +calculaTotal;
        calculaTotal = 0;
        break;
    case "←":
        if(armazenado.length === 1) {
            armazenado = "0";
        } else {
            // Removendo um Caractere
            armazenado = armazenado.substring(0, armazenado.length-1)
        }
        break;
    case "÷":
    case "+":
    case "−":
    case "×":
        manipularMatematica(valor);
        break;
    }
}

function manipularMatematica(valor) {
    if(armazenado === '0') {
        // Faz Nada
        return;
    }
    const inteiroArmazenado = parseInt(armazenado);
    if(calculaTotal === 0) {
        calculaTotal = inteiroArmazenado;
    } else {
        executarOperacao(inteiroArmazenado);
    }

    operadorAnterior = valor;
    // Zerar o que está na tela
    armazenado = "0";
}

function executarOperacao(inteiroArmazenado) {
    switch(operadorAnterior) {
        case "÷":
            calculaTotal /= inteiroArmazenado;
            break;
        case "+":
            calculaTotal += inteiroArmazenado;
            break;
        case "−":
            calculaTotal -= inteiroArmazenado;
            break;
        case "×":
            calculaTotal *= inteiroArmazenado;
            break;
    }
}

function renderizar() {
    visor.innerText = armazenado;
}

// Aqui é onde tudo começa!
// Chamada de função iniciar que se encarrega de chamar as outras
iniciar();