window.addEventListener('scroll', function() {
    const homeImg = document.querySelector('.home-img');
    const sobrenosImg = document.querySelector('.sobrenos-img img');
    const homeSection = document.querySelector('.home');
    const scrollY = window.scrollY;

    const homeHeight = homeSection.offsetHeight;
    const sobrenosImgRect = sobrenosImg.getBoundingClientRect();
    const scrollRatio = Math.min(scrollY / homeHeight, 1);

    homeImg.style.top = `${50 + (scrollRatio * 130)}%`;
    homeImg.style.left = `${50 + (scrollRatio * 25)}%`;

    homeImg.style.borderRadius = `${50 * (1 - scrollRatio)}%`;
    homeImg.style.width = `${425 + (sobrenosImgRect.width - 500) * scrollRatio}px`;
    homeImg.style.height = `${425 + (sobrenosImgRect.height - 450) * scrollRatio}px`;
    homeImg.style.boxShadow = `4px 4px ${45 * (1 - scrollRatio)}px rgba(99, 86, 238, 0.54)`;
    homeImg.style.background = `linear-gradient(0deg, rgba(99, 86, 238, ${0.5 * (1 - scrollRatio)}), rgba(99, 86, 238, ${0.5 * (1 - scrollRatio)})), url(./assets/imagem-home.png)`;
    homeImg.style.backgroundSize = 'cover';
    homeImg.style.backgroundPosition = 'center center';

    if (scrollY >= (sobrenosImgRect.top + window.scrollY - window.innerHeight / 2)) {
        homeImg.style.opacity = '0';
        homeImg.style.transition = 'opacity 0.5s ease';
        sobrenosImg.style.opacity = '1';
    } else {
        homeImg.style.opacity = '1';
        sobrenosImg.style.opacity = '0';
    }
});

const modos = document.getElementById('modos');
const logo = document.getElementById('logo');
const facebook = document.getElementById('facebook');
const whatsapp = document.getElementById('whatsapp');
const mcDonalds = document.getElementById('mcDonalds');
const spotify = document.getElementById('spotify');
const modo = document.getElementById('modo');
const textoModo = document.querySelector('.texto-modo'); 

modos.addEventListener('click', ()=>{
    // Verifica se o modo escuro já está ativado
    if (modos.classList.contains('escuro')) {
        // Modo claro
        document.documentElement.style.setProperty('--background', '#FFFFFF');
        document.documentElement.style.setProperty('--words', '#000000');
        document.documentElement.style.setProperty('--background-objetivo', '#FFFFFF');
        document.documentElement.style.setProperty('--background-modos', '#C6C6C6');
        document.documentElement.style.setProperty('--background-caixa-modo', '#343434');

        logo.src = './assets/logoPreto.png'
        facebook.src = './assets/facebook.png'
        whatsapp.src = './assets/whatsapp.png'
        mcDonalds.src = './assets/McDonalds.png'
        spotify.src = './assets/spotify.png'
        modo.src = './assets/lua.png'
        textoModo.textContent = 'Modo Escuro'; 

    } else {
        // Modo escuro
        document.documentElement.style.setProperty('--background', '#292929');
        document.documentElement.style.setProperty('--words', '#FFFFFF');
        document.documentElement.style.setProperty('--background-objetivo', 'rgba(85, 85, 85, 0.4)');
        document.documentElement.style.setProperty('--background-modos', '#555555');
        document.documentElement.style.setProperty('--background-caixa-modo', '#FFFFFF');

        logo.src = './assets/logoBranca.png'
        facebook.src = './assets/facebook Modo Escuro.png'
        whatsapp.src = './assets/whatsapp Modo Escuro.png'
        mcDonalds.src = './assets/McDonalds modo escuro.png'
        spotify.src = './assets/spotify Modo Escuro.png'
        modo.src = './assets/sol.png'
        textoModo.textContent = 'Modo Claro'; 
    }

    modos.classList.toggle('escuro')
})