console.log("it's connected ...");

let player = 4; 
let gamers = new Array(4); 
let count = 0;
let overallPath = new Array(); overallPath[0]=null;
let roll = false;
let flag = false;
let winner = new Array(4);
let winners = null;
let previous;
let gamer_number;


let moving = new Audio('move.mp3');
let rolling = new Audio('pop-dice.mp3');

//player = prompt("enter the number of players :");

function Gamer(id){
	this.player_id = id;
	this.tokens = new Array(4);
	this.tokenHome = new Array(4);
}
//diceValue--

Gamer.prototype.getDetails = 
function(){
	
	var colorScheme = ["gt","rt","bt","yt"];
	var homeScheme = ["gh","rh","bh","yh"];

	for(var i=0; i<4; i++){
		this.tokens[i] = document.getElementById(colorScheme[count]+(i+1));
	}
	for (var i = this.tokenHome.length - 1; i >= 0; i--) {
		this.tokenHome[i] = document.getElementById(homeScheme[count]+(i+1));
	}
	count++;
};

																			/* FUNCTIONS ARE STARTED FROM HERE...*/

function startTheGame(){
	initPlayers(); count = 0;
	initpath();
	document.getElementById('number').style.backgroundColor = "white";
    document.getElementById('start').style.display = "none";
	gamer_number = document.getElementById("no_of_players").value;
	document.getElementById("no_of_players").style.display = "none";

	// gamers[0].showObject;
	console.log(winner)
	roll = true;
}

function initPlayers(){

	for(var i=0; i<player; i++){

		if(winner[i] == i){
			continue;
		}

		gamers[i] = new Gamer(i+1);
		gamers[i].getDetails();
	}
	var color = ["green","red","blue","yellow"]
	for(var i=0; i<player; i++){
		gamers[i].color = color[i];
	}
	console.log(gamers)
}


function initpath(){
    for(var i=1; i<53; i++){
        overallPath[i] =document.getElementById('path'+(i));
    }
    var safes = ["gs","rs","bs","ys"];

	for(var j=0; j<4; j++){
    	for(var i=1; i<=5; i++){
	    	overallPath[overallPath.length] = document.getElementById(safes[j] + i);
	    }
    overallPath[overallPath.length] = document.getElementById("last-home");
	}
   // console.log(overallPath)
   }




function rollTheDice(){
	flag = false;

	rolling.play();
	rolling.volume = (0.3)

	if(count == -1){ count = 3;}
	if(count ==  4){ count = 3;}

	for (var i = 0; i<3; i++) {
		if(winner[count] == count)
		{ count++; count = count%4;}
		else{
			i = 4;
		}	
	}
console.log("count value = "+count)
// console.log(winner[count])

	if(roll == false){
		return;
	}

	var currentColor = count;
	switch(count){
		case 0: currentColor = "#91d667"; break;
		case 1: currentColor = "#fb9a9e"; break;
		case 2: currentColor = "#89ABE3FF "; break;
		case 3: currentColor = "#f8C067"; break;
	}
    document.getElementById("number").style.backgroundColor = currentColor;

   for(var i=0; i<10; i++){
       diceValue = parseInt((Math.random()*100)%7);


	   if (diceValue == 0) {
           // console.log(diceValue)
       }
       else{
           break;
       }
   }

   switch(diceValue)
   {
       case 1:
           document.getElementById('number').innerHTML = '<i class="fa-sharp fa-solid fa-dice-one"></i>'
       break;
                   
       case 2:
           document.getElementById('number').innerHTML = '<i class="fa-sharp fa-solid fa-dice-two"></i>'
       break;

       case 3:
           document.getElementById('number').innerHTML = '<i class="fa-sharp fa-solid fa-dice-three"></i>'
       break;

       case 4:
           document.getElementById('number').innerHTML = '<i class="fa-sharp fa-solid fa-dice-four"></i>'
       break;

       case 5:
           document.getElementById('number').innerHTML = '<i class="fa-sharp fa-solid fa-dice-five"></i>'
       break;

       case 6:
           document.getElementById('number').innerHTML = '<i class="fa-sharp fa-solid fa-dice-six"></i>';
           flag = true;
       break;
   }   
   // console.log(count)
   selectTheToken(gamers[count].color)
   count == 3? count = 0 : count++;
}

