const operacaoPrevia = document.querySelector("#prev-ope")
const operacaoCorrente = document.querySelector("#ope-corrente")
const buttons = document.querySelectorAll("#buttons-container")

class calculadora {
    constructor(operacaoPrevia, operacaoCorrente) {
        this.operacaoPrevia = operacaoPrevia
        this.operacaoCorrente = operacaoCorrente
        this.operacaoCorrente = ""
    }

    // adiciona digitos no visor
    addDigit(digit) {
        // chega se a operação já tem um . 'ponto'
        if (digit === "." && this.operacaoCorrente.innerText.includes(".")) {
            return
        }
        this.operacaoCorrente = digit
        this.upDateScreen()
    }

    // processo geral da calculadora

    processoDaOperacao(operacao) {
        // checar se o valor corrente está vazio
        if (this.operacaoCorrente.innerText === "" && operacao !== "C") {
            // muda a operação

            if (this.operacaoPrevia.innerText !== "") {
                this.mudarOperacao(operacao)
            }
            return
        }
        
        // obetendo valors correntes e prévios
        let valorOperante
        const previa = +this.operacaoPrevia.innerText.split(" ")[0]
        const corrente = +this.operacaoCorrente.innerText

        switch(operacao) {
            case "+":
            valorOperante = previa + corrente
            this.upDateScreen(valorOperante, operacao, corrente, previa)
                break;
            case "-":
            valorOperante = previa + corrente
            this.upDateScreen(valorOperante, operacao, corrente, previa)
                break;
            case "*":
            valorOperante = previa + corrente
            this.upDateScreen(valorOperante, operacao, corrente, previa)
                break;
            case "/":
            valorOperante = previa + corrente
            this.upDateScreen(valorOperante, operacao, corrente, previa)
                break;
            case "DEL":
            valorOperante = previa + corrente
            this.deleter()
                break;
            case "CE":
            valorOperante = previa + corrente
            this.limpezarOperacaoCorrente()
                break;
            case "C":
            valorOperante = previa + corrente
            this.limparTodaOperacao()
                break;
            case "=":
            valorOperante = previa + corrente
            this.operacaoIgual()
                break;
            default:
                return;
        }
    }

    // muda os valores no visor da calculadora
    upDateScreen(
        valorOperante = null,
        operacao = null,
        corrente = null,
        previa = null
        ) {

            console.log(valorOperante, operacao, corrente, previa)
        
        if (valorOperante === null) {
            this.operacaoCorrente.innerText += this.operacaoCorrente
        } else {
            // checa se o valor é zero, se for. adicione valor corrente
            if (previa === 0) {
                valorOperante = corrente
            }

            // adiciona o valor corrente para previa
            this.operacaoPrevia.innerText = `${valorOperante} ${operacao}`
            this.valorOperante.innerText = ""
        }
        
    }

    // mude para operaçoes Math
    mudarOperacao(operacao) {
        const operacaoMath = ["*", "/", "+", "-"]
    
        if (!operacaoMath.includes(operacao)) {
            return
        }
        
        this.operacaoPrevia.innerText = this.operacaoPrevia.innerText.slice(0, -1) + operacao
    }

    // deleta o ultimo digito
    deleter() {
        this.operacaoCorrente.innerText = this.operacaoCorrente.innerText.slice(0, -1)
    }

    //limpa a operação corrente
    limpezarOperacaoCorrente() {
        this.operacaoCorrente.innerText = ""
    }

    // limpa toda a operção
    limparTodaOperacao() {
        this.operacaoCorrente.innerText = ""
        this.operacaoPrevia.innerText = ""
    }

    // processa as operações
    operacaoIgual() {
        const operacao = operacaoPrevia.innerText.split(" ")[1]

        this.processoDaOperacao(operacao)
    }
}


const calcu = new calculadora(operacaoPrevia, operacaoCorrente)

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;
        
        if (+value >= 0 || value === "." ) {
            calcu.addDigit(value)
        } else {
            calcu.processoDaOperacao(value)
        }
    })
})