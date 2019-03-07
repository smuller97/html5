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
  
}
function piechart()
{
    
}