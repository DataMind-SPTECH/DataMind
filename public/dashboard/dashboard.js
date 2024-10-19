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
			"--background-topics",
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
			"--background-topics",
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
	JSC.Chart("feedbacks-chart", {
		debug: true,
		type: "horizontal column solid",
		title_label_text:
			"<span style='font-family: \"Montserrat\"; font-weight: 600;text-align: center;'></span>",
		title_label_style: {
			fontSize: 24,
			color: textoGrafico,
		},
		title_position: "center",
		legend_visible: false,
		box_fill: "none",
		yAxis: {
			defaultTick_label_style: { color: "#C3C3C3" },
			defaultTick: {
				gridLine_color: "#5D5D5D",
				line: { color: "#5D5D5D" },
				gridLine: {
					dashStyle: "Dash",
				},
			},
		},
		xAxis: {
			defaultTick_label_style: { color: textoGrafico },
			defaultTick: {
				rangeMode: "curly",
				line_radius: 10,
				line: { color: "transparent" },
				label_padding: 5,
				label_placement: "outside",
			},
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

	// Avaliações (Em Estrelas)
	JSC.Chart("ratings-chart", {
		debug: true,
		type: "column solid",
		title_label_text:
			"<span style='font-family: 'Montserrat'; font-weight: 600;'>Avaliações (Em Estrelas)</span>",
		title_label_style: {
			fontSize: 20,
			color: textoGrafico,
		},
		title_position: "center",
		legend_visible: false,
		box_fill: "none",
		xAxis: {
			label_color: textoGrafico,
			defaultTick: {
				label_style: {
					color: textoGrafico,
				},
			},
		},
		yAxis: {
			defaultTick_label_style: { color: "transparent" },
			defaultTick: {
				gridLine_color: "#5D5D5D",
				line: { color: "#5D5D5D" },
				gridLine: {
					dashStyle: "Dash",
				},
			},
			alternateGridFill: "none",
		},
		series: [
			{
				points: [
					{
						name: "1",
						y: 200,
						color: "rgba(255, 153, 153, 0.57)",
						outline: { color: "#FF9999", width: 3 },
					},
					{
						name: "2",
						y: 344,
						color: "rgba(255, 204, 153, 0.57)",
						outline: { color: "#FFCC99", width: 3 },
					},
					{
						name: "3",
						y: 112,
						color: "rgba(255, 255, 153, 0.57)",
						outline: { color: "#FFFF99", width: 3 },
					},
					{
						name: "4",
						y: 626,
						color: "rgba(204, 255, 153, 0.57)",
						outline: { color: "#CCFF99", width: 3 },
					},
					{
						name: "5",
						y: 626,
						color: "rgba(153, 255, 153, 0.57)",
						outline: { color: "#99FF99", width: 3 },
					},
				],
			},
		],
	});

	// Índice de Satisfação
	JSC.chart("satisfaction-index", {
		debug: true,
		type: "gauge ",
		legend_visible: false,
		chartArea_boxVisible: false,
		title_label_text:
			"<span style='font-family: 'Montserrat'; font-weight: 600;text-align: center;'>Índice de <br> Satisfação</span>",
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
					text: "720<br/> <span style='fontSize: 24px;'>Bom!</span>",
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
				points: [[1, 720]],
			},
		],
	});

	// Mapa das Lojas
	var capitalNames = [
		"TX 78750",
		"PA 18322",
		"NY 11367",
		"NY 10001",
		"NY 10003",
		"NY 10038",
		"DC 20004",
		"CA 90025",
		"NY 10002",
		"CA 92111",
		"NY 10013",
		"NY 10001-2",
		"CA 94086",
		"FL 32837",
		"UT 84106",
		"DC 20036",
		"CA 90021",
		"FL 33139",
		"CA 92109",
		"NY 12919",
		"CA 90044",
		"CA 90405",
		"FL 32819",
		"TX 78257",
		"IL 60302",
		"TX 78724",
		"CA 91602",
		"NJ 08043",
		"TX 76262",
		"NJ 07104",
		"TX 76177",
		"NV 89119",
		"FL 34746",
		"FL 32730",
		"FL 32819-2",
		"VA 22003",
		"TX 75203",
		"FL 33137",
	];

	var capitalValues = [
		50, 70, 90, 40, 60, 20, 80, 30, 55, 75, 85, 65, 95, 15, 25, 45, 10, 35, 20,
		75, 65, 30, 50, 80, 90, 40, 60, 70, 30, 80, 20, 10, 15, 25, 35, 90, 55, 45,
	];

	JSC.chart("map-chart", {
		debug: true,
		type: "map",
		legend_visible: false,
		toolbar_position: "inside bottom right",
		title_label_text:
			"<span style='font-family: 'Montserrat'; font-weight: 600;'>Mapa das Lojas</span>",
		title_label_style: {
			fontSize: 24,
			color: textoGrafico,
		},
		title_position: "center",
		box_fill: "none",
		mapping: {
			referenceLayers: "./UsCapitals.json",
			base: {
				layers: "us",
			},
		},
		defaultSeries_shape_padding: 0.23,
		palette: {
			pointValue: function (p) {
				return p.options("z");
			},
			invert: true,
			colors: ["#00e700", "#fefe20", "#ffa500", "#ff0000", "#8b0000"],
		},
		series: [
			{
				id: "bubbleSer",
				name: "Capitals",
				type: "marker",
				opacity: 0.9,
				defaultPoint_marker: {
					type: "material/maps/place",
					size: 25,
					offset: "1,-10",
				},
				points: capitalNames.map(function (n, index) {
					var mapId = "UsCapitals." + n;
					return { map: mapId, z: capitalValues[index] };
				}),
			},
		],
	});
}

// Chama o gráfico pela primeira vez ao carregar a página
criarGrafico();
