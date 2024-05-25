 let canon = './assets/cannon-free-1-svgrepo-com.svg'
 var boardStatus = [
                   canon,'','','','','','','',
                   '','','','','','','','',
                   '','','','','','','','',
                   '','','','','','','','',
                   '','','','','','','','',
                   '','','','','','','','',
                   '','','','','','','','',
                   '','','','','','','',''  ]
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
            child.innerHTML = i;
            parent.appendChild(child);
            if(i%8==0)
                {
                    h++;
                }
        }
    var Boxes = document.getElementsByClassName('box');
     var j = 0;
    // Boxes = Boxes.map(box => {
    //     box.setAttribute('svg',boardStatus[j]);
    //     j++;
    // });
    // for(var box in Boxes)
    //     {
    //         Boxes[box].
    //     }    
 }
