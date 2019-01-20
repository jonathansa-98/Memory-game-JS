function Card(id, img) {
    this.id = id || -1;
    this.img = img || "";
}

function startGame() {
    suffleDeck();
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

function suffleDeck() {
    var cards = document.querySelectorAll('.card');
    var img;
    var images = getImages();
    for (var i = 0; i < cards.length; i++) {
        img = cards[i].getElementsByTagName('i')[0];
        img.className = images[i];
    }
}

/* Executing*/
startGame();
