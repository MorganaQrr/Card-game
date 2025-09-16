document.getElementById('startGame').addEventListener('click', () => {
    alert("Iniciar Jogo! Aqui você colocará a lógica de criação de partida.");
});

document.getElementById('joinGame').addEventListener('click', () => {
    alert("Entrar em Partida! Aqui você colocará a lógica de entrar em partidas existentes.");
});

document.getElementById('settings').addEventListener('click', () => {
    alert("Configurações! Aqui você poderá alterar opções do jogo.");
});

const baralhosBtn = document.getElementById('baralhosBtn');
const baralhosModal = document.getElementById('baralhosModal');
const closeModal = document.getElementById('closeModal');
const saveDeck = document.getElementById('saveDeck');
const deckList = document.getElementById('deckList');

baralhosBtn.addEventListener('click', () => {
    baralhosModal.style.display = 'flex';
    loadDecks();
});

closeModal.addEventListener('click', () => {
    baralhosModal.style.display = 'none';
});

function loadDecks() {
    deckList.innerHTML = '';
    const decks = JSON.parse(localStorage.getItem('decks') || '[]');
    decks.forEach((deck, index) => {
        const li = document.createElement('li');
        li.textContent = deck.name;
        // botão de renomear
        const renameBtn = document.createElement('button');
        renameBtn.textContent = 'Renomear';
        renameBtn.style.marginLeft = '10px';
        renameBtn.addEventListener('click', () => renameDeck(index));
        li.appendChild(renameBtn);
        deckList.appendChild(li);
    });
}

function renameDeck(index) {
    const newName = prompt('Novo nome do baralho:');
    if(newName) {
        const decks = JSON.parse(localStorage.getItem('decks') || '[]');
        decks[index].name = newName;
        localStorage.setItem('decks', JSON.stringify(decks));
        loadDecks();
    }
}

saveDeck.addEventListener('click', () => {
    const name = document.getElementById('deckName').value;
    const files = document.getElementById('deckFiles').files;
    if(!name || files.length === 0) return alert('Preencha nome e selecione a pasta');

    const paths = Array.from(files).map(f => f.name); // apenas nomes, não caminhos completos
    const decks = JSON.parse(localStorage.getItem('decks') || '[]');
    decks.push({name, cards: paths});
    localStorage.setItem('decks', JSON.stringify(decks));
    document.getElementById('deckName').value = '';
    document.getElementById('deckFiles').value = '';
    loadDecks();
});

