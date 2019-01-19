function Card(id, img) {
    this.id = id || -1;
    this.img = img || "";
}

function startGame() {
    suffleDeck();
}

function suffleDeck() {
    cards = document.querySelectorAll('.card');
    for (var card of cards) {
        console.log(card);
    }
}

startGame();
