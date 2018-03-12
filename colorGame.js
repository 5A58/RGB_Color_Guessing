var numSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");
var selectedModeButton = document.querySelector(".mode.selected");

init();

// initialize the application
function init(){
	// mode button event listeners
	setUpModeButtons();
	// add click listeners to squares
	setUpSquares();
	resetGame();
}

function setUpModeButtons(){
	for(var i = 0; i < modeButtons.length; i++){
		modeButtons[i].addEventListener("click", function(){
			selectedModeButton.classList.remove("selected");
			this.classList.add("selected");
			selectedModeButton = this;
			this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
			resetGame();
		});
	}
}

function setUpSquares(){
	for (var i = 0; i < squares.length; i++){
		squares[i].addEventListener("click", function(){
			var clickedColor = this.style.backgroundColor;
			// compare color of clicked square to pickedColor
			if(clickedColor === pickedColor){
				messageDisplay.textContent = "Correct!";
				resetButton.textContent = "Play Again?";
				changeColors(clickedColor);
				h1.style.backgroundColor = clickedColor;
			} else {
				this.style.backgroundColor = "#232323";
				messageDisplay.textContent = "Try Again";
			}
		});
	}
}

// generate new colors for game reset
function resetGame(){
	colors = generateRandomColors(numSquares);
	// pick new pickedColor
	pickedColor = pickColor();
	// change colorDisplay to match picked Color
	colorDisplay.textContent = pickedColor;
	// clear message
	messageDisplay.textContent = "";
	resetButton.textContent = "New Colors";
	// change colors of squares
	for(var i = 0; i < squares.length; i++){
		if(colors[i]){
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		} else {
			squares[i].style.display = "none";
		}
	}
	h1.style.backgroundColor = "steelblue";
}

// new colors or new game button clicked
resetButton.addEventListener("click", function(){
	resetGame();
});

function changeColors(color){
	// go through all squares and set their color to color
	for(var i = 0; i < squares.length; i++){
		squares[i].style.backgroundColor = color;
	}
}

function pickColor(){
	// pick a random number between 0 and the length of the colors array 
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

// create and array and populate it with num random colors
function generateRandomColors(num){
	var arr = [];
	for(var i = 0; i < num; i++){
		// add random color to array
		arr.push(randomColor());
	}
	return arr;
}

function randomColor(){
	// pick a "red", "green", "blue" from 0 - 255
	var r = Math.floor(Math.random() * 255 + 1);
	var g = Math.floor(Math.random() * 255 + 1);
	var b = Math.floor(Math.random() * 255 + 1);
	return "rgb(" + r + ", " + g + ", " + b + ")";
}