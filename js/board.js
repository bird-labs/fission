var nrow = 9;
var ncol = 6;

$(function(){
	setUpBoard();
})

function createCell(row,col){
	$('#gameConsole').append('<td id="cell-' + row + '-' + col + '" class="gameCell">1</td>');
	document.getElementById('cell-' + row + '-' + col + '').
	addEventListener(
		'click',
		function(){
			increment(row,col);
		},
		false);
}

function createRow(rowNum){
	$('#gameConsole').append('<tr id="row-' + row + '" class="gameRow">');	
	for(var i = 0; i < ncol ; i ++){
		createCell(rowNum,i);
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