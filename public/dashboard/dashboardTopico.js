const modos = document.getElementById("modos");
const logo = document.getElementById("logo");
const icone_relatorio = document.getElementById("icone_relatorio");
const icone_pessoas = document.getElementById("icone_pessoas");
const maleta = document.getElementById("maleta");
const modo = document.getElementById("modo");
const textoModo = document.querySelector(".texto-modo");
let textoGrafico = "#FFFFFF";
let textoBolinha = "#2D2D2D";

modos.addEventListener("click", () => {
	// Verifica se o modo escuro já está ativado
	if (modos.classList.contains("escuro")) {
		// Modo Escuro
		document.documentElement.style.setProperty("--background", "#171616");
		document.documentElement.style.setProperty("--words", "#FFFFFF");
		document.documentElement.style.setProperty(
			"--background_footer_lateral",
			"#292929"
		);
		document.documentElement.style.setProperty("--background-modos", "#555555");
		document.documentElement.style.setProperty(
			"--background-caixa-modo",
			"#FFFFFF"
		);
		document.documentElement.style.setProperty(
			"--background-comentario",
			"#4C4C4C"
		);

		logo.src = "../assets/logo_claro.png";
		// icone_dashboard.src = '../assets/dashboard_branco.png'
		icone_relatorio.src = "../assets/icon_relatorio.png";
		icone_pessoas.src = "../assets/icon_pessoas.png";
		maleta.src = "../assets/maleta.png";
		modo.src = "../assets/sol.png";
		textoModo.textContent = "Modo Claro";
		textoGrafico = "#FFFFFF";
		textoBolinha = "#2D2D2D";
	} else {
		// Modo claro
		document.documentElement.style.setProperty("--background", "#FFFFFF");
		document.documentElement.style.setProperty("--words", "#666666");
		document.documentElement.style.setProperty(
			"--background_footer_lateral",
			"#F4F4F4"
		);
		document.documentElement.style.setProperty("--background-modos", "#C6C6C6");
		document.documentElement.style.setProperty(
			"--background-caixa-modo",
			"#343434"
		);
		document.documentElement.style.setProperty(
			"--background-comentario",
			"#E3E3E3"
		);

		logo.src = "../assets/logo_escuro.png";
		// icone_dashboard.src = '../assets/dashboard_preto.png'
		icone_relatorio.src = "../assets/icon _relatorio_preta.png";
		icone_pessoas.src = "../assets/icon _pessoas_preta.png";
		maleta.src = "../assets/maleta_preta.png";
		modo.src = "../assets/lua.png";
		textoModo.textContent = "Modo Escuro";
		textoGrafico = "#666666";
		textoBolinha = "#F4F4F4";
	}

	modos.classList.toggle("escuro");
	criarGrafico();
});

// Função para criar o gráfico com base no valor atual de textoGrafico
function criarGrafico() {
	
	// Índice de Satisfação
	// JS 
	JSC.chart("satisfaction-index", {
		debug: true,
		type: "gauge ",
		legend_visible: false,
		chartArea_boxVisible: false,
		title_label_text:
			"<span style='font-family: 'Montserrat'; font-weight: 600;text-align: center;'></span>",
		title_label_style: {
			fontSize: 20,
			color: textoGrafico,
		},
		title_position: "center",
		box_fill: "none",
		xAxis: {
			scale: { range: [0, 1], invert: true },
		},
		palette: {
			pointValue: "%yValue",
			ranges: [
				{ value: 0, color: "#FF5353" },
				{ value: 500, color: "#FFD221" },
				{ value: 700, color: "#77E6B4" },
				{ value: [900, 1000], color: "#21D683" },
			],
		},
		yAxis: {
			defaultTick: { padding: 0, enabled: false },
			customTicks: [500, 700, 900],
			defaultTick_label_visible: false,
			line: {
				width: 5,
				breaks_gap: 0.03,
				color: "smartPalette",
			},
			scale: { range: [0, 1000] },
		},
		defaultSeries: {
			opacity: 1,
			shape: {
				label: {
					align: "center",
					verticalAlign: "middle",
				},
			},
		},
		series: [
			{
				type: "marker",
				name: "Score",
				shape_label: {
					text: "560<br/> <span style= 'font-family: 'Montserrat'; fontSize: 18px; '>Regular!</span>",
					style: { fontSize: 24, color: textoGrafico },
				},
				defaultPoint: {
					tooltip: "%yValue",
					marker: {
						outline: {
							width: 7,
							color: "currentColor",
						},
						fill: textoBolinha,
						type: "circle",
						visible: true,
						size: 15,
					},
				},
				points: [[1, 560]],
			},
		],
	});


}

// Chama o gráfico pela primeira vez ao carregar a página
criarGrafico();
