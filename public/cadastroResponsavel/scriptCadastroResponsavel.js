function cadastrar() {


    const nome = input_nome.value
    const senha = input_senha.value
    const telefone = input_telefone.value
    const cpf = input_cpf.value
    const email = input_email.value
    const senhaConfirmada = input_senhaConfirmada.value
    let verificarLetraMaiuscula = false
    let verificarCaracterEspecial = false
    let caracteresEspeciais = ["!", ".", "@", "#", "$", "%", "^", "&", "*", "()", ",", "?", "/", ":", "{}", "|", "<", ">",]
    let letrasMaiusculas = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
    let senhaValidada = false

    for (let validacaoSenha = 0; validacaoSenha < senha.length; validacaoSenha++) {
        let char = senha[validacaoSenha]
        if (caracteresEspeciais.indexOf(char) != -1) {
            verificarCaracterEspecial = true;
        }
        if (letrasMaiusculas.indexOf(char) != -1) {
            verificarLetraMaiuscula = true;
        }
    }
    if (verificarCaracterEspecial && verificarLetraMaiuscula) {
        senhaValidada = true
    }


    // verificação de campos
    if (nome == "" ||
        email == "" ||
        telefone == "" ||
        cpf == "" ||
        senha == "" ||
        senhaConfirmada == ""
        ) {
        div_paiAlertas.style.display = 'block';
        div_alertasValidacao.innerHTML = `PREENCHA TODOS OS CAMPOS!`

    }
    // verificação telefone
    else if (telefone.length < 11 || telefone.length > 11) {
        div_paiAlertas.style.display = 'block';
        div_alertasValidacao.innerHTML = "O TELEFONE NÃO ESTA COMPLETO!"
    }
    // verificação senha igual
    else if (senha != senhaConfirmada) {
        div_paiAlertas.style.display = 'block';
        div_alertasValidacao.innerHTML = "AS SENHAS PRECISAM SER IGUAIS!"
    }
    // verificação email
    else if (email.indexOf("@") == -1 || email.indexOf(".") == -1) {
        div_paiAlertas.style.display = 'block';
        div_alertasValidacao.innerHTML = "DIGITE UM E-MAIL VÁLIDO!"
    }
    // verificação de senha
    else if (senha.length < 8) {
        div_paiAlertas.style.display = 'block';
        div_alertasValidacao.innerHTML = "A SENHA TEM QUE TER NO MINIMO 8 CARACTERES"
    }
    // verificação de CPF
    else if (cpf.length != 14) {
        div_paiAlertas.style.display = 'block';
        div_alertasValidacao.innerHTML = "O CPF NÃO ESTA COMPLETO! ";
    }
    // verificação de caracter especial + letra maiuscula + for
    else if (!senhaValidada) {
        div_paiAlertas.style.display = 'block';
        div_alertasValidacao.innerHTML = "DIGITE UMA SENHA COM CARACTER ESPECIAL E LETRA MAISCULA"
    } else {
        fetch("/usuarios/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                // crie um atributo que recebe o valor recuperado aqui
                // Agora vá para o arquivo routes/usuario.js
                nomeServer: nome,
                emailServer: email,
                senhaServer: senha,
                cpfServer: cpf,
                telefoneServer: telefone
                // empresaServer: token

            }),
        })
            .then(function (resposta) {
                console.log("resposta: ", resposta);

                if (resposta.ok) {
                    div_paiAlertas.style.display = 'block';
                    div_alertasValidacao.innerHTML =
                        "Cadastro realizado! Redirecionando o Login...";

                    setTimeout(() => {
                        window.location = "login.html";
                    }, "2000");

                    limparFormulario();

                } else {
                    throw "Houve um erro ao tentar realizar o cadastro!";
                }
            })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);

            });

        return false;
    }
}

function sumirMensagem() {
    div_alertasValidacao.style.display = "none";
}