var nrow = 9;
var ncol = 6;
var turna = 0;
var size;
var nPlay = getPlayers();
jiggleTime = 100;
var playerscore = new Array(nPlay);

//red green yellow blue
var colors = ["#FF0000","#22B14C","#FFC90E","#00A2E8"];
var colorDark = ["#880015","#0E4B20","#D37B03","#006F9D"];
var colorBack = ["#8F0C12","#115726","#D2B402","#00618A"];

$(function(){
	$('#gameConsole').append('<table id="skoar" class="scoreboard"></table>');
	setup();
	
	setTimeout(
		function(){
			$('#logoBoard').fadeOut();
		},1300);
	setUpScores();
	setUpBoard();
	$('.scoreboard').hide(0);
	setUpCredentials();
	$('.gameTable').css({
		"overflow":"hidden"
	});
	updateTurnColor();
});
function ToggleScoreBoard(){
	$('.scoreboard').toggle(500);
}

function resetGame(){
	$('#skoar').empty();
	alert(val);
	var vals = $('#numberPlayers').val();
	numberOfPlayers = vals;
	restart();
	setup();
	setUpScores();

}

function setUpScores ()
{
	$('#skoar').empty();
	$('#skoar').append("<tr><td style='padding: 0px;'>\
		<select onchange='resetGame();' id='numberPlayers'\
		style='width:100%;'>\
		<option value='2' selected>2</option>\
		<option value='3'>3</option>\
		<option value='4'>4</option>\
		</select></td></tr>");

	for(i = 0; i < nPlay; i ++){
		$('#skoar').append('<tr id="scoreboard-row-' + i + '">\
			<td style="background-color : ' + colorDark[i] +'" id="scoreboard-score-' + i + '"> Player\
			 ' + (i+1) + ' <br/><span style="font-size: 40px;"> ' + playerscore[i] + '</span></td></tr>');
	}
}

function refreshScores ()
{
	$('#skoar').empty();
	setUpScores();
}

function setUpCredentials(){
	var totalWidth = window.innerWidth;
	var totalHeight = window.innerHeight;
	$('.gameConsole').height(totalHeight);
	$('.gameConsole').width(totalWidth);
	$('#logoBoard').height(totalHeight);
	$('#logoBoard').width(totalWidth);
	var cellWidth = (totalWidth - 4*ncol - 30)/ncol;
	var cellHeight = (totalHeight - 4*nrow - 10)/nrow;
	size = 0;
	if(cellHeight <= cellWidth) size = cellHeight;
	if(cellHeight > cellWidth) size = cellWidth;
	$('.gameCell').height(size);
	$('.gameCell').width(size);
}

function cellId(row,col){
	return 'cell-' + row + '-' + col + '';
}

function playerinc(playernum, scorede){
	playerscore[playernum] = playerscore[playernum] +  scorede;
}

function winner(turn){
	var scored = score();
	turna = getTurn() - 1;
	playerinc((turna), peiceScore);
	var msg =  $('#winnerMessage');
	msg.empty();
	msg.css({"text-align":"center"});
	msg.append('\
		<span style="font-family: showcard gothic; \
		font-size: 30px;\
		color: ' + colors[turna] + ';"\
		>Player ' + (turna+1) + '</span>\
		 <span style="font-family: Buxton Sketch; \
		font-size: 30px;\
		 color: white;">&nbsp;Wins!!</span>"\
		');

	document.getElementById('star1').style.color = "rgb(50,50,50)";
	document.getElementById('star2').style.color = "rgb(50,50,50)";
	document.getElementById('star3').style.color = "rgb(50,50,50)";

	if(scored > 0) document.getElementById('star1').style.color = "#FFC90E";
	if(scored > 1) document.getElementById('star2').style.color = "#FFC90E";
	if(scored > 2) document.getElementById('star3').style.color = "#FFC90E";

	$('#winModal').modal('show');

	$('#Score').empty();
	$('#Score').append(peiceScore);

	setTimeout(restart,500);
}

