
userClickedPattern=[];
gamePattern=[];
buttonColors=["red","blue","green","yellow"];
var level=0;


function nextSequence(){
    userClickedPattern=[];
    var randomNumber= Math.floor(Math.random()*4);
    var randomChosenColour=buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);  
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);  
    playSound(randomChosenColour);
    // $("#level-title").text="Level "+level;
    document.querySelector("#level-title").textContent= "Level "+level;
    level++;

}
 function playSound(randomChosenColour){
    var audio= new Audio("./sounds/"+randomChosenColour+".mp3");
    audio.play();
 }

$(".btn").click(function(){
    var userChosencolor= $(this).attr("id");
    userClickedPattern.push(userChosencolor);
    playSound(userChosencolor);
    animatePress(userChosencolor);
    checkAnswer(userClickedPattern.length-1);
    // console.log(userChosencolor);
})

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed")
    // $("#"+currentColour).addClass("pressed").delay(100).removeClass("pressed");
    setTimeout(function(){
        document.querySelector("#"+currentColour).classList.remove("pressed");
    },100);

}

$(document).keypress(function(){
    if(level==0){
        nextSequence();
    }
})

function checkAnswer(currentlevel){
    if(userClickedPattern[currentlevel]==gamePattern[currentlevel]){
        if(userClickedPattern.length===gamePattern.length){
            console.log("success");
            setTimeout(function(){
                nextSequence();
            },1000);    
        }       
    }
    else{
        console.log("failed");
        playSound("wrong");
        $("body").addClass("game-over")
        setTimeout(function(){
            document.querySelector("body").classList.remove("game-over");
        },200)
        // $("h1#level-title").text="Game over, press any key to restart";
        document.querySelector("#level-title").textContent="Game over, Press any key to restart.";
        startOver();

    }
}

function startOver(){
    level=0;
    gamePattern=[];
    userClickedPattern=[];
}

