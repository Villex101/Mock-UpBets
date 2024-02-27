import React from 'react';


function showError(e : any)
{
	alert("So, then... you got this error. Kind of weird you got this far and still see this, but let's see what we're going to do about it next week. In the meanwhile, open up the network logs and see what they say, because at the moment your teacher wants to know too :-D.");
}

function handleMove(j : any)
{
//console.log(j)

}

function sendMove(mx: number, my: number, c: any)
{
	let obj = { x : mx, y : my};
	fetch(c.serviceroot+c.receiver, { method : "POST", mode : "cors", credentials : "include", 
							headers: {'Content-Type': 'text/plain'}, 
							body : JSON.stringify(obj) }).
								then( r => r.json() ).then( j => handleMove(j) ).catch( e => showError(e));
}

const myGrid = {  //This is trick i have learned doing the project course to help manage variables. 
sqSize:100,
border:1,
outBorder:0,
width: (sizex: number) => sizex * myGrid.sqSize + (sizex-1) *  myGrid.border,
height: (sizey: number) => sizey * myGrid.sqSize + (sizey-1) *  myGrid.border,
getGrid: (x: number) => (x * myGrid.sqSize + x * myGrid.border),
}
const ani = {
startOx: (x: number) 	=> myGrid.getGrid(x) + (myGrid.sqSize ) * 0.5,
startOy: (y: number) 	=> myGrid.getGrid(y) + (myGrid.sqSize) * 0.5,
startXx: (x: number) 	=> myGrid.getGrid(x) + (myGrid.sqSize) * 0.8,
startXy: (y: number) 	=> myGrid.getGrid(y) + (myGrid.sqSize) * 0.8,
start2Xx: (x: number) 	=> myGrid.getGrid(x) + (myGrid.sqSize ) * 0.2,
start2Xy: (y: number) 	=> myGrid.getGrid(y) + (myGrid.sqSize) * 0.8,
frames:40,
delay:4,
}

function Game(props : any) {
  const cref = React.useRef();
  let config = props.config;
  let state: any = []
  React.useEffect(() => {
    if (cref.current) {
      let c = (cref.current as any).getContext("2d");
          c.fillStyle = "black";
		  c.fillRect(0,0,myGrid.width(props.sizex), myGrid.height(props.sizey));
	  for (let x = 0; x < props.sizex; x++) {
	  state[x] = []
        for (let y = 0; y < props.sizey; y++) {
		        state[x][y] = true; // Push the boolean value into the array

		  c.fillStyle = "white";	//
          c.fillRect(
            myGrid.border * x + myGrid.sqSize * x,
            myGrid.border * y + myGrid.sqSize * y,
            myGrid.sqSize,
            myGrid.sqSize
          );
        }
      }
	  let mouseover = false;
	  let xoBool= true ;
	  let reactNoTwice = false;

	  let giveDraw : any;
      const canvasClickHandler = (event : any) => {
        const rect = (event.target as any).getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const mx = Math.floor(x / (myGrid.sqSize + myGrid.border)); 
        const my = Math.floor(y / (myGrid.sqSize + myGrid.border)); 
		//sendMove(mx,my,config

				const draw = (myx:any,myy:any,me:any,color:string | null,drawception : any) => {   //This function is the hearth of everything thats moving on screen.
					let c = (cref.current as any).getContext("2d");
					let i = 0;
					let onceBool = true;

						function loop() {
						i++;
						c.strokeStyle = color;
						c.lineWidth = 0.4;
						c.beginPath()
							if(me === "o") {
							c.beginPath()
							//arc(x, y, radius, startAngle, endAngle)
							let Radius = (((myGrid.sqSize) * 0.8 ) / 2);
							c.arc(ani.startOx(myx), ani.startOy(myy), Radius, 2 * Math.PI - (2*Math.PI / ani.frames) * i, 2 * Math.PI) //i ~ ani.frames
							c.stroke()
							}
							else if (me === "x") {
							let disToMove = (myGrid.sqSize) * 0.6;
							let tl = disToMove / ani.frames			
							c.moveTo(ani.startXx(myx), ani.startXy(myy));	 
							c.lineTo(ani.startXx(myx) - tl * i, ani.startXy(myy) - tl * i) 
							c.moveTo(ani.start2Xx(myx) + tl * (i-1), ani.start2Xy(myy)- tl * (i-1)); //moveto follows last position so => thinner line	 
							c.lineTo(ani.start2Xx(myx) + tl * i, ani.start2Xy(myy) - tl * i)
							c.stroke()
							}
						
							if (i < ani.frames) {
							requestAnimationFrame(loop);
							} else if (i > ani.frames / 2 && drawception !== null && onceBool) {
							if (i > ani.frames / 2 && drawception !== null && onceBool) { 		//when half of the frames has passed i call the copy of this function again 
																								//At first i tried to do promise.then chain but after sometime i realised i can do it this way with only 2 additional lines of code:D 
								drawception(mx,my,me,"black",null); 
								onceBool = false; 
								}  
				
							}
}							
					loop();
					};
		giveDraw = draw;
		if (reactNoTwice && (state[mx][my] === "x" || state[mx][my] === "o")) {   //Calling draw here
		  let myMe = state[mx][my];
		  draw(mx, my, myMe, "gold", draw);
		} else if (state[mx][my] === true) {
		  let myMe = xoBool ? "x" : "o";
		  draw(mx, my, myMe, "gray", draw);
		  xoBool = xoBool ? false : true;
		  state[mx][my] = myMe;
		  reactNoTwice = true;

		}
      }
	  
	  
const drawAll = (color: string, twice: boolean) => {
  for (let mx = 0; mx < state.length; mx++) {
    for (let my = 0; my < state[mx].length; my++) {
      if (state[mx][my] === "x" || state[mx][my] === "o") {
        let myMe = state[mx][my];
        if (twice) {
          giveDraw(mx, my, myMe, color, giveDraw);
        } else {
          giveDraw(mx, my, myMe, color, null);
        }
      }
    }
  }
};

(cref.current as any).addEventListener("click", canvasClickHandler);
(cref.current as any).addEventListener("mouseover", () => drawAll("black", false));
(cref.current as any).addEventListener("mouseout", () => drawAll("gray", false));
    } else alert("Canvas not yet drawn or something else");
  }, []);
 

  
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        top: "0%",
        right: "0%"
      }}
    >
      <canvas
        ref={cref as any}
        style={{
          top: "50%",
          right: "50%",
          border: myGrid.outBorder +"px solid black",
          borderRadius: "0px",
        }}
        width={myGrid.width(props.sizex)}
        height={myGrid.height(props.sizey)}
      />
    </div>
  );
}

export default Game;