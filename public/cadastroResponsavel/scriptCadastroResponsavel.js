const nomeResponsavelInp = document.getElementById("input_nome")
const emailInp = document.getElementById("input_email")
const telefoneRespInp = document.getElementById("input_telefone")
const cpfInp = document.getElementById("input_cpf")
const cnpjInp = document.getElementById("input_cnpj")
const nomeEmpresaInp = document.getElementById("input_empresa")
const senhaInp = document.getElementById("input_senha")
const confirmarSenhaInp = document.getElementById("input_senhaConfirmada")
const btnCadastrar = document.querySelector(".botao-proximo")
btnCadastrar.addEventListener("click", cadastrarResponsavel)

function cadastrarResponsavel() {
    if (!nomeResponsavelInp.value ||
        !emailInp.value ||
        !telefoneRespInp.value ||
        !cpfInp.value ||
        !senhaInp.value ||
        !confirmarSenhaInp || 
        !nomeEmpresaInp ||
        !cnpjInp
    ) {
        addAlert("Preencha todos os campos antes de prosseguir")
        return
    }

    if (telefoneRespInp.value.length != 11) {
        addAlert("Telefone inválido")
        return
    }

    if (cpfInp.value.length != 11) {
        addAlert("CPF inválido")
        return
    }

    if (!verificarSenha(senhaInp.value)) {
        addAlert("Senha inválida")
        return
    }

    if (senhaInp.value != confirmarSenhaInp.value) {
        addAlert("As senhas não correspondem")
        return
    }

    // cadastra empresa
    fetch("/empresas/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nomeServer: nomeEmpresaInp.value,
            cnpjServer: cnpjInp.value,
        }),
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                console.log('deu certo chefia')

                resposta.json()
                    .then(
                        function (json) {
                            console.log('cadastrou empresa')

                            fetch("/responsavel/cadastrar", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    nomeServer: nomeResponsavelInp.value,
                                    emailServer: emailInp.value,
                                    telefoneServer: telefoneRespInp.value,
                                    cpfServer: cpfInp.value,
                                    senhaServer: senhaInp.value,
                                    idEmpresaServer: json.idEmpresa
                                }),
                            })
                                .then(function (resposta) {
                                    console.log("resposta: ", resposta);
                        
                                    if (resposta.ok) {
                                        console.log('deu certo chefia')
                                        addAlert("Cadastro realizado com sucesso... Redirecionando.")
                                        setTimeout(() => window.location = '../login/login.html', 4000)
                                    } else {
                                        throw "Houve um erro ao tentar realizar o cadastro!";
                                    }
                                })
                                .catch(function (resposta) {
                                    console.log(`#ERRO: ${resposta}`);
                        
                                });
                        }
                    )

            } else {
                throw "Houve um erro ao tentar realizar o cadastro!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);

        });

    
    const idEmpresa = localStorage.getItem("idEmpresa")
    
   

    return false;
}

function addAlert(mensagem, tempo = 4000) {
    const addAlerta = document.getElementById("adicionar-alerta")
    const divAlerta = document.querySelector(".div-alert")

    addAlerta.innerHTML = mensagem
    divAlerta.classList.add('show')

    setTimeout(() => {
        divAlerta.classList.remove("show")
    }, tempo)
}

senhaInp.addEventListener('keyup', (e) => {
    if (e.target.value.length < 1) {
        passwordAlert('close')
    } else {
        passwordAlert('show')
    }

    verificarSenha(e.target.value)
    console.log(verificarSenha(e.target.value))
})

const alertaSenha = document.querySelector("#alerta-senha")

function passwordAlert(action) {
    if (action == 'show') {
        alertaSenha.classList.add("show")
    }

    if (action == 'close') {
        alertaSenha.classList.remove("show")
    }
}

function verificarSenha(string) {
    const alertaMinChar = document.getElementById('alerta-minChar');
    const alertaMaiscula = document.getElementById('alerta-maiuscula');
    const alertaMinuscula = document.getElementById('alerta-minuscula');
    const alertaNumero = document.getElementById('alerta-numero');
    const alertaEspChar = document.getElementById('alerta-espChar');

    const temMinChar = minChar(string)
    const temMais = temMaiuscula(string)
    const temMinus = temMinuscula(string)
    const temNum = temNumero(string)
    const temEsp = temEspecial(string)

    temMinChar ? alertaMinChar.style.color = 'green' : alertaMinChar.style.color = '#bd4b4b'
    temMais ? alertaMaiscula.style.color = 'green' : alertaMaiscula.style.color = '#bd4b4b'
    temMinus ? alertaMinuscula.style.color = 'green' : alertaMinuscula.style.color = '#bd4b4b'
    temNum ? alertaNumero.style.color = 'green' : alertaNumero.style.color = '#bd4b4b'
    temEsp ? alertaEspChar.style.color = 'green' : alertaEspChar.style.color = '#bd4b4b'

    return temMinChar && temMais && temMinus && temNum && temEsp
}

function minChar(string) {
    return string.length >= 6
}

function temMaiuscula(string) {
    const regex = /[A-Z]/
    return regex.test(string)
}

function temMinuscula(string) {
    const regex = /[a-z]/
    return regex.test(string)
}

function temNumero(string) {
    const regex = /[0-9]/
    return regex.test(string)
}

function temEspecial(string) {
    const regex = /[!@#$%^&*(),.?":{}|<>]/
    return regex.test(string)
} 