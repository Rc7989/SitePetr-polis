const API_KEY = "c81f4dafe5d2c205fda8c987771b3d5c"; // Substitua pela sua chave
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const DEFAULT_LOCATION = "cascatinha,petrópolis"; // Cidade padrão

const diasDaSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
const meses = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
];

const hoje = new Date();
const diaSemana = diasDaSemana[hoje.getDay()];
const dia = hoje.getDate().toString().padStart(2, "0");
const mes = meses[hoje.getMonth()];

const tradução = {
  "clear sky": "Céu limpo",
  "few clouds": "Poucas nuvens",
  "scattered clouds": "Nuvens dispersas",
  "broken clouds": "Parcialmente nublado",
  "overcast clouds": "Nublado",
  "shower rain": "Chuva rápida",
  "light rain": "Chuva fraca",
  "rain": "Chuva",
  "thunderstorm": "Tempestade",
  "snow": "Neve",
  "mist": "Nublado",
  "moderate rain": "Chuva moderada",
};

// Mapeamento de condições climáticas para caminhos de imagens
const imageMap = {
  "clear sky": "sol.png",
  "few clouds": "nuvem-sol.png",
  "scattered clouds": "nuvem-sol.png",
  "broken clouds": "nuvem-sol.png",
  "overcast clouds": "nublado.png",
  "shower rain": "chuva 2.png",
  "light rain": "chuva 2.png",
  "rain": "imagens/chuva 2.png",
  "thunderstorm": "tempestade.png",
  "snow": "neve.png",
  "mist": "nevoa 2.png",
  "moderate rain": "chuva 2.png",
};

// Função para obter o clima
async function getWeather(location) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: location,
        appid: API_KEY,
        units: "metric",
      },
    });
    const data = response.data;
    const temperaturaArredondada = Math.round(data.main.temp);
    const descricaoEmIngles = data.weather[0].description;
    const descricaoEmPortugues =
      tradução[descricaoEmIngles] || descricaoEmIngles;

    // Obter a imagem correspondente à descrição do clima
    const imageUrl = imageMap[descricaoEmIngles] || "imagens/padrao.png"; // Imagem padrão se não houver correspondência

    const weatherInfoDiv = document.getElementById("top");
    weatherInfoDiv.innerHTML = `
            <p class="temp">${temperaturaArredondada-2}°</p>
            <img class="clima" src="${imageUrl}" alt="${descricaoEmPortugues}">
        `;
    const bottom = document.getElementById("bot");
    bottom.innerHTML = `
        <p class="cidade">Petrópolis - ${diaSemana} ${dia} ${mes} </p>
        <p class="texto-openweather">By OpenWeather</p>
        `;
  } catch (error) {
    console.error("Erro:", error.message);
    const weatherInfoDiv = document.getElementById("top");
    weatherInfoDiv.innerHTML =
      "<p>Erro ao obter dados do clima. Tente novamente mais tarde.</p>";
  }
}

// Chama a função de clima com a cidade padrão ao carregar a página
getWeather(DEFAULT_LOCATION);
