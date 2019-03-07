function getChartData() {
    $.ajax({
        url: "http://kortservice.vejle.dk/gis/rest/services/OPENDATA/Vejle/MapServer/3/query?where=OBJECTID%3C%3E0&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&f=pjson",
        success: function (result) {
        
        
            hentet(result);
        },
        error: function (err) {
            alert(err);
        }        
    });
}

var gader = [];
var antal = [];
function hentet(result) {
 var data = JSON.parse(result);

 var fundet =false;

 gader.push(data.features[0].attributes.STED);
 antal.push(1);

    for (index = 0; index < data.features.length; ++index) 
    {                    
        for (i=0;i<gader.length;i++)
        {
            if (gader[i]==data.features[index].attributes.STED)
            {
                fundet=true;
            }
            else {}
        }
        if (fundet==true)
        {
            antal[antal.length-1] = antal[antal.length-1] + 1;
        }
        else    
        {        
            gader.push(data.features[index].attributes.STED);
            antal.push(1);
        }
        fundet=false;
    }

 var gadehtml ="";

    for(i=0;i<gader.length;i++)
    {
        gadehtml =gadehtml + "<tr> <td> " + gader[i] + " </td> <td> "+antal[i]+" </td>   </tr>"
    }

 var x = document.getElementById("myTable");

 x.innerHTML= gadehtml;
  piechart();
}
function piechart()
{
    var ctx = document.getElementById("myChart");

    var myPieChart = new Chart(ctx,{
        type: 'pie',
        data: {
            labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
            datasets: [{
                label: gader,
                data: antal,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: options
    });
}