const nomeResponsavelInp = document.getElementById("input_nome")
const emailInp = document.getElementById("input_email")
const telefoneRespInp = document.getElementById("input_telefone")
const cpfInp = document.getElementById("input_cpf")
const senhaInp = document.getElementById("input_senha")
const confirmarSenhaInp = document.getElementById("input_senhaConfirmada")
const btnCadastrar = document.querySelector(".botao-proximo")
btnCadastrar.addEventListener("click", cadastrarResponsavel)

function cadastrarResponsavel () { 
    const idEmpresa = localStorage.getItem("idEmpresa")

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
            idEmpresaServer: idEmpresa
        }),
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                console.log('deu certo chefia')

                resposta.json()
                    .then(
                        function (json) {
                            localStorage.setItem('idEmpresa', json.idEmpresa)
                        }
                    )

            } else {
                throw "Houve um erro ao tentar realizar o cadastro!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);

        });

    return false;
}

function addAlert(mensagem, tempo = 4000) {
    const addAlerta = document.getElementById("adicionar-alerta")
    const divAlerta = document.querySelector(".div-alert")

    addAlerta.innerHTML = mensagem
    divAlerta.style.display = 'block'
    
    setTimeout( ()=> {
        divAlerta.style.display = 'none'
    }, tempo)
}
