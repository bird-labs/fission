var nrow = 9;
var ncol = 6;
var turna = 0;
var size;
jiggleTime = 100;

var colors = ["#FF0000","#22B14C","#FFC90E","#00A2E8"];
var colorDark = ["#880015","#0E4B20","#D37B03","#006F9D"];
var colorBack = ["#8F0C12","#115726","#D2B402","#00618A"];

$(function(){
	setTimeout(
		function(){
			$('#logoBoard').fadeOut();
		},1500);
	setUpBoard();
	setUpCredentials();
	$('.gameTable').css({
		"overflow":"hidden"
	});
	updateTurnColor();
});

function setUpCredentials(){
	var totalWidth = window.innerWidth;
	var totalHeight = window.innerHeight;
	

	$('.gameConsole').height(totalHeight);
	$('.gameConsole').width(totalWidth);

	$('#logoBoard').height(totalHeight);
	$('#logoBoard').width(totalWidth);

	var cellWidth = (totalWidth - 4*ncol)/ncol;
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

function winner(turn){
	turna = getTurn() - 1;

	$('#winModal').modal('show');
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
}

function setVal(){
	for(var i = 0 ; i < nrow ; i ++ ){
		for(var j = 0 ; j < ncol ; j ++ ){
			$('#' + cellId(i,j)).append(getPlayer(i,j));	
		}	
	}
}

function updateCell(row,col,state){

	var cell = '#' + cellId(row,col);
	var celli = cellId(row,col);
	turna = getTurn() - 1;
	$(cell).empty()
	
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
		//rotateAround('svg-' + celli + '-1',0,1);
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
		//rotateAround('svg-' + celli + '-2',0,4,2);
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
		//rotateAround('svg-' + celli + '-3',0,8,3);
	}
}

function rotateAround(id, deg,delta,revs){
	if(deg> revs*360) return;//deg -= 360;
	var ele = $('#' + id);
	if(ele == undefined || ele == null) return;
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
//	ele.css({"background-color":"" + colorBack[turna]});
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

	/*$('.gameTable').animate({
		"border-color":"" + colors[turna] + ""
	},500);
	*/$('.gameTable').css({
/*		"background-color":""+ colorBack[turna]+""
*/	
	"background-color":"black"

});
}
	
function createCell(row , col){
	var cell = cellId(row,col);
	$('#row-' + row).append('<td id="' + cell + '" class="gameCell"></td>');
	document.getElementById(cell).
	addEventListener(
		'click',
		function(){
			incrementor(row,col);
		//	jiggledown(cell,0,3,1.5);
		},
		false);
/*	 document.getElementById(cell).
	 addEventListener('mouseover',function(){jiggle(cell,0,2,2);},false);*/
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
