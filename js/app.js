/* Card class*/
function Card(id, img) {
    this.id = id;
    this.img = img || "";
}
/*************************************/

var cards = document.querySelectorAll('.card');
var moves = document.querySelector('.moves');
var cards_matched = [];
var all_cards = [];

cards.forEach(card => card.addEventListener('click', function(e) {
    openCard(card);
    cards_matched.push(card);
    if (cards_matched.length % 2 == 0) {
        var card1 = cards_matched.slice(-2, -1);
        var card2 = cards_matched.slice(-1);
        card1 = card1[0];
        card2 = card2[0];
        if (cardsMatch(card1, card2)) {
            console.log("bien");
        } else {
            console.log("mal");
        }
    }
}));

function startGame() {
    all_cards = [];
    suffleDeck(all_cards);
    console.log(all_cards);
}

/* Returns an array sorted randomly with all the icons to put
in the <i> classnames*/
function getImages() {
    var images = ["fab fa-apple", "fab fa-android", "fas fa-baby",
                  "fas fa-bug", "fas fa-cannabis", "fas fa-american-sign-language-interpreting",
                  "fab fa-apple", "fab fa-android", "fas fa-baby",
                  "fas fa-bug", "fas fa-cannabis", "fas fa-american-sign-language-interpreting"];
    images.sort(function(){return 0.5 - Math.random();});
    return images;
}

function suffleDeck(all_cards) {
    var i_tag;
    var images = getImages();
    for (var i = 0; i < cards.length; i++) {
        i_tag = cards[i].getElementsByTagName('i')[0];
        i_tag.className = images[i];
        // create card objects
        all_cards.push(new Card(i, images[i]));
    }
}

function openCard(card) {
    card.className = "card open show disabled";
}

function cardsMatch(card1, card2) {
    var id_card1 = parseInt(card1.getAttribute('id'));
    var id_card2 = parseInt(card2.getAttribute('id'));
    return all_cards[id_card1].img === all_cards[id_card2].img;
}

/* Executing*/
startGame();
