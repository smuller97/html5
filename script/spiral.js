
var sving=0; //drej spiralen
var anglevalue =0.1; //vinklen mellem hver steg
var stopper = false;

function start()
{  
  setInterval(spiral, 16); //refresh rate, kør funktionen hvert 16 milisec.
}

function spiral()
{
var c = document.getElementById('c'); //hent elemmet med id c(canvas for spiralen)
var context = c.getContext("2d"); //2d canvas
var centerx = context.canvas.width / 2; //midten på x akse
var centery = context.canvas.height / 2; //midten på y aksen
    context.clearRect(0, 0, context.canvas.width, context.canvas.height); //clear canvas'et
    

    context.moveTo(centerx, centery); //flyt pointeren til midten af canvas
    context.beginPath(); 
    var midten=0; //0 = man starter på midten.
    var mellemrum=1.3; //hvor langt der er mellem cirklen der er en tand længere inde og den næste. 
    
        

    for (i = 0; i < 16000; i++) { //loop med lineTo
        angle = anglevalue * i; //gør vinklen større pr gennemgang
        x = centerx + (midten + mellemrum * angle) * Math.cos(angle+sving); //udregning for at flytte x 
        y = centery + (midten + mellemrum * angle) * Math.sin(angle+sving); //udregning for at flytte y 

        context.lineTo(x, y); //laver en linje til den ny fundne position
    }
    context.strokeStyle = "#000"; //farven på spiralen
    context.stroke(); //tegn spiralen
     
    if (stopper==false)
    {
        if (sving >6.28) //sving drejer spiralen, indtil under 6.2 hvilket er en runde
        {
        sving =0; 
        }
        else
        {
        sving = sving + Math.PI/5;
        } 
    }
    
}

function op() 
{
	anglevalue=anglevalue+0.1; //øg vinklen
}
function ned() 
{
	anglevalue=anglevalue-0.1; //minsk vinklen
}
function stopcanvas() 
{
	stopper=true; 
}
function startcanvas() 
{
	stopper=false; 
}