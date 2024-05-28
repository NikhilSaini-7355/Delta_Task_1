 var blackCanon = './assets/canon-black.svg';
 var blackTank = './assets/black-tank.svg';
 var blackRicochet = './assets/black-ricochet.svg';
 var blackSemiricochet = './assets/black-semiricochet.svg';
 var blackTitan = './assets/black-titan.svg';

 var redCanon = './assets/canon-red.svg';
 var redTank = './assets/red-tank.svg';
 var redRicochet = './assets/red-ricochet.svg';
 var redSemiricochet = './assets/red-semiricochet.svg';
 var redTitan = './assets/red-titan.svg';

 var player1time = 30;
 var player2time = 30;
 var boardStatus = [
    blackCanon,blackTank,blackRicochet,blackSemiricochet,blackTitan,'','','',
                   '','','','','','','','',
                   '','','','','','','','',
                   '','','','','','','','',
                   '','','','','','','','',
                   '','','','','','','','',
                   '','','','','','','','',
                   '','','',redCanon,redTank,redRicochet,redSemiricochet,redTitan ]

var selectedBoxes = [];
var gamestatus = true;
var i; var c;

function randomArrangement()
{

}

function pauseGame()
{
   gamestatus = false;
}

function resumeGame()
{
   gamestatus = true;
   
}

function resetGame()
{
   gamestatus = true;
   randomArrangement();
   player1time = 30;
   player2time = 30;
   populateGrid();
}

 function populateGrid()
{   if(gamestatus==false)
    {
        alert("game paused");
        return;
    }
    const parent = document.getElementById('grid-Container');
    var h = 0;
    var c = 0;
    for( i=1;i<=64;i++)
        {
            const child = document.createElement("div");
            if((i+h)%2==1)
                {
                    child.setAttribute('style','border-style: solid; border-width: thin; width:80px ; height: 80px;background-color:grey;');
                }
                else
                {
                    child.setAttribute('style','border-style: solid; border-width: thin; width:80px ; height: 80px;background-color:green ;');
                }
                child.setAttribute('id','box-'+i);
                child.setAttribute('class','box ');
            // child.innerHTML = i;
            parent.appendChild(child);
            if(i%8==0)
                {
                    h++;
                }
            if(boardStatus[i-1]=='')
                {
                    continue;
                }
            const svg = document.createElement("img");
            svg.setAttribute( 'width','80px');
            svg.setAttribute( 'height','80px');
            
          
            svg.setAttribute('src',boardStatus[i-1]);
            svg.setAttribute('alt',i);
            svg.setAttribute('id',boardStatus[i-1].split("/")[2]);
            svg.setAttribute('style',' align-content: center; ');
            // c = i-1;
            svg.addEventListener('click',()=>{ move(svg.alt) } );
            child.appendChild(svg);
            
        }
       
    player1timer(1);
    player2timer(0);
 }

 var selectedBoxfound = false;
   function move(i)
 {  if(gamestatus==false)
    {
        alert("game paused");
        return;
    }

    i = +(i-1);
    unlighten(selectedBoxes)
    selectedBoxes = [];
    // alert("hi");
    console.log(i-8>=0 && boardStatus[i-8]=='' )

       if(i-8>=0 && boardStatus[i-8]=='')
        {  console.log("1");
           selectedBoxes.push(i-8);
        }
        if(i-8-1>=0 && (i-8)%8!=0 && boardStatus[i-8-1]=='')
        {    console.log("2");
            selectedBoxes.push(i-8-1);
        }
        if(i-8+1>=0 && (i-8+1)%8!=0 && boardStatus[i-8+1]=='')
        {    console.log("3");
            selectedBoxes.push(i-8+1);
        }
        if(i-1>=0 && i%8!=0 && boardStatus[i-1]=='')
            {    console.log("4");
                selectedBoxes.push(i-1);
            }
        if(i+8<=63 && boardStatus[i+8]=='')
        {    console.log("5");
            selectedBoxes.push(i+8);
        }
        if(i+8-1<=63 && (i+8)%8!=0 && boardStatus[i+8-1]=='')
        {    console.log("6");
            selectedBoxes.push(i+8-1);
        }
        if(i+8+1<=63 && (i+8+1)%8!=0 && boardStatus[i+8+1]=='')
        {    console.log("7");
            selectedBoxes.push(i+8+1);
        }
        if(i+1<=63 && (i+1)%8!=0 && boardStatus[i+1]=='')
            {    console.log("8");
                selectedBoxes.push(i+1);
            }
            
    lighten(selectedBoxes,i);
    //unlighten(selectedBoxes);    
 }

 var eventhandler = ()=>{ };
function lighten(selectedBoxes,i)
{   
    console.log(selectedBoxes);
    selectedBoxes.map((val)=>{
        const child = document.getElementById('box-'+(val+1));
        child.classList.add('lighten');
         eventhandler = ()=>
        {   
            selectedBoxClicked(i,val);
        }
        child.addEventListener("click",eventhandler)
    })
}

function selectedBoxClicked(i,val)
{  if(gamestatus==false)
    {
        alert("game paused");
        return;
    }
   console.log("interchanged");
   console.log(i+"  "+val); // working
   const child1 = document.getElementById('box-'+(i+1))
   const child2 = document.getElementById('box-'+(val+1))
   const svg = document.getElementById(boardStatus[i].split("/")[2])
   var temp = boardStatus[i];
   boardStatus[i] = boardStatus[val];
   boardStatus[val] = temp;
   svg.setAttribute('src',boardStatus[val]);
   svg.setAttribute('alt',(val+1));
   svg.setAttribute('id',boardStatus[val].split("/")[2]);
   child1.removeChild(svg);
   child2.appendChild(svg);

   if(boardStatus[val].indexOf("red")!=-1)
    {   console.log("hello");
        player1timer(0);
        player2timer(1);
        shootBullet("red");
    }
    else if(boardStatus[val].indexOf("black")!=-1)
    {   console.log("pamello")
        player1timer(1);
        player2timer(0);
        shootBullet("black");
    }
   
   unlighten(selectedBoxes);
   selectedBoxes = [];
} 
function unlighten(selectedBoxes)
{   
    selectedBoxes.map((val)=>{
        const child = document.getElementById('box-'+(val+1));
        child.classList.remove('lighten');
        child.removeEventListener("click",eventhandler)
    })
    selectedBoxes = [];
    //selectedBoxfound = false;
}

