var grid = new Array(dimX);
var score = 0;
var piecearray=[ [[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]] , [[1,1],[1,1]] , [[1,1,1],[0,1,0],[0,0,0]] , [[1,1,1],[1,0,0],[0,0,0]] , [[1,1,1],[0,0,1],[0,0,0]] , [[1,1,0],[0,1,1],[0,0,0]] , [[0,1,1],[1,1,0],[0,0,0]] ];
var dimX = 20;
var dimY= 10;
var spda = 3;
var spdb = 4;
var cnt = spda;
var pause = false;
var loose = false;
var won = false;
var scram=5;

//var pieze = new Piece([[128,256,512,0,1],[0,0,1024,0,1],[1,2,4,8,16],[64,0,32,0,0],[1,0,1,1,2]], 1, 1);
//var nextz = new Piece([[8,1,2,0,1],[0,0,2,0,1],[1,1,1,1,1],[1,0,2,0,0],[128,0,1,1,2]], 1, 1);

var pieze = new Piece([[0,2,4],[0,2,0],[0,4,0]],0,2);
var nextz = new Piece([[1,2,4],[0,2,0],[0,0,0]],0,3);

var animate = false;
var mode = true;
var dx = -32;

for (var i=0;i<dimX;i++){
	grid[i] = new Array(dimY);
	for (var j=0;j<dimX;j++){
		grid[i][j] = 0;
	}
}

function shad(n){
	switch(Math.abs(n))
	{
	case 1:
		return "#FAF0E6";
	case 2:
		return "#FFDEAD";
	case 4:
		return "#FF7F50";
	case 8:
		return "#FF4500";
	case 16:
		return "#DC143C";
	case 32:
		return "#FF00FF";
	case 64:
		return "#8A2BE2";
	case 128:
		return "#800080";
	case 256:
		return "#008080";
	case 512:
		return "#4169E1";
	case 1024:
		return "#808000";
	case 2048:
		return "#FFDF00";
	default:
		return "#000000";
	}
}

function Piece(dim, x, y){
	this.dim = dim;
	this.x = x;
	this.y = y;
}

function Lft(grd){
	var l = grd.length;
	var res = new Array(l);
	for (var i=0;i<l;i++){
		res[i] = new Array(l);
		for (var j=0;j<l;j++){
			res[i][j]=grd[j][l-1-i];
		}
	}
	return res;
}

function Lft(grd){
	var l = grd.length;
	var res = new Array(l);
	for (var i=0;i<l;i++){
		res[i] = new Array(l);
		for (var j=0;j<l;j++){
			res[i][j]=grd[j][l-1-i];
		}
	}
	return res;
}

function colide(pz){
	var l = pz.dim.length;
	for (var i=0;i<l;i++){
		for (var j=0;j<l;j++){ 
			if(((pz.dim[i][j] != 0) && (((pz.x+i>(dimX - 1)) || (pz.y+j> (dimY-1))) || (grid[pz.x+i][pz.y+j] != 0)))){
				return false;
			}
		}
	}
	return true;
}

function tryLft(pz){
	var h = Lft(pz.dim);
	if( colide(new Piece(h, pz.x, pz.y) )){
		return new Piece(h, pz.x, pz.y);
	}
	var q = pz.x;
	var p = pz.y;
	for (var i=0;i<2;i++){
		for (var j=0;j<2;j++){
			if(colide(new Piece(h, p-i, q + j))){
				return new Piece(h, p-i, q + j);
			}
			if(colide(new Piece(h, p-i, q - j))){
				return new Piece(h, p-i, q - j);
			}
		}
	}
	return pz;
}

function toGrid(px){
	var l = px.dim.length;
	for (var i=0;i<l;i++){
		for (var j=0;j<l;j++){
			if(px.dim[i][j]!=0){
				grid[px.x+i][px.y+j]=px.dim[i][j];
			}
		}
	}
	pieze=new Piece([0],0,0);
}

