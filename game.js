var buttonColours = ["red", "blue", "green", "yellow"];

//Empty arrays
var gamePattern = [];
var userClickedPattern = [];

// To keep track of whether the game has started, so you only call nextSequence() on the first keypress
var started = false;
var level = 0;

/// Check for keyboard key pressed
$(document).keypress(function () {
	if (!started) {
		// The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0"
		$("#level-title").text("Level" + level);
		nextSequence();
		started = true;
	}
});

// If the start buton is presed
$(".starter").click(function () {
	if (!started) {
		// The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0"
		$("#level-title").text("Level" + level);
		nextSequence();
		started = true;
	}
});

// Check for button clikcked
$(".btn").click(function () {
	var userChosenColour = $(this).attr("id");
	userClickedPattern.push(userChosenColour);

	playSound(userChosenColour);
	animatePress(userChosenColour);
	checkAnswer(userClickedPattern.length - 1);
});

// It should take one input with the name currentLevel
function checkAnswer(currentLevel) {
	// Check if the most recent user answer is the same as the game pattern
	if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
		if (userClickedPattern.length === gamePattern.length) {
			setTimeout(function () {
				nextSequence();
			}, 1000);
		}
	} else {
		playSound("wrong");
		$("body").addClass("game-over");
		$("#level-title").text("Game Over, Press Any Key to Restart");

		setTimeout(function () {
			$("body").removeClass("game-over");
		}, 200);

		startOver();
	}
}

function nextSequence() {
	userClickedPattern = [];
	// Increase level everytime nextSequence is called
	level++;

	// Update the title every time nextSequence is called
	$("#level-title").text("Level " + level);

	var randomNumber = Math.floor(Math.random() * 4);
	var randomChosenColour = buttonColours[randomNumber];
	gamePattern.push(randomChosenColour);

	$("#" + randomChosenColour)
		.fadeIn(100)
		.fadeOut(100)
		.fadeIn(100);

	playSound(randomChosenColour);
}

//Adding and removing animation class
function animatePress(currentColor) {
	// Add this pressed class to the button that gets clicked inside animatePress().
	$("#" + currentColor).addClass("pressed");

	// Remove the pressed class after a 100 milliseconds.
	setTimeout(function () {
		$("#" + currentColor).removeClass("pressed");
	}, 100);
}

function playSound(name) {
	var audio = new Audio("sounds/" + name + ".mp3");
	audio.play();
}

function startOver() {
	level = 0;
	gamePattern = [];
	started = false;
}
