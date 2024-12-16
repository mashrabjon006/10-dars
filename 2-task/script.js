const apiKey = "8034f16e"; 

async function searchFilm() {
  const input = document.getElementById("filmInput").value;
  const resultContainer = document.getElementById("resultContainer");
  const loadingIndicator = document.getElementById("loading");

  loadingIndicator.style.display = "block";

  try {
    const response = await fetch(`http://www.omdbapi.com/?t=${input}&apikey=${apiKey}`);
    const data = await response.json();

    if (data.Response === "True") {
      displayResults(data);
    } else {
      resultContainer.innerHTML = `<p>Ma'lumot topilmadi: ${data.Error}</p>`;
    }
  } catch (error) {
    resultContainer.innerHTML = "<p>Xatolik yuz berdi, iltimos keyinroq urinib ko'ring.</p>";
  }

  loadingIndicator.style.display = "none";
}

function displayResults(data) {
  const resultContainer = document.getElementById("resultContainer");
  resultContainer.innerHTML = `
    <div class="movie-card">
      <img src="${data.Poster}" alt="${data.Title} Poster">
      <h2>${data.Title}</h2>
      <p><b>Chiqarilgan yili:</b> ${data.Year}</p>
      <p><b>Janr:</b> ${data.Genre}</p>
      <p><b>Davomiylik:</b> ${data.Runtime}</p>
      <p><b>Reyting:</b> ${data.imdbRating}</p>
      <p><b>Rejissyor:</b> ${data.Director}</p>
      <p><b>Aktyorlar:</b> ${data.Actors}</p>
      <p><b>Syujet:</b> ${data.Plot}</p>
    </div>
  `;
}
