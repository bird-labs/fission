var nrow = 9;
var ncol = 6;
var turna = 0;

var colors = ["red","green"];

$(function(){
	setUpBoard();
});

function cellId(row,col){
	return 'cell-' + row + '-' + col + '';
}

/*function increment(row,col){
	$('#' + cellId(row,col)).append('Fuck');
}*/

function winner(turn){
	alert(turn + "is the Winner!");
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
	turna = getTurn() - 1;
	//alert(turn);
/*	$(cell).fadeOut(1000,
		function{*/
			$(cell).empty();
		// });
	if(state == 0){
		$(cell).css({
				"background-color":"rgb(30,30,30)"
		});
		}

	if(state == 1){
		$(cell).append('<svg style="height:100%; width: 100%;"> \
		 	 <circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="' +  colors[turna] + '" /> \
		</svg>');
		$(cell).css({
				"background-color":"rgb(0,162,232)"
		});
	}

	if(state == 2){
		$(cell).append('<svg style="height:100%; width: 100%;"> \
		 	 <circle cx="25" cy="50" r="20" stroke="green" stroke-width="4" fill="' +  colors[turna] + '" /> \
		 	 <circle cx="75" cy="50" r="20" stroke="green" stroke-width="4" fill="' +  colors[turna] + '" /> \
		</svg>');
		$(cell).css({
				"background-color":"rgb(34,177,76)"
		});
	}

	if(state == 3){
		$(cell).append('<svg style="height:100%; width: 100%;"> \
		 	 <circle cx="50" cy="33" r="15" stroke="green" stroke-width="4" fill="' +  colors[turna] + '" /> \
		 	 <circle cx="33" cy="66" r="15" stroke="green" stroke-width="4" fill="' +  colors[turna] + '" /> \
		 	 <circle cx="66" cy="66" r="15" stroke="green" stroke-width="4" fill="' +  colors[turna] + '" /> \
		</svg>');
		$(cell).css({
				"background-color":"rgb(255,127,39)"
		});
	}


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
	$('#row-' + row).append('<td id="' + cell + '" class="gameCell">0</td>');
	document.getElementById(cell).
	addEventListener(
		'click',
		function(){
			incrementor(row,col);
			
			jiggle(cell,0,1.8);
		},
		false);
	document.getElementById(cell).
	addEventListener(
		'mouseover',
		function(){
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