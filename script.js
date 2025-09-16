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

// Função para carregar decks do localStorage
function loadDecks() {
    deckList.innerHTML = '';
    const decks = JSON.parse(localStorage.getItem('decks') || '[]');
    decks.forEach((deck, index) => {
        const li = document.createElement('li');
        li.textContent = deck.name;

        // botão renomear
        const renameBtn = document.createElement('button');
        renameBtn.textContent = 'Renomear';
        renameBtn.style.marginLeft = '10px';
        renameBtn.addEventListener('click', () => renameDeck(index));
        li.appendChild(renameBtn);

        // botão deletar
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Excluir';
        deleteBtn.style.marginLeft = '5px';
        deleteBtn.addEventListener('click', () => deleteDeck(index));
        li.appendChild(deleteBtn);

        deckList.appendChild(li);
    });
}

// Renomear deck
function renameDeck(index) {
    const newName = prompt('Novo nome do baralho:');
    if(newName) {
        const decks = JSON.parse(localStorage.getItem('decks') || '[]');
        decks[index].name = newName;
        localStorage.setItem('decks', JSON.stringify(decks));
        loadDecks();
    }
}

// Deletar deck
function deleteDeck(index) {
    if(confirm('Deseja realmente excluir este deck?')) {
        const decks = JSON.parse(localStorage.getItem('decks') || '[]');
        decks.splice(index, 1);
        localStorage.setItem('decks', JSON.stringify(decks));
        loadDecks();
    }
}

// Salvar deck
saveDeck.addEventListener('click', async () => {
    const name = document.getElementById('deckName').value;
    const files = document.getElementById('deckFiles').files;
    if(!name || files.length === 0) return alert('Preencha nome e selecione imagens');

    const decks = JSON.parse(localStorage.getItem('decks') || '[]');

    // Converter imagens em Base64
    const cards = [];
    for (let file of files) {
        const base64 = await fileToBase64(file);
        cards.push({name: file.name, data: base64});
    }

    decks.push({name, cards});
    localStorage.setItem('decks', JSON.stringify(decks));

    document.getElementById('deckName').value = '';
    document.getElementById('deckFiles').value = '';
    loadDecks();
});

// Função auxiliar para converter arquivo em Base64
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}