function hol(){
	var mod = false;
	for (var i=0;i<dimX;i++){
		var prv = 0;
		for (var j=0;j<dimY;j++){
			if(grid[i][j] !=0 && grid[i][j] == prv){
				mod = true;
				grid[i][j-1] = 2 * prv;
				if(prv == 1024){
					won = true;
				}
				score += 2 * prv;
				grid[i][j]=0;
				for (var d=j;d<dimY-1;d++){
					if(grid[i][d+1]!=0){
						grid[i][d] = grid[i][d+1];
						grid[i][d+1]=0;
					}
					else{break;}
				}
				prv=grid[i][j];
			}
			else{prv=grid[i][j];}
		}
	}
	return mod;
}

function hor(){
	var lol = false;
	for (var i=0;i<dimX;i++){
		var prv = 0;
		for (var j=dimY-1;j>=0;j--){
			if(grid[i][j] !=0 && grid[i][j] == prv){
				mod = true;
				grid[i][j+1] = 2 * prv;
				if(prv == 1024){
					won = true;
				}
				score += 2 * prv;
				grid[i][j]=0;
				for (var d=j;d>0;d--){
					if(grid[i][d-1]!=0){
						grid[i][d] = grid[i][d-1];
						grid[i][d-1]=0;
					}
					else{break;}
				}
				prv=grid[i][j];
			}
			else{prv=grid[i][j];}
		}
	}
	return mod;
}

function hou(){
	var mod = false;
	for (var i=0;i<dimY;i++){
		var prv = 0;
		for (var j=0;j<dimX;j++){
			if(grid[j][i] !=0 && grid[j][i] == prv){
				mod = true;
				grid[j-1][i] = 2 * prv;
				if(prv == 1024){
					won = true;
				}
				score += 2 * prv;
				grid[j][i]=0;
				for (var d=j;d<dimX-1;d++){
					if(grid[d+1][i]!=0){
						grid[d][i] = grid[d+1][i];
						grid[d+1][i]=0;
					}
					else{break;}
				}
				prv=grid[j][i];
			}
			else{prv=grid[j][i];}
		}
	}
	return mod;
}

function hod(){
	var mod = false;
	for (var i=0;i<dimY;i++){
		var prv = 0;
		for (var j=dimX-1;j>=0;j--){
			if(grid[j][i] !=0 && grid[j][i] == prv){
				mod = true;
				grid[j+1][i] = 2 * prv;
				if(prv == 1024){
					won = true;
				}
				score += 2 * prv;
				grid[j][i]=0;
				for (var d=j;d>0;d--){
					if(grid[d-1][i]!=0){
						grid[d][i] = grid[d-1][i];
						grid[d-1][i]=0;
					}
					else{break;}
				}
				prv=grid[j][i];
			}
			else{prv=grid[j][i];}
		}
	}
	return mod;
}

function scramble(){
	if (scram >0 && mode && pieze.dim.length > 1){
		for (var i=0;i<pieze.dim.length;i++){
			for (var j=0;j<pieze.dim.length;j++){
				if (pieze.dim[i][j]!=0){
					pieze.dim[i][j] = Math.pow(2,Math.floor((Math.random()*3)));
				}
			}
		}
		scram=scram-1;
	}
}

function tetris(){
	for (var i=0;i<dimX;i++){
		var tru = true;
		for (var j=0;j<dimY;j++){
			if(grid[i][j] == 0){
				tru = false;
			}
		}
		if(tru){
		score -= 2000;
			for (var u=i;u>0;u--){
				for (var j=0;j<dimY;j++){
					grid[u][j]=grid[u-1][j];
				}
				for (var j=0;j<dimY;j++){
					grid[0][j]=0;
				}
			}
		}
	}
}

