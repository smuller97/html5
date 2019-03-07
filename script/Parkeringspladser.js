function getChartData() {
    $.ajax({
        url: "http://kortservice.vejle.dk/gis/rest/services/OPENDATA/Vejle/MapServer/3/query?where=OBJECTID%3C%3E0&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&f=pjson",
        success: function (result) {
            alert(result)
            var data = [];
            data.push(result);
            renderChart(data, labels);
        },
        error: function (err) {
            alert(err)
        }
    });
}