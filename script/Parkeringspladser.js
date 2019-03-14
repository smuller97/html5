function getChartData() {
    var url ='http://kortservice.vejle.dk/gis/rest/services/OPENDATA/Vejle/MapServer/3/query?where=OBJECTID%3C%3E0&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&f=pjson';
    $.ajax({
        type: "post",
        url: url,
        success: function (result) {            
            hentet(result);
        },
        error: function (err) {
            alert("der skete en fejl med hentning af dataen fra " +url);
        }        
    });
}

var gader = [];
var antal = [];
function hentet(result) {
 var data = result;//JSON.parse()

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
/*
 var gadehtml ="";

    for(i=0;i<gader.length;i++)
    {
        gadehtml =gadehtml + "<tr> <td> " + gader[i] + " </td> <td> "+antal[i]+" </td>   </tr>"
    }

 var x = document.getElementById("myTable");

 x.innerHTML= gadehtml;*/
  piechart();
}

var colorarray =['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
                '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
                '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
                '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
                '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
                '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
                '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
                '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
                '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
                '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF']
function piechart()
{
    var ctx = document.getElementById("myChart");
   
    var myPieChart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: gader,
          datasets: [{
            label: "Antal Parkeringer",
            backgroundColor: colorarray,
            data: antal
          }]
        },
        options: {
          title: {
            display: true,
            text: ' Parkeringspladser (kommunal ejede og offentlig tilgængelige) '
          }
        }
    });
    
}