function selectTheToken(player){

    var selected = 1;
    var player_no = new Array();

    player_no = document.querySelectorAll("."+player+"-token");

    player_no.forEach((value)=>{

        value.addEventListener("click", (e)=>{

            if(selected == 1){
                moveTheToken(e.path[0]);
                selected = 0;
                return true;
            }
        })
    })

    roll = false;
}

function moveTheToken(e){
	// console.log(e.parentNode)
	var parent = e.parentNode.id;
	if(
    parent.substring(0,2) == "gs" || 
    parent.substring(0,2) == "rs" || 
    parent.substring(0,2) == "bs" || 
    parent.substring(0,2) == "ys" ){
      
    if(!(diceValue <= ( 6 - parent.substring(2,3)))){		//dice = 3; parent = 3;
         
    if(parent.substring(0,2) == "gs")
        { 	
    console.log("reached here")    	
    if(checkForPass("gs",58) == true){ count++; roll = true;  }
        	else{selectTheToken("green");}
            return; }    
    if(parent.substring(0,2) == "rs")
        { 	
    console.log("reached here")    	
    if(checkForPass("rs",64) == true){ count++; roll = true; }
        	else{selectTheToken("red");}
            return; }      
    if(parent.substring(0,2) == "bs")
        { 	
    console.log("reached here")    	
    if(checkForPass("bs",70) == true){ count++; roll = true; }
        	else{selectTheToken("blue");}
            return; }       
    if(parent.substring(0,2) == "ys")
        {console.log("reached here")	
    if(checkForPass("ys",76) == true){ count++; roll = true; }
         	else{selectTheToken("yellow");} 
            return; }
       }
    }

	// for(var i=1; i<=diceValue; i++){

		

    // 	//console.log(e.parentNode)
   	// }
	var i=1;
	var positionMove = setInterval(move,550);

	
function move(){
	// This will check whether the token is at home or wot >>>>
	e.parentNode.style.backgroundColor = previous;

	var moveSafe = e.id.substring(0,2);
	if(e.parentNode.classList[0] == "square"){

	  switch(e.id.substring(0,2)){
	  case "gt" :
			  overallPath[1].appendChild(e);
			  break;
	  case "rt" :
			  overallPath[14].appendChild(e);
			  break;
	  case "bt" :
			  overallPath[27].appendChild(e);
			  break;
	  case "yt" :
			  overallPath[40].appendChild(e);
			  break;
	  }
															
	} 
// this will move the token to the inner safe path >>>>
															
	else if ( (overallPath.indexOf(e.parentNode) == 51 && moveSafe == "gt" ) ||
			  ( overallPath.indexOf(e.parentNode) == 12 && moveSafe == "rt") || 
			  (overallPath.indexOf(e.parentNode) == 25 && moveSafe == "bt") || 
			  (overallPath.indexOf(e.parentNode) == 38 && moveSafe == "yt")) {
															
		
															
	if(overallPath.indexOf(e.parentNode) == 51 && moveSafe == "gt"){
				overallPath[53].appendChild(e);
		}
	else if(overallPath.indexOf(e.parentNode) == 12 && moveSafe == "rt"){
				overallPath[59].appendChild(e);
		}
	else if(overallPath.indexOf(e.parentNode) == 25 && moveSafe == "bt"){
				overallPath[65].appendChild(e);
		}
	else if(overallPath.indexOf(e.parentNode) == 38 && moveSafe == "yt"){
				overallPath[71].appendChild(e);
		}
	}
															
	// this will move the token on the path >>>>>
															
	else if(e.parentNode.id.substring(0,4) == "path"){
			var next = parseInt(overallPath.indexOf(e.parentNode))+1;
			
			if(next == 53 && e.id.substring(0,2) != "gt"){
				overallPath[1].appendChild(e)
				//diceValue--;
			}
			
			else
			{
				next = parseInt(e.parentNode.id.substring(4,6))+1;
				overallPath[next].appendChild(e)}
			// console.log(next)
	}
	else{
		var next = overallPath.indexOf(e.parentNode)+1;
		overallPath[next].appendChild(e);
	}

	previous = e.parentNode.style.backgroundColor;
	switch(e.id.substring(0,1)) 
	{
		case "g":
			e.parentNode.style.backgroundColor = "#d8f3b0";
			break;
		case "r":
			e.parentNode.style.backgroundColor = "#f7c1c3";
			break;
		case "b":
			e.parentNode.style.backgroundColor = "#cee6f2";
			break;
		case "y":
			e.parentNode.style.backgroundColor = "#f9deb3";
			break;
	}
	moving.play();

	if(i<diceValue){
		i++;
	}
	else{
		e.parentNode.style.backgroundColor = previous;
		clearInterval(positionMove);
	}

}
	e.parentNode.style.backgroundColor = previous;
   																		// After moveing the tokens >>> 
   	//this will eliminate the token

   	   if(e.parentNode.childElementCount == 2 && e.parentNode.childNodes[0].id.substring(0,2) != e.parentNode.childNodes[1].id.substring(0,2)){
	        
   	   		var checkForSafe = e.parentNode.id.substring(4,6);

	        if(checkForSafe == 1 || checkForSafe == 9 || checkForSafe == 14 || checkForSafe == 22 || checkForSafe == 27 || checkForSafe == 35 || checkForSafe == 40 || checkForSafe == 48)
	        {
	        	roll = true;
	        	return;
	        }
	        var eliminated = e.parentNode.childNodes[0];
	        var current = e.parentNode.childNodes[1];
	        var home  = eliminated.id.substring(2,3);

			console.log(eliminated)
			console.log(current)
			console.log(home)
			console.log(gamers[1].tokenHome[0])
			        e.parentNode.replaceChild(current,eliminated);
			        // eliminated = ;
			        switch(eliminated.id.substring(0,2)){
			        case "gt":
			        	document.getElementById("gh"+home).appendChild(eliminated);
			        	break;
			        case "rt":
			        	document.getElementById("rh"+home).appendChild(eliminated);
			        	break;
			        case "bt":
			        	document.getElementById("bh"+home).appendChild(eliminated);
			        	break;
			        case "yt":
			        	document.getElementById("yh"+home).appendChild(eliminated);
			        	break;
			        }
			        if (flag == false) {count--;}
			        
    }

    // this is for the if the token has reached at the home then there will be again chance

    if(overallPath.indexOf(e.parentNode) == 58 || overallPath.indexOf(e.parentNode) == 64 || overallPath.indexOf(e.parentNode) == 70 || overallPath.indexOf(e.parentNode) == 76){
    	if(!(checkWin() == true)){count--;}	
    }
    

document.getElementById("number").style.backgroundColor = "white";
document.getElementById("number").innerHTML = "";
if(flag == true){
	count--;
}
roll = true;	
}

