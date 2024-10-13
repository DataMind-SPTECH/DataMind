// Declaração de variáveis 
const nomeInp = document.getElementById("nome_input");
const cnpjInp = document.getElementById("cnpj_input");
const telefoneInp = document.getElementById("telefone_input");
const cepInp = document.getElementById("cep_input");
const logradouroInp = document.getElementById("logradouro_input");
const bairroInp = document.getElementById("bairro_input");
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
        console.log('preencha todos os campos ')
        return;
    }

    if (cnpjInp.value.length != 14) {
        console.log('cnpj inválido')
        return;
    }

    if (telefoneInp.value.length != 11) {
        console.log('telefone inválido');
        return;
    }

    if (cepInp.value.length != 8) {
        console.log("numero inválido");
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

