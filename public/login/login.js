const botaoEntrar = document.getElementById('entrar');
const inputEmail = document.getElementById('inputEmail');
const inputSenha = document.getElementById('inputSenha');
const alertLogin = document.getElementById("login-alert");
const btnOlhoFechado = document.getElementById("olho-fechado")
const btnOlhoAberto = document.getElementById("olho-aberto")


botaoEntrar.addEventListener("click", autenticar);
btnOlhoAberto.addEventListener("click", mostrarSenha)
btnOlhoFechado.addEventListener("click", esconderSenha)

async function autenticar() {
    const emailVar = inputEmail.value;
    const senhaVar = inputSenha.value;

    if(emailVar == '' || senhaVar == '') {
        alertaLogin("Preencha todos os campos antes de prosseguir.", 'erro')
        return;
    } 

    fetch("/usuarios/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailServer: emailVar,
            senhaServer: senhaVar
        })
    })
    .then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!");

        if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));
                sessionStorage.EMAIL_USUARIO = json.email;
                sessionStorage.NOME_USUARIO = json.nome;
                sessionStorage.ID_USUARIO = json.id;

                alertaLogin("Autenticado com sucesso.. Redirecionando", 'sucesso')
                setTimeout(function () {
                    console.log('autenticou')
                    window.location = "../dashboard/dashboard_inicial.html";
                }, 3000); 

            });
        } else {
            alertaLogin("Email ou senha incorretos!", 'erro')

        }
    })
}

function alertaLogin(mensagem, type) {
    if(type == 'erro' ) {
        alertLogin.innerHTML = mensagem
        alertLogin.style.color = 'red'
    } else if (type == 'sucesso') {
        alertLogin.innerHTML = mensagem
        alertLogin.style.color = 'green'
    }
    alertLogin.style.display = 'block'
    setTimeout(() => alertLogin.style.display = 'none', 3500 )
}

function esconderSenha () {
    btnOlhoFechado.style.display = 'none'
    btnOlhoAberto.style.display = 'block'
    inputSenha.setAttribute('type', 'password')
}
function mostrarSenha () {
    btnOlhoFechado.style.display = 'block'
    btnOlhoAberto.style.display = 'none'
    inputSenha.setAttribute('type', 'text')
}