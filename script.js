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
var i; var c;
 function populateGrid()
{ 
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
            c = i-1;
            svg.addEventListener('click',()=>{ move(svg.alt) } );
            child.appendChild(svg);
            
        }
        //  var k = -1;
        // boardStatus.map((val)=>{
        //     k++;
        //     if(val!='')
        //         { 
        //             document.getElementById(val.split("/")[2]).addEventListener("click",()=>{
        //                 move(k);
        //             })
        //         }
        // })
    // var Boxes = document.getElementsByClassName('box');
    //  var j = 0;
    player1timer();
    player2timer();
 }

   function move(i)
 {  //var i =c;
    //console.log(i);
    i = +(i-1);
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
    lighten(selectedBoxes);
    //unlighten(selectedBoxes);    
 }

function lighten(selectedBoxes)
{   console.log(selectedBoxes);
    selectedBoxes.map((val)=>{
        const child = document.getElementById('box-'+(val+1));
        child.classList.add('lighten');
    })
}

function unlighten(selectedBoxes)
{
    selectedBoxes.map((val)=>{
        const child = document.getElementById('box-'+(val+1));
        child.classList.remove('lighten');
    })
}


function player1timer()
{
//var countDownDate = new Date("Jan 5, 2027 15:37:31").getTime();

var x = setInterval(function() {

  //var now = new Date().getTime();

  //var distance = countDownDate - now;

  var minutes = 0;
  var seconds = player1time;

  document.getElementById("Player-1-timer").innerHTML = minutes + "m :" + seconds + "s ";
 // console.log("player1 timer"+minutes+"  "+seconds);
  
  if (player1time < 0) {
    clearInterval(x);
    document.getElementById("Player-2-timer").innerHTML = "PLAYER 2 WON";
    alert("Player 2 won");
  }
  player1time--;
}, 1000);
}

function player2timer()
{
//var countDownDate = new Date("Jan 5, 2027 15:37:31").getTime();

var x = setInterval(function() {

//var now = new Date().getTime();

//var distance = countDownDate - now;

  var minutes = 0;
  var seconds = player2time;

  document.getElementById("Player-2-timer").innerHTML = minutes + "m :" + seconds + "s ";
  //console.log("player2 timer"+minutes+"   "+seconds);
  
  if (player2time < 0) {
    clearInterval(x);
    document.getElementById("Player-2-timer").innerHTML = "PLAYER 1 WON";
    alert("Player 1 won");
  }
  player2time--;
}, 1000);
}