function checkWin(){
	var select ;

	var tmp = count-1;
	if(tmp == -1){
		tmp=0;
	}
	console.log(tmp + "    "+count);
	console.log(gamers[tmp]);
	if(tmp == -1){ tmp = 3;}
	if(tmp == 0){ select = 58; }
	else if(tmp == 1){ select = 64; }
	else if(tmp == 2){ select = 58; }
	else if(tmp == 3){ select = 76; }

	var check = gamers[tmp].tokens.every((value)=>{
    	return (overallPath.indexOf(value.parentNode) == select);
    });
    console.log("wincheck = "+check);

    if(check == true){
    	if(winners == null){
    		winners = 0
    	}
    	else{ winners++; }
    	winner[tmp] = tmp;

    	if(winners == 2){
    		rollTheDice(null);
    	}
    	return true;
    }
}



function checkForPass(str,last){
	last = 58;
	var tmp = count-1;
	if(tmp == -1){
		tmp=0;
	}
	
	gamers[tmp].tokens.forEach((value)=>{
		console.log(overallPath.indexOf(value.parentNode))
		console.log(value.parentNode.id.substring(0,2))
	})


	var check = gamers[tmp].tokens.every((value)=>{
		return (value.parentNode.id.substring(0,2) == str || overallPath.indexOf(value.parentNode) == last);
	})
	console.log(" check-1 : "+check + "    overall = ");

	if(check == true){
		check = gamers[tmp].tokens.every((value)=>{
			return (overallPath.indexOf(value.parentNode) == last);
		});
	
		console.log(" check-2 : "+check);
		if(check == true){
			return true;
		}
		else{
			check = gamers[tmp].tokens.some((value)=>{
				return (value.parentNode.id.substring(0,4) == "path" || value.parentNode.id.substring(0,2) == (str.substring(0,1)+"h"))
			})
			console.log(" check-3 : "+check);
			console.log((str.substring(0,1)+"h"));
			if (check == true) {
				return false;
			}
			else{
				return true;
			}
		}
	}
	else{
		return false;
	}


}

