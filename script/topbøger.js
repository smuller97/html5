function TopBøgerChart(){
    getChartData();
    var bogtitler = [];
    var antaludlåninger = [];
    function getChartData() {
        $.ajax({
            url: "https://portal.opendata.dk/dataset/9630873c-9bb7-404e-ab87-f9e28ff832b4/resource/7054ce10-d5d8-401c-babf-641e007c7807/download/20160129-mest-reserverede-titler.json",
            success: function (result) {
                Controller(result);
            },
            error: function (err) {
                alert("Der skete en fejl. Tjek console for detajler.");
                console.log(err);
            }
        });
    }
    function Controller(result) {
        var data = result;
        var top100table = document.getElementById("Top100Table");
        var antaltitler = 25;
        for (var række = 0; række < data.length; række++) {
            var indsætRække = top100table.insertRow(række);
            for (var celle = 0; celle <= 2; celle++) {
                var celleData = indsætRække.insertCell(celle)
                if (celle == 0)
                    celleData.innerHTML = data[række].Forfatter;
                else if (celle == 1)
                    celleData.innerHTML = data[række].Titel;
                else if (celle == 2)
                    celleData.innerHTML = data[række].Antal;
            }
            if (række < antaltitler) {
                bogtitler.push(data[række].Titel);
                antaludlåninger.push(data[række].Antal);
            } else if (række == antaltitler)  {                         
                bogtitler.push("Andre");
                antaludlåninger.push(data[række].Antal);
            } else {
                antaludlåninger[antaltitler] += data[række].Antal;
            }
        }
        $("#fulltable").trigger("update");
        piechart();
    }
    var colorarray = [
    '#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
    '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
    '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
    '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
    '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
    '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
    '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
    '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
    '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
    '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF']
    function piechart() {
        var ctx = document.getElementById("chartCanvas");
    
        var myPieChart = new Chart(ctx, {
            type: 'pie',
            data: {
            labels: bogtitler,
            datasets: [{
                label: "Antal udlånte bøger på Vejle Biblotek",
                backgroundColor: colorarray,
                data: antaludlåninger
            }]
            },
            options: {
            title: {
                display: true,
                text: 'Top 25 udlånte bøger på Vejle Biblotek'
            }
            }
        });    
    }
}