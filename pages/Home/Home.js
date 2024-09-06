window.addEventListener('scroll', function() {
    const homeImg = document.querySelector('.home-img');
    const sobrenosImg = document.querySelector('.sobrenos-img img');
    const homeSection = document.querySelector('.home');
    const scrollY = window.scrollY;

    const homeHeight = homeSection.offsetHeight;
    const sobrenosImgRect = sobrenosImg.getBoundingClientRect();
    const scrollRatio = Math.min(scrollY / homeHeight, 1);

    // Movimenta a imagem para baixo e para a direita conforme o scroll
    homeImg.style.top = `${50 + (scrollRatio * 130)}%`;
    homeImg.style.left = `${50 + (scrollRatio * 25)}%`;  // Adiciona o movimento para a direita

    // Aplicação das alterações de estilo ao longo do scroll
    homeImg.style.borderRadius = `${50 * (1 - scrollRatio)}%`;
    homeImg.style.width = `${425 + (sobrenosImgRect.width - 500) * scrollRatio}px`;
    homeImg.style.height = `${425 + (sobrenosImgRect.height - 450) * scrollRatio}px`;
    homeImg.style.boxShadow = `4px 4px ${45 * (1 - scrollRatio)}px rgba(99, 86, 238, 0.54)`;
    homeImg.style.background = `linear-gradient(0deg, rgba(99, 86, 238, ${0.5 * (1 - scrollRatio)}), rgba(99, 86, 238, ${0.5 * (1 - scrollRatio)})), url(../../assets/imagem-home.png)`;
    homeImg.style.backgroundSize = 'cover';
    homeImg.style.backgroundPosition = 'center center';

    // Checa se a home-img chegou à posição da sobrenos-img e a esconde
    if (scrollY >= (sobrenosImgRect.top + window.scrollY - window.innerHeight / 2)) {
        homeImg.style.opacity = '0';
        homeImg.style.transition = 'opacity 0.5s ease';
        sobrenosImg.style.opacity = '1';  // Faz a imagem da seção sobre nós aparecer
    } else {
        homeImg.style.opacity = '1';
        sobrenosImg.style.opacity = '0';  // Mantém a imagem da seção sobre nós invisível
    }
});
