const botaoEntrar = document.getElementById("entrar");
const inputEmail = document.getElementById("inputEmail");
const inputSenha = document.getElementById("inputSenha");
const alertLogin = document.getElementById("login-alert");
const btnOlhoFechado = document.getElementById("olho-fechado");
const btnOlhoAberto = document.getElementById("olho-aberto");

botaoEntrar.addEventListener("click", autenticar);
btnOlhoAberto.addEventListener("click", mostrarSenha);
btnOlhoFechado.addEventListener("click", esconderSenha);

async function autenticar() {

  const emailVar = inputEmail.value;
  const senhaVar = inputSenha.value;

  if (emailVar == '' || senhaVar == '') {
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
          sessionStorage.ID_EMPRESA = json.idEmpresa;

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

  // setTimeout(function () {
  //   toast.style.display = "flex";
  //   document
  //     .getElementById("toast")
  //     .animate([
  //       { transform: "translateY(0px)" },
  //       { transform: "translateY(-300px)" },
  //     ], {
  //       duration: 5000,
  //       iteration: 1,
  //       easing: "ease-out"
  //     }

  //     );
  // }, 500);

  // setTimeout(function () {
  //   document.getElementById('toast').style.display = 'none';
  // }, 3000);

  // setTimeout(() => (window.location = "../dashboard/dashboard_inicial.html"), 3500);
}

function alertaLogin(mensagem, type) {
  if (type == "erro") {
    alertLogin.innerHTML = mensagem;
    alertLogin.style.color = "red";
  } else if (type == "sucesso") {
    alertLogin.innerHTML = mensagem;
    alertLogin.style.color = "green";
  }
  alertLogin.style.display = "block";
  setTimeout(() => (alertLogin.style.display = "none"), 3500);
}

function esconderSenha() {
  btnOlhoFechado.style.display = "none";
  btnOlhoAberto.style.display = "block";
  inputSenha.setAttribute("type", "password");
}
function mostrarSenha() {
  btnOlhoFechado.style.display = "block";
  btnOlhoAberto.style.display = "none";
  inputSenha.setAttribute("type", "text");
} 