function draw(){
	context= myCanvas.getContext('2d');
	context.clearRect(0,0,320,640);
	context.fillStyle = "#cc88cc";
	context.font="12px Arial";
	for (var i=0;i<dimX;i++){
		for (var j=0;j<dimY;j++){
			if (grid[i][j] > 0 ){
				context.fillStyle = shad(grid[i][j]);
				context.fillRect(32*j+2,32*i+2,32-2,32-2);
				context.fillStyle = "#000000";
				if (grid[i][j]<10){
					context.fillText(grid[i][j], 32*j+14,32*i+dimX);
				}
				else if (grid[i][j]<100){
					context.fillText(grid[i][j], 32*j+11,32*i+dimX);
				}
				else if (grid[i][j]<1000){
					context.fillText(grid[i][j], 32*j+7,32*i+dimX);
				}
				else{
					context.fillText(grid[i][j], 32*j+4,32*i+dimX);
				}
			}
		}
	}
	var l = pieze.dim.length;
	for (var i=0;i<l;i++){
		for (var j=0;j<l;j++){
			if (pieze.dim[i][j] > 0){
				context.fillStyle = shad(pieze.dim[i][j]);
				context.fillRect(32*(pieze.y+j)+2,32*(pieze.x+i)+2,32-2,32-2);
				context.fillStyle = "#000000";
				if (pieze.dim[i][j] < 10){
					context.fillText(pieze.dim[i][j],32*(pieze.y+j)+14,32*(pieze.x+i)+dimX);
				}
				else if (pieze.dim[i][j] < 100){
					context.fillText(pieze.dim[i][j],32*(pieze.y+j)+11,32*(pieze.x+i)+dimX);
				}
				else if (pieze.dim[i][j] < 1000){
					context.fillText(pieze.dim[i][j],32*(pieze.y+j)+7,32*(pieze.x+i)+dimX);
				}
				else{
					context.fillText(pieze.dim[i][j],32*(pieze.y+j)+4,32*(pieze.x+i)+dimX);
				}
			}
		}
	}
	/*if(animate){
		for (var i=0;i<l;i++){
			for (var j=0;j<l;j++){
			if (pieze.dim[i][j] < 0){
				context.fillStyle = shad(pieze.dim[i][j]);
				context.fillRect(32*(pieze.y+j)+2,32*(pieze.x+i)+2+2*dx,30,30);
				dx++;
				if(dx>=0){
					animate=false;
					for (var i=0;i<pieze.dim.length;i++){
						for (var j=0;j<pieze.dim.length;j++){
							grid[i][j] = -1 * grid[i][j];
						}
					}
				}
			}
			}
		}
	}*/
	blanks = Next.getContext('2d');
	blanks.clearRect(0,0,200,370);
	blanks.fillStyle = "#000000";
	blanks.fillText("Next piece:",20,18);
	blanks.font="12px Arial";
	if (nextz.dim.length>1 && mode){
		var xc=100-16*nextz.dim.length;
		var yc=100-16*nextz.dim.length;
		for (var i=0;i<nextz.dim.length;i++){
			for (var j=0;j<nextz.dim.length;j++){
				if (nextz.dim[i][j] > 0){
					blanks.fillStyle = shad(nextz.dim[i][j]);
					
					blanks.fillRect(32*j+2+yc,32*i+xc,32-2,32-2);
					
					blanks.fillStyle = "#000000";
					if (nextz.dim[i][j] < 10){
						blanks.fillText(nextz.dim[i][j],32*j+yc+14,32*i+xc+20);
					}
					else if (nextz.dim[i][j] < 100){
						blanks.fillText(nextz.dim[i][j],32*j+yc+11,32*i+xc+20);
					}
					else if (nextz.dim[i][j] < 1000){
						blanks.fillText(nextz.dim[i][j],32*j+yc+7,32*i+xc+20);
					}
					else{
						blanks.fillText(nextz.dim[i][j],32*j+yc+4,32*i+xc+20);
					}
					
					
				}
			}
		}
	}
	
	blanks.font = "19px Arial";
	if(!mode&&!loose){
	blanks.fillStyle = "#ffd700";
	blanks.fillRect(50,300,100,40);
	blanks.fillStyle = "#000000";
	blanks.fillText("2048!",77,328);
	}
	if(loose && !won){
	blanks.fillStyle = "#008B8B";
	blanks.fillRect(50,250,100,40);
	blanks.fillStyle = "#000000";
	blanks.fillText("Lose!",77,278);
	}
	if(won){
	blanks.fillStyle = "#87CEEB";
	blanks.fillRect(50,200,100,40);
	blanks.fillStyle = "#000000";
	blanks.fillText("Win!",82,228);
	}
	hanks = Score.getContext('2d');
	hanks.font = "19px Arial";
	hanks.clearRect(0,0,200,240);
	hanks.fillStyle = "#000000";
	hanks.fillText("Score:" + score.toString() , 20 , 25);
	hanks.fillText("Scramble:" + scram.toString() , 20 , 50);
}
function lt(){
	pieze.y--;
	if(!colide(pieze))
		pieze.y++;
}

