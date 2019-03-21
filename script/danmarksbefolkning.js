function getChartData() {

    var alder= document.getElementById("alder").value;
    var url ='https://api.population.io:443/1.0/population/Denmark/'+alder+'/';
    $.ajax({
        type: "get",
        datatype: "json" ,
        url: url,
        success: function (result) {            
            hentet(result);
        },
        error: function (err) {
            alert("der skete en fejl med hentning af dataen fra " +url);
        }        
    });
}

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
    var yyyy = today.getFullYear();

    var x=0;
    var tablehtml = "<tr><th>Year</th> <th>Females</th><th>Males</th><th>Total</th> </tr>";

    for (let index = result[0].year; index <= yyyy; index++) {
        women[x]=result[x].females;
        men[x]=result[x].males;
        total[x]=result[x].total;
        year[x]=result[x].year;
        tablehtml = tablehtml + " <tr> <td>"+result[x].year+"</td><td>"+result[x].females+"</td><td>"+result[x].males+"</td><td>"+result[x].total+"</td> </tr>"
        x++;
    }
    document.getElementById("befolkningstable").innerHTML=tablehtml;
    
    
    var ctx = document.getElementById("myChart");
    myLineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: year,        
            datasets:[{
                label: 'Females',
                data: women,year
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
            text: 'Chart over folk i dk over tid',               
            }
        }
    });
}   
function resetchart(){
myLineChart.destroy();
getChartData();
}