function getChartData() {

    var alder= document.getElementById("alder").value;
    var url ='https://api.population.io:443/1.0/population/Denmark/'+alder+'/';
    $.ajax({
        type: "get", //get metode
        datatype: "json" , //json type
        url: url, //api url
        success: function (result) {            
            hentet(result); //hvis succes kald denne function
        },
        error: function (err) {
            //hvis fejl alert dette
            alert("der skete en fejl med hentning af dataen fra " +url);
        }        
    });
}
//arrays
var women = [];
var men = [];
var total = [];
var year = [];


var myLineChart;/* = new Chart(ctx, {
    type: 'line',
    data: men
    });*/
function hentet(result) {

    var today = new Date();
    var yyyy = today.getFullYear(); //hent dette år

    var x=0; // bruges son index på arrays
    var tablehtml = "<tr><th>Year</th> <th>Females</th><th>Males</th><th>Total</th> </tr>"; //det der bliver til innerhtml i tabellen

    for (let index = result[0].year; index <= yyyy; index++) { // for loop som tager dataen fra apiet og deler det op i mere specifikke arrays
        women[x]=result[x].females; //fylder women array med females fra api
        men[x]=result[x].males; //-||-
        total[x]=result[x].total; //-||-
        year[x]=result[x].year; //-||-
        //generere txt til innerhtml på tabellen
        tablehtml = tablehtml + " <tr> <td>"+result[x].year+"</td><td>"+result[x].females+"</td><td>"+result[x].males+"</td><td>"+result[x].total+"</td> </tr>" 
        x++; //øger x med en pr gennemgang
    }
    //den generede html bliver sat = tabellens innerhtml
    document.getElementById("befolkningstable").innerHTML=tablehtml; 
    
    //skaffer canvas fra html'en
    var ctx = document.getElementById("myChart");
    myLineChart = new Chart(ctx, {
        type: 'line', //hvilken type chart
        data: {
            labels: year,     //labels ud af x aksen   
            datasets:[{ // data fra alle arrays
                label: 'Females',
                data: women,year // y/x akse værdi'er
            },{
                label: 'Males',
                data: men,year
            },{
                label: 'Total',
                data: total,year
            }]
        },
        options: {
            responsive: true,
        title: {
            display: true,
            text: 'Chart over folk i dk over tid',   //titlen             
            }
        }
    });
}   
function resetchart(){ //kaldt fra submit knappen
myLineChart.destroy(); //clear'er canvas ved at fjerne chartet 
getChartData(); //kalder metoden
}