console.log("Test1");
// dies ist ein Kommentar
// bli bla blub
window.onload = function () {
    console.log("Objekte wurden geladen");
    document.getElementById("demo").addEventListener("click", DoStuff1);
    document.getElementById("demo2").addEventListener("mousemove", DoStuff2);
    //document.getElementById("demo2").addEventListener("click", ChangeClass);
    ChangeClass();
    addElement();
    let number4 = 4;
    console.log(number4 = 5);
    let number1 = 1;
    let number2 = 2;
    console.log(number1 + number2);
    let variable1 = "bli ";
    let variable2 = "bla blub";
    console.log(variable1 + variable2);
    let MyName = "Lea, ";
    let MyAge = 20;
    console.log(MyName + MyAge);
};
function DoStuff1() {
    console.log("clicked on button 1");
    document.getElementById("demo").innerHTML = "BUTTON3";
}
function DoStuff2() {
    console.log("mousemove on button 2");
}
function ChangeClass() {
    document.getElementById("demo2").className = "class2";
}
function addElement() {
    let newText = document.createElement("p");
    let sparty = document.getElementById("id1");
    sparty.appendChild(newText);
    newText.innerHTML = "Wuhuu, es hat funktioniert!";
    //Neues HTML-Element hinzugefügt
}
//# sourceMappingURL=script.js.map