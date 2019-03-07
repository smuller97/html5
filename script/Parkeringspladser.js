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

function hentet(result) {
 var data = JSON.parse(result);

 var gader = [];
 var gadehtml ="";

 for (index = 0; index < data.features.length; ++index) 
 {     
    gader.push(data.features[index].attributes.STED)
    gadehtml = gadehtml + "<tr> <td> "+data.features[index].attributes.STED+" </td>    </tr> "
 }
 alert(data.features[0].attributes.STED);

 var x = document.getElementById("myTable");

 x.innerHTML= gadehtml;
 
 
}