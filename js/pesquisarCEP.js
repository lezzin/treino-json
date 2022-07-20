const cidade = document.querySelector("#cidade");
const estado = document.querySelector("#estado");
const logradouro = document.querySelector("#logradouro");
const mensagem = document.querySelector("#mensagem");
const contador = document.querySelector("#contador");

const form = document.querySelector(".form");
const cepInput = document.querySelector("#cep");
const ddd = document.querySelector("#ddd");

// Função para limpar os dados do formulário
const limparFormulario = () => {
    cidade.value = "";
    estado.value = "";
    logradouro.value = "";
    ddd.value = "";
};


// Função que preenche o formulário com os dados da API
const preencherFormulario = (endereco) => {
    limparFormulario();

    cidade.value = endereco.localidade;
    estado.value = endereco.uf;
    if (endereco.logradouro == "") {
        logradouro.value = "Não encontrado";
    } else {
        logradouro.value = endereco.logradouro;
    }
    ddd.value = endereco.ddd;
};

const pesquisaCep = async () => {
    limparFormulario();

    mensagem.innerHTML = 'Carregando...';

    const cep = cepInput.value;
    const url = `https://viacep.com.br/ws/${cep}/json/`;

    const dados = await fetch(url);
    const endereco = await dados.json();

    if (endereco.hasOwnProperty('error') || endereco.erro == 'true') {
        mensagem.innerHTML = "CEP não encontrado, preencha o input com um CEP válido";
    } else if (dados.status == 200) {
        preencherFormulario(endereco);
        mensagem.innerHTML = "...";
    }
};

cepInput.addEventListener("input", function (e) {
    var numCaracteres = cepInput.value.length;
    contador.innerHTML = `Número de caracteres: ${numCaracteres}`;
    if (numCaracteres != 8) {
        mensagem.innerHTML = "Preencha corretamente este campo (8 números)";
    } else {
        mensagem.innerHTML = "...";
    }
});

form.addEventListener("submit", function (e) {
    e.preventDefault()
    var numCaracteres = cepInput.value.length;
    if (numCaracteres == 8) {
        pesquisaCep()
    }
})