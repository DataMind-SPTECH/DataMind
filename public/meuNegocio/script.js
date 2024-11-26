const overlay = document.querySelector(".overlay")
const CloseBtn = document.querySelector("#closeModalBtn")

// overlay.addEventListener('click', closeModal)
CloseBtn.addEventListener('click', closeModal)

function openModal() {

    overlay.classList.remove("close")
    overlay.classList.add("open")
}

function closeModal() {
    overlay.classList.add("close")
    overlay.classList.remove("open")
}


