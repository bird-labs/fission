var nrow = 9;
var ncol = 6;

$(function(){
	setUpBoard();
});

function cellId(row,col){
	return 'cell-' + row + '-' + col + '';
}

/*function increment(row,col){
	$('#' + cellId(row,col)).append('Fuck');
}*/

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

function jiggle(id,mode,deg){
	if(deg < 0.005) return;
	var ele = $('#' + id);
	if(mode == 0){
		ele.css({
			"transform": "rotate(-" + deg + "deg)"
		});
		setTimeout(function(){jiggle(id,1,deg);},100);
	}
	if(mode == 1){
		ele.css({
			"transform": "rotate(" + deg + "deg)"
		});
		setTimeout(function(){jiggle(id,0,deg/2);},100);
	}
}
	
function createCell(row , col){
	var cell = cellId(row,col);
	$('#row-' + row).append('<td id="' + cell + '" class="gameCell"> ' + row + '-' + col +' </td>');
	document.getElementById(cell).
	addEventListener(
		'click',
		function(){
			increment(row,col);
			$('#'+cell).css({
				"background-color":"rgb(0,162,232)"
			});
			jiggle(cell,0,1.8);
		},
		false);
	document.getElementById(cell).
	addEventListener(
		'mouseover',
		function(){
			increment(row,col);
			jiggle(cell,0,1);
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
	$('#gameConsole').append('<table id="gameBoard" class="gameTable">');
	$('#gameConsole').append('</table>');

	for(var i = 0; i < nrow ; i ++){
		createRow(i);
	}
	
	
}