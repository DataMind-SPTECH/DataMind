const modos = document.getElementById('modos');
const logo = document.getElementById('logo');
const icone_relatorio = document.getElementById('icone_relatorio');
const icone_pessoas = document.getElementById('icone_pessoas');
const maleta = document.getElementById('maleta');
const modo = document.getElementById('modo');
const textoModo = document.querySelector('.texto-modo'); 
let textoGrafico = '#FFFFFF';

modos.addEventListener('click', ()=>{
    // Verifica se o modo escuro já está ativado
    if (modos.classList.contains('escuro')) {
        // Modo Escuro
        document.documentElement.style.setProperty('--background', '#171616');
        document.documentElement.style.setProperty('--words', '#FFFFFF');
        document.documentElement.style.setProperty('--background_footer_lateral', '#292929');
        document.documentElement.style.setProperty('--background-modos', '#555555');
        document.documentElement.style.setProperty('--background-caixa-modo', '#FFFFFF');

        logo.src = '../assets/logo_claro.png'
        // icone_dashboard.src = '../assets/dashboard_branco.png'
        icone_relatorio.src = '../assets/icon_relatorio.png'
        icone_pessoas.src = '../assets/icon_pessoas.png'
        maleta.src = '../assets/maleta.png'
        modo.src = '../assets/sol.png'
        textoModo.textContent = 'Modo Claro'; 
        textoGrafico = '#FFFFFF';
        

    } else {
        // Modo claro
        document.documentElement.style.setProperty('--background', '#FFFFFF');
        document.documentElement.style.setProperty('--words', '#666666');
        document.documentElement.style.setProperty('--background_footer_lateral', '#F4F4F4');
        document.documentElement.style.setProperty('--background-modos', '#C6C6C6');
        document.documentElement.style.setProperty('--background-caixa-modo', '#343434');

        logo.src = '../assets/logo_escuro.png'
        // icone_dashboard.src = '../assets/dashboard_preto.png'
        icone_relatorio.src = '../assets/icon _relatorio_preta.png'
        icone_pessoas.src = '../assets/icon _pessoas_preta.png'
        maleta.src = '../assets/maleta_preta.png'
        modo.src = '../assets/lua.png'
        textoModo.textContent = 'Modo Escuro'; 
        textoGrafico = '#666666';
        
    }

    modos.classList.toggle('escuro');
    criarGrafico();
})

// Função para criar o gráfico com base no valor atual de textoGrafico
function criarGrafico() {
    JSC.Chart("feedbacks-chart", {
        debug: true,
        type: "horizontal column solid",
        title_label_text: "<span class='texto-grafico' style='font-family: 'Montserrat'; font-weight: 600;'>Feedbacks de Janeiro</span>",
        title_label_style: {
            fontSize: 24,
            color: textoGrafico
        },
        title_position: "center",
        legend_visible: false,
        box_fill: 'none',
        yAxis: {
            defaultTick_label_style: { color: "#C3C3C3" },
        },

        series: [
            {
                points: [
                    {
                        name: "Positivo",
                        y: 200,
                        color: "rgba(153, 255, 153, 0.57)",
                        outline: { color: "#99FF99", width: 3 },
                    },
                    {
                        name: "Neutro",
                        y: 344,
                        color: "rgba(255, 255, 153, 0.57)",
                        outline: { color: "#FFFF99", width: 3 },
                    },
                    {
                        name: "Negativo",
                        y: 112,
                        color: "rgba(255, 153, 153, 0.57)",
                        outline: { color: "#FF9999", width: 3 },
                    },
                ],
            },
        ],
    });
}

// Chama o gráfico pela primeira vez ao carregar a página
criarGrafico();
