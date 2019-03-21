function Knap1(){
    getChartData();
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
        for (var række = 0; række < data.length; række++) {
            var indsætRække = top100table.insertRow(række);
            for (var celle = 0; celle <= 2; celle++) {
                var celleData = indsætRække.insertCell(celle)
                if (celle == 0) {
                    celleData.innerHTML = data[række].Forfatter;
                } else if (celle == 1){
                    celleData.innerHTML = data[række].Titel;
                } else if (celle == 2){
                    celleData.innerHTML = data[række].Antal;
                }
            }
        }
        //$("fulltable").trigger("update");
    }
}

function Knap2(){
    getChartData();
    function getChartData() {
        $.ajax({
            url: "https://portal.opendata.dk/dataset/9630873c-9bb7-404e-ab87-f9e28ff832b4/resource/be505c54-cdec-43be-9774-ebee3b5fd5f2/download/20160615-mest-reserverede-titler.json",
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
        for (var række = 0; række < data.length; række++) {
            var indsætRække = top100table.insertRow(række);
            for (var celle = 0; celle <= 2; celle++) {
                var celleData = indsætRække.insertCell(celle)
                if (celle == 0) {
                    celleData.innerHTML = data[række].Forfatter;
                } else if (celle == 1){
                    celleData.innerHTML = data[række].Titel;
                } else if (celle == 2){
                    celleData.innerHTML = data[række].Antal;
                }
            }
        }
        //$("fulltable").trigger("update");
    }
}