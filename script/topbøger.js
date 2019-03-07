function Knap1(){
    var data = "";
    $.ajax({
        url: "https://portal.opendata.dk/dataset/9630873c-9bb7-404e-ab87-f9e28ff832b4/resource/7054ce10-d5d8-401c-babf-641e007c7807/download/20160129-mest-reserverede-titler.json",
        success: function (result) {
            data = result;
        },
        error: function (err) {
            alert(err);
        }
    });    

    alert(data)
}