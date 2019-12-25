
let startGame,
    randomNum,
    chooseNum,
    continueGame = true,
    pocket = 8,
    attempts = 3,
    prize = 0,
    totalPrize = 0,
    initialPrize = 100,
    posPrize = 100;
    
    startGame = confirm('Do you want to play a game?');
    if(!startGame){
        alert('You did not become a billionaire, but can.');
    }else{
        do{
            randomNum = Math.round(Math.random()*pocket);
            console.log(randomNum)
            for(let i=0; i<3; i++){
                chooseNum = +prompt(`Choose a roulette pocket number from 0 to ${pocket}
Attempts left: ${attempts}
Total prize: ${totalPrize}$ 
Possible prize on current attempt: ${posPrize}$`);
                attempts--;
                if(chooseNum === randomNum){
                    totalPrize += posPrize;
                    prize += posPrize;
                    break;
                }
                posPrize /= 2;
            }
            alert(`Thank you for your participation. Your prize is: ${prize}$`);
            continueGame = confirm(`Congratulation, you won! Your prize is: ${totalPrize}$. Do you want to continue?`); 
            if(continueGame){
                prize = 0;
                initialPrize*=2;
                posPrize = initialPrize;
                pocket+=4;
                attempts=3;
            }
        }while(continueGame)
    }