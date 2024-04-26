const formulario = document.querySelector("[data-formulario]");
const camposDoFormulario = formulario.querySelectorAll("[required]");
const botaoVoltar = document.querySelector('.formcontato__mensagem__botao__voltar');

let boxFormcontatoEsquerda = document.querySelector("#formcontatoEsquerda");
let boxFormcontatoText = document.querySelector("#formcontatoText");
let imagemEnvio = document.querySelector("#formcontatoMensagemEnvio");

formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const listaRespostas = {
        "nome": formulario.querySelector("#nome").value,
        "email": formulario.querySelector("#email").value,
        "assunto": formulario.querySelector("#assunto").value,
        "mensagem": formulario.querySelector("#mensagem").value
    };

    localStorage.setItem("mensagem", JSON.stringify(listaRespostas));

    // Imagem de agradecimento
    boxFormcontatoEsquerda.style.opacity ="1%";
    boxFormcontatoText.style.opacity ="1%";
    imagemEnvio.style.display = "flex"; 
});

camposDoFormulario.forEach((campo) => {
    campo.addEventListener("blur", () => verificaCampo(campo));
    campo.addEventListener("invalid", (evento) => evento.preventDefault());
});

function validarEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

function verificaCampo(campo) {
    let mensagem = "";
    campo.setCustomValidity('');
    if (campo.id === "nome") {
        if (campo.value === "") {
            mensagem = "O campo de nome não pode estar em branco.";
        } else if (campo.value.length < 50) {
            mensagem = "O campo de nome deve ter pelo menos 3 caracteres.";
        }
    } else if (campo.id === "email") {
        if (campo.value === "") {
            mensagem = "O campo de email não pode estar em branco.";
        } else if (!validarEmail(campo.value)) {
            mensagem = "Por favor, insira um email válido.";
        }
    } else if (campo.id === "assunto") {
        if (campo.value === "") {
            mensagem = "O campo de assunto não pode estar em branco.";
        } else if (campo.value.length < 50) {
            mensagem = "O campo de assunto deve ter pelo menos 50 caracteres.";
        }
    } else if (campo.id === "mensagem") {
        if (campo.value === "") {
            mensagem = "O campo de mensagem não pode estar em branco.";
        } else if (campo.value.length < 300) {
            mensagem = "A mensagem deve ter pelo menos 300 caracteres.";
        } 
    }

    const mensagemErro = campo.previousElementSibling;
    const validadorDeInput = campo.checkValidity();

    if (!validadorDeInput) {
        mensagemErro.textContent = mensagem;
        campo.style.border = "2px solid red";
    } else {
        mensagemErro.textContent = "";
        campo.style.border = "";
    }
}

botaoVoltar.addEventListener('click', function(){
    formulario.reset();
    
    boxFormcontatoEsquerda.style.opacity ="100%";
    boxFormcontatoText.style.opacity ="100%";
    imagemEnvio.style.display = "none"; 
});