var nrow = 9;
var ncol = 6;
var turn = 1;
var clicks = 0;
var numberOfPlayers = 2	;
var board = new Array(nrow);
var player = new Array(nrow);
var updated = new Array(nrow);
var laststate = new Array(nrow);
var switchOnRotate = true;
var peiceScore;
var checkDidWin = false;
var doturn = 1;
var pauseInput = false;
var pauseCount = 0;
function getPlayers(){
	return numberOfPlayers;
}

function setup(){
	for (var i = 0; i < numberOfPlayers; i++)
	{
	playerscore[i] = 0;
	}
	setUpScores();
	for (var i = 0; i < nrow; i++) 
	{
		board[i] = new Array(ncol);
		player[i] = new Array(ncol);
		updated[i] = new Array(ncol);
		laststate[i] = new Array(ncol);
	}	
	for (var i = 0; i < nrow; i++)
	{
		for (var j = 0; j < ncol; j++)
		{
			board[i][j] = 0;
			player[i][j] = 0;
			updated[i][j] = 0;
		//	laststate[i][j] = 0;
		}
	}
}

function score(){
	peiceScore = 0;
	for (var i = 0; i < nrow; i++){
		for (var j = 0; j < ncol; j++){
			peiceScore += board[i][j]*board[i][j];
	}}
	//peiceScore -= clicks;
	//if(peiceScore < 0) peiceScore = 0;
	peiceScore += 100;
	if(peiceScore <= 100) return 0;
	else if(peiceScore <= 120) return 1;
	else if(peiceScore <= 140) return 2;
	else return 3;
}

function restart(){
	turn = 1;
	checkDidWin = false;
	updateTurnColor();

	clicks = 0;
	for (var i = 0; i < nrow; i++){
		for (var j = 0; j < ncol; j++){
			board[i][j] = 0;
			player[i][j] = 0;
			updated[i][j] = 0;
			//laststate[i][j] = 0;
			
			updateCell(i,j,0);
	}}
	refreshScores();
}

function didWin(){
var found = new Array();
for(var i = 0; i <= numberOfPlayers ; i ++) found[i] = false;

	for (var i = 0; i < nrow; i++){
		for (var j = 0; j < ncol; j++){
			found[player[i][j]] = true;
	}}
var win = 0, count = 0;
for(var i = 1; i <= numberOfPlayers ; i ++) {
	if(found[i]) {
		count++;
		win = i;
	}
}
	if(count == 1) winner(win);
	else return 0;
}

function incrementor (i,j){
/*	for (var a = 0; a < nrow; a++){
		for (var b = 0; b < ncol; b++){
			updated[a][b] = 0;
			laststate[a][b] = board[a][b];
	}}*/
	if(pauseInput) return;
	doturn = turn;
	if ((player[i][j] == doturn) || (player[i][j] == 0)){
		incrementValue(i,j);
		checkInvalid();
		if(checkDidWin) didWin();
		changeTurn();
	}
	else return;
}

function activateRotate(){
	for (var i = 0; i < nrow; i++){
		for (var j = 0; j < ncol; j++){
			if(updated[i][j] == 1 && laststate[i][j] != 0)
				$('#svg-' + cellId(i,j) + '-' + laststate[i][j]).remove();

			if(updated[i][j] == 1 && player[i][j] != 0){
				updateCell(i, j, board[i][j]);
		//		rotateTheBox('svg-' + cellId(i,j) + '-' + board[i][j]);
		//		if(switchOnRotate && laststate[i][j] != board[i][j] && board[i][j]!=1)
		//			rotateAround('svg-' + cellId(i,j) + '-' + board[i][j],0,board[i][j]+2,Math.random()+0.2);
			
	}}}
}
function rotateTheBox(id){
	//$('#' + id).remove();
	$('#' + id).css({
		"transform": "rotate(" + 180*(Math.random()-0.5) + "deg)"
	});
}

function changeTurn(){
	if (turn != numberOfPlayers) turn++;
	else if (turn == numberOfPlayers) turn = 1;
	updateTurnColor();
}

function checkInvalid(){
	 pauseInput = true;
	var  isInvalid = true;
	for(var i =0; i< nrow; i++){
		for( var j = 0 ; j < ncol ; j++){
			laststate[i][j] = true;
	}}
	for(var i =0; i< nrow; i++){
		for( var j = 0 ; j < ncol ; j++){
			if(!laststate[i][j]) continue;
			if (((i == 0 && j == 0) 
				|| (i == 0 && j == (ncol - 1)) 
				|| (i == (nrow - 1) && j == 0) 
				|| (i == (nrow - 1) && j == (ncol - 1))) && (board[i][j] >= 2)){
				isInvalid = false;
				blast(i,j);
			}
			else if ((j == 0 
				|| i == 0 
				|| j == (ncol - 1) 
				|| i == (nrow - 1)) && (board[i][j] >= 3)){
				isInvalid = false;
				blast(i,j);
			}
			else if(board[i][j] >= 4){
				isInvalid = false;
				blast(i,j);
			}	
		}
	}
	if(isInvalid) {
		pauseInput = false;
		return;}
	
	setTimeout(
		function()
		{
			checkInvalid();
		}
	,400);
}

function getTurn(){
	return turn;
}

/*
function increment (i, j) {
	//updated[i][j] = 1;
	board[i][j] = board[i][j] + 1;
	player[i][j] = doturn;

	if ((i == 0 && j == 0) || (i == 0 && j == (ncol - 1)) || (i == (nrow - 1) && j == 0) || (i == (nrow - 1) && j == (ncol - 1)))
	{
		if (board[i][j] >= 2){ 
			board[i][j] = 2;
			updateCell(i, j, board[i][j]);	
			blast(i,j);
		}
	}
	else if (j == 0 || i == 0 || j == (ncol - 1) || i == (nrow - 1))  
	{
		if (board[i][j] >= 3){
			board[i][j] = 3;
			updateCell(i, j, board[i][j]);
			blast(i,j);
		}	
	}
	else
	{
		if (board[i][j] >= 4){
			board[i][j] = 4;
			updateCell(i, j, board[i][j]);
			blast(i,j);
		}
	}

	//if(updated[i][j] == 1 && laststate[i][j] != 0)
	//$('#svg-' + cellId(i,j) + '-' + laststate[i][j]).remove();
	//if(updated[i][j] == 1 && player[i][j] != 0)
	updateCell(i, j, board[i][j]);
	//rotateTheBox('svg-' + cellId(i,j) + '-' + board[i][j]);	
}

function sleep(ms) {
    var time = new Date();
    time.setTime(time.getTime() + ms);
    while (new Date().getTime() < time.getTime()) {}
}*/

function getPlayer (i, j) {
	return player[i][j];
}

function mysleep(miliseconds) {
    var currentTime = new Date().getTime();
    while (
    	currentTime + miliseconds >= new Date().getTime()) {
    }
}

function incrementValue(i,j){
	player[i][j] = doturn;
	board[i][j] = board[i][j] + 1;
	updateCell(i, j, board[i][j]);
	laststate[i][j] = false;
}

function blast (i,j) {
	checkDidWin = true;
	board[i][j] = 0;
	player[i][j] = 0;

	updateCell(i, j, board[i][j]);

	if (i == 0 && j == 0)
	{
		incrementValue(0,1);
		incrementValue(1,0);
	}
	else if (i == 0 && j == (ncol - 1))
	{
		incrementValue(0,(ncol - 2));
		incrementValue(1,(ncol - 1));
	}
	else if (i == (nrow - 1) && j == 0)
	{
		incrementValue((nrow - 1),1);
		incrementValue((nrow - 2),0);
	}
	else if (i == (nrow - 1) && j == (ncol - 1))
	{
		incrementValue((nrow - 1), (ncol - 2));
		incrementValue((nrow - 2), (ncol - 1));
	}
	else if (i == 0)
	{
		incrementValue((i + 1), j);
		incrementValue(i, (j + 1));
		incrementValue(i, (j - 1));
	}
	else if (i == (nrow - 1))
	{
		incrementValue((i - 1), j);
		incrementValue(i, (j + 1));
		incrementValue(i, (j - 1));
	}
	else if (j == 0)
	{
		incrementValue((i + 1), j);
		incrementValue(i, (j + 1));
		incrementValue((i - 1), j);
	}
	else if (j == 0)
	{
		incrementValue((i + 1), j);
		incrementValue(i, (j - 1));
		incrementValue((i - 1), j);
	}
	else
	{
		incrementValue(i, (j - 1));
		incrementValue((i + 1), j);
		incrementValue(i, (j + 1));
		incrementValue((i - 1), j);
	}
}