var x ;
function player1timer(status)
{ 
console.log(status)

//var countDownDate = new Date("Jan 5, 2027 15:37:31").getTime();
var minutes = 0;

if(status==0)
    {
        seconds = 30;
        document.getElementById("Player-1-timer").innerHTML = minutes + "m :" + seconds + "s ";
        player1time = 30;
       // console.log("status is 0-1")
        clearInterval(x);
        return;
    }
    else if(status==1)
        {
             x = setInterval(function() {

                //var now = new Date().getTime();
              
                //var distance = countDownDate - now;
                if(gamestatus==false)
                    {
                        player1time++;
                    }
                minutes = 0;
                var seconds = player1time;
             //   console.log("status is 1-1")
                document.getElementById("Player-1-timer").innerHTML = minutes + "m :" + seconds + "s ";
               // console.log("player1 timer"+minutes+"  "+seconds);
                
                if (player1time < 0) {
                  clearInterval(x);
                  document.getElementById("Player-1-timer").innerHTML = "PLAYER 2 WON";
                //  alert("Player 2 won");
                }
                player1time--;
              }, 1000);
        }

}
var y;
function player2timer(status)
{  console.log(status);
//var countDownDate = new Date("Jan 5, 2027 15:37:31").getTime();
 var minutes = 0;
 if(status==0)
    {
        seconds = 30;
        document.getElementById("Player-2-timer").innerHTML = minutes + "m :" + seconds + "s ";
        clearInterval(y);
        player2time = 30;
       // console.log("status is 0-2")
        return;
    }
    else if(status == 1)
        {
                y = setInterval(function() {

                //var now = new Date().getTime();
                if(gamestatus==false)
                    {
                        player2time++;
                    }
                //var distance = countDownDate - now;
            //    console.log("status is 0-2")
                  minutes = 0;
                  var seconds = player2time;
                  
                  document.getElementById("Player-2-timer").innerHTML = minutes + "m :" + seconds + "s ";
                  //console.log("player2 timer"+minutes+"   "+seconds);
                  
                  if (player2time < 0) {
                    clearInterval(y);
                    document.getElementById("Player-2-timer").innerHTML = "PLAYER 1 WON";
                 //   alert("Player 1 won");
                  }
                  player2time--;
                }, 1000);
        }

}

function calculateDifferenceForCanon(color)
{  var diff ; var index1; var index2; var ObjectHit = '';
   if(color == "red")
    {
          index1 = boardStatus.indexOf(redCanon);
          index2 = index1-8;
         while(boardStatus[index2]=='' && index2>=0)
            {
                index2 = index2 - 8;
            }
            ObjectHit = boardStatus[index2];
            diff = (index1-index2)/8;
    }
    else if(color == "black")
        {
             index1 = boardStatus.indexOf(blackCanon);
             index2 = index1+8;
            while(boardStatus[index2]=='' && index2<=63)
               {
                   index2 = index2 + 8;
               }
               ObjectHit = boardStatus[index2];
               diff = (index2 - index1)/8;
        }
        return [index1,index2,diff,ObjectHit];
}
async function shootBullet(color)
{
   var [index1,index2,diff,ObjectHit] = calculateDifferenceForCanon(color);
   var bullet = (color=="red")?('./assets/red-bullet.svg'):('./assets/black-bullet.svg');
   const svg = document.createElement("img");
   svg.setAttribute( 'width','80px');
   svg.setAttribute( 'height','80px');
   svg.setAttribute('src',bullet);
   svg.setAttribute('style',' align-content: center; ');
   if(color=="red")
    {
        index1 = index1-8;
    
    var box = document.getElementById('box-'+(index1+1));
    box.appendChild(svg);
    var x = setInterval(function(){
        box.removeChild(svg);
        console.log("bullet fired")
        index1 = index1-8;
        if(index1<index2)
            {  hittingObject(ObjectHit);
               clearInterval(x);
            }
      box = document.getElementById('box-'+(index1+1));
      box.appendChild(svg);
    },250)
    }
    else{
        index1 = index1+8;
        var box = document.getElementById('box-'+(index1+1));
        box.appendChild(svg);
        var x = setInterval(function(){
            box.removeChild(svg);
            console.log("bullet fired")
            index1 = index1+8;
            if(index1>index2)
                {  hittingObject(ObjectHit);
                   clearInterval(x);
                }
          box = document.getElementById('box-'+(index1+1));
          box.appendChild(svg);
        },250)
    }
    
}

function hittingObject(ObjectHit)
{   // multiple hits through rico and semirico
    // others == ignore or crash
    console.log(ObjectHit);
    if(ObjectHit.indexOf("titan")!=-1)
        {
            winningLogic(ObjectHit);
        }
}
function winningLogic(ObjectHit)
{
   if(ObjectHit.indexOf("black")!=-1)
    {
        alert("red won");
    }
    else
    {
        alert("black won");
    }
}
function makeSound()
{

}
function rotatePiece()
{

}

function gameChanceController()
{

}

function saveToStorage()
{
    
}

function undo()
{

}

function redo()
{

}

function displayStorage()
{
    
} 