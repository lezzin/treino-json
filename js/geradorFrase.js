const btnAdicionarFrase = document.querySelector(".btn-gera");
const btnDeletarFrases = document.querySelector(".btn-deleta");
const listaFrases = document.querySelector("#lista");
const mensagemSpan = document.querySelector("#mensagem2");
var dadosLocalStorage = JSON.parse(localStorage.getItem('lista_de_frases')) || [];

const salvarStorage = () => {
    localStorage.setItem('lista_de_frases', JSON.stringify(dadosLocalStorage));
};

const deletarFrases = () => {
    dadosLocalStorage.splice(0, dadosLocalStorage.length);
    atualizarStorage(); salvarStorage();
};

const atualizarStorage = () => {
    listaFrases.innerHTML = '';
    for (dado of dadosLocalStorage) {
        var textoFrase = document.createTextNode(dado);
        let span = document.createElement("span");
        span.appendChild(textoFrase);
        listaFrases.appendChild(span);
    };
};

const adicionarMensagem = (frase) => {
    var textoFrase = frase.slip.advice;

    dadosLocalStorage.push(textoFrase);
    atualizarStorage(); salvarStorage();
};

const gerarFrase = async () => {
    const idMensagem = (Math.floor(Math.random() * 224 + 1));
    const url = `https://api.adviceslip.com/advice/${idMensagem}`;
    const dadosMensagem = await fetch(url);
    mensagemSpan.innerHTML = 'Carregando'
    const frase = await dadosMensagem.json();
    adicionarMensagem(frase);

    window.scrollTo(0, document.body.scrollHeight);
    mensagemSpan.innerHTML = ''
};

window.addEventListener('load', atualizarStorage());;

btnAdicionarFrase.addEventListener("click", gerarFrase);

btnDeletarFrases.addEventListener("click", function () {
    var confirmarDeleção = confirm("Você tem certeza?");
    if (confirmarDeleção) { deletarFrases(); }
});
