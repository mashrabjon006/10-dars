const API_URL = "https://api.coingecko.com/api/v3/coins/markets";
let priceChart;

document.addEventListener("DOMContentLoaded", async () => {
  await fetchTopCryptos();
  await setupCurrencyCalculator();
});

async function fetchTopCryptos() {
  const response = await fetch(`${API_URL}?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false`);
  const data = await response.json();
  renderCryptos(data);
}

function renderCryptos(data) {
  const container = document.getElementById("list-container");
  container.innerHTML = "";
  data.forEach((crypto) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <p>${crypto.name} - ${crypto.symbol.toUpperCase()}</p>
      <p>Joriy Narx: $${crypto.current_price}</p>
      <p>O'zgarish: ${crypto.price_change_percentage_24h.toFixed(2)}%</p>
      <p>Market Kapitalizatsiya: $${crypto.market_cap.toLocaleString()}</p>
    `;
    container.appendChild(div);
  });
}

async function setupCurrencyCalculator() {
  const response = await fetch(`${API_URL}?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false`);
  const data = await response.json();
  const cryptoFrom = document.getElementById("crypto-from");
  const cryptoTo = document.getElementById("crypto-to");

  data.forEach((crypto) => {
    const option1 = document.createElement("option");
    option1.value = crypto.id;
    option1.textContent = crypto.name;
    cryptoFrom.appendChild(option1);

    const option2 = document.createElement("option");
    option2.value = crypto.id;
    option2.textContent = crypto.name;
    cryptoTo.appendChild(option2);
  });

  document.getElementById("amount").addEventListener("input", () => calculateExchange(data));
}

function calculateExchange(data) {
  const amount = parseFloat(document.getElementById("amount").value);
  const fromCurrency = document.getElementById("crypto-from").value;
  const toCurrency = document.getElementById("crypto-to").value;

  if (!amount || isNaN(amount)) return;

  const fromCrypto = data.find((crypto) => crypto.id === fromCurrency);
  const toCrypto = data.find((crypto) => crypto.id === toCurrency);

  const result = (amount * fromCrypto.current_price) / toCrypto.current_price;
  document.getElementById("result").textContent = `Natija: $${result.toFixed(2)}`;
}
