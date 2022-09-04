// alert("hello")
const userClickedPattern = [];
let gamePattern = [];
const buttonColors = ["red", "blue", "green", "yellow"];


var level = 0;

function playSound(name) {
    var audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}

function animatePress(currentColor) {
    $(`#${currentColor}`).addClass("pressed");
    setTimeout(function () {
        $(`#${currentColor}`).removeClass("pressed");
    }, 100);
}

function nextSequence() {
    level++;
    var randomNumber = Math.floor(Math.random() * 4)
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $(`#${randomChosenColor}`).fadeOut().fadeIn().fadeOut().fadeIn();

    playSound(randomChosenColor);

    $("#level-title").text(`Level ${level}`);
    userClickedPattern.length = 0;
}

var started = false;

$(document).keypress(() => {
    started = !started;
    { started && nextSequence(); }
    $(".btn").removeClass("skull");
});

function checkAnswer(currentLevel) {
    console.log(currentLevel);
    
        if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
            console.log("success");

            if(gamePattern.length === userClickedPattern.length){
                setTimeout(nextSequence, 1000);
            }

        } 
        else{
            var audio = new Audio ("sounds/game-over.mp3");
            audio.play();
            document.body.classList.add("game-over");
            setTimeout(function(){
                document.body.classList.remove("game-over");
            }, 1000)

            $("#level-title").html("Game-over<br>Press any key to restart");
            $(".btn").addClass("skull");
            startOver();
        }
    
}


$(".btn").click(function () {
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);

    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;

}




