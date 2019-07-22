let gameLoop;
let deck;
let opponent;
let player;
let playedDeck;
let playerTurn;
let decks = {                                                                                                           // Enum: bildet Strings auf Integers ab -> zur Vereinfachung um welchees Deck es sich handelt
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
    }
}
 
/**
 * Karten generieren
 * @param number = let 8
 * @param colors = ['red','green','blue']
 */
function createCards(number, colors) {
    for (let i = 1; i < number + 1; i++)
        for (let j = 0; j < colors.length; j++) {
            let card = new Card(i, colors[j], decks.DECK);
            deck.push(card);
        }
}
 
/**
 *
 * @param array
 * @returns {*}
 */
function shuffle(array) {
    for (let i = 0; i < array.length; i++) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
 
/**
 * Generiert HTML für eine Karte und fügt onKlick-Events hinzu
 * @param card
 * @returns {*}
 */
function generateCardHTML(card) {
    let visibility = card.deck === decks.PLAYER || card.deck === decks.PLAYED ? 'visible' : 'hidden';
    let div = document.createElement('div');
    div.setAttribute('class', 'card ' + visibility + ' ' + card.color);
    div.setAttribute('data-number', card.number);
    div.setAttribute('data-color', card.color);
    let h1 = document.createElement('h1');
    h1.innerText = card.number;
    div.appendChild(h1);
 
    if (card.deck === decks.PLAYER)                                                                                     // wenn gespielte Karte aus dem Deck des Spielers ist
        div.addEventListener('click', function () {                                                                                      // onClick-Event
            function findCard(cardInPlayer) {                                                                           // Hilfsfunktion um die geklickte Karte beim Spieler zu finden
                return cardInPlayer.number === parseInt(div.getAttribute('data-number')) && cardInPlayer.color === div.getAttribute('data-color'); // hole Informationen Nummer und Farbe aus HTML-Element und vergleiche mit Karte
            }
 
            if (playerTurn)
                playCard(player[player.findIndex(findCard)]);                                                           // spiele Karte aus player
        });
    else if (card.deck === decks.DECK)
        div.addEventListener('click', function () {
            if (playerTurn && checkPossibleCards(player).length === 0)                                                  // überprüfe ob Karten spielbar sind, wenn nicht kann gezogen werden
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
    } else if (who === decks.OPPONENT) {
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
    let playedCard = playedDeck[playedDeck.length - 1];
    if (playerTurn) {                                                                                                   // wenn Spieler dran ist
        if (card.number === playedCard.number || card.color === playedCard.color) {                                     // ist gespielte Karte möglich ?
            playedDeck.push(card.setDeck(decks.PLAYED));                                                                // Karte gespieltem Stapel hinzufügen
            player.splice(player.findIndex(c => c === card), 1);                                                        // Karte beim Spieler suchen und entfernen - findIndex: durchläuft player und überprüft ob c (Karte in player) gleich card (gespielte Karte) ist und gibt den index von c in player zurück. danach splice funktion
            updateBoard();                                                                                              // aktualisieren
            playerTurn = false;                                                                                         // Computer ist dran
        }
    } else {                                                                                                            // wenn Computer dran ist
        playedDeck.push(card.setDeck(decks.PLAYED));                                                                    // Karte gespieltem Stapel hinzufügen
        opponent.splice(opponent.findIndex(c => c === card), 1);                                                        // Karte beim Computer suchen und entfernen
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
    let bestPossibleCards = [];
    let isBestPossibleCard = false;
    possibleCards.forEach(function (card) {                                                                             // für jede mögliche Karte vergleiche mit jeder Karte des Spielers
        player.forEach(function (playerCard) {
            isBestPossibleCard = !(card.number === playerCard.number) && !(card.color === playerCard.color);            // wenn sowohl Farbe als auch Nummer nicht übereinstimmen
        });
        if (isBestPossibleCard) bestPossibleCards.push(card);
    });
    return bestPossibleCards;
}
 
/**
 * Überprüfen welche Karten spielbar sind
 * @param deck
 */
function checkPossibleCards(deck) {
    let possibleCards = [];
    let playedCard = playedDeck[playedDeck.length - 1];
    deck.forEach(function (card) {
        if (card.number === playedCard.number || card.color === playedCard.color) {                                     // Überprüfe welche Karten können gespielt werden (Farbe oder Nummer)
            possibleCards.push(card);
        }
    });
    return possibleCards;
}
 
/**
 * Spielzug des Computers
 */
function opponentPlay() {
    let possibleCards = checkPossibleCards(opponent);
 
    if (possibleCards.length === 0) {
        getCard(decks.OPPONENT);                                                                                        // ziehen wenn keine Karte möglich
    } else {
        let bestPossibleCards = opponentLogic(possibleCards);                                                           // Computer denkt mit
        if (bestPossibleCards.length !== 0) possibleCards = bestPossibleCards;                                          // wenn Karten gefunden wurden bei denen der Spieler ziehen muss
        playCard(possibleCards[Math.floor(Math.random() * possibleCards.length)])                                    // spiele eine random Karte der möglichen Karten
    }
    playerTurn = true;                                                                                                  // Spieler ist dran
    updateBoard();                                                                                                      // aktualiseiere Spielbrett
}
 
/**
 * mischt den gespielten Stapel bis auf die oberste und fügt die Karten dem Ziehstapel hinzu
 */
function getDeck() {
    let cache = [];                                                                                                     // Zwischenspeicher für Karten
    for (let i = 0; i < playedDeck.length - 1; i++) {
        cache.push(playedDeck[i].setDeck(decks.DECK));                                                                  // Index der Karte ändern und in Zwischenspeicher pushen
    }
    deck.unshift.apply(deck, shuffle(shuffle(cache)));                                                                  // gemischten Zwischenspeicher an Anfang des Decks pushen(unshift)
    playedDeck = [playedDeck.pop()];                                                                                    // playedDeck besteht nur noch aus obersten Karte
}
 
 
/**
 * Aktualisieren des Spielbretts
 */
function updateBoard() {
    let div;
 
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
    clearInterval(gameLoop);                                                                                            // GameLoop beenden
    alert(player.length === 0 ? 'Du hast gewonnen !' : 'Du hast verloren !');                                           // anzeigen ob gewonnen oder verloren
    init();                                                                                                             // starte neues Spiel
}
 
/**
 * initialisiere Spiel
 */
function init() {
    deck = [];                                                                                                          // Konstanten leeren
    opponent = [];
    player = [];
    playedDeck = [];
    playerTurn = true;
 
    // Deck erstellen und mischen
    createCards(8, ['red', 'green', 'blue', 'yellow']);                                                  // Karten generieren
    deck = shuffle(shuffle(deck));                                                                                      // sicherheits halber zweimal mischen :D
 
    // Karten verteilen
    let i = 0;
    while (i < 5) {                                                                                                     // jeder bekommt 5 Karten
        opponent.push(deck.pop().setDeck(decks.OPPONENT));                                                              // Karte aus Deck entfernen, Index ändern und in jeweiliges Deck pushen
        player.push(deck.pop().setDeck(decks.PLAYER));
        i++;
    }
    playedDeck.push(deck.pop().setDeck(decks.PLAYED));                                                                  // erste Karte aufdecken (auf Stapel der gespielten Karten)
    updateBoard();                                                                                                      // Spielbrett aktualisieren
 
    gameLoop = setInterval(gameplay, 1000);                                                                     // Game Loop - wiederholde Spielzug solange bis player oder opponent leer ist
}
 
document.addEventListener('DOMContentLoaded', function () {
    init();
});
