// create the network
var inputLayer ;
var hiddenLayer ;
var outputLayer ;


var myNetwork;
function start(){
    inputLayer = new Layer(2);
    hiddenLayer = new Layer(3);
    outputLayer = new Layer(1);
    
    inputLayer.project(hiddenLayer);
    hiddenLayer.project(outputLayer);
    
    myNetwork = new Network({
        input: inputLayer,
        hidden: [hiddenLayer],
        output: outputLayer
    });

}

// train the network
var learningRate = .3;
var iterations = 20000
function Learn(){    
    for (var i = 0; i < iterations; i++)
    {
        // 0,0 => 0
        myNetwork.activate([0,0]);
        myNetwork.propagate(learningRate, [0]);

        // 0,1 => 1
        myNetwork.activate([0,1]);
        myNetwork.propagate(learningRate, [1]);

        // 1,0 => 1
        myNetwork.activate([1,0]);
        myNetwork.propagate(learningRate, [1]);

        // 1,1 => 0
        myNetwork.activate([1,1]);
        myNetwork.propagate(learningRate, [0]);
    }
}
function inputdata()
{
    var x= document.getElementById("x").value;
    var y= document.getElementById("y").value;

    var svar= myNetwork.activate([x,y]);
    
    if (x==y){
        document.getElementById("tabellen").innerHTML=document.getElementById("tabellen").innerHTML+" <tr> <td>"+x+"</td> <td>"+y+"</td>  <td>0</td>  <td>"+svar+"</td>  </tr>"
    }
    else{
        document.getElementById("tabellen").innerHTML=document.getElementById("tabellen").innerHTML+" <tr> <td>"+x+"</td> <td>"+y+"</td>  <td>1</td>  <td>"+svar+"</td>  </tr>"
    }
}
