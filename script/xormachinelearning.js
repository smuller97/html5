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
    cell4.innerHTML = Learn(x,y);

    
}
function xor(a,b){
     if (( a || b ) && !( a && b ))
        return 1
     else
        return 0
}

function Learn(x,y){ 
    const Neuron = synaptic.Neuron,
    Layer = synaptic.Layer,
    Network = synaptic.Network,
    Trainer = synaptic.Trainer,
    Architect = synaptic.Architect;
    
    const myNetwork = new Architect.Perceptron(2, 3, 1);
    const myTrainer = new Trainer(myNetwork);

    var logging = document.getElementById("logging");
    var training = myTrainer.XOR({ error: 0.00001 });
    console.log(training);

    logging.innerHTML = "Learn log: Iterations: " + training.iterations + 
    "MSE: " + (training.error).toFixed(6) + 
    "time: " + training.time + " ms";

    var machineNum = myNetwork.activate([x, y])

    return machineNum[0].toFixed(3);
}