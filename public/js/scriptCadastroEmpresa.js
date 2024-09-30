function cadastrarEmpresa() {
    const nome = nome_input.value
    const cnpj = cnpj_input.value
    const telefone = telefone_input.value
    const cep = cep_input.value
    const logradouro = logradouro_input.value
    const bairro = bairro_input.value
    const numero = numero_input.value
    const numerosBasicos = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

    if (nome.length <= 2) {
        div_paiAlertas.style.display = 'block';
        div_alertasValidacao.innerHTML = "O nome NÃO ESTA COMPLETO!"
        return
    } else if (cnpj.length != 14) {
        div_paiAlertas.style.display = 'block';
        div_alertasValidacao.innerHTML = "O cnpj NÃO ESTA COMPLETO!"
        return
    } else if (telefone.length < 11 || telefone.length > 11) {
        div_paiAlertas.style.display = 'block';
        div_alertasValidacao.innerHTML = "O TELEFONE NÃO ESTA COMPLETO!"
        return
    } else if (cep.length != 8) {
        div_paiAlertas.style.display = 'block';
        div_alertasValidacao.innerHTML = "O cep NÃO ESTA COMPLETO!"
        return
    } else if (logradouro.length < 3 || numerosBasicos.some(numero => logradouro.includes(numero))) {
        div_paiAlertas.style.display = 'block';
        div_alertasValidacao.innerHTML = "O logradouro NÃO ESTA COMPLETO!"
        return
    } else if (bairro.length < 2) {
        div_paiAlertas.style.display = 'block';
        div_alertasValidacao.innerHTML = "O bairro NÃO ESTA COMPLETO!"
        return
    } else if (!/^\d+$/.test(numero)) {
        div_paiAlertas.style.display = 'block';
        div_alertasValidacao.innerHTML = "O numero NÃO ESTA COMPLETO!"
        return
    } else {
        fetch("/usuarios/cadastrarEmpresa", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nomeServer: nome,
                cnpjServer: cnpj,
                telefoneServer: telefone,
                cepServer: cep,
                logradouroServer: logradouro,
                bairroServer: bairro,
                numeroServer: numero
            }),
        })
        .then(function (resposta) {
            console.log("resposta: ", resposta);
            if (resposta.ok) {
                alert("Cadastro realizado com sucesso! Redirecionando à dashboard...");
                window.location.href = "./dashboard/dashboard_inicial.html"; // Redireciona para a próxima tela
            } else {
                resposta.text().then(text => {
                    div_paiAlertas.style.display = 'block';
                    div_alertasValidacao.innerHTML = `Erro ao tentar cadastrar: ${text}`;
                });
            }
        })
        .catch(function (resposta) {
            div_paiAlertas.style.display = 'block';
            console.log(`#ERRO: ${resposta}`);
            div_alertasValidacao.innerHTML = `Erro ao conectar: ${resposta}`;
        });
        return false;
}
}
        
        
//         .catch(function (erro) {
//             div_paiAlertas.style.display = 'block';
//             div_alertasValidacao.innerHTML = `Erro ao conectar: ${erro}`;
//         });

//     }
// }

function closeModal() {
    div_paiAlertas.style.display = 'none';
}