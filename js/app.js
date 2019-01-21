/* Card class*/
function Card(id, img) {
    this.id = id;
    this.img = img || "";
}
/*************************************/

var deck = document.querySelector('.deck');
var cards = document.querySelectorAll('.card');
var moves = document.querySelector('.moves');
var cards_matched = [];
var all_cards = [];
//game timer
var second = 0, minute = 0;
var timer = document.querySelector(".timer");
var interval;

function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = minute+" mins "+second+" secs";
        second++;
        if(second == 60){
            minute++;
            second = 0;
        }
    },1000);
}

deck.addEventListener('click', e=>{
    var card = e.target;
    if(card.classList.contains('card')){
        checkCard(card);
    }
});

function checkCard(card) {
    openCard(card);
    cards_matched.push(card);
    if (cards_matched.length % 2 == 0) {
        var card1 = cards_matched.slice(-2, -1);
        var card2 = cards_matched.slice(-1);
        card1 = card1[0];
        card2 = card2[0];
        if (cardsMatch(card1, card2)) {
            higlightMatchedCards(card1, card2);
            if (cards_matched.length == all_cards.length) {
                congratulations();
            }
        } else {
            cards_matched.splice(-2, 2);
            higlightUnmatchedCards(card1, card2);
        }
        moveCounter();
    }
}

function moveCounter(){
    var move = parseInt(moves.innerHTML)+1;
    moves.innerHTML = move;
    //start timer on first move
    if(move == 1){
        second = 0;
        minute = 0;
        startTimer();
    }
}

function startGame() {
    restart();
    suffleDeck(all_cards);
}

function restart() {
    all_cards = [];
    cards_matched = [];
    moves.innerHTML = 0;
    for (var card of cards) {
        card.className = 'card';
    }
    // reset timer
    timer.innerHTML = "0 mins 0 secs";
    clearInterval(interval);
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
    card.classList.add("open", "show", "disabled");
}

function higlightMatchedCards(card1, card2) {
    card1.classList.add("match");
    card2.classList.add("match");
    card1.classList.remove("open");
    card2.classList.remove("open");
}

function higlightUnmatchedCards(card1, card2){
    card1.classList.add("unmatched");
    card2.classList.add("unmatched");
    card1.classList.remove("open");
    card2.classList.remove("open");
    disable();
    setTimeout(function(){
        card1.classList.remove("show", "open", "unmatched");
        card2.classList.remove("show", "open", "unmatched");
        enable();
    },750);
}

// disable cards temporarily
function disable(){
    for (var card of cards) {
        card.classList.add('disabled');
    }
}

// enable cards and disable matched cards
function enable(){
    for (var card of cards) {
        card.classList.remove('disabled');
    }
    for (var match of cards_matched) {
        match.classList.add("disabled");
    }
}

function cardsMatch(card1, card2) {
    var id_card1 = parseInt(card1.getAttribute('id'));
    var id_card2 = parseInt(card2.getAttribute('id'));
    return all_cards[id_card1].img === all_cards[id_card2].img;
}

function congratulations(){
    clearInterval(interval);
    var modal = document.getElementById('myModal');
    var span = document.getElementsByClassName("close")[0];
    modal.style.display = "block";
    document.querySelector(".final-timer").innerHTML = timer.innerHTML;
    document.querySelector(".final-moves").innerHTML = parseInt(moves.innerHTML)+1;
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    };
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
}

/* Executing*/
window.onload = startGame();
