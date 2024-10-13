// Declaração de variáveis 
const nomeInp = document.getElementById("nome_input");
const cnpjInp = document.getElementById("cnpj_input");
const telefoneInp = document.getElementById("telefone_input");
const cepInp = document.getElementById("cep_input");
const logradouroInp = document.getElementById("logradouro_input");
const bairroInp = document.getElementById("bairro_input");
const cidadeInp = document.getElementById("cidade_input");
const estadoInp = document.getElementById("estado_input");
const numeroInp = document.getElementById("numero_input");
const complementoInp = document.getElementById("complemento_input");
const btnProx = document.querySelector(".botao-proximo")
btnProx.addEventListener('click', cadastrarEmpresa)

function cadastrarEmpresa() {
    if (nomeInp.value == '' ||
        cnpjInp.value == '' ||
        telefoneInp.value == '' ||
        cepInp.value == '' ||
        logradouroInp.value == '' ||
        bairroInp.value == '' ||
        numeroInp.value == ''
    ) {
        addAlert('Preencha todos os campos antes de prosseguir')
        return;
    }

    if (cnpjInp.value.length != 14) {
        addAlert('CNPJ inválido!')
        return;
    }

    if (telefoneInp.value.length != 11) {
        addAlert('Telefone inválido')
        return;
    }

    if (cepInp.value.length != 8) {
        addAlert('CEP inválido')
        return;
    }


    fetch("/empresas/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nomeServer: nomeInp.value,
            cnpjServer: cnpjInp.value,
            telefoneServer: telefoneInp.value,
            cepServer: cepInp.value,
            logradouroServer: logradouroInp.value,
            bairroServer: bairroInp.value,
            numeroServer: numeroInp.value,
            complementoServer: complementoInp.value

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
                            window.location = '../cadastroResponsavel/index.html'
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
    divAlerta.classList.add('show')
    
    setTimeout( ()=> {
        divAlerta.classList.remove("show")
    }, tempo)
}

const CaracteresPermitidos = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-']

function clearInput() {
    logradouro.value = ''
    cidade.value = ''
    bairro.value = ''
}

cepInp.addEventListener('focusout', async () => {

    let confirmacaoCep = false

    // Verificando o campo CEP

    if (cepInp.value.length >= 8 && cepInp.value.length <= 9) {
        for (let numeroChar = 0; numeroChar < cepInp.value.length; numeroChar++) {
            let caracter = cepInp.value[numeroChar]

            if (CaracteresPermitidos.indexOf(caracter) != -1) {
                confirmacaoCep = true;
            } else {
                addAlert('CEP Inválido!');
                clearInput();
                return;
            }
        }
    } else {
        addAlert('CEP Inválido!');
        clearInput()
    }


    if (confirmacaoCep) {
        const response = await fetch(`https://viacep.com.br/ws/${cepInp.value}/json/`)

        const responseCep = await response.json();

        logradouroInp.value = responseCep.logradouro;
        bairroInp.value = responseCep.bairro;
        estadoInp.value = responseCep.estado;
        cidadeInp.value = responseCep.localidade;
        logradouroInp.setAttribute('disabled', '')
        bairroInp.setAttribute('disabled', '')
        estadoInp.setAttribute('disabled', '')
        cidadeInp.setAttribute('disabled', '')
        // cidade.value = responseCep.localidade;
    }


})