let decks = { player1: [], player2: [] };
let hands = { player1: [], player2: [] };
let currentPlayer = "player1";
let cardBack = "assets/card-back.jpg"; // verso padrão

// Menu inicial
document.getElementById("startBtn").addEventListener("click", () => {
  document.getElementById("menu").classList.add("hidden");
  document.getElementById("deck-builder").classList.remove("hidden");
  document.getElementById("game").classList.remove("hidden");
});

// Entrar em link de desafio
document.getElementById("joinBtn").addEventListener("click", () => {
  const link = document.getElementById("challengeLink").value;
  alert("Funcionalidade de desafio ainda precisa ser implementada. Link: " + link);
});

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
      // O adversário só vê o verso das cartas
      const isOwner = (player === currentPlayer);
      div.style.backgroundImage = `url(${isOwner ? card.front : cardBack})`;
      div.onclick = () => {
        if (isOwner) {
          hands[player][index].flipped = !hands[player][index].flipped;
          renderHands();
        }
      };
      handDiv.appendChild(div);
    });
  });
}
