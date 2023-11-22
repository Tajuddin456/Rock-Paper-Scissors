// whole logic inside the game function

const game = () => {

    const playerBtn = document.querySelectorAll('.selection button');
    const showIcon = document.querySelector('.show i');
    const computerShowIcon = document.querySelector('.computer i');
    const randomClasses = ["fa-regular fa-hand-rock", "fa-regular fa-hand-paper", "fa-regular fa-hand-scissors"];
    const pScore = document.getElementById('playerScore');
    const cScore = document.getElementById('computerScore');
    const display = document.getElementById('demo');
    const reloadBtn = document.querySelector('.reload');
    const text = document.getElementById('demo2');


    let playerScore = 0;   // declaring and initializing player's score
    let computerScore = 0;
    let moveNumber = 0;

    // function to start the game 
    const startGame = () => {

        playerWeapon();

    }
    //functions from where main curicu
    const playerWeapon = () => {

        playerBtn.forEach(element => {
            element.addEventListener('click', (e) => {
                let plyr_Choosed;
                let comp_Choosed;
                display.innerHTML = "";

                text.style.display = "none";        //removing choose Move Text
                plyr_Choosed = e.target.className;
                playerBtnAnimations(plyr_Choosed);

                movesLogic();            // calling the movesLogic functon to count to number of moves after clicking

                playerBtn.forEach(btn => {  //disabling the player's button til winners declared
                    btn.disabled = true;
                });

                animationFunction(plyr_Choosed, comp_Choosed); //calling the animations function

                setTimeout(() => {
                    comp_Choosed = computerWeapon();         //calling the computer weapons
                    showIcon.className = plyr_Choosed;
                    computerShowIcon.className = comp_Choosed;

                }, 3000);



                setTimeout(() => {
                    winner(plyr_Choosed, comp_Choosed); //calling the winner function after 4s 
                }, 4000);


                if (moveNumber == 5) {
                    setTimeout(() => {
                        gameOver(playerBtn, moveNumber); // finishing the game after calling the gamover function 
                    }, 5000);
                }

            });
        });
    }

    // function to win or lose logic
    const winner = (player, computer) => {

        if (player === computer) {   // it's a tie !
            pScore.innerHTML = pScore.innerHTML;
            cScore.innerHTML = cScore.innerHTML;
            display.innerHTML = " oops it's a tie!";
            display.style.color = "blue";

        }
        //player wins !
        else if ((player == "fa-regular fa-hand-scissors" && computer == "fa-regular fa-hand-paper") || (player == "fa-regular fa-hand-paper" && computer == "fa-regular fa-hand-rock") || (player == "fa-regular fa-hand-rock" && computer == "fa-regular fa-hand-scissors")) {
            display.innerHTML = "You win !";
            display.style.color = "green";
            playerScore++;
            pScore.innerHTML = playerScore;
            playerSpinFunction(player);

        }
        else         // computer wins
        {
            display.innerHTML = "Computer win !";
            display.style.color = "red";
            computerScore++;
            cScore.innerHTML = computerScore;
            compSpinFunction(player);
        }

        playerBtn.forEach(btn => {
            btn.disabled = false;
        });

        if (text.style.display === "none" || text.style.display === "") {
            text.style.display = "flex";
        }
    }

    // function to reduce number of moves while making moves
   const movesLogic = () => {
        const movesLeft = document.querySelector('.movesleft');
        moveNumber++;
        movesLeft.innerText = `Moves Left: ${5 - moveNumber}`;
    }
     
    //animations when we clicked any button
    const playerBtnAnimations = (plyr_Choosed) => {  
        const rock = document.getElementById('rock');
        const paper = document.getElementById('paper');
        const scissors = document.getElementById('scissors');

        if (plyr_Choosed === 'fa-regular fa-hand-rock') {
            rock.classList.add("fa-fade"); 
            setTimeout(function () {
                rock.classList.remove("fa-fade") 
            }, 2000)
        }
       else if (plyr_Choosed === 'fa-regular fa-hand-paper') {
            paper.classList.add("fa-fade"); 
            setTimeout(function () { 
                paper.classList.remove("fa-fade") 
            }, 2000)
        }
        else {
            scissors.classList.add("fa-fade"); 
            setTimeout(function () { 
                scissors.classList.remove("fa-fade") 
            }, 2000)
        }
    }
    
    //animations when player won any round
    const playerSpinFunction = (player) => {
        showIcon.classList.add("fa-beat"); 
        console.log(player);
        setTimeout(function () { 
            showIcon.classList.remove("fa-beat") 
        }, 5000)

    }

    //animations before making any changes while clicking button
    const animationFunction = () => {
        console.log(showIcon);
        showIcon.classList.add("fa-spin");
        computerShowIcon.classList.add("fa-spin");
        setTimeout(function () { 
            computerShowIcon.classList.remove("fa-spin");
            showIcon.classList.remove("fa-spin"); 
        }, 2000)
    }

    //animations when computer won any round
    const compSpinFunction = (computer) => {
        computerShowIcon.classList.add("fa-beat"); 
        console.log(computer);
        setTimeout(function () { 
            computerShowIcon.classList.remove("fa-beat") 
        }, 5000)
    }

    //Generating computer weapons randomly.

    const computerWeapon = () => {
        const COMP_WEAPONS = Math.floor(Math.random() * randomClasses.length);
        return randomClasses[COMP_WEAPONS];
    }

    // function to finish the game
    const gameOver = (playerBtn, moveNumber) => {

        playerBtn.forEach(btn => {
            btn.style.display = 'none';
        })

        const final_Result = document.querySelector('.result');
        const move_Left = document.querySelector('.movesleft');


        if (playerScore > computerScore) {
            final_Result.innerHTML = "You win the match !";
            final_Result.style.color = "blue";
            display.innerHTML = "Congratulations!"
        }
        else if (computerScore > playerScore) {
            final_Result.innerHTML = "You lose the match !";
            final_Result.style.color = "red";
            display.innerHTML = "Better luck next time!"
        }
        else {
            final_Result.innerHTML = "it's Tie!";
            final_Result.style.color = "green";
            display.innerHTML = "OOps!Not bad !";
        }


        move_Left.style.display = 'none';
        reloadBtn.innerHTML = "Play Again";
        reloadBtn.style.color = "green";
        reloadBtn.classList.add("highlighted");

        text.innerHTML = "Game Over!"; //removing choose Move Text
        
        // restart
        reloadBtn.addEventListener('click', () => {
            window.location.reload();
        })


    }

    // calling the startGame function to start our Game
    startGame();

}

// calling the game function
game();