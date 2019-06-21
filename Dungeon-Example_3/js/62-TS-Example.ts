// BEISPIEL UND AUFGABE:
// Dieses Skript soll als Beispiel dazu dienen, wie Interfaces und Arrays genutzt werden können.
// Hier wird ein ungefährer Aufbau eines simplen Klick-Spiels gezeigt. Der Nutzer kann dabei durch Button ein neues Monster erstellen.
// Zu beginn werden hier zuerst Interfaces, danach Variablen deklariert.
// Weiter unten kommen dann die Funktionen.
// ------- Variablen -------- //
interface Monster {
    monsterName : string; // Name des Monsters
    monsterHealthPoints : number; // Lebenspunkte
    monsterExperience : number; // Erfahrungspunkte bei besiegen des Monsters
    monsterModifier : string []; // Monster-Verstärker. Diese sind in diesem Fall nur Text! (Da hier einfacher Zufall für die Auswahl genutzt wird, kann der gleiche Eintrag auch doppelt vorkommen)
    monsterAge: number; //Alter des Monsters
    monsterImage: string //Aussehen des Monsters
    monsterLevel: number; //Level des Monsters 
    
}
// INSGESAMT EINGEBAUTE FEHLER bei den Variablen: I (1 / einer)
let monsterHolder = "monsterHoldingCell"; // ID für das Haupt-Element, in welchem die Monster sich befinden werden. Wird vielleicht mehrfach in dem Skript gebraucht, deshalb einmalig definitiert.
let playerName = "Spielername"; // Ein paar globale Variablen, welche den Spieler darstellen.
let playerXP = 2000; //Fehler: Variable wurde nicht genauer definiert, kein eigentlicher Wert zugewiesen                                                      // Stellt die gesammelte Erfahrung des Spielers dar.
let playerXPperLevel = 500; // Da es nur einen Spieler gibt, ergibt sich noch nicht viel Sinn darin, für den Spieler ein interface (im Sinne der Programmierung) zu erstellen.
// Mehrere Arrays, welche jeweils Bauteile für Namen oder Eigenschaften der Monster beinhalten.
let playerLevel = 10;
let prefix = ["Fussel-", "Flauschige(s/r) ", "Junge(s/r) ", "Feuerspeiende(s/r) ", " Wirbelde(s/r) ", "Tanzende(s/r) "]; // length = 6, da 6 Einträge. Von 0-5.
let monsterName = ["Monster ", "Ungeheuer ", "Viech ", "Drache ", "Zombie "]; // length = 3, da 3 Einträge. Von 0-2.
let suffix = [" des Untergangs", " aus dem Schwarzwald", " der Zerstörung", " mit Zauberkräften", " aus der Unterwelt", " mit Flügeln"]; // length = 6, da hier 6 Einträge sind. Von 0-5.
let monsterModifers = ["Ist kein Frühaufsteher", "hat ein Alkoholproblem", "ist sehr verpeilt", "tanzt gerne Walzer", "leidet unter seinem/ihrem Übergewicht", "Müde", "Verwirrt", "Wasserscheu", "Bipolar", "Hat Schnupfen", "Verläuft sich oft"]; // Eine Reihe von zufälligen "Verstärkern" für das Monster.
let monsterAge = [1, 3, 5, 12, 6];
let monsterImage = ["monster.3.jpg", "monster.2.jpg", "monster.1.jpg", "monster-3.png", "monster-1.jpg"];
let ArrayPush : any[] = [];
// -- Initialisierung für viele/variable Anzahl an Monster --
let monsterArray : Monster[] = []; // Das Haupt-Array wurde erstellt und initialisiert!
console.log(monsterArray); // Gebe das Monster-Array einmal zu beginn aus. Es sollte leer sein.
// ----------- Funktionen ----------- //
// INSGESAMT EINGEBAUTE FEHLER bei den Funktionen: IIIII (5 / fünf)
// Generelle onload-funktion um Event-Listener zum Dokument hinzuzufügen
window.onload = function () {
    document.getElementById("monsterSpawner").addEventListener("click", generateMonster, false);
    updatePlayerLevel(); // Zu Anfang wird durch eine Funktion ein HTML-Element mit Inhalt befüllt.
    console.log(document.getElementById("monsterSpawner").innerHTML); // Fehler: console.log muss in window.onload rein
    document.getElementById("Button2").addEventListener("click", push);
    document.getElementById("AllMonsters").addEventListener("click", fightAllMonsters, false);
    document.getElementById("AllWeakMonsters").addEventListener("click", fightAllWeakMonsters, false);
    document.getElementById("WeakestMonster").addEventListener("click", fightWeakestMonster, false)
};
// Die Hauptfunktion, um ein Monster zu erstellen. Wird von einem Button ausgerufen.
// Generiert ein neues Monster. Dieses wird zu dem Monster-Array hinzugefügt.
// Ruft eine Funktion auf, welche dann das entsprechende HTML erzeugt.
function generateMonster() {
    let Random = getRNGNumber(3) + 1; //Diese Schleife lässt Monser bis zu 3 generieren und dann hört er auf
    for (let i = 0; i < Random; i++) // FOR Schleife
     {
        let newMonsterName = generateMonsterName(); // Eigens-gebaute Funktion, welche einen string zurück gibt.
        let newMonsterHP = generateMonsterHitPoints(); // Eigens-gebaute Funktion, welche eine Zahl zurück gibt.
        let newMonsterXP = generateMonsterXP(); // Eigens-gebaute Funktion, welche eine Zahl zurück gibt.
        let newMonsterModifier = generateMonsterModifer(); // Eigens-gebaute Funktion, welche ein string-Array zurück gibt.
        let newMonsterAge = generateMonsterAge(); //Funktion für Alter des Monster
        let newMonsterImage = generateMonsterImage(); //Funktion für Monster-Image
        let newMonster = {
            monsterName: newMonsterName,
            monsterHealthPoints: newMonsterHP,
            monsterExperience: newMonsterXP,
            monsterModifier: newMonsterModifier,
            monsterAge: newMonsterAge,
            monsterImage: newMonsterImage,
            monsterLevel: getRNGNumber (10)
            //monsterMoney : 0, monsterMoney wurde vorab nicht definiert
        };
        monsterArray.push(newMonster); // Monster wird erst in diesem Schritt zu dem Array hinzugefügt 
        //console.log(monsterArray[monsterArray.length - 1].monsterExperience); // Man kann nur auf Array-Teile zugreifen, welche definiert sind. -1 ist nicht definitiert (und wird es auch nie sein). Fehler: Arrayname.length gibt die Länge des Arrays aus, da aber von null an gezählt wird, muss 1 abgezogen werden.
    }
    //monsterGenerateHTML(monsterArray.length); // Triggere die Generierung von HTML
    updateHTML();
}
 