function setVal(){
	for(var i = 0 ; i < nrow ; i ++ ){
		for(var j = 0 ; j < ncol ; j ++ ){
			$('#' + cellId(i,j)).append(getPlayer(i,j));	
	}}
}

function updateCell(row,col,state){
	var cell = '#' + cellId(row,col);
	var celli = cellId(row,col);
	turna = getTurn() - 1;
	$(cell).empty();	
	if(state == 0){
		$(cell).css({
				"background-color":"rgb(30,30,30)"
		});
	}
	if(state == 1){
		$(cell).append('\
			<svg  id="svg-' + celli + '-1" style="text-align:center; vertical-align:middle;\
			height:'+size+'px; width:'+size+'px;"> \
			<defs>\
			<linearGradient id="grad-'+celli+'-1" x1="0%" y1="0%" x2="100%" y2="0%">\
			<stop offset="0%" style="stop-color:' + colors[turna] + ';stop-opacity:1" />\
			<stop offset="100%" style="stop-color:' + colorDark[turna] + ';stop-opacity:1" />\
			</linearGradient>\
			</defs>\
			<circle cx="50%" cy="50%" r="25%" stroke="url(#grad-'+celli+'-1)"\
			stroke-width="1" fill="url(#grad-'+celli+'-1)" /> \
			</svg>');
		$(cell).css({
				"background-color":"rgb(30,30,30)"
		});
	}
	if(state == 2){
		$(cell).append('\
			<svg  id="svg-' + celli + '-2" style="text-align:center; vertical-align:middle;\
			height:'+size+'px; width:'+size+'px;"> \
			<defs>\
			<linearGradient id="grad-'+celli+'-2" x1="0%" y1="0%" x2="100%" y2="0%">\
			<stop offset="0%" style="stop-color:' + colors[turna] + ';stop-opacity:1" />\
			<stop offset="100%" style="stop-color:' + colorDark[turna] + ';stop-opacity:1" />\
			</linearGradient>\
			</defs>\
			<circle cx="35%" cy="50%" r="20%" stroke="url(#grad-'+celli+'-2)"\
			stroke-width="1" fill="url(#grad-'+celli+'-2)" /> \
			<circle cx="65%" cy="50%" r="21%" stroke="url(#grad-'+celli+'-2)"\
			stroke-width="1" fill="url(#grad-'+celli+'-2)" /> \
			</svg>');
		$(cell).css({
				"background-color":"rgb(30,30,30)"
		});
	}
	if(state == 3){
		$(cell).append('\
			<svg id="svg-' + celli + '-3" style="text-align:center; vertical-align:middle;\
			height:'+size+'px; width:'+size+'px;"> \
			<defs>\
			<linearGradient id="grad-'+celli+'-3" x1="0%" y1="0%" x2="100%" y2="0%">\
			<stop offset="0%" style="stop-color:' + colors[turna] + ';stop-opacity:1" />\
			<stop offset="100%" style="stop-color:' + colorDark[turna] + ';stop-opacity:1" />\
			</linearGradient>\
			</defs>\
			<circle cx="50%" cy="37%" r="15%" stroke="url(#grad-'+celli+'-3)"\
			stroke-width="1" fill="url(#grad-'+celli+'-3)" /> \
			<circle cx="36%" cy="62%" r="16%" stroke="url(#grad-'+celli+'-3)"\
			stroke-width="1" fill="url(#grad-'+celli+'-3)" /> \
			<circle cx="64%" cy="62.5%" r="17%" stroke="url(#grad-'+celli+'-3)"\
			stroke-width="1" fill="url(#grad-'+celli+'-3)" /> \
			</svg>');
		$(cell).css({
				"background-color":"rgb(30,30,30)"
		});
	}
}

function rotateAround(id, deg,delta,revs){
	if(deg> revs*360) return;
	var ele = $('#' + id);
	//if(ele == undefined || ele == null) return;
	//if ($.isEmptyObject($.find(#+'id'))) return;
	if(ele.length == 0) return;
	ele.css({
			"transform": "rotate(" + deg + "deg)"
	});
	setTimeout(function(){
		rotateAround(id,deg+delta,delta,revs);
	},100);
}

