let decks = { player1: [], player2: [] };
let hands = { player1: [], player2: [] };
let currentPlayer = "player1";
let cardBack = "https://i.imgur.com/Aed52eU.jpeg"; // verso padrão

// Importar imagens da pasta
document.getElementById("deckInput").addEventListener("change", (e) => {
  const files = Array.from(e.target.files);
  decks.player1 = files.map(file => URL.createObjectURL(file));
  alert("Deck carregado! Total de cartas: " + decks.player1.length);
});

// Salvar deck no localStorage
document.getElementById("saveDeckBtn").addEventListener("click", () => {
  localStorage.setItem("deck", JSON.stringify(decks.player1));
  alert("Deck salvo!");
});

// Comprar carta
document.getElementById("drawCardBtn").addEventListener("click", () => {
  if (decks[currentPlayer].length === 0) {
    alert("Sem cartas no deck!");
    return;
  }
  const card = decks[currentPlayer].shift();
  hands[currentPlayer].push({ front: card, flipped: false });
  renderHands();
});

// Passar turno
document.getElementById("endTurnBtn").addEventListener("click", () => {
  currentPlayer = currentPlayer === "player1" ? "player2" : "player1";
  alert("Vez de: " + currentPlayer);
});

// Renderizar mãos
function renderHands() {
  ["player1", "player2"].forEach(player => {
    const handDiv = document.querySelector(`#${player} .hand`);
    handDiv.innerHTML = "";
    hands[player].forEach((card, index) => {
      const div = document.createElement("div");
      div.classList.add("card");
      div.style.backgroundImage = `url(${card.flipped ? cardBack : card.front})`;
      div.onclick = () => {
        hands[player][index].flipped = !hands[player][index].flipped;
        renderHands();
      };
      handDiv.appendChild(div);
    });
  });
}
