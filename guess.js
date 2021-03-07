let min = 1,
    max = 10,
    winNum = getWinNumber(min,max),
    guessLeft = 3;

const gameUI = document.getElementById('game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      messageUI = document.querySelector('.message');

minNum.textContent = min;
maxNum.textContent = max;

gameUI.addEventListener('mousedown',function(e){
    if(e.target.className === 'play-again'){
        window.location.reload();
    }
});
function getWinNumber(min,max){
    return(Math.floor(Math.random()*(max-min+1)+min));
}
guessBtn.addEventListener('click',function(){
    let guess = parseInt(guessInput.value);
    if(isNaN(guess) || guess < min || guess > max){
        setMessage(`Please enter a number between ${min} and ${max}`,'red')
    }
    if(guess === winNum){
        guessInput.disabled = true;
        guessInput.style.borderColor = 'green';
        gameOver(true,`${winNum} is correct, YOU WIN`);
    }else{
        
        guessLeft -= 1;

        if(guessLeft === 0){
            guessInput.disabled = true;
            gameOver(false,`Game over, you lost. The correct number was ${winNum}`);
        }else{
            guessInput.style.borderColor = 'red';
            guessInput.value = '';
            setMessage(`${guess} is not correct, ${guessLeft} guesses left`,'red');
        }

    }
});

function gameOver(won,msg){
    let color;
    won === true ? color = 'green': color = 'red'
    guessInput.disabled = 'true';
    guessInput.style.borderColor = color ;
    messageUI.style.color = color;
    setMessage(msg);

    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again'
}
function setMessage(msg,color){
    messageUI.style.color = color;
    messageUI.textContent = msg;
}