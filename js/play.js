var nrow = 9;
var ncol = 6;
var turn = 1;
var clicks = 0;

var board = new Array(nrow);
var player = new Array(nrow);

for (var i = 0; i < nrow; i++) 
{
	board[i] = new Array(ncol);
	player[i] = new Array(ncol);
}

for (var i = 0; i < nrow; i++)
{
	for (var j = 0; j < ncol; j++)
	{
		board[i][j] = 0;
		player[i][j] = 0;
	}
}

var found1 = false;
var found2 = false;

function didWin()
{
	for (var i = 0; i < nrow; i++)
	{
		for (var j = 0; j < ncol; j++)
		{
			if (player[i][j] == 1) found1 = true;
			else if (player[i][j] == 2) found2 = true;
		}
	}
	if (found1 == false) winner(2);
	else if (found2 == false) winner(1);
	else return 0;
}

function incrementor (i,j){
	if ((player[i][j] == turn) || (player[i][j] == 0)){
		increment(i,j);
		changeTurn();
		clicks++;
	}
	else return;
}

function changeTurn(){
	if (turn == 1) turn = 2;
	else if (turn == 2) turn = 1;
}

function getTurn(){
	return turn;
}

function increment (i, j) {
	player[i][j] = turn;
	if ((i == 0 && j == 0) || (i == 0 && j == (ncol - 1)) || (i == (nrow - 1) && j == 0) || (i == (nrow - 1) && j == (ncol - 1)))
	{
		if (board[i][j] == 1) 
		{
			blast(i,j);
		}
		else board[i][j] = 1;
	}
	else if (j == 0 || i == 0 || j == (ncol - 1) || i == (nrow - 1))  
	{
		if (board[i][j] == 2) 
		{
			blast(i,j);
		}
		else board[i][j]++;
	}
	else
	{
		if (board[i][j] == 3)
		{
			blast(i,j);
		}
		else board[i][j]++;	
	}
	updateCell(i, j, board[i][j]);
}

function getPlayer (i, j) {
	return player[i][j]
}

function blast (i,j) {
	//Corner elements
	if (i == 0 && j == 0)
	{
		board[i][j] = 0;
		player[i][j] = 0;
		increment(0,1);
		increment(1,0);
	}
	else if (i == 0 && j == (ncol - 1))
	{
		board[i][j] = 0;
		player[i][j] = 0;
		increment(0,(ncol - 2));
		increment(1,(ncol - 1));
	}
	else if (i == (nrow - 1) && j == 0)
	{
		board[i][j] = 0;
		player[i][j] = 0;
		increment((nrow - 1),1);
		increment((nrow - 2),0);
	}
	else if (i == (nrow - 1) && j == (ncol - 1))
	{
		board[i][j] = 0;
		player[i][j] = 0;
		increment((nrow - 1), (ncol - 2));
		increment((nrow - 2), (ncol - 1));
	}
	//Side elements
	else if (i == 0)
	{
		board[i][j] = 0;
		player[i][j] = 0;
		increment((i + 1), j);
		increment(i, (j + 1));
		increment(i, (j - 1));
	}
	else if (i == (nrow - 1))
	{
		board[i][j] = 0;
		player[i][j] = 0;
		increment((i - 1), j);
		increment(i, (j + 1));
		increment(i, (j - 1));
	}
	else if (j == 0)
	{
		board[i][j] = 0;
		player[i][j] = 0;
		increment((i + 1), j);
		increment(i, (j + 1));
		increment((i - 1), j);
	}
	else if (j == 0)
	{
		board[i][j] = 0;
		player[i][j] = 0;
		increment((i + 1), j);
		increment(i, (j - 1));
		increment((i - 1), j);
	}
	//All others
	else
	{
		board[i][j] = 0;
		player[i][j] = 0;
		increment(i, (j - 1));
		increment((i + 1), j);
		increment(i, (j + 1));
		increment((i - 1), j);
	}
}