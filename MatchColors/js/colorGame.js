/*
	Description: This file contains source code which handles the behaviour of MatchColor game.
*/

var app=angular.module("colorGame",[]);

function colorGameController($scope,$compile){
	$scope.pts=0;
	$scope.timeRemains=60;
	$scope.highScore=0;
	$scope.counter=0;
	var prevColor="",prevId="",timer,commonBackgroundColor="#559bb5";
	var colorSolved=[];
	
	//This function will start the timer!
	$scope.startGame=function(){
		prevColor="";
		prevId="";
		colorSolved=[];
		var grid=create4X4Grid();
		var temp=$compile(grid)($scope);
		angular.element(document.getElementById('game-msgs')).empty();
		angular.element(document.getElementById('btnStartGame')).attr("disabled",true);
		angular.element(document.getElementById('play-zone')).append(temp);	
		angular.element(document.getElementById('timeRemains')).empty();
		startTimer();
	};
	
	//To run the clock
	function startTimer(){
		if($scope.timeRemains==0){
		angular.element(document.getElementById('game-msgs')).empty();
		angular.element(document.getElementById('btnStartGame')).attr("disabled",false);
		angular.element(document.getElementById('game-msgs')).append(messageHandler.lose);
		angular.element(document.getElementById('play-zone')).empty();
		clearTimeout(timer);
		$scope.timeRemains=60;
		$scope.pts=0;
		$scope.counter=1;
		$scope.highScore=$scope.highScore;
		$scope.$apply();
		document.getElementById('timeRemains').innerHTML=$scope.timeRemains+" sec";
		}
		else{
		$scope.timeRemains--;
		document.getElementById('timeRemains').innerHTML=$scope.timeRemains+" sec";
		timer=setTimeout(startTimer,1000);
		}
	}
	
	//On click of a box, following will triggered!
	$scope.matchColor=function(color,id){
		angular.element(document.getElementById('game-msgs')).empty();
		if(id==prevId){
			angular.element(document.getElementById('game-msgs')).append(messageHandler.selected);
			return;
		}
		var isNotSolved=true;
		
		for(var count=0;count<colorSolved.length;count++){
			if(colorSolved[count]==color){
				angular.element(document.getElementById('game-msgs')).append(messageHandler.solved);	
				isNotSolved=false;
				break;
			}
		}
		
		if(isNotSolved){
			
			if(prevColor){
			//Second Box
			angular.element(document.getElementById(id)).css({backgroundColor:color});
			
			if(prevColor==color){
				//matched	--> set commonbackgroundColor
				//also show the alert message, cursor pointer blocked, increase pointer
				setTimeout(function(){
					$scope.counter++;
					$scope.pts=($scope.counter)*($scope.timeRemains);
					
					if($scope.highScore<$scope.pts){
						$scope.highScore=$scope.pts;
					}
					
					angular.element(document.getElementById(id)).css({backgroundColor:commonBackgroundColor});
					angular.element(document.getElementById(prevId)).css({backgroundColor:commonBackgroundColor});
					prevColor="";
					prevId="";
					colorSolved.push(color);
					angular.element(document.getElementById('game-msgs')).append(messageHandler.matched);
					if(colorSolved.length==8){
						angular.element(document.getElementById('game-msgs')).empty();
						angular.element(document.getElementById('game-msgs')).append(messageHandler.win);
						setTimeout(function(){
							angular.element(document.getElementById('game-msgs')).empty();
							angular.element(document.getElementById('game-msgs')).append(messageHandler.playAgain);
							angular.element(document.getElementById('play-zone')).empty();
							angular.element(document.getElementById('btnStartGame')).attr("disabled",false);
							clearTimeout(timer);
							$scope.timeRemains=60;
							$scope.pts=0;
							$scope.counter=1;
							$scope.highScore=$scope.highScore;
							$scope.$apply();
							document.getElementById('timeRemains').innerHTML=$scope.timeRemains+" sec ";
						},2000);
					}
				},300);
			}
			else{
				setTimeout(function(){		
				var whiteColor="white";
				angular.element(document.getElementById(id)).css({backgroundColor:whiteColor});
				angular.element(document.getElementById(prevId)).css({backgroundColor:whiteColor});
				prevColor="";
				prevId="";
				angular.element(document.getElementById('game-msgs')).empty();
				angular.element(document.getElementById('game-msgs')).append(messageHandler.unMatched);
				//unmatched	--> back to white
				},300);			
			}
			}
			else{
			//First box
				angular.element(document.getElementById(id)).css({backgroundColor:color});
				prevColor=color;
				prevId=id;
			}
		}
	};	
}
//following function will create dynamic grid
function create4X4Grid(){
	var color=getColors();
	var grid=$("");
	var count=-1;
	grid="<div class='row'>"+
				"<div class='col-md-7'>"+
					"<div class='col-md-3 grid-box' id='"+color[(++count)]+""+count+"' ng-click=matchColor('"+color[count]+"','"+color[count]+""+count+"'); style='border:3px solid;'></div>"+
					"<div class='col-md-3 grid-box' id='"+color[(++count)]+""+count+"' ng-click=matchColor('"+color[count]+"','"+color[count]+""+count+"'); style='border-top:3px solid;border-right:3px solid;border-bottom:3px solid;'></div>"+
					"<div class='col-md-3 grid-box' id='"+color[(++count)]+""+count+"' ng-click=matchColor('"+color[count]+"','"+color[count]+""+count+"'); style='border-top:3px solid;border-right:3px solid;border-bottom:3px solid;'></div>"+
					"<div class='col-md-3 grid-box' id='"+color[(++count)]+""+count+"' ng-click=matchColor('"+color[count]+"','"+color[count]+""+count+"'); style='border-top:3px solid;border-right:3px solid;border-bottom:3px solid;'></div>"+
				"</div>"+
			"</div>"+
			" <div class='row'>"+
					"<div class='col-md-7'>"+
							"<div class='col-md-3 grid-box' id='"+color[(++count)]+""+count+"' ng-click=matchColor('"+color[count]+"','"+color[count]+""+count+"'); style='border-right:3px solid;border-left:3px solid;border-bottom:3px solid;'></div>"+
							"<div class='col-md-3 grid-box' id='"+color[(++count)]+""+count+"' ng-click=matchColor('"+color[count]+"','"+color[count]+""+count+"'); style='border-right:3px solid;border-bottom:3px solid;'></div>"+
							"<div class='col-md-3 grid-box' id='"+color[(++count)]+""+count+"' ng-click=matchColor('"+color[count]+"','"+color[count]+""+count+"'); style='border-right:3px solid;border-bottom:3px solid;'></div>"+
							"<div class='col-md-3 grid-box' id='"+color[(++count)]+""+count+"' ng-click=matchColor('"+color[count]+"','"+color[count]+""+count+"'); style='border-right:3px solid;border-bottom:3px solid;'></div>"+
					"</div>"+
			"</div>"+
			"<div class='row'>"+
					"<div class='col-md-7'>"+
							"<div class='col-md-3 grid-box' id='"+color[(++count)]+""+count+"' ng-click=matchColor('"+color[count]+"','"+color[count]+""+count+"'); style='border-left:3px solid;border-right:3px solid;'></div>"+
							"<div class='col-md-3 grid-box' id='"+color[(++count)]+""+count+"' ng-click=matchColor('"+color[count]+"','"+color[count]+""+count+"'); style='border-right:3px solid;'></div>"+
							"<div class='col-md-3 grid-box' id='"+color[(++count)]+""+count+"' ng-click=matchColor('"+color[count]+"','"+color[count]+""+count+"'); style='border-right:3px solid;'></div>"+
							"<div class='col-md-3 grid-box' id='"+color[(++count)]+""+count+"' ng-click=matchColor('"+color[count]+"','"+color[count]+""+count+"'); style='border-right:3px solid;'></div>"+
					"</div>"+
			"</div>"+
			"<div class='row'>"+
					"<div class='col-md-7'>"+
							"<div class='col-md-3 grid-box' id='"+color[(++count)]+""+count+"' ng-click=matchColor('"+color[count]+"','"+color[count]+""+count+"'); style='border:3px solid;'></div>"+
							"<div class='col-md-3 grid-box' id='"+color[(++count)]+""+count+"' ng-click=matchColor('"+color[count]+"','"+color[count]+""+count+"'); style='border-top:3px solid;border-right:3px solid;border-bottom:3px solid;'></div>"+
							"<div class='col-md-3 grid-box' id='"+color[(++count)]+""+count+"' ng-click=matchColor('"+color[count]+"','"+color[count]+""+count+"'); style='border-top:3px solid;border-right:3px solid;border-bottom:3px solid;'></div>"+
							"<div class='col-md-3 grid-box' id='"+color[(++count)]+""+count+"' ng-click=matchColor('"+color[count]+"','"+color[count]+""+count+"'); style='border-top:3px solid;border-right:3px solid;border-bottom:3px solid;'></div>"+
					"</div>"+
			"</div>";
			return grid;
}


