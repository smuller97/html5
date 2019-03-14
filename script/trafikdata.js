

function fyldListe(){
    $.ajax({
        url: "http://kortservice.vejle.dk/gis/rest/services/OPENDATA/Vejle/MapServer/0/query?where=OBJECTID%3C%3E0&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&maxAllowableOffset=&geometryPrecision=&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&f=pjson",
        succes: function(result) {
            console.log(result);
            /*
            var vejliste = document.getElementById("vejnavne");
            var erIListe = false;
            for(item = 0; item < result.features.length; ++item){
                var vejnavn = result.features[item].attributes.Lokalitet;
                var vejid = result.features[item].attributes.Stedid;

                for(vej = 0; vej < vejliste.length; ++vej){
                    if(vejid == vejListe.value[vej]){
                        erIListe = true
                    }
                }

                if(erIListe == false){
                    var nyVejOption = document.createElement("option");
                    nyVejOption.setAttribute("value", "vejid");
                    var nyVejTextNode = document.createTextNode(vejnavn);
                    nyVejOption.appendChild(nyVejTextNode);
                    vejliste.appendChild(nyVejOption);
                }
                erIListe = false;
            }
            */
        },
        error: function(err){
            alert(err)
        }
    });
}

function renderChart(ÅDT, JDT, HDT, Lbil, year){
    var cvs = document.getElementById("barChart").getContext('2d');
    var brChart = new Chart(cvs,{
        type: 'line',
        data: {
            labels: year,
            datasets: [
            {
                label: 'Dagligt gennemsnit årligt',
                data: ÅDT,
            },
            {
                label: 'Dagligt gennemsnit Juli',
                data: JDT,
            },
            {
                label: 'Dagligt gennemsnit i hverdage',
                data: HDT,
            },
            {
                label: 'Dagligt gennemsnit i hverdage',
                data: Lbil,
            }]
        },
    });
}


function loadFemÅr(){

}


function loadAlleÅr(){

}