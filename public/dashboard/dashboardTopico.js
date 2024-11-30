const modos = document.getElementById("modos");
const logo = document.getElementById("logo");
const icone_relatorio = document.getElementById("icone_relatorio");
const icone_pessoas = document.getElementById("icone_pessoas");
const maleta = document.getElementById("maleta");
const modo = document.getElementById("modo");
const textoModo = document.querySelector(".texto-modo");
const selectCategoria = document.getElementById("select-categoria")
const insertFeedbacks = document.querySelector('.main-comentarios')
const insertPositivos = document.getElementById("qtdPositivos")
const insertNeutros = document.getElementById("qtdNeutros")
const insertNegativos = document.getElementById("qtdNegativos")
const inserirRecomendacoes = document.getElementById("inserir-recomedacoes")
const palavraNegativas = document.getElementById('palavrasNegativas')
const palavraPositivas = document.getElementById('palavrasPositivas')
const palavraNeutras = document.getElementById('palavrasNeutras')

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
function criarGrafico(valor) {

	const indice = valor

	let textoIndice = ''

	if (indice < 500) {
		textoIndice = 'Ruim!'
	} else if (indice < 700) {
		textoIndice = 'Ok.'
	} else if (indice < 850) {
		textoIndice = 'Bom!'
	} else {
		textoIndice = 'Muito Bom!'
	}

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
				{ value: [850, 1000], color: "#21D683" },
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
					text: `${valor.toFixed(0)}<br/> <span style= 'font-family: 'Montserrat'; fontSize: 18px; '>${textoIndice}</span>`,
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
				points: [[1, Number(valor.toFixed(0))]],
			},
		],
	});


}


selectCategoria.addEventListener('change', (e) => {
	sessionStorage.setItem("ID_CATEGORIA_SELECIONADA", e.target.value)
	getFeedbacks()
	getRecomendacoes()
	getPalavrasChave()
})

async function getCategorias() {
	try {

		const res = await fetch(`/dashboard/categorias`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})


		if (res.ok) {
			data = await res.json();

			data.forEach(categoria => {
				selectCategoria.innerHTML += `
				<option value=${categoria.idCategoria}>${categoria.descricao}</	option>
				`
			});

			selectCategoria.value = sessionStorage.getItem('ID_CATEGORIA_SELECIONADA')
		}

	} catch (error) {
		console.log(error)
	}
}

async function getFeedbacks() {
	try {
		const idCategoria = sessionStorage.getItem("ID_CATEGORIA_SELECIONADA")
		const idFilial = sessionStorage.getItem("ID_FILIAL_SELECIONADA")

		const res = await fetch(`/dashboard/feedbacks/${idFilial}/${idCategoria}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})


		if (res.ok) {
			data = await res.json();

			insertFeedbacks.innerHTML = ''


			data.forEach(feedback => {
				insertFeedbacks.innerHTML += `
				<div class="comentario">
                        <div class="comentario-conteudo">
                            <p><strong>Comentário: </strong></p>
                            <p>“${feedback.descricao_feedback}”</p>
                        </div>
                        <div class="comentario-nota">
                            <p><strong>Nota</strong></p>
                            <p class="nota ${feedback.rating == 5 ? 'alta' : feedback.rating > 2 ? 'media' : 'baixa'}">${feedback.rating}/5</p>
                        </div>
                        
                    </div>
				`

			})

			calcularIndicadores(data)
		}

	} catch (error) {
		console.log(error)
	}
}

async function getRecomendacoes() {
	try {
		const idCategoria = sessionStorage.getItem("ID_CATEGORIA_SELECIONADA")
		const idFilial = sessionStorage.getItem("ID_FILIAL_SELECIONADA")

		const res = await fetch(`/dashboard/recomendacoes/${idFilial}/${idCategoria}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})


		if (res.status == 200) {
			const data = await res.json()
				
			inserirRecomendacoes.innerHTML = ''
			data.forEach(recomendacao => {
				inserirRecomendacoes.innerHTML += `
				<li>${recomendacao.recomendacao}</li>
				`
			})
		} else if (res.status == 204) {
			inserirRecomendacoes.innerHTML = ''
			inserirRecomendacoes.innerHTML = `
			<li>Ainda não há recomedações para está categoria.</li>
			`
			
		}

	} catch (error) {
		console.log(error)
	}
}

async function getPalavrasChave() {
	try {
		const idCategoria = sessionStorage.getItem("ID_CATEGORIA_SELECIONADA")

		const res = await fetch(`/dashboard/palavras/${idCategoria}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})


		if (res.ok) {
			const data = await res.json()
			
			console.log(data)

			data.forEach(element => {
				if(element.qualidade == 'Positiva') {
					palavraPositivas.innerHTML = element.palavras
				}
				if(element.qualidade == 'Negativa') {
					palavraNegativas.innerHTML = element.palavras
				}
				if(element.qualidade == 'Neutra') {
					palavraNeutras.innerHTML = element.palavras
				}
			})
		}

	} catch (error) {
		console.log(error)
	}
}

function calcularIndicadores (feedbacks) {
	let qtdFeedbacks = 0;
	let totalRating = 0;

	let qtdPositivos = 0;
	let qtdNegativos = 0;
	let qtdNeutros = 0;


	feedbacks.forEach(feedback => {
		qtdFeedbacks++;
		totalRating += feedback.rating;
		
		if(feedback.rating == 1 || feedback.rating == 2) {
			qtdNegativos ++
		} else if (feedback.rating == 3 || feedback.rating == 4 ) {
			qtdNeutros ++
		} else {
			qtdPositivos ++ 
		}
		
	})

	insertPositivos.innerHTML = qtdPositivos;	
	insertNegativos.innerHTML = qtdNegativos;
	insertNeutros.innerHTML = qtdNeutros;

	let indice = ((totalRating / qtdFeedbacks) * 2) * 100;


	criarGrafico(indice)
}

getCategorias();
getFeedbacks();
getRecomendacoes();
getPalavrasChave();