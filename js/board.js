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

function createCell(row , col){
	$('#gameConsole').append('<td id="cell-' + row + '-' + col + '" class="gameCell">0</td>');
	document.getElementById(cellId(row,col)).
	addEventListener(
		'click',
		function(){
			increment(row,col);
		},
		false);
}

function createRow(row){
	$('#gameConsole').append('<tr id="row-' + row + '" class="gameRow">');	
	for(var i = 0; i < ncol ; i ++){
		createCell(row,i);
	}
	$('#gameConsole').append('</tr>');
}

function setUpBoard(){
	$('#gameConsole').append('<table id="gameBoard" class="gameTable">');
	for(var i = 0; i < nrow ; i ++){
		createRow(i);
	}
	$('#gameConsole').append('</table>');
}