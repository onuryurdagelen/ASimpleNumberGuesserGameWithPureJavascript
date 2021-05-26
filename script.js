/*
GAME FUNCTION
-Player must guess a number between a min and max
-PLayer gets a certain amount of guesses
-Notify player of guesses remaining
-Notify the player of the correct answer if loose
-Let player choose to play again

*/

const checkNumber = document.getElementById('check-number');
const closeBtn = document.getElementsByClassName('close-btn')[0];
const guessInput = document.getElementsByClassName('guess-input')[0];
const randomNumberField = document.getElementsByClassName('output-field')[0];
const checkGuess = document.getElementsByClassName('check-guess')[0];
const popUp = document.getElementById('popup-1');
const content = document.getElementsByClassName('content')[0];
const description = document.getElementsByClassName('description')[0];
const overlay = document.getElementsByClassName('overlay')[0];
// const resetNumber =document.getElementById('reset-number');

//Generate Random Number

function generateRandomNumber() {
    const randomNumber = Math.floor(Math.random() * 10) +1;

    return randomNumber;
}

//Reset Game 


let remainingRight = 5;
randomNumberField.value = generateRandomNumber();
let randomInput = parseInt(randomNumberField.value);
console.log(randomInput)
//Listen for guess
checkNumber.addEventListener('click',function(){
    let guess = parseInt(guessInput.value)

    if(isNaN(guess) || guess < 1 || guess > 10) {
        setMessage(`Please enter a number between 1 and 10!`,'red');
        guessInput.value = "";
    } 
     //Check if won
     else if(guess === randomInput) {
         //Game over-won
        guessInput.disabled = true;
        guessInput.style.borderColor = 'green';
        setMessage(`${guess} is correct,YOU WON!`,'green');
        description.classList.toggle('won');
        description.textContent = 'Congrats,YOU WON!'

        setTimeout(function(){
            overlay.classList.toggle('active');
            content.classList.toggle('active');
        },2000);
        closeBtn.addEventListener('click',function(){
            overlay.classList.remove('active');
            content.classList.remove('active');
            setMessage("");
            guessInput.disabled = false;
            guessInput.style.borderColor = '';
            guessInput.value = "";
            description.classList.remove('won');
            randomNumberField.value = generateRandomNumber();
            randomInput = parseInt(randomNumberField.value);
            console.log(randomInput)
            
        })
    }
    else {
        //Wrong number
        remainingRight--;
        if(remainingRight === 0) {
            //Game over -lost
            guessInput.disabled = true;
            guessInput.style.borderColor = 'red';
            setMessage(`${guess} is not correct.Your remaining right have ${remainingRight} left so YOU LOST!`,'red');
            description.textContent = 'GAME OVER!'
            setTimeout(function(){
                overlay.classList.toggle('active');
                content.classList.toggle('active');
            },2000);
            closeBtn.addEventListener('click',function(){
                overlay.classList.remove('active');
                content.classList.remove('active');
                setMessage("");
                guessInput.disabled = false;
                guessInput.style.borderColor = '';
                guessInput.value = "";
                
            })
        }
        else {
            setMessage(`${guess} is not correct.Your remaining right have ${remainingRight} left.`,'orange');
            guessInput.value = "";
        }

    }
    console.log(guess);
})

//Set message
function setMessage(e,color) {
    checkGuess.style.color = color;
    checkGuess.textContent = e;
}