function rt(){
	pieze.y++;
	if(!colide(pieze))
		pieze.y--;
}

function dw(){
	pieze.x++;
	if(!colide(pieze)){
		pieze.x--;
		cnt = 0;
	}
}

function action(){
	if(mode){
		pieze.x = pieze.x+1;
		if(!colide(pieze)){
			pieze.x = pieze.x-1;
			if(cnt == 0){
				toGrid(pieze);
				tetris();
				mode = false;
				cnt=spdb;
			}
			else{
				cnt--;
			}
		}
	}
	else{
		if(cnt == 0){
			mode=true;
			pieze = nextz
			nextz = new Piece(piecearray[Math.floor((Math.random()*7))], 0, 4+Math.floor((Math.random()*2)));
				var l = nextz.dim.length;
					for (var i=0;i<l;i++){
						for (var j=0;j<l;j++){
							if(nextz.dim[i][j]!=0){
								nextz.dim[i][j] = Math.pow(2,Math.floor((Math.random()*3)));
							}
						}
					}
				if(!colide(pieze)){
					//END GAME!
					mode=false;
					cnt = spda;
					pieze=new Piece([0],0,0);
					loose = true;
				}
		}
		else{
			cnt--;
		}
	}
}
setInterval(action, 200);
setInterval(draw, 15);
$(document).keyup(function(e){
	if(82 == e.which){
		loose=false;
		won=false;
		mode=true;
		score=0;
		scram=5;
		pieze = new Piece([[128,256,512,4,1],[16,0,1024,64,1],[1,2,4,8,16],[64,0,32,0,16],[1,1,1,1,2]], 1, 1);
		nextz = new Piece([[8,1,2,4,1],[4,0,2,0,1],[1,1,1,1,1],[1,4,2,1,0],[128,0,1,1,2]], 1, 1);
		for (var i=0;i<dimX;i++){
		grid[i] = new Array(dimY);
			for (var j=0;j<dimX;j++){
				grid[i][j] = 0;
			}
		}
	}
	if(!loose)
	switch(e.which){
		case 87:
			if(mode){
				pieze = tryLft(pieze);
				cnt=spda;
			}
			else{
				if(hou())
					cnt=spdb;
			}
			break;
		case 65:
			if(mode){
				lt();
				cnt=spda;
			}
			else{
				if(hol())
					cnt=spdb;
			}
			break;
		case 68:
			if(mode){
				rt();
				cnt=spda;
			}
			else{
				if(hor())
					cnt=spdb;
			}
			break;
		case 16:
			if(mode){
				scramble();
			}
			break;
		case 83:
			if(mode){
				dw();
			}
			else{
				if(hod())
					cnt=spdb;
			}
			break;
		default:
			console.log(e.which);
	}
});