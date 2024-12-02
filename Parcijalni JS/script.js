"use strict";
const searchInput = document.getElementById("search");
const resultsBody = document.getElementById("results-body");
const loader = document.querySelector(".loader");
const messageDiv = document.querySelector(".message");

searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim();

  if (query === "") {
    clearResults();
    displayMessage("Please enter your search :)");
    return;
  }

  fetchResults(query);
});

function fetchResults(query) {
  clearResults();
  showLoader(true);
  messageDiv.textContent = "";

  fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song&limit=10`)
    .then((response) => response.json())
    .then((data) => {
      showLoader(false);
      if (data.resultCount > 0) {
        putResults(data.results);
      } else {
        displayMessage("No results found. Try a different search term.");
      }
    })
    .catch(() => {
      showLoader(false);
      displayMessage("An error occurred while fetching data. Please try again later.");
    });
}

function putResults(songs) {
  songs.forEach((song) => {
    const row = document.createElement("tr");
    const nameCell = document.createElement("td");
    const artistCell = document.createElement("td");

    nameCell.textContent = song.trackName;
    artistCell.textContent = song.artistName;

    row.appendChild(nameCell);
    row.appendChild(artistCell);
    resultsBody.appendChild(row);
  });
}

function clearResults() {
  resultsBody.innerHTML = "";
}

function displayMessage(message) {
  messageDiv.textContent = message;
}

function showLoader(show) {
  loader.style.display = show ? "block" : "none";
}