function getColors(){
	var colorArray=["red","red","blue","blue","green","green","yellow","yellow","purple","purple","gray","gray","Aqua","Aqua","black","black"];
	colorArray=shuffleArray(colorArray);		//Shuffle the array randomly 
	return colorArray;
}

//following function will shuffle the Array so that boxes will have colors randomly
function shuffleArray(colorArray){
	var current_index=colorArray.length,temporary_value,random_index;
	while(0!==current_index){
		random_index=Math.floor(Math.random()*current_index);
		current_index-=1;
		
		//swapping it with current element
		temporary_value=colorArray[current_index];
		colorArray[current_index]=colorArray[random_index];
		colorArray[random_index]=temporary_value;
	}
	return colorArray;
}

//following object contains messages that will be displayed to gamer on his/her move 
var messageHandler={
		playAgain:"<div class='col-md-12'><div class='alert alert-info'> <a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong> Let's play Again, just click on Start Game button and compete with your highest score ;)</strong></div></div>",
		selected:"<div class='col-md-12'><div class='alert alert-info'> <a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong> Oye! It's already selected ;)</strong></div></div>",
		matched:"<div class='col-md-12'><div class='alert alert-success'> <a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong> Matched!</strong></div></div>",
		unMatched:"<div class='col-md-12'><div class='alert alert-danger'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>UnMatched!</strong></div></div>",
		win:"<div class='col-md-12'><div class='alert alert-success'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong> Bravo, You Won!</strong></div></div>",
		lose:"<div class='col-md-12'><div class='alert alert-danger'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Time up, You lose but you know what? you can try again :)</strong></div></div>",
		solved:"<div class='col-md-12'><div class='alert alert-info'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Ahem! It's already solved! Choose Other box :|</strong></div></div>"
}

//Controller
app.controller("colorGameController",colorGameController);




