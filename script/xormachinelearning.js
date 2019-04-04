function Begin() {
    var x = +document.getElementById("x").value
    var y = +document.getElementById("y").value
    var tabel = document.getElementById("tabel")

    var indsætRække = tabel.insertRow(tabel.rows.length)
    var cell1 = indsætRække.insertCell(0)
    var cell2 = indsætRække.insertCell(1)
    var cell3 = indsætRække.insertCell(2)
    var cell4 = indsætRække.insertCell(3)

    cell1.innerHTML = x;
    cell2.innerHTML = y;
    cell3.innerHTML = xor(x,y);
    cell4.innerHTML = "helloworld";

    Learn();
}
function xor(a,b){
     if (( a || b ) && !( a && b ))
        return 1
     else
        return 0
}

function Learn(){
    const synaptic = require('synaptic');

    var myPerceptron = new synaptic.Architect.Perceptron(2,3,1);
    perceptron.trainer.XOR();
}