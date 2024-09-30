function cadastrarRepresentante() {
 

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
        return
    }
    // verificação senha igual
    else if (senha != senhaConfirmada) {
        div_paiAlertas.style.display = 'block';
        div_alertasValidacao.innerHTML = "AS SENHAS PRECISAM SER IGUAIS!"
        return
    }
    // verificação email
    else if (email.indexOf("@") == -1 || email.indexOf(".") == -1) {
        div_paiAlertas.style.display = 'block';
        div_alertasValidacao.innerHTML = "DIGITE UM E-MAIL VÁLIDO!"
        return
    }
    // verificação de senha
    else if (senha.length < 8) {
        div_paiAlertas.style.display = 'block';
        div_alertasValidacao.innerHTML = "A SENHA TEM QUE TER NO MINIMO 8 CARACTERES"
        return
    }
    // verificação de CPF
    else if (cpf.length != 11) {
        div_paiAlertas.style.display = 'block';
        div_alertasValidacao.innerHTML = "O CPF NÃO ESTA COMPLETO! ";
        return
    }
    // verificação de caracter especial + letra maiuscula + for
    else if (!senhaValidada) {
        div_paiAlertas.style.display = 'block';
        div_alertasValidacao.innerHTML = "DIGITE UMA SENHA COM CARACTER ESPECIAL E LETRA MAISCULA"
        return
    } else { 
        fetch("/usuarios/cadastrarRepresentante", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nomeServer: nome,
            emailServer: email,
            cpfServer: cpf,
            telefoneServer: telefone,
            senhaServer: senha,
        }),
    })
        .then(function (resposta) {
            if (resposta.ok) {
                alert("Cadastro realizado com sucesso! Redirecionando para o cadastro da empresa...");
                window.location.href = "../cadastroEmpresa.html"; // Redireciona para a próxima tela
            } else {
                resposta.text().then(text => {
                    div_paiAlertas.style.display = 'block';
                    div_alertasValidacao.innerHTML = `Erro ao tentar cadastrar: ${text}`;
                });
            }
        })
        .catch(function (erro) {
            div_paiAlertas.style.display = 'block';
            div_alertasValidacao.innerHTML = `Erro ao conectar: ${erro}`;
        });
}
}