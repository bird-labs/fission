var nrow = 9;
var ncol = 6;
var turna = 0;
var size;
jiggleTime = 100;

var colors = ["#FF0000","#22B14C","yellow"];
var colorDark = ["#880015","#156F30","yellow"];
var colorBack = ["#8F0C12","#115726","yellow"]

$(function(){
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

	var cellWidth = (totalWidth - 12*ncol)/ncol;
	var cellHeight = (totalHeight - 12*nrow - 12)/nrow;

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
	alert(turn + " is the Winner!");
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
		$(cell).append('<svg style="height:99%; width: 99%;"> \
<defs>\
    <linearGradient id="grad-'+celli+'" x1="0%" y1="0%" x2="100%" y2="0%">\
      <stop offset="0%" style="stop-color:' + colors[turna] + ';stop-opacity:1" />\
      <stop offset="100%" style="stop-color:' + colorDark[turna] + ';stop-opacity:1" />\
    </linearGradient>\
  </defs>\
		 	 <circle cx="50%" cy="50%" r="25%" stroke="' +  colors[turna] + '" stroke-width="1" fill="url(#grad-'+celli+')" /> \
		</svg>');
		$(cell).css({
				"background-color":"rgb(30,30,30)"
		});
	}

	if(state == 2){
		$(cell).append('<svg style="height:99%; width: 99%;"> \
<defs>\
    <linearGradient id="grad-'+celli+'" x1="0%" y1="0%" x2="100%" y2="0%">\
      <stop offset="0%" style="stop-color:' + colors[turna] + ';stop-opacity:1" />\
      <stop offset="100%" style="stop-color:' + colorDark[turna] + ';stop-opacity:1" />\
    </linearGradient>\
  </defs>\
		 	 <circle cx="25%" cy="50%" r="20%" stroke="' +  colors[turna] + '" stroke-width="1" fill="url(#grad-'+celli+')" /> \
		 	 <circle cx="75%" cy="50%" r="20%" stroke="' +  colors[turna] + '" stroke-width="1" fill="url(#grad-'+celli+')" /> \
		</svg>');
		$(cell).css({
				"background-color":"rgb(30,30,30)"
				//"background-color":"rgb(0,162,232)"
		});
	}

	if(state == 3){
		$(cell).append('\
			<svg style="height:99%; width: 99%;"> \
			<defs>\
    <linearGradient id="grad-'+celli+'" x1="0%" y1="0%" x2="100%" y2="0%">\
      <stop offset="0%" style="stop-color:' + colors[turna] + ';stop-opacity:1" />\
      <stop offset="100%" style="stop-color:' + colorDark[turna] + ';stop-opacity:1" />\
    </linearGradient>\
  </defs>\
		 	 <circle cx="50%" cy="33%" r="15%" stroke="' +  colors[turna] + '" stroke-width="1" fill="url(#grad-'+celli+')" /> \
		 	 <circle cx="30%" cy="66%" r="15%" stroke="' +  colors[turna] + '" stroke-width="1" fill="url(#grad-'+celli+')" /> \
		 	 <circle cx="70%" cy="66%" r="15%" stroke="' +  colors[turna] + '" stroke-width="1" fill="url(#grad-'+celli+')" /> \
		</svg>');
		$(cell).css({
				"background-color":"rgb(30,30,30)"
				//"background-color":"rgb(0,162,232)"
		});
	}

	// $('.gameCell').height(size);
	// $('.gameCell').width(size);
//	$(cell).append(state);
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

function jiggle(id,mode,deg,ratio){
	if(deg < 0.005) return;
	var ele = $('#' + id);
	if(mode == 0){
		ele.css({
			"transform": "rotate(-" + deg + "deg)"
		});
		setTimeout(function(){jiggle(id,1,deg,ratio);},jiggleTime);
	}
	if(mode == 1){
		ele.css({
			"transform": "rotate(" + deg + "deg)"
		});
		setTimeout(function(){jiggle(id,0,deg/ratio,ratio);},jiggleTime);
	}
}

function updateTurnColor(){
	turna = getTurn() - 1;

	$('.gameTable').css({
		"border-color":"" + colors[turna] + ""
	});
	$('.gameTable').css({
		"background-color":""+ colorBack[turna]+""
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
			jiggle(cell,0,3,1.5);
		},
		false);
	// document.getElementById(cell).
	// addEventListener('mouseover',function(){jiggle(cell,0,2,2);},false);
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
	$('#gameConsole').append('<table cellspacing="4" id="gameBoard" class="gameTable">');
	$('#gameConsole').append('</table>');

	for(var i = 0; i < nrow ; i ++){
		createRow(i);
	}
	
	
}
