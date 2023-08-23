let gamePattern = [], playerPattern = []
let buttonColors = ["red", "blue", "green", "yellow"]
let gameStarted = false
let gameOver = false
let level = 0

$(document).keypress(() => {
    if (!gameStarted) {
        gameStarted = true
        gameOver = false
        nextSeq()
    }
})

$(document).click((event) => {
    if (gameStarted && !gameOver) {
        if (buttonColors.includes(event.target.id)) {
            animatePress(event.target, "pressed", 100)
            playSound(event.target.id)
            playerPattern.push(event.target.id)
            checkAnswer(playerPattern.length - 1)
        }
    }
})

function nextSeq() {
    level++
    $('h1').text("Level " + level)
    let rndNumber = Math.floor(Math.random() * 4)
    let randomChoosenColor = buttonColors[rndNumber]
    gamePattern.push(randomChoosenColor)
    $('.' + randomChoosenColor).fadeOut(100).fadeIn(100)
    playSound(randomChoosenColor)
}

function checkAnswer(currentLevel) {
    if (JSON.stringify(playerPattern[currentLevel]) === JSON.stringify(gamePattern[currentLevel])) {
        if (gamePattern.length === playerPattern.length) {
            playerPattern = []
            setTimeout(() => {
                nextSeq()
            }, 1000);
        }
    } else {
        gameStarted = false
        gameOver = true
        level = 0
        gamePattern = []
        playerPattern = []
        playSound("wrong")
        $('h1').text("Game Over, Press a Key To Play Again")
        animatePress("body", "game-over", 200)
    }
}

function animatePress(target, animation, timeOut) {
    $(target).addClass(animation)
    setTimeout(() => {
        $(target).removeClass(animation)
    }, timeOut);
}

function playSound(name) {
    let sound = new Audio("sounds/" + name + ".mp3")
    sound.play()
}