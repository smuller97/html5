
var sving=0;
var anglevalue =0.1;

function start()
{  
  setInterval(spiral, 16);
}

function spiral()
{
var c = document.getElementById('c');
var context = c.getContext("2d");
var centerx = context.canvas.width / 2;
var centery = context.canvas.height / 2;
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    

    context.moveTo(centerx, centery);
    context.beginPath();
    var a=0;
    var b=1.3;
    
        

    for (i = 0; i < 30000; i++) {
        angle = anglevalue * i;
        x = centerx + (a + b * angle) * Math.cos(angle+sving);
        y = centery + (a + b * angle) * Math.sin(angle+sving);

        context.lineTo(x, y);
    }
    context.strokeStyle = "#000";
    context.stroke();
    if (sving >=6.2)
    {
    sving =0;
    }
    else
    {
    sving = sving + Math.PI/5;
    }
}

function op() 
{
	anglevalue=anglevalue+0.1;
}
function ned() 
{
	anglevalue=anglevalue-0.1;
}