function parseId(id , data){
	var firstDash = id.indexOf('-');
	var secondDash = id.lastIndexOf('-');
	if(data = "row"){
		rowL = secondDash - firstDash - 1;
		return id.substr(firstDash + 1, rowL);
	}	
	else{
		colL = id.length - secondDash - 1;
		return id.substr(secondDash + 1, colL);
	}
}

function jiggleup(id,mode,deg,ratio){
	if(deg > 2) return jiggledown(id,0,2,ratio);
	var ele = $('#' + id);
	if(mode == 0){
		setTimeout(function(){ele.css({
			"transform": "rotate(-" + deg/2 + "deg)"
		});},0);
		setTimeout(function(){ele.css({
			"transform": "rotate(-" + deg + "deg)"
		});},jiggleTime/2);
		setTimeout(function(){jiggleup(id,1,deg,ratio);},jiggleTime);
	}
	if(mode == 1){
		setTimeout(function(){ele.css({
			"transform": "rotate(" + deg/2 + "deg)"
		});},0);
		setTimeout(function(){ele.css({
			"transform": "rotate(" + deg + "deg)"
		});},jiggleTime/2);
		setTimeout(function(){jiggleup(id,0,deg*ratio,ratio);},jiggleTime);
	}
}

function jiggledown(id,mode,deg,ratio){
	var ele = $('#' + id);
	if(deg < 0.5){
		ele.css({"background-color":"rgb(30,30,30)"});
	 return;
	}
	if(mode == 0){
		ele.css({
			"transform": "rotate(-" + deg/2 + "deg)"
		});
		setTimeout(function(){ele.css({
			"transform": "rotate(-" + deg + "deg)"
		});},jiggleTime/2);
		setTimeout(function(){jiggledown(id,1,deg,ratio);},jiggleTime);
	}
	if(mode == 1){
		ele.css({
			"transform": "rotate(" + deg/2 + "deg)"
		});
		setTimeout(function(){ele.css({
			"transform": "rotate(" + deg + "deg)"
		});},jiggleTime/2);
		setTimeout(function(){jiggledown(id,0,deg/ratio,ratio);},jiggleTime);
	}
}

function updateTurnColor(){
	turna = getTurn() - 1;
	$('.toggleButton').css({
		'background-color':''+colorDark[turna]
	});
	$('.gameRow').css({
		"border-left":"10px solid " + colorDark[turna] + "",
		"border-right":"10px solid " + colorDark[turna] + ""
	});
	$('#row-0').css({
		"border-top":"10px solid " + colorDark[turna] + "",
		"border-left":"10px solid " + colorDark[turna] + "",
		"border-right":"10px solid " + colorDark[turna] + ""
	});
	$('#row-'+ (nrow - 1)).css({
		"border-bottom":"10px solid " + colorDark[turna] + "",
		"border-left":"10px solid " + colorDark[turna] + "",
		"border-right":"10px solid " + colorDark[turna] + ""
	});
}
	
function createCell(row , col){
	var cell = cellId(row,col);
	$('#row-' + row).append('<td id="' + cell + '" class="gameCell"></td>');
	var elem = document.getElementById(cell);
	elem.addEventListener(
		'click',
		function(){
			// document.getElementById('clip').play();
			incrementor(row,col);
		},
		false);
}

function createRow(row){
	$('#gameBoard').append('<tr id="row-' + row + '" class="gameRow">');
	$('#gameBoard').append('</tr>');
	var i = 0;	
	for(i = 0; i < ncol ; i ++){
		createCell(row,i);
	}
}

function setUpBoard(){
	$('#gameConsole').append('<table cellspacing="0" id="gameBoard" class="gameTable">');
	$('#gameConsole').append('</table>');
	for(var i = 0; i < nrow ; i ++){
		createRow(i);
	}
}