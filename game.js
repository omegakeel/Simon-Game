//Array created for random color picking
var buttonColors = ["red", "blue", "green", "yellow"];

//Array created for computer to store random pattern
var gamePattern = [];

//Array created for computer to store player's pattern/choices
var userClickedPattern = [];

//While "started" is false, it means a game is not in progress
var started = false;

var level = 0;

//This makes it so that the colors cannot be clicked while the game has not started yet
$(".btn").addClass("disabled-button");
//When the play button is clicked, make it so the colors can be clicked, hide the main menu buttons, make the Level counter appear, and start the game
$("#play").click(function(){
    if(!started){
        $(".btn").removeClass("disabled-button");
        $(".buttons").css("visibility", "hidden");
        $("#level-title").text("Level" + level);
        nextSequence();
        started = true;
    }
});
//When game is over and the line is clicked, restart the game
$("#level-title").click(function(){
    if(!started){
        $(".btn").removeClass("disabled-button");
        $(".buttons").fadeOut().fadeIn();
        $(".buttons").css("visibility", "hidden");
        $("#level-title").text("Level" + level);
        nextSequence();
        started = true;
    }
});

//Function that plays the chosen color's sound and creates an animation for that color
$(".btn").click(function() {
    var userChosenColor = $(this).attr("id"); // Collect the ID of the button that was clicked.
    userClickedPattern.push(userChosenColor); //Add the ID (name of Color) to the user's pattern

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
        if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
            console.log("success");

            if(userClickedPattern.length === gamePattern.length){
                setTimeout(function (){
                    nextSequence();
                }, 1000)
            }
        }
        else{
            console.log("wrong");

            playSound("wrong");

            $("body").addClass("game-over");
            setTimeout(function(){
                $("body").removeClass("game-over")
            }, 200);
            
            $(".btn").addClass("disabled-button");

            $("#level-title").text("Game Over, Click Here to Restart");
            startOver();

        }
    }

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}

function nextSequence(){

    userClickedPattern = []; //Reset the user's pattern after every level
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random()*4); // Random number from 0 to 3
    var randomChosenColor = buttonColors[randomNumber]; // Use the random number from above to choose Color from array
    gamePattern.push(randomChosenColor); //Add the random Color from above to the pattern
    
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    }

    function playSound(name){
        var audio = new Audio("sounds/" + name + ".mp3");
        audio.play();
    }

    function animatePress(currentColor){
        $("#" + currentColor).addClass("pressed");
        setTimeout(function(){
            $("#" + currentColor).removeClass("pressed")
        }, 100);
    }


//How to Play pop-up
    const openModalButtons = document.querySelectorAll('[data-modal-target]')
    const closeModalButtons = document.querySelectorAll('[data-close-button]')
    const overlay = document.getElementById('overlay')
    
    openModalButtons.forEach(button => {
      button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget)
        openModal(modal)
      })
    })
    
    overlay.addEventListener('click', () => {
      const modals = document.querySelectorAll('.modal.active')
      modals.forEach(modal => {
        closeModal(modal)
      })
    })
    
    closeModalButtons.forEach(button => {
      button.addEventListener('click', () => {
        const modal = button.closest('.modal')
        closeModal(modal)
      })
    })
    
    function openModal(modal) {
      if (modal == null) return
      //else
      modal.classList.add('active')
      overlay.classList.add('active')
    }
    
    function closeModal(modal) {
      if (modal == null) return
      //else
      modal.classList.remove('active')
      overlay.classList.remove('active')
    }