function fightAllMonsters () {
    var monsterLength = monsterArray.length;
    for (let i : number = monsterArray.length -1;  i >= 0; i--) {
        fightMonster (i);
       
    }
}
function fightAllWeakMonsters () {
    for (let i : number = monsterArray.length -1;  i >= 0; i--) {
        if (monsterArray [i].monsterLevel < playerLevel) {
            fightMonster (i);
        }
    }
}

function fightWeakestMonster () {
    var index: number= 0;
    var findWeakestMonster : number = monsterArray[0].monsterLevel;
    for (let i : number = monsterArray.length -1; i>= 0; i--) {
        if (monsterArray [i].monsterLevel < findWeakestMonster)
        {
            index = i; 
            findWeakestMonster= monsterArray [i].monsterLevel;            
        }
    }

    
        if (monsterArray [index].monsterLevel < playerLevel) {
            fightMonster (index);
        }
    

}
function monsterGenerateHTMLAll() {
    let i = 0;                                                  // counter für while schleife (initialisiert mit 1 weil dann die monster id bei 1 beginnen und nicht bei 0)
    while(i < monsterArray.length){                         // solange counter kleiner oder gleich der anzahl der monster
        monsterGenerateHTML(i);                                 // generiere html mit "monster id"
        console.log(i);
        i++;                                                    // erhöhe counter um 1
    }
}
// Generiert HTML-Elemente, welche dann einem Element untergeordnet werden. Erzeugt ebenfalls einen Event-Listener auf dem Button.
function monsterGenerateHTML(number : number) {
    let holdingDiv = document.createElement("div"); // Erstelle ein neues HTML-Element vom typ <div>. Es ist jedoch noch nicht zu sehen!
    holdingDiv.setAttribute("id", "monster" + number); // Die ID jedes neu-erstellten Monsters entspricht der aktuellen Array-Länge.
    holdingDiv.setAttribute("class", "monster"); // Klasse für Visuals.
    document.getElementById(monsterHolder).appendChild(holdingDiv); // Das HTML-Element muss erst noch zu einem Objekt hinzugefügt werden, in diesem Fall mit der id "monsterHoldingCell"
    let monsterName = document.createElement("p"); // Generiere einen <p>
    monsterName.innerHTML = monsterArray[number].monsterName; // Inhalt des <p>: Monster-Name des letzten Monsters im Array.
    holdingDiv.appendChild(monsterName); // Füge das <p> zum HTML-Dokument hinzu, indem es dem holding-Div angefügt wird.
    let monsterMod = document.createElement("p"); // Generiere einen <p>
    monsterMod.innerHTML = monsterArray[number].monsterModifier[0] + ", " + monsterArray[number].monsterModifier[1]; // Inhalt des <p>: Monster-Modifizierer null und eins
    holdingDiv.appendChild(monsterMod); // Füge das <p> zum HTML-Dokument hinzu, indem es dem holding-Div angefügt wird.
    let monsterImg = document.createElement("img"); // Erstelle ein <img>-Element
    monsterImg.setAttribute("src", "imgs/" + monsterArray[number].monsterImage); // Der Pfad für das Bild muss über setAttribute festgelegt werden. Der Bildpfad kann natürlich auch anders aussehen.
    monsterImg.setAttribute("alt", "Schreckliches Monster"); // Das alt für das Bild wird hier festgelegt.
    holdingDiv.appendChild(monsterImg); // Füge das Bild zu dem holding-div hinzu (<div>, welche ein paar Zeilen zuvor erstellt worden ist)
    let monstAge = document.createElement("p");
    monstAge.innerHTML = "Alter: " + monsterArray[number].monsterAge + " Jahr(e)";
    holdingDiv.appendChild(monstAge); //Monster-Alter wird eingefügt
    let monstLevel = document.createElement("p");
    monstLevel.innerHTML = "Monster-Level: " + monsterArray[number].monsterLevel;
    holdingDiv.appendChild(monstLevel);
    let monsterBtn = document.createElement("BUTTON"); // Erstelle ein <button>-Element
    monsterBtn.innerHTML = "Monster bekämpfen!"; // Verändere den Inhalt des HTML-Elementes. Der genaue Text ist dabei euch überlassen.
    holdingDiv.appendChild(monsterBtn); // Füge den Button zu dem holding-div hinzu.
    //let monsterCount = number; // Die aktuelle Anzahl vorhandener Monster, zudem auch die neue Zahl für das Monster-Array.
    //console.log("Aktuelle Anzahl an Monstern: " + monsterCount);
    monsterBtn.addEventListener(// Füge dem Monster eine Funktion hinzu.
    'click', function () {
        fightMonster(number); // Wenn das Monster erstellt wird erhält die Funktion einen Parameter, welcher der ID des Monsters entspricht.
    }, false); // Ignoriert das false.
     
}
// Wird für den Zugriff auf eine zufällige Stelle in einem Array aufgerufen.
// [ ] Optionale Aufgabe: verkleinere diesen Code auf eine Zeile mit nur einem Semikolon!
// Muss mit einer Zahl aufgerufen werden: getRNGNumber(5); // Liefert eine ganze Zahl zwischen 0 bis 4 zurück.
function getRNGNumber(_maxNumber : number) {
    let rngNumber = Math.random(); // Macht folgendes: Generiere eine zufällige Komma-Zahl zwischen 0 - 1.
    rngNumber = rngNumber * _maxNumber; // Multipliziere diese Zahl mit der Länge des entsprechenden Array (hier: _maxNumber, ein Parameter, siehe in der runden Klammer der Funktion).
    rngNumber = Math.floor(rngNumber); // Floore diese Zahl, damit diese nun Ganzzahlig ist.
    // Diese Zeile ist einer der drei Fehler in den Funktionen. Ich bin mal so frei und vermerke das hier. Einfach löschen und alles wird besser. Fehlerzeile gelöscht
    return rngNumber; // Gebe diese Zahl zurück, Funktion kann ähnlich einer Variable in Rechnungen genutzt werden.
}
// Diese Funktion gibt einen zusammengewürfelten Namen zurück.
// Wird für die Monster-generierung verwendet!
// Liefert einen zusammengesetzten String zurück.
function generateMonsterName() {
    let generatedMonsterName = ""; // Erstelle einen leeren String für das Monster
    // Monster-Vorname
    // Mathematik! Hier wird eine zufällig-generierte Zahl benötigt.
    let rngNumber = getRNGNumber(prefix.length); // Der Rückgabewert der Funktion wird hier verwendet um den entsprechenden Teil des Namens (hier: Anfang) zu generieren.
    generatedMonsterName = prefix[rngNumber]; // Füge den Monsternamen zusammen: nimm aus dem entsprechenden Array mit der zufallsgenerierten Zahl den entsprechenden Eintrag.
    // Monster-Mittelname
    rngNumber = getRNGNumber(monsterName.length); // Der Rückgabewert der Funktion wird hier verwendet um den entsprechenden Teil des Namens (hier: Mitte) zu generieren.
    generatedMonsterName += monsterName[rngNumber]; // Füge den Monsternamen zusammen: nimm aus dem entsprechenden Array mit der zufallsgenerierten Zahl den entsprechenden Eintrag. Fehler? Es wurde immer nur 0 ausgewählt und keine rngNumber
    // Monster-Titel
    rngNumber = getRNGNumber(suffix.length); // Der Rückgabewert der Funktion wird hier verwendet um den entsprechenden Teil des Namens (hier: Ende) zu generieren.
    generatedMonsterName += suffix[rngNumber]; // Füge den Monsternamen zusammen: nimm aus dem entsprechenden Array mit der zufallsgenerierten Zahl den entsprechenden Eintrag.
    return generatedMonsterName;
}
// Wird für die Monster-Lebenspunkte aufgerufen.
// Liefert eine variierende Zahl zurück.
function generateMonsterHitPoints() {
    // Diese Funktion gibt eine zufällige ganze Zahl (zwischen 0 und 10) + 1 zurück.
    let tempMonsterHP = 1 + getRNGNumber(10);
    return tempMonsterHP;
}
// Wird für die Erstellung der Monster-Lebenspunkte aufgerufen.
// Liefert eine variierende Zahl zurück.
function generateMonsterXP() {
    // Diese Funktion gibt eine zufällige ganze Zahl (zwischen 0 und 650) + 300 zurück.
    let tempMonsterXP = 300 + getRNGNumber(650);
    return tempMonsterXP;
}
// Wird für die Erstellung der Monster-Modifizierer aufgerufen.
// Liefert ein Array mit zwei Einträgen zurück.
function generateMonsterModifer() {
    let tempMonsterMod = []; // Initialisiere ein leeres Array (verhindert Folge-Fehler)
    tempMonsterMod[0] = monsterModifers[getRNGNumber(monsterModifers.length)]; // Setze Schublade 0 des Arrays auf einen Wert.
    tempMonsterMod[1] = monsterModifers[getRNGNumber(monsterModifers.length)]; // Setze Schublade 1 des Arrays auf einen Wert.
    return tempMonsterMod; // Gebe das hier zusammengesetzte Array wieder zurück.
}
function generateMonsterImage() {
    let rngNumber = getRNGNumber(monsterImage.length);
    return monsterImage[rngNumber];
}
function generateMonsterAge() {
    let rngNumber = getRNGNumber(monsterAge.length);
    return monsterAge[rngNumber];
}
// Aufgerufen, wenn man auf den Button klickt.
// Der Spieler kämpft gegen das entsprechende Monster. Er erhält dann Erfahrungspunkte.
function fightMonster(_index : number) {
    console.log("Spieler kämpft gegen Monster und gewinnt!"); // Ohne Logik mit if/else ist so etwas wie ein Kampf nicht leicht umzusetzen.
    //console.log("Das Monster weigert sich zu verschwinden."); // Wird nächste Stunde erweitert.
    if (playerLevel > monsterArray[_index].monsterLevel) {
        playerXP += monsterArray[_index].monsterExperience; // _index ist in diesem Fall die Länge des Arrays - allerdings zählt der Computer beginnend von null, nicht eins! Deshalb _index-1.
     
    
        monsterArray.splice(_index,1); 
    }                                     // monster aus dem array entfernen
    else if (playerLevel < monsterArray[_index].monsterLevel) {
        playerXP -= monsterArray[_index].monsterExperience;
    }
    updatePlayerLevel();
    
    updateHTML();
}

// Aufgerufen, um das HTML-Element, welches das Spieler-Level darstellt, zu erneuern.
function updatePlayerLevel() {
    playerLevel = Math.floor(playerXP / playerXPperLevel); // Spieler-Level = XP / XPproLevel
    document.getElementById("xpCounter").innerHTML = "Player-Level: " + playerLevel + " (XP: " + playerXP + " / " + playerXPperLevel * /*multiplizieren statt addieren*/ (playerLevel + 1) + ")"; // Baue den String für die Spieler-Info zusammen
    console.log("Spieler " + playerName + " hat nun Level " + playerLevel + " mit " + playerXP + " (" + playerXPperLevel + " pro Level)"); // Spieler-Level in der Konsole.

    if (playerLevel == 20) {
        alert ("Du hast gewonnen!")
    }

    if (playerLevel < 0) {
        alert ("Du hast verloren!")
    }
}
let newMonsters = "New Monsters";
function push() {
    ArrayPush.push(newMonsters);
    console.log(ArrayPush);
}
 

function clearMonsterCell(){
    let monsterCell = document.getElementById('monsterHoldingCell');    // hole html-element indem die monster enthalten sind. 
    while (monsterCell.firstChild) {                                    // -> solange durchführen bis keine monster mehr in monsterCell sind
        monsterCell.removeChild(monsterCell.firstChild);                // entferne jeweils immer das erste monster
    }
}
 

function updateHTML(){
    clearMonsterCell();                                                 // steht so in der Aufgabe - simpler methodenaufruf
    monsterGenerateHTMLAll();                                           // steht so in der Aufgabe - simpler methodenaufruf
    getMonsterCount();                                                  // steht so in der Aufgabe - simpler methodenaufruf
}
 

function getMonsterCount(){
    console.log('Anzahl der Monster: ' + monsterArray.length);          // gebe anzahl der aktuellen monster in console aus
    let count = document.createElement("p");                            // Generiere html-element
    count.innerHTML = 'Anzahl der Monster: ' + monsterArray.length;     // inhalt des elements
    document.getElementById(monsterHolder).appendChild(count);          // in monster container einfügen
}