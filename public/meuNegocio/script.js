const overlay = document.querySelector(".overlay")
const overlay2 = document.querySelector(".overlay2")
const CloseBtn = document.querySelector("#closeModalBtn")
const insertCollaborators = document.querySelector("#collaborators")
var inputNome = document.getElementById("input_nome");
var inputEmail = document.getElementById("input_email");
var inputCPF = document.getElementById("input_cpf");
var inputSenha = document.getElementById("input_senha");
var selectCargo = document.getElementById("select_cargo");
var btnAdicionar = document.getElementById("btn_adicionar");


// overlay.addEventListener('click', closeModal)
CloseBtn.addEventListener('click', closeModal)
btnAdicionar.addEventListener("click", adicionarFuncionario)

function openModal() {

    overlay.classList.remove("close")
    overlay.classList.add("open")
}

async function openModalConfirm() {

    overlay2.classList.remove("close")
    overlay2.classList.add("open")
}

function closeModalConfirm() {
    overlay2.classList.add("close")
    overlay2.classList.remove("open")

}

function closeModal() {
    overlay.classList.add("close")
    overlay.classList.remove("open")

    inputNome.value = ''
    inputCPF.value = ''
    inputEmail.value = ''
    inputSenha.value = ''
    selectCargo.value = 0
}

async function getFunctionarios() {

    const idEmpresa = sessionStorage.getItem("ID_EMPRESA")

    try {

        const res = await fetch(`/dashboard/funcionarios/${idEmpresa}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })


        if (res.ok) {
            data = await res.json();

            insertCollaborators.innerHTML = ''

            data.forEach(colab => {
                insertCollaborators.innerHTML += `
                <div class="collaborator-card">
                        <div class="collab-picture">
                            <img src="../assets/userImg.png" alt="">
                        </div>
                        <div class="collab-info">
                            <p>Nome: ${colab.nome}</p>
                            <p>Cargo: ${colab.cargo}</p>
                            <p>Email: ${colab.email}</p>
                        </div>
                        <div class="collab-btn">
                            <button class="btn editar">
                                <p>Editar</p>
                            </button>
                            <button data-idfuncionario="${colab.idFuncionario}" class="btn excluir" onclick="definirFuncionarioAserDeleteado(event)">
                                <p>Excluir</p>
                            </button>
                        </div>
                    </div>
                `
            });
        }

    } catch (error) {
        console.log(error)
    }
}

async function adicionarFuncionario () {
    const idEmpresa = sessionStorage.getItem("ID_EMPRESA")

    try {
        const res = await fetch('/dashboard/adicionarfuncionario', {
            method: 'POST',
            headers : {
                "Content-Type": "application/json"
            },
            body : JSON.stringify({
                nome: inputNome.value,
                email: inputEmail.value,
                cpf: inputCPF.value,
                senha: inputSenha.value,
                idEmpresa,
                idCargo: selectCargo.value
            })
        })

        if(res.ok) {
            closeModal()
            getFunctionarios()
        }
    } catch(error) {
        console.error(error)
    }
 }


 function definirFuncionarioAserDeleteado(event) {
    const target = event.target
    const idFuncionario = target.parentNode.dataset.idfuncionario

    sessionStorage.setItem('ID_FUNCIONARIO_DELETAR', idFuncionario)
    openModalConfirm()
 } 

async function deletarFuncionario() {

    const idFuncionario = sessionStorage.getItem('ID_FUNCIONARIO_DELETAR')


    try {
        const res = await fetch(`/dashboard/deletarfuncionario/${idFuncionario}`, {
            method: 'DELETE',
            headers : {
                "Content-Type": "application/json"
            },
        })

        if(res.ok) {
            alert("funcionário delatado com sucesso");
            getFunctionarios();
            closeModalConfirm();
        }


    } catch(error) {
        console.error(error)
    }
 }


function logout() {
    sessionStorage.clear()

    window.location = '../login/login.html'
}


getFunctionarios()

