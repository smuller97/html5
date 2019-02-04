function Tegnstreger(){
    var c = document.getElementById("stregeCanvas");
    var ctx = c.getContext("2d");
    var pieces = +document.getElementById("opdelnr").value;

    ctx.beginPath();
    for (var i = 0;i <= pieces;i++) {
        if (i === 0 || i === pieces) {
            //i Math.tan() bliver startvinklen ganget med i for at regne ud den igangværende vinkels tangentlængde
            ctx.moveTo(c.width/2-(Math.tan((90/pieces)*i*(Math.PI/180))*c.height/2),0);
            ctx.lineTo(c.width/2+(Math.tan((90/pieces)*i*(Math.PI/180))*c.height/2),c.height);
        } else {
            ctx.moveTo(c.width/2+(Math.tan((90/pieces)*i*(Math.PI/180))*c.height/2),0);
            ctx.lineTo(c.width/2-(Math.tan((90/pieces)*i*(Math.PI/180))*c.height/2),c.height);
            ctx.moveTo(c.width/2-(Math.tan((90/pieces)*i*(Math.PI/180))*c.height/2),0);
            ctx.lineTo(c.width/2+(Math.tan((90/pieces)*i*(Math.PI/180))*c.height/2),c.height);
        }        
    }
    ctx.clearRect(0,0,c.width,c.height); 
    ctx.stroke();
}