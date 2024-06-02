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

//  var redBullet = {

//  }
isDirectionalBulletOptionPresent = false;
isRotationOptionForRicoSemiricoPresent = false;
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
                   '','','',redTitan,redTank,redRicochet,redSemiricochet,redCanon ]

var selectedBoxes = [];
var gamestatus = true;
var gameChance = "red";

var i; var c;

var direction = ["left","right","up","down"];
// default orientation is taken to be right 
var orientationPawn = {
    "red-ricochet":"right",
    "red-semiricochet":"right",
   // "red-tank":"right",
    "canon-red":"up",
    "black-ricochet":"right",
    "black-semiricochet":"right",
  //  "black-tank":"right",
    "canon-black":"down"
}
function randomArrangement()
{   boardStatus[boardStatus.indexOf(redCanon)] = '';
    boardStatus[boardStatus.indexOf(blackCanon)] = '';
    for (let i = boardStatus.length - 2; i > 1; i--) {
        const j = Math.floor(Math.random() * (i + 2));
        [boardStatus[i], boardStatus[j]] = [boardStatus[j], boardStatus[i]]; // Swap elements
    }
    console.log(boardStatus);
    var upperRow = [];
    var LowerRow = [];
    for(let i=0;i<=7;i++)
        {
            if(boardStatus[i]=='')
                {
                   upperRow.push(i);
                }
        }
    for(let i=56;i<=63;i++)
        {
            if(boardStatus[i]=='')
                {
                   LowerRow.push(i);
                }
        }
    console.log(upperRow);
    console.log(LowerRow);
    for (let i = upperRow.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [upperRow[i], upperRow[j]] = [upperRow[j], upperRow[i]]; // Swap elements
        }
    for (let i = LowerRow.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [LowerRow[i], LowerRow[j]] = [LowerRow[j], LowerRow[i]]; // Swap elements
        }
        console.log(upperRow);
    console.log(LowerRow);
    boardStatus[upperRow[0]] = blackCanon;
    boardStatus[LowerRow[0]] = redCanon;
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
    //  localStorage.clear();
   gamestatus = true;
   randomArrangement();
   player1time = 30;
   player2time = 30;
   player1timer(0);
   player1timer(0);
   unpopulateGrid();
   populateGrid();
}

function unpopulateGrid()
{
    const parent = document.getElementById('grid-Container');
    for(let i=1;i<=64;i++)
        {
            parent.removeChild(document.getElementById('box-'+i));
        }
    localStorage.removeItem("hello");
}
var svgEventListener = []
var parent;

function saveInitialConfiguration(initial_config)
{  console.log(JSON.stringify(initial_config)); 
   localStorage.setItem("hello",JSON.stringify(boardStatus));
}

 function populateGrid()
{   if(gamestatus==false)
    {
        alert("game paused");
        return;
    }
   // saveInitialConfiguration(boardStatus);
   localStorage.setItem("hello",JSON.stringify(boardStatus));
    parent = document.getElementById('grid-Container');
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
            var eventhandlerForSvg = ()=>{
               move(svg.alt);
            }
            svg.addEventListener('click',eventhandlerForSvg);
            svgEventListener.push({
                "id":boardStatus[i-1],
                "eventListener" : eventhandlerForSvg
            })
            child.appendChild(svg);
        }
       
    player1timer(1);
    player2timer(0);
   // gameChanceController();
    localStorage.clear();
 }

//  var selectedBoxfound = false;
function validate(index)
{
   if(boardStatus[index].indexOf(gameChance)==-1)
        {
            alert("its chance of "+gameChance);
            return false;
        }
        else
        {
            return true;
        }
}
// blurring of the resume and etc. btns
// automatically coming and going of option of rotate left, right ,up, down , for rico and semirico
// tank rotation to be thought of  
function removerotateOptionsForRicoAndSemirico(index)
{
    const playerNo = (boardStatus[index].indexOf("red")!=-1)?1:2;
    const parentDiv = document.getElementById("Player-"+playerNo+"-flex");
    const childDiv  = document.getElementById("rotateDivRicoSemiRico");
    const message = document.getElementById("rotateMessage");
    console.log(parentDiv);
    console.log(childDiv);
    console.log(message);
    parentDiv.removeChild(childDiv);
    parentDiv.removeChild(message);
}
function rotateOptionsForRicoAndSemirico(index)
{   
    const playerNo = (boardStatus[index].indexOf("red")!=-1)?1:2;
    const parentDiv = document.getElementById("Player-"+playerNo+"-flex");
    const childDiv  = document.createElement("div");
    childDiv.setAttribute("id","rotateDivRicoSemiRico");
    childDiv.classList.add("rotateDiv");

    const up = document.createElement("button");
    const down = document.createElement("button");
    const right = document.createElement("button");
    const left = document.createElement("button");
            
    up.innerHTML = "up";
    down.innerHTML = "down";
    right.innerHTML = "right";
    left.innerHTML = "left";
    up.addEventListener("click",()=>{rotatePieceup(index)} );
    down.addEventListener("click",()=>{rotatePiecedown(index)} );
    right.addEventListener("click",()=>{rotatePieceright(index)} );
    left.addEventListener("click",()=>{rotatePieceleft(index)} );

    if(boardStatus[index].indexOf("semiricochet")!=-1)
        {
            childDiv.appendChild(up);
            childDiv.appendChild(left);
            childDiv.appendChild(right);
            childDiv.appendChild(down);
        }
    else
    {
        childDiv.appendChild(left);
        childDiv.appendChild(right);
    }
    const message = document.createElement("div");
    message.setAttribute("id","rotateMessage");
    message.innerHTML = (boardStatus[index].split("/")[2]).split(".")[0];
    if(parentDiv.childElementCount==2)
        {
           parentDiv.appendChild(message);
           parentDiv.appendChild(childDiv);
        }
}
function rotatePieceleft(index)
{  console.log("left rotated")
   const piece = document.getElementById(boardStatus[index].split("/")[2]);
   //piece.setAttribute('style',"align-content: center; transform : rotate(-90deg);");
   piece.classList.add("rotateLeft");
   piece.classList.remove("rotateUp");
   piece.classList.remove("rotateDown");
   var pieceName = boardStatus[index].split("/")[2].split('.')[0];
   orientationPawn[pieceName] = "left";
   unlighten(selectedBoxes);
   changeChance();
   removerotateOptionsForRicoAndSemirico(index);
}

function rotatePieceright(index)
{   console.log("right rotated")
    const piece = document.getElementById(boardStatus[index].split("/")[2]);
   //piece.setAttribute('style',"align-content: center; transform : rotate(90deg);");
   piece.classList.remove("rotateLeft");
   piece.classList.remove("rotateUp");
   piece.classList.remove("rotateDown");
   var pieceName = boardStatus[index].split("/")[2].split('.')[0];
   orientationPawn[pieceName] = "right";
   unlighten(selectedBoxes);
   changeChance();
   removerotateOptionsForRicoAndSemirico(index);
}

// rotation and bullet firing undo redo storage
function rotatePieceup(index)
{
    const piece = document.getElementById(boardStatus[index].split("/")[2]);
   //piece.setAttribute('style',"align-content: center; transform : rotate(-180deg);");
   piece.classList.add("rotateUp");
   piece.classList.remove("rotateLeft");
   piece.classList.remove("rotateDown");
   var pieceName = boardStatus[index].split("/")[2].split('.')[0];
   orientationPawn[pieceName] = "up";
   unlighten(selectedBoxes);
   changeChance();
   removerotateOptionsForRicoAndSemirico(index);
}

function rotatePiecedown(index)
{
    const piece = document.getElementById(boardStatus[index].split("/")[2]);
   //piece.setAttribute('style',"align-content: center; transform : rotate(180deg);");
   piece.classList.add("rotateDown");
   piece.classList.remove("rotateUp");
   piece.classList.remove("rotateLeft");
   var pieceName = boardStatus[index].split("/")[2].split('.')[0];
   orientationPawn[pieceName] = "down";
   unlighten(selectedBoxes);
   changeChance();
   removerotateOptionsForRicoAndSemirico(index);
}


   function move(i)
 {  if(gamestatus==false)
    {
        alert("game paused");
        return;
    }
    // if()
    i = +(i-1);
    if(!validate(i))
    {
            return;
    }
    // if(isDirectionalBulletOptionPresent==true)
    //     {
    //         removedirectionalBulletShootOption(i);
    //     }
    // if(isRotationOptionForRicoSemiricoPresent = true)
    //     {
    //         removerotateOptionsForRicoAndSemirico(i);
    //     }
    unlighten(selectedBoxes)
    selectedBoxes = [];
    const isCanon = (boardStatus[i]==blackCanon || boardStatus[i]==redCanon)
    console.log(i-8>=0 && boardStatus[i-8]==''  )

       if(i-8>=0 && boardStatus[i-8]=='' && (!isCanon) )
        {  
           selectedBoxes.push(i-8);
        }
        if(i-8-1>=0 && (i-8)%8!=0 && boardStatus[i-8-1]=='' && (!isCanon) )
        {    
            selectedBoxes.push(i-8-1);
        }
        if(i-8+1>=0 && (i-8+1)%8!=0 && boardStatus[i-8+1]=='' && (!isCanon) )
        {   
            selectedBoxes.push(i-8+1);
        }
        if(i-1>=0 && i%8!=0 && boardStatus[i-1]=='' )
            {  
                selectedBoxes.push(i-1);
            }
        if(i+8<=63 && boardStatus[i+8]=='' && (!isCanon) )
        {   
            selectedBoxes.push(i+8);
        }
        if(i+8-1<=63 && (i+8)%8!=0 && boardStatus[i+8-1]=='' && (!isCanon) )
        {   
            selectedBoxes.push(i+8-1);
        }
        if(i+8+1<=63 && (i+8+1)%8!=0 && boardStatus[i+8+1]=='' && (!isCanon) )
        {   
            selectedBoxes.push(i+8+1);
        }
        if(i+1<=63 && (i+1)%8!=0 && boardStatus[i+1]=='')
            {   
                selectedBoxes.push(i+1);
            }
            
    if(boardStatus[i].indexOf("ricochet")!=-1 && boardStatus[i].indexOf("semiricochet")==-1)
        {
            ricochetSwapOption(i);
        }
    if(boardStatus[i].indexOf("ricochet")!=-1 || boardStatus[i].indexOf("semiricochet")!=-1)
        {
            rotateOptionsForRicoAndSemirico(i);
        }
    if(isCanon)
        {
            directionalBulletShootOption(i);
        }
    lighten(selectedBoxes,i);
    //unlighten(selectedBoxes);   // focus required 

 }

var selectedChildren = []
function lighten(selectedBoxes,i)
{   
    console.log(selectedBoxes);
    
    selectedChildren = selectedBoxes.map((val)=>{
        var eventhandler = ()=>
            {   
                selectedBoxClicked(i,val,false);
            }
        const child = document.getElementById('box-'+(val+1));
        child.classList.add('lighten');
        child.addEventListener("click",eventhandler);
            return {
                "child":child,
                "eventhandler":eventhandler
            }
    })
}

function selectedBoxClicked(i,val,fromWhere)
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
   if(boardStatus[i].split("/")[2].indexOf("ricochet")!=-1)
    {
        removerotateOptionsForRicoAndSemirico(i);
    }
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
      if(fromWhere==false)
        {
        player1timer(0);
        player2timer(1);
        changeChance();
        // can replace above two lines with gameChanceController
        }

        shootBullet("red");
    }
    else if(boardStatus[val].indexOf("black")!=-1)
    {   console.log("pamello")
    if(fromWhere==false)
        {
            player1timer(1);
            player2timer(0);
            changeChance();
        }
        shootBullet("black");
    }
   saveToStorage(i,val,"move");
   makeSound("piecemove");
   unlighten(selectedBoxes);
   selectedBoxes = [];
//    if(isDirectionalBulletOptionPresent = true)
//     {
//         removedirectionalBulletShootOption(i)
//     }
} 
function unlighten(selectedBoxes)
{   
    selectedChildren.map((val)=>{
        const child = val["child"];
        child.classList.remove('lighten');
        child.removeEventListener("click",val["eventhandler"])
    })
    selectedChildren = [] ; // feel the power of Javascript Objects
    selectedBoxes = [];
    unlightenSwap(selectedBoxesforSwap);
    
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
    // var bullet = (color=="red")?('./assets/red-bullet.svg'):('./assets/black-bullet.svg');

    var bullet_red = './assets/red-bullet.svg';
    const red_bullet = document.createElement("img");
    red_bullet.setAttribute( 'width','80px');
    red_bullet.setAttribute( 'height','80px');
    red_bullet.setAttribute('src',bullet_red);
    red_bullet.setAttribute('style',' align-content: center; ');

    var bullet_black = './assets/black-bullet.svg';
    const black_bullet = document.createElement("img");
    black_bullet.setAttribute( 'width','80px');
    black_bullet.setAttribute( 'height','80px');
    black_bullet.setAttribute('src',bullet_black);
    black_bullet.setAttribute('style',' align-content: center; ');

// Needs improvement
function moveBullet(index1,color,diff,direction)
{
    console.log("the values are "+index1+"  "+color+"  "+diff+"  "+direction);
    
    // if(color=="red")
    //  {
    //      index1 = index1-8;
     
    //  var box = document.getElementById('box-'+(index1+1));
    //  box.appendChild(svg);
    //  
    //  var x = setInterval(function(){
    //       box.removeChild(svg);
    //      console.log("bullet fired")
    //      index1 = index1-8;
    //      if(index1<index2)
    //          {  hittingObject(ObjectHit);
    //             clearInterval(x);
    //          }
    //    box = document.getElementById('box-'+(index1+1));
    //    box.appendChild(svg);
    //    svg.setAttribute('style','transform: translateY(80px);')
    //  },250)
    // // box.removeChild(svg);
    //  }
    //  else{
    //      index1 = index1+8;
    //      var box = document.getElementById('box-'+(index1+1));
    //      box.appendChild(svg);
    //      makeSound("bulletshoot");
    //      var x = setInterval(function(){
    //          box.removeChild(svg);
    //          console.log("bullet fired")
    //          index1 = index1+8;
    //          if(index1>index2)
    //              {  hittingObject(ObjectHit);
    //                  console.log("came out")
    //                 clearInterval(x);
    //              }
    //        box = document.getElementById('box-'+(index1+1));
           
    //        box.appendChild(svg);
    //      },250)
 
    //  }
    var bullet = (color=="red")?(red_bullet):(black_bullet);
    var box = document.getElementById('box-'+(index1+1));
    box.appendChild(bullet);
    var moveMagnitude = 80*diff;
    if(direction=="up")
    {
        bullet.setAttribute("style",' align-content: center; transform : translateY('+moveMagnitude+'px);');
    }
    else if(direction=="down")
    {
        bullet.setAttribute("style",' align-content: center; transform : translateY('+(-1*moveMagnitude)+'px);');
    }
    else if(direction=="right")
    {
        bullet.setAttribute("style",' align-content: center; transform : translateX('+moveMagnitude+'px);');
    }
    else if(direction=="left")
    {
        bullet.setAttribute("style",' align-content: center; transform : translateX('+(-1*moveMagnitude)+'px);');
    }
}
// think about condition of non hitting anything also
function calculateLeftBulletDifference(index1,color,direction)
{    var diff; var index2; var ObjectHit;
     if(index1%8==0)
    {
        diff = 0;
    }
    else
    {  
        index2 = index1-1;
         while((boardStatus[index2]==''|| boardStatus[index2]==blackCanon || boardStatus[index2] == redCanon ) && (index2+1)%8==0)
            {
                index2 = index2 - 1;
            }
            if((index2+1)%8==0)
                {
                    index2 = index2 + 1;
                    ObjectHit = null;
                }
                else
                {
                    ObjectHit = boardStatus[index2];
                }
            diff = (index1-index2);
    }
    moveBullet(index1,color,diff,direction);
    hittingObject(ObjectHit);
}

function calculateRightBulletDifference(index1,color,direction )
{
    var diff; var index2; var ObjectHit;
    if((index1+1)%8==0)
   {
       diff = 0;
   }
   else
   {
       index2 = index1+1;
        while((boardStatus[index2]==''|| boardStatus[index2]==blackCanon || boardStatus[index2] == redCanon ) && index2%8!=0)
           {
               index2 = index2 + 1;
           }
           if(index2%8==0)
               {
                   index2 = index2 - 1;
                   ObjectHit = null;

               }
               else
               {
                ObjectHit = boardStatus[index2];
               }  
           diff = (index2-index1);
   }
   moveBullet(index1,color,diff,direction);
   hittingObject(ObjectHit);
}

function calculateVerticalDifferenceForCanon(index1,color,direction)
{  var diff ; // var index1;
   // please check - removing the outermost condition 
   // if bullet hits canon what to do
     var index2; var ObjectHit = '';
   if(color == "red")
    {     if(direction=="up")
        {

          // index1 = boardStatus.indexOf(redCanon);
          index2 = index1-8;
         while((boardStatus[index2]==''|| boardStatus[index2]==blackCanon ) && index2>=0)
            {
                index2 = index2 - 8;
            }
            if(index2<0)
                {
                    index2 = index2 + 8;
                }
            ObjectHit = boardStatus[index2];
            diff = (index1-index2)/8;
        }
        else if(direction=="right")
            {
                calculateRightBulletDifference(index1,color,direction )
            }
        else if(direction=="left")
            {
                calculateLeftBulletDifference(index1,color,direction);
            }
        else if(direction=="down")
            {
             index2 = index1+8;
            while((boardStatus[index2]==''|| boardStatus[index2]==redCanon) && index2<=63)
               {
                   index2 = index2 + 8;
               }
               if(index2>63)
                {
                    index2 = index2 - 8;
                }
               ObjectHit = boardStatus[index2];
               diff = (index2 - index1)/8;
            }
    }
    else if(color == "black")
        {    
            if(direction=="down")
            {
            // index1 = boardStatus.indexOf(blackCanon);
             index2 = index1+8;
            while((boardStatus[index2]==''|| boardStatus[index2]==redCanon) && index2<=63)
               {
                   index2 = index2 + 8;
               }
               if(index2>63)
                {
                    index2 = index2 - 8;
                    ObjectHit = null;
                }
                else
                {
                    ObjectHit = boardStatus[index2];
                }
               diff = (index2 - index1)/8;
            }
            else if(direction=="right")
                {
                    calculateRightBulletDifference(index1,color,direction );
                }
            else if(direction=="left")
                {
                    calculateLeftBulletDifference(index1,color,direction);
                }
            else if(direction=="up")
                {
                  index2 = index1-8;
                 while((boardStatus[index2]==''|| boardStatus[index2]==blackCanon ) && index2>=0)
                    {
                        index2 = index2 - 8;
                    }
                    if(index2<0)
                        {
                            index2 = index2 + 8;
                            ObjectHit = null;
                        }
                        else
                        {
                            ObjectHit = boardStatus[index2];
                        }
                    diff = (index1-index2)/8;
                }
        }
        // return [index1,index2,diff,ObjectHit];
        moveBullet(index1,color,diff,direction);
        hittingObject(ObjectHit);
}
async function shootBullet(color)
{  var canon = (color=="red")?redCanon:blackCanon;
   makeSound("bulletshoot");
   var index = boardStatus.indexOf(canon);
   var direction = orientationPawn[canon.split('/')[2].split('.')[0]];
   console.log("bullet fired")
   console.log(index+"   "+color+"   "+direction);
   //var [index1,index2,diff,ObjectHit] = calculateVericalDifferenceForCanon(index,color,direction);
   calculateVerticalDifferenceForCanon(index,color,direction);
//    console.log("the values are"+index1+"  "+index2)
//    var bullet = (color=="red")?('./assets/red-bullet.svg'):('./assets/black-bullet.svg');
//    const svg = document.createElement("img");
//    svg.setAttribute( 'width','80px');
//    svg.setAttribute( 'height','80px');
//    svg.setAttribute('src',bullet);
//    svg.setAttribute('style',' align-content: center; ');
//    if(color=="red")
//     {
//         index1 = index1-8;
    
//     var box = document.getElementById('box-'+(index1+1));
//     box.appendChild(svg);
//     makeSound("bulletshoot");
//     var x = setInterval(function(){
//          box.removeChild(svg);
//         console.log("bullet fired")
//         index1 = index1-8;
//         if(index1<index2)
//             {  hittingObject(ObjectHit);
//                clearInterval(x);
//             }
//       box = document.getElementById('box-'+(index1+1));
//       box.appendChild(svg);
//       svg.setAttribute('style','transform: translateY(80px);')
//     },250)
//    // box.removeChild(svg);
//     }
//     else{
//         index1 = index1+8;
//         var box = document.getElementById('box-'+(index1+1));
//         box.appendChild(svg);
//         makeSound("bulletshoot");
//         var x = setInterval(function(){
//             box.removeChild(svg);
//             console.log("bullet fired")
//             index1 = index1+8;
//             if(index1>index2)
//                 {  hittingObject(ObjectHit);
//                     console.log("came out")
//                    clearInterval(x);
//                 }
//           box = document.getElementById('box-'+(index1+1));
          
//           box.appendChild(svg);
//         },250)

//     }
}

function hittingObject(ObjectHit)
{   // multiple hits through rico and semirico
    // others == ignore or crash
    console.log(ObjectHit);
    if(ObjectHit.indexOf("titan")!=-1)
        {
            winningLogic(ObjectHit);
        }
    else if(ObjectHit.indexOf("tank")!=-1)
        {
            ObjectHitTank();
        }
    else if(ObjectHit.indexOf("ricochet")!=-1)
        {
            ObjectHitRicochet();
        }
    else if(ObjectHit.indexOf("semiricochet")!=-1)
        {
            ObjectHitSemiRicochet();
        }
    else if(ObjectHit == null)
        {
            ObjectHitNothing();
        }
}
   function winningLogic(ObjectHit)
{
   if(ObjectHit.indexOf("black")!=-1)
    {   
        makeSound("gameover");
        alert("red won");
    }
    else
    {   
        makeSound("gameover");
        alert("black won");
    }
}

function ObjectHitTank()
{

}

function ObjectHitRicochet()
{

}

function ObjectHitSemiRicochet()
{

}

function makeSound(sound)
{
const pieceMovingAudio = new Audio('./assets/audio/chess-piece-moving.mp3');
const GameOverAudio = new  Audio('./assets/audio/game-over-31-179699.mp3');
const shootBulletAudio = new Audio('./assets/audio/bullet-hit-metal-84818.mp3');
const audio = {
    "bulletshoot" : shootBulletAudio,
    "gameover" : GameOverAudio,
    "piecemove" : pieceMovingAudio
}

  audio[sound].play();
  
}

function gameChanceController()
{
   if(gameChance == "red")
    {
        player1timer(1);
        player2timer(0);
    }
    else
    {
        player1timer(0);
        player2timer(1);
    }
    changeChance();
}

function changeChance()
{
    if(gameChance=="red")
        {
            gameChance = "black";
        }
      else{
        gameChance = "red"
      }
}
var steps = 0;
var revSteps = 0;
function saveToStorage(index1,index2,action)
{  
    var piece = boardStatus[index2].split('/')[2];
    steps++;
   var x1 = Math.floor((index1/8));  //(index1/8)+1
   var y1 = Math.floor((index1%8));  //(index1%8)+1
   var x2 = Math.floor((index2/8));  //(index2/8)+1
   var y2 = Math.floor((index2%8));  //(index2%8)+1
   
   if(action=="move")
    {
   localStorage.setItem(steps,"("+x1+","+y1+") to ("+x2+","+y2+")"+"/"+piece);
   displayStorage(piece,x1,y1,x2,y2,steps,"move");
   console.log(piece.split('.')[0])
    }
    else if(action=="swap")
    {   
        var piece2 = boardStatus[index1].split('/')[2];
        localStorage.setItem(steps,"("+x1+","+y1+") swapped to ("+x2+","+y2+")/"+piece+"/"+piece2);
        displayStorage(piece,x1,y1,x2,y2,steps,"swap");
        displayStorage(piece2,x2,y2,x1,y1,steps,"swap");
    }
    else if(action=="rotate")
        { var rotatedPiece = boardStatus[index1].split('/')[2].split('.')[0];
          let directionOfPiece = orientationPawn[rotatedPiece];
          localStorage.setItem(steps,"rotated at ("+x1+","+y1+") "+directionOfPiece+"/"+rotatedPiece);
          displayStorage(rotatedPiece,x1,y1,directionOfPiece,null,steps,"rotate");
        }
}

// from,to,rotated array
function undo()
{
   var data = localStorage.getItem(steps).split('/')[1];
   var piece = localStorage.getItem(steps).split('/')[0];
   var x1 = +data[1]-1;
   var y1 = +data[3]-1;
   var x2 = +data[10]-1;
   var y2 = +data[12]-1;
   var index1 = 8*x1+y1;
   var index2 = 8*x2+y2;
   selectedBoxClicked(index2,index1,true); // true indicates that this function is being called from redo or undo
   revSteps--;
   localStorage.setItem(revSteps,piece+"/"+"("+(x1+1)+","+(y1+1)+") to ("+(x2+1)+","+(y2+1)+")");
   localStorage.removeItem(--steps);
}

function redo()
{
    var data = localStorage.getItem(revSteps);
    var x1 = +data[1]-1;
    var y1 = +data[3]-1;
    var x2 = +data[10]-1;
    var y2 = +data[12]-1;
    var index1 = 8*x1+y1;
    var index2 = 8*x2+y2;
    selectedBoxClicked(index1,index2,true); 
    localStorage.removeItem(revSteps);
    revSteps++;
    
}

function displayStorage(piece,x1,y1,x2,y2,steps,action)
{   if(action!="rotate")
    {
        piece = piece.split('.')[0];
    }
    var data;
    if(action=="move")
        {
             data = "("+(x1+1)+","+(y1+1)+") to ("+(x2+1)+","+(y2+1)+")";
        }
    else if(action=="swap")
        {
            data = "("+(x1+1)+","+(y1+1)+") swapped to ("+(x2+1)+","+(y2+1)+")";
        }
    else if(action=="rotate")
        {
            data = "rotated "+x2+" at ("+x1+","+y1+")";
        }
    if(piece.indexOf("red")!=-1)
        {
             const display = document.getElementById("Player-1-history");
             const message = document.createElement("div");
             message.setAttribute('id',"message-"+steps+"red");
             message.setAttribute('style','color:yellow');
             message.innerHTML = piece + ":"+data;
             display.appendChild(message);
        }
    else
        {
             const display = document.getElementById("Player-2-history");
             const message = document.createElement("div");
             message.setAttribute('id',"message-"+steps+"black");
             message.setAttribute('style','color:white');
             message.innerHTML = piece + ":"+data;
             display.appendChild(message);
        }
} 

var selectedBoxesforSwap = [];
function ricochetSwapOption(index)
{
   //unlightenSwap(selectedBoxesforSwap);
   selectedBoxesforSwap = [];
   if(index-8>=0 && boardStatus[index-8]!='' && boardStatus[index-8].indexOf("titan")==-1)
        {  
           selectedBoxesforSwap.push(index-8);
        }
        if(index-8-1>=0 && (index-8)%8!=0 && boardStatus[index-8-1]!='' && boardStatus[index-8-1].indexOf("titan")==-1)
        {    
            selectedBoxesforSwap.push(index-8-1);
        }
        if(index-8+1>=0 && (index-8+1)%8!=0 && boardStatus[index-8+1]!='' && boardStatus[index-8+1].indexOf("titan")==-1)
        {   
            selectedBoxesforSwap.push(index-8+1);
        }
        if(index-1>=0 && index%8!=0 && boardStatus[index-1]!='' && boardStatus[index-1].indexOf("titan")==-1)
            {    
                selectedBoxesforSwap.push(index-1);
            }
        if(index+8<=63 && boardStatus[index+8]!='' && boardStatus[index+8].indexOf("titan")==-1)
        {    
            selectedBoxesforSwap.push(index+8);
        }
        if(index+8-1<=63 && (index+8)%8!=0 && boardStatus[index+8-1]!='' && boardStatus[index+8-1].indexOf("titan")==-1)
        {    
            selectedBoxesforSwap.push(index+8-1);
        }
        if(index+8+1<=63 && (index+8+1)%8!=0 && boardStatus[index+8+1]!='' && boardStatus[index+8+1].indexOf("titan")==-1)
        {    
            selectedBoxesforSwap.push(index+8+1);
        }
        if(index+1<=63 && (index+1)%8!=0 && boardStatus[index+1]!='' && boardStatus[index+1].indexOf("titan")==-1)
            {    
                selectedBoxesforSwap.push(index+1);
            }
    removeSvgMove(selectedBoxesforSwap);
    lightenSwap(index);
}

function removeSvgMove(selectedBoxesforSwap)
{
  var selectedSvg = svgEventListener.filter((val)=>{
      const index = boardStatus.indexOf(val["id"]);
      if(selectedBoxesforSwap.indexOf(index)!=-1)
        {
            return true;
        }
        else
        {
            return false;
        }
   })
   selectedSvg.map((val)=>{
     const svg = document.getElementById(val["id"].split("/")[2]);
     svg.removeEventListener("click",val["eventListener"]);
   })
}

function addSvgMove(selectedBoxesforSwap)
{
   var selectedSvg = svgEventListener.filter((val)=>{
      const index = boardStatus.indexOf(val["id"]);
      if(selectedBoxesforSwap.indexOf(index)!=-1)
        {
            return true;
        }
        else
        {
            return false;
        }
   })
   selectedSvg.map((val)=>{
     const svg = document.getElementById(val["id"].split("/")[2]);
     svg.addEventListener("click",val["eventListener"]);
   })
}
var selectedChildrenForSwap = []
function lightenSwap(index)
{
    console.log(selectedBoxesforSwap);
    selectedChildrenForSwap = selectedBoxesforSwap.map((val)=>{
        const child = document.getElementById('box-'+(val+1));
        child.classList.add('lightenSwap');
        var eventhandlerSwap = ()=>
        {   
            doRicochetSwap(index,val,false);
        }
        child.addEventListener("click",eventhandlerSwap);
        return{
            "child":child,
            "eventListener":eventhandlerSwap
        }
    })
   
}
function doRicochetSwap(index,val,fromWhere)
{
    if(gamestatus==false)
        {
            alert("game paused");
            return;
        }
       addSvgMove(selectedBoxesforSwap);
       console.log("swapped");
       console.log(index+"  "+val); // working
       
       const child1 = document.getElementById('box-'+(index+1))
       const child2 = document.getElementById('box-'+(val+1))
       const svg1 = document.getElementById(boardStatus[index].split("/")[2]);
       const svg2 = document.getElementById(boardStatus[val].split("/")[2]);
       var temp = boardStatus[index];
       boardStatus[index] = boardStatus[val];
       boardStatus[val] = temp;
       svg1.setAttribute('src',boardStatus[val]);
       svg1.setAttribute('alt',(val+1));
       svg1.setAttribute('id',boardStatus[val].split("/")[2]);

       svg2.setAttribute('src',boardStatus[index]);
       svg2.setAttribute('alt',(index+1));
       svg2.setAttribute('id',boardStatus[index].split("/")[2]);

       child1.removeChild(svg1);
       child2.removeChild(svg2);
       
       child1.appendChild(svg2);
       child2.appendChild(svg1);
        
       if(boardStatus[val].indexOf("red")!=-1)
        {   console.log("hello");
          if(fromWhere==false)
            {
            player1timer(0);
            player2timer(1);
            changeChance();
            // can replace above two lines with gameChanceController
            }
            
            shootBullet("red");
        }
        else if(boardStatus[val].indexOf("black")!=-1)
        {   console.log("pamello")
        if(fromWhere==false)
            {
                player1timer(1);
                player2timer(0);
                changeChance();
            } 
            // can replace above two lines with gameChanceController
            shootBullet("black");
        }
       saveToStorage(index,val,"swap");
       makeSound("piecemove");
       unlighten(selectedBoxes);
       selectedBoxes = []
       unlightenSwap(selectedBoxesforSwap);
       selectedBoxesforSwap = [];
       removerotateOptionsForRicoAndSemirico(index);
} 
function unlightenSwap()
{
    selectedChildrenForSwap.map((val)=>{
        const child = val["child"];
        child.classList.remove('lightenSwap');
        child.removeEventListener("click",val["eventListener"]);
    });
    addSvgMove(selectedBoxesforSwap);
    selectedBoxesforSwap = [];
    selectedChildrenForSwap = []
}

function rotateCanon(index,CanonDirection)
{   const canon = document.getElementById(boardStatus[index].split("/")[2]);
    //canon.setAttribute('style',"align-content: center; transform : rotate(-90deg);");
    var canonName = boardStatus[index].split("/")[2].split('.')[0];
    if(boardStatus[index].indexOf("red")!=-1)
        {
           if(CanonDirection=="up")
            {
                canon.classList.remove("rotateRight");
                canon.classList.remove("rotateLeft");
                orientationPawn[canonName] = "up";
            }
            else if(CanonDirection == "right")
            {
                canon.classList.add("rotateRight");
                canon.classList.remove("rotateLeft");
                orientationPawn[canonName] = "right";
            }
            else if(CanonDirection == "left")
            {
                canon.classList.remove("rotateRight");
                canon.classList.add("rotateLeft");
                orientationPawn[canonName] = "left";
            }
        }
        else
        {
            if(CanonDirection=="down")
                {
                    canon.classList.remove("rotateRight");
                    canon.classList.remove("rotateLeft");
                    orientationPawn[canonName] = "down";
                }
                else if(CanonDirection == "right")
                {
                    canon.classList.add("rotateRight");
                    canon.classList.remove("rotateLeft");
                    orientationPawn[canonName] = "right";
                }
                else if(CanonDirection == "left")
                {
                    canon.classList.remove("rotateRight");
                    canon.classList.add("rotateLeft");
                    orientationPawn[canonName] = "left";
                }
        }
   unlighten(selectedBoxes);
   changeChance();
   removedirectionalBulletShootOption(index);
}
// hamburger menu for some stuffs 
function removedirectionalBulletShootOption(index)
{   isDirectionalBulletOptionPresent = false;
    const playerNo = (boardStatus[index].indexOf("red")!=-1)?1:2;
    const parentDiv = document.getElementById("Player-"+playerNo+"-flex");
    const childDiv  = document.getElementById("rotateDivCanon");
    const message = document.getElementById("rotateCanonMessage");
    console.log(parentDiv);
    console.log(childDiv);
    console.log(message);
    parentDiv.removeChild(childDiv);
    parentDiv.removeChild(message);
}
function directionalBulletShootOption(index)
{   isDirectionalBulletOptionPresent = true;
    const playerNo = (boardStatus[index].indexOf("red")!=-1)?1:2;
    const parentDiv = document.getElementById("Player-"+playerNo+"-flex");
    const childDiv  = document.createElement("div");
    childDiv.setAttribute("id","rotateDivCanon");
    childDiv.classList.add("rotateDivCanon");

    const up = document.createElement("button");
    const down = document.createElement("button");
    const right = document.createElement("button");
    const left = document.createElement("button");
            
    up.innerHTML = "up";
    down.innerHTML = "down";
    right.innerHTML = "right";
    left.innerHTML = "left";
    up.addEventListener("click",()=>{rotateCanon(index,"up")} );
    down.addEventListener("click",()=>{rotateCanon(index,"down")} );
    right.addEventListener("click",()=>{rotateCanon(index,"right")} );
    left.addEventListener("click",()=>{rotateCanon(index,"left")} );

    if(boardStatus[index].indexOf("red")!=-1)
        {
            childDiv.appendChild(up);
            childDiv.appendChild(left);
            childDiv.appendChild(right);
        }
    else
    {   childDiv.appendChild(down);
        childDiv.appendChild(left);
        childDiv.appendChild(right);
    }
    const message = document.createElement("div");
    message.setAttribute("id","rotateCanonMessage");
    message.innerHTML = (boardStatus[index].split("/")[2]).split(".")[0];
    if(parentDiv.childElementCount==2)
        {
           parentDiv.appendChild(message);
           parentDiv.appendChild(childDiv);
        }
}
function directionalBulletShoot(color)
{
   
}

function destroySemiricochet()
{

}
// anti=collision, movement logic
// background music required
// swap and rotate logic in undo redo replay etc also

// Third level 

// a function which is able to take the orders of game replay and single_player_mode and take the necessary actions itself

function game_replay()
{
    //boardStatus = localStorage.getItem("hello");
    //populateGrid();
    for(let i in localStorage)
        {
            if(+i != NaN)
            {
               console.log(i);
               let info = localStorage.getItem(i);
               compileMovementRequests(info);
            }
        }
}
// synchronize all things
function compileMovementRequests(info)
{   let moveFunction;
    if(info.indexOf("to")!=-1)
        { 
            //  "("+x1+","+y1+") to ("+x2+","+y2+")"+"/"+piece
            let x1 = +info[1];
            let y1 = +info[3];
            let x2 = +info[10];
            let y2 = +info[12];
            let index1 = 8*x1+y1;
            let index2 = 8*x2+y2;
            moveFunction = ()=>{
                setTimeout(()=>{
                      move(index1);
                      setTimeout(()=>{
                        selectedBoxClicked(index1,index2,false);
                      },1000)
                },1000)
        }
        }
    else if(info.indexOf("rotated")!=-1)
        {  // "rotated at ("+x1+","+y1+") "+directionOfPiece+"/"+rotatedPiece
            let rotatedPiece = info.split('/')[1];
            let directionOfPiece = info.split('/')[0].split(' ')[3];
            let x1 = +info[12];
            let y1 = +info[14];
            let index1 = 8*x1+y1;
            if(rotatedPiece.indexOf('canon')!=-1)
                {
                    moveFunction = ()=>{
                        setTimeout(()=>{
                            move(i);
                            setTimeout(()=>{
                                rotateCanon(index1,directionOfPiece);
                            },1000)
                        },1000)
                    }
                }
                else if(rotatedPiece.indexOf('semiricochet')!=-1)
                    {
                        if(directionOfPiece.indexOf("up")!=-1)
                            {
                                moveFunction = ()=>{
                                    setTimeout(()=>{
                                        move(index1);
                                        setTimeout(()=>{
                                            rotatePieceup(index1);
                                        },1000)
                                    },1000)
                                }
                            }
                        else if(directionOfPiece.indexOf("down")!=-1)
                            {
                                moveFunction = ()=>{
                                    setTimeout(()=>{
                                        move(index1);
                                        setTimeout(()=>{
                                            rotatePiecedown(index1);
                                        },1000)
                                    },1000)
                                }
                            }
                        else if(directionOfPiece.indexOf("right")!=-1)
                            {
                                moveFunction = ()=>{
                                    setTimeout(()=>{
                                        move(index1);
                                        setTimeout(()=>{
                                            rotatePieceright(index1);
                                        },1000)
                                    },1000)
                                }
                            }
                        else if(directionOfPiece.indexOf("left")!=-1)
                            {
                                 moveFunction = ()=>{
                                    setTimeout(()=>{
                                        move(index1);
                                        setTimeout(()=>{
                                            rotatePieceleft(index1);
                                        },1000)
                                    },1000)
                                }
                            }
                    }
            else if(rotatedPiece.indexOf('ricochet')!=-1)
                {
                    if(directionOfPiece.indexOf("right")!=-1)
                        {
                            moveFunction = ()=>{
                                setTimeout(()=>{
                                    move(index1);
                                    setTimeout(()=>{
                                        rotatePieceright(index1);
                                    },1000)
                                },1000)
                            }
                        }
                        else if(directionOfPiece.indexOf("left")!=-1)
                            {
                                moveFunction = ()=>{
                                    setTimeout(()=>{
                                        move(index1);
                                        setTimeout(()=>{
                                            rotatePieceleft(index1);
                                        },1000)
                                    },1000)
                                }
                            }
                }
            
        }
    else if(info.indexOf("swapped")!=-1)
        {  
            // "("+x1+","+y1+") swapped to ("+x2+","+y2+")/"+piece+"/"+piece2
            let x1 = +info[1];
            let y1 = +info[3];
            let x2 = +info[10];
            let y2 = +info[12];
            let index1 = 8*x1+y1;
            let index2 = 8*x2+y2;
            moveFunction = ()=>{
                setTimeout(()=>{
                      move(index1);
                      setTimeout(()=>{
                        doRicochetSwap(index1,index2,false);
                      },1000)
                },1000)
        }
        }

        moveFunction(); // taking the action
}


function single_player_mode()
{
    setInterval(generateMove, 20000);
}

var singlePlayerSelectedBox = []
var singlePlayerSelectedSwapBox = []
function isRotationPossible(i)
{   var possibleFunctions = []
    let randomPiece = document.getElementById(boardStatus[i].split('/')[2]);
    if(randomPiece==blackCanon)
        {
            possibleFunctions.push(()=>{
                setTimeout(()=>{
                    move(i);
                    setTimeout(()=>{
                        rotateCanon(i,"down");
                    },1000)
                },1000)
            })
            // possibleFunctions.push(rotateCanon(i,"left"));
            // possibleFunctions.push(rotateCanon(i,"right"));
            possibleFunctions.push(()=>{
                setTimeout(()=>{
                    move(i);
                    setTimeout(()=>{
                        rotateCanon(i,"left");
                    },1000)
                },1000)
            })
            possibleFunctions.push(()=>{
                setTimeout(()=>{
                    move(i);
                    setTimeout(()=>{
                        rotateCanon(i,"right");
                    },1000)
                },1000)
            })
        }
    else if(randomPiece==blackRicochet)
        {
            // possibleFunctions.push(rotatePieceright(i));
            // possibleFunctions.push(rotatePieceleft(i));
            possibleFunctions.push(()=>{
                setTimeout(()=>{
                    move(i);
                    setTimeout(()=>{
                        rotatePieceright(i);
                    },1000)
                },1000)
            })
            possibleFunctions.push(()=>{
                setTimeout(()=>{
                    move(i);
                    setTimeout(()=>{
                        rotatePieceleft(i);
                    },1000)
                },1000)
            })
        }
    else if(randomPiece==blackSemiricochet)
        {
            // possibleFunctions.push(rotatePieceright(i));
            // possibleFunctions.push(rotatePieceleft(i));
            // possibleFunctions.push(rotatePieceup(i));
            // possibleFunctions.push(rotatePiecedown(i))
            possibleFunctions.push(()=>{
                setTimeout(()=>{
                    move(i);
                    setTimeout(()=>{
                        rotatePieceright(i);
                    },1000)
                },1000)
            })
            possibleFunctions.push(()=>{
                setTimeout(()=>{
                    move(i);
                    setTimeout(()=>{
                        rotatePieceleft(i);
                    },1000)
                },1000)
            })
            possibleFunctions.push(()=>{
                setTimeout(()=>{
                    move(i);
                    setTimeout(()=>{
                        rotatePieceup(i);
                    },1000)
                },1000)
            })
            possibleFunctions.push(()=>{
                setTimeout(()=>{
                    move(i);
                    setTimeout(()=>{
                        rotatePiecedown(i);
                    },1000)
                },1000)
            })

        }
    return possibleFunctions;
}
function isMovePossible(i)
{  
    singlePlayerSelectedBox = [];
    var possibleFunctions = []
    if(gamestatus==false)
        {
            alert("game paused");
            return;
        }
        singlePlayerSelectedBox = [];
        const isCanon = (boardStatus[i]==blackCanon || boardStatus[i]==redCanon)
        //console.log(i-8>=0 && boardStatus[i-8]==''  )
    
           if(i-8>=0 && boardStatus[i-8]=='' && (!isCanon) )
            {  
                singlePlayerSelectedBox.push(i-8);
            }
            if(i-8-1>=0 && (i-8)%8!=0 && boardStatus[i-8-1]=='' && (!isCanon) )
            {    
                singlePlayerSelectedBox.push(i-8-1);
            }
            if(i-8+1>=0 && (i-8+1)%8!=0 && boardStatus[i-8+1]=='' && (!isCanon) )
            {   
                singlePlayerSelectedBox.push(i-8+1);
            }
            if(i-1>=0 && i%8!=0 && boardStatus[i-1]=='' )
                {  
                    singlePlayerSelectedBox.push(i-1);
                }
            if(i+8<=63 && boardStatus[i+8]=='' && (!isCanon) )
            {   
                singlePlayerSelectedBox.push(i+8);
            }
            if(i+8-1<=63 && (i+8)%8!=0 && boardStatus[i+8-1]=='' && (!isCanon) )
            {   
                singlePlayerSelectedBox.push(i+8-1);
            }
            if(i+8+1<=63 && (i+8+1)%8!=0 && boardStatus[i+8+1]=='' && (!isCanon) )
            {   
                singlePlayerSelectedBox.push(i+8+1);
            }
            if(i+1<=63 && (i+1)%8!=0 && boardStatus[i+1]=='')
                {   
                    singlePlayerSelectedBox.push(i+1);
                }
        possibleFunctions = singlePlayerSelectedBox.map((val)=>{
            return ()=>{
                setTimeout(()=>{
                      move(i);
                      setTimeout(()=>{
                        selectedBoxClicked(i,val,false);
                      },1000)
                },1000)
                // selectedBoxClicked(i,val,false);  }
        }} )
        return possibleFunctions;
}

function isSwapPossible(i)
{   var possibleFunctions = []
    singlePlayerSelectedSwapBox = [];
    if(gamestatus==false)
        {
            alert("game paused");
            return;
        }
    singlePlayerSelectedSwapBox = [];
    if(i-8>=0 && boardStatus[i-8]!='' && boardStatus[i-8].indexOf("titan")==-1)
        {  
           singlePlayerSelectedSwapBox.push(i-8);
        }
        if(i-8-1>=0 && (i-8)%8!=0 && boardStatus[i-8-1]!='' && boardStatus[i-8-1].indexOf("titan")==-1)
        {    
           singlePlayerSelectedSwapBox.push(i-8-1);
        }
        if(i-8+1>=0 && (i-8+1)%8!=0 && boardStatus[i-8+1]!='' && boardStatus[i-8+1].indexOf("titan")==-1)
        {   
           singlePlayerSelectedSwapBox.push(i-8+1);
        }
        if(i-1>=0 && index%8!=0 && boardStatus[i-1]!='' && boardStatus[i-1].indexOf("titan")==-1)
            {    
               singlePlayerSelectedSwapBox.push(i-1);
            }
        if(i+8<=63 && boardStatus[i+8]!='' && boardStatus[i+8].indexOf("titan")==-1)
        {    
           singlePlayerSelectedSwapBox.push(i+8);
        }
        if(i+8-1<=63 && (i+8)%8!=0 && boardStatus[i+8-1]!='' && boardStatus[i+8-1].indexOf("titan")==-1)
        {    
           singlePlayerSelectedSwapBox.push(i+8-1);
        }
        if(i+8+1<=63 && (i+8+1)%8!=0 && boardStatus[i+8+1]!='' && boardStatus[i+8+1].indexOf("titan")==-1)
        {    
           singlePlayerSelectedSwapBox.push(i+8+1);
        }
        if(i+1<=63 && (i+1)%8!=0 && boardStatus[i+1]!='' && boardStatus[i+1].indexOf("titan")==-1)
            {    
               singlePlayerSelectedSwapBox.push(i+1);
            }
        possibleFunctions = singlePlayerSelectedSwapBox.map((val)=>{
            return ()=>{
                setTimeout(()=>{
                      move(i);
                      setTimeout(()=>{
                        doRicochetSwap(i,val,false);
                      },1000)
                },1000)
                // basically trying to mimic the behaviour and order with which user clicks mouse button
        }
        })
        return possibleFunctions;
}
let allPossibleOptions = [];
function generateMove()
{   allPossibleOptions = [];
    if(gameChance=="black")
        {
            var pieceOptions = [blackCanon,blackRicochet,blackSemiricochet,blackTank,blackTitan];
            while(true)
            {
            let randomNo = Math.floor(Math.random()*pieceOptions.length);
            let index = boardStatus.indexOf(pieceOptions[randomNo]);
            
            if(pieceOptions[randomNo]==blackCanon)
                {
                     let option1 = isMovePossible(index);
                     let option2 = isRotationPossible(index);
                     allPossibleOptions.push(...option1);
                     allPossibleOptions.push(...option2);
                }
            else if(pieceOptions[randomNo]==blackRicochet)
                {
                    let option1 = isMovePossible(index);
                    let option2 = isRotationPossible(index);
                    let option3 = isSwapPossible(index);
                    allPossibleOptions.push(...option1);
                    allPossibleOptions.push(...option2);
                    allPossibleOptions.push(...option3);
                }
            else if(pieceOptions[randomNo]==blackSemiricochet)
                {
                    let option1 = isMovePossible(index);
                    let option2 = isRotationPossible(index);
                    allPossibleOptions.push(...option1);
                    allPossibleOptions.push(...option2);
                }
            else if(pieceOptions[randomNo]==blackTank)
                {
                    let option1 = isMovePossible(index);
                    allPossibleOptions.push(...option1);
                }
            else if(pieceOptions[randomNo]==blackTitan)
                {
                    let option1 = isMovePossible(index);
                    allPossibleOptions.push(...option1);
                }
                if(allPossibleOptions.length>0)
                    {
                        break;
                    }
                else
                {
                    continue;
                }
            }
            generateMoveRandomly();
        }
}
function generateMoveRandomly()
{
    let randomNo = Math.floor(Math.random()*allPossibleOptions.length);
    let randomFunction = allPossibleOptions(randomNo);
    randomFunction();
}
function spells()
{

}

// animations


