var nrow = 9;
var ncol = 6;

var board = new Array(nrow);

for (var i = 0; i < nrow; i++) 
{
	board[i] = new Array(ncol);
}

for (var i = 0; i < nrow; i++)
{
	for (var j = 0; j < ncol; j++)
	{
		board[i][j] = 0;
	}
}

function increment (i, j) {
	if ((i == 0 && j == 0) || (i == 0 && j == (ncol - 1)) || (i == (nrow - 1) && j == 0) || (i == (nrow - 1) && j == (ncol - 1)))
	{
		if (board[i][j] == 1) 
		{
			blast();
		};
		else board[i][j] = 1;
	};
	else if (j == 0 || i == 0 || j == (ncol - 1) || i == (nrow - 1))  
	{
		if (board[i][j] == 2) 
		{
			blast();
		};
		else board[i][j]++;
	};
	else
	{
		if (board[i][j] == 3)
		{
			blast();
		};
		else board[i][j]++;	
	}
}

function blast () {
	console.log("blasted!")
}