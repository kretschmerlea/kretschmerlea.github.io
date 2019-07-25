var gameLoop;
var deck;
var opponent;
var player;
var playedDeck;
var playerTurn;
var decks = {
    PLAYER: 1,
    OPPONENT: 2,
    PLAYED: 3,
    DECK: 4
};
/**
 * Karteninterface
 * @param number
 * @param color
 * @param deck
 * @constructor
 */
function Card(number, color, deck) {
    this.number = number;
    this.color = color;
    this.deck = deck;
    this.setDeck = function (e) {
        this.deck = e;
        return this;
    };
}
/**
 * Karten generieren
 * @param number = let 8
 * @param colors = ['red','green','blue']
 */
function createCards(number, colors) {
    for (var i = 1; i < number + 1; i++)
        for (var j = 0; j < colors.length; j++) {
            var card = new Card(i, colors[j], decks.DECK);
            deck.push(card);
        }
}
/**
 *
 * @param array
 * @returns {*}
 */
function shuffle(array) {
    var _a;
    for (var i = 0; i < array.length; i++) {
        var j = Math.floor(Math.random() * (i + 1));
        _a = [array[j], array[i]], array[i] = _a[0], array[j] = _a[1];
    }
    return array;
}
/**
 * Generiert HTML für eine Karte und fügt onKlick-Events hinzu
 * @param card
 * @returns {*}
 */
function generateCardHTML(card) {
    var visibility = card.deck === decks.PLAYER || card.deck === decks.PLAYED ? 'visible' : 'hidden';
    var div = document.createElement('div');
    div.setAttribute('class', 'card ' + visibility + ' ' + card.color);
    div.setAttribute('data-number', card.number);
    div.setAttribute('data-color', card.color);
    var h1 = document.createElement('h1');
    h1.innerText = card.number;
    div.appendChild(h1);
    if (card.deck === decks.PLAYER) // wenn gespielte Karte aus dem Deck des Spielers ist
        div.addEventListener('click', function () {
            function findCard(cardInPlayer) {
                return cardInPlayer.number === parseInt(div.getAttribute('data-number')) && cardInPlayer.color === div.getAttribute('data-color'); // hole Informationen Nummer und Farbe aus HTML-Element und vergleiche mit Karte
            }
            if (playerTurn)
                playCard(player[player.findIndex(findCard)]); // spiele Karte aus player
        });
    else if (card.deck === decks.DECK)
        div.addEventListener('click', function () {
            if (playerTurn && checkPossibleCards(player).length === 0) // überprüfe ob Karten spielbar sind, wenn nicht kann gezogen werden
                getCard(decks.PLAYER);
        });
    return div;
}
/**
 * Karte ziehen
 * @param who // wer zieht die Karte, Spieler oder Computer
 */
function getCard(who) {
    if (who === decks.PLAYER) {
        player.push(deck.pop().setDeck(decks.PLAYER));
        updateBoard();
        playerTurn = false;
    }
    else if (who === decks.OPPONENT) {
        opponent.push(deck.pop().setDeck(decks.OPPONENT));
        updateBoard();
        playerTurn = true;
    }
}
/**
 * Karte spielen
 * @param card
 */
function playCard(card) {
    var playedCard = playedDeck[playedDeck.length - 1];
    if (playerTurn) { // wenn Spieler dran ist
        if (card.number === playedCard.number || card.color === playedCard.color) { // ist gespielte Karte möglich ?
            playedDeck.push(card.setDeck(decks.PLAYED)); // Karte gespieltem Stapel hinzufügen
            player.splice(player.findIndex(function (c) { return c === card; }), 1); // Karte beim Spieler suchen und entfernen - findIndex: durchläuft player und überprüft ob c (Karte in player) gleich card (gespielte Karte) ist und gibt den index von c in player zurück. danach splice funktion
            updateBoard(); // aktualisieren
            playerTurn = false; // Computer ist dran
        }
    }
    else { // wenn Computer dran ist
        playedDeck.push(card.setDeck(decks.PLAYED)); // Karte gespieltem Stapel hinzufügen
        opponent.splice(opponent.findIndex(function (c) { return c === card; }), 1); // Karte beim Computer suchen und entfernen
        updateBoard();
        playerTurn = true;
    }
}
/**
 * Computer denkt mit und schaut sich die Karten des Spieler an
 * @param possibleCards
 * @returns {Array}
 */
function opponentLogic(possibleCards) {
    var bestPossibleCards = [];
    var isBestPossibleCard = false;
    possibleCards.forEach(function (card) {
        player.forEach(function (playerCard) {
            isBestPossibleCard = !(card.number === playerCard.number) && !(card.color === playerCard.color); // wenn sowohl Farbe als auch Nummer nicht übereinstimmen
        });
        if (isBestPossibleCard)
            bestPossibleCards.push(card);
    });
    return bestPossibleCards;
}
/**
 * Überprüfen welche Karten spielbar sind
 * @param deck
 */
function checkPossibleCards(deck) {
    var possibleCards = [];
    var playedCard = playedDeck[playedDeck.length - 1];
    deck.forEach(function (card) {
        if (card.number === playedCard.number || card.color === playedCard.color) { // Überprüfe welche Karten können gespielt werden (Farbe oder Nummer)
            possibleCards.push(card);
        }
    });
    return possibleCards;
}
/**
 * Spielzug des Computers
 */
function opponentPlay() {
    var possibleCards = checkPossibleCards(opponent);
    if (possibleCards.length === 0) {
        getCard(decks.OPPONENT); // ziehen wenn keine Karte möglich
    }
    else {
        var bestPossibleCards = opponentLogic(possibleCards); // Computer denkt mit
        if (bestPossibleCards.length !== 0)
            possibleCards = bestPossibleCards; // wenn Karten gefunden wurden bei denen der Spieler ziehen muss
        playCard(possibleCards[Math.floor(Math.random() * possibleCards.length)]); // spiele eine random Karte der möglichen Karten
    }
    playerTurn = true; // Spieler ist dran
    updateBoard(); // aktualiseiere Spielbrett
}
/**
 * mischt den gespielten Stapel bis auf die oberste und fügt die Karten dem Ziehstapel hinzu
 */
function getDeck() {
    var cache = []; // Zwischenspeicher für Karten
    for (var i = 0; i < playedDeck.length - 1; i++) {
        cache.push(playedDeck[i].setDeck(decks.DECK)); // Index der Karte ändern und in Zwischenspeicher pushen
    }
    deck.unshift.apply(deck, shuffle(shuffle(cache))); // gemischten Zwischenspeicher an Anfang des Decks pushen(unshift)
    playedDeck = [playedDeck.pop()]; // playedDeck besteht nur noch aus obersten Karte
}
/**
 * Aktualisieren des Spielbretts
 */
function updateBoard() {
    var div;
    // update opponent
    div = document.getElementById("opponent");
    while (div.hasChildNodes()) {
        div.removeChild(div.lastChild);
    }
    opponent.forEach(function (card) {
        div.appendChild(generateCardHTML(card));
    });
    // update player
    div = document.getElementById("player");
    while (div.hasChildNodes()) {
        div.removeChild(div.lastChild);
    }
    player.forEach(function (card) {
        div.appendChild(generateCardHTML(card));
    });
    // update deck
    div = document.getElementById("deck");
    div.removeChild(div.firstChild);
    div.appendChild(generateCardHTML(deck[deck.length - 1]));
    // update playedDeck
    div = document.getElementById("playedDeck");
    div.removeChild(div.firstChild);
    div.appendChild(generateCardHTML(playedDeck[playedDeck.length - 1]));
}
/**
 * Spielzug
 */
function gameplay() {
    // Spiel ist aus wenn eines der beiden Decks leer ist
    if (player.length === 0 || opponent.length === 0) {
        stopGame();
    }
    // wenn Deck leer playedDeck neu mischen
    if (deck.length < 2) {
        getDeck();
    }
    // Computer ist an der Reihe
    if (!playerTurn) {
        opponentPlay();
    }
}
/**
 * beende Game und initialisiere neu
 */
function stopGame() {
    clearInterval(gameLoop); // GameLoop beenden
    alert(player.length === 0 ? 'Du hast gewonnen !' : 'Du hast verloren !'); // anzeigen ob gewonnen oder verloren
    init(); // starte neues Spiel
}
/**
 * initialisiere Spiel
 */
function init() {
    deck = []; // Konstanten leeren
    opponent = [];
    player = [];
    playedDeck = [];
    playerTurn = true;
    // Deck erstellen und mischen
    createCards(8, ['red', 'green', 'blue', 'yellow']); // Karten generieren
    deck = shuffle(shuffle(deck)); // sicherheits halber zweimal mischen :D
    // Karten verteilen
    var i = 0;
    while (i < 5) { // jeder bekommt 5 Karten
        opponent.push(deck.pop().setDeck(decks.OPPONENT)); // Karte aus Deck entfernen, Index ändern und in jeweiliges Deck pushen
        player.push(deck.pop().setDeck(decks.PLAYER));
        i++;
    }
    playedDeck.push(deck.pop().setDeck(decks.PLAYED)); // erste Karte aufdecken (auf Stapel der gespielten Karten)
    updateBoard(); // Spielbrett aktualisieren
    gameLoop = setInterval(gameplay, 1000); // Game Loop - wiederholde Spielzug solange bis player oder opponent leer ist
}
document.addEventListener('DOMContentLoaded', function () {
    init();
});
//# sourceMappingURL=script.js.map