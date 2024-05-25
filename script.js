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

 function populateGrid()
{ 
    const parent = document.getElementById('grid-Container');
    var h = 0;
    for(var i=1;i<=64;i++)
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
                child.setAttribute('class','box');
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
            svg.setAttribute('id',boardStatus[i-1]);
            svg.setAttribute('style',' align-content: center; ');
            svg.addEventListener("click",()=> { move(i-1) });
            child.appendChild(svg);
            

        }
        
    var Boxes = document.getElementsByClassName('box');
     var j = 0;
    
 }

 function move(i)
 {  selectedBoxes = [];
    alert("hi");
       if(i-8>=0 && boardStatus[i-8]=='')
        {
           selectedBoxes.push(i-8);
        }
        if(i-8-1>=0 && (i-8)%8!=0 && boardStatus[i-8-1]=='')
        {
            selectedBoxes.push(i-8-1);
        }
        if(i-8+1>=0 && (i-8+1)%8!=0 && boardStatus[i-8+1]=='')
        {
            selectedBoxes.push(i-8);
        }
        if(i+8<=64 && boardStatus[i+8]=='')
        {
            selectedBoxes.push(i-8);
        }
        if(i+8-1<=64 && (i+8)%8!=0 && boardStatus[i+8-1]=='')
        {
            selectedBoxes.push(i-8-1);
        }
        if(i+8+1<=64 && (i+8+1)%8!=0 && boardStatus[i+8+1]=='')
        {
            selectedBoxes.push(i-8);
        }

        
 }
