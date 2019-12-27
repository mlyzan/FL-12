const INITIAL_POCKET = 8,
      INITIAL_ATTEMMPTS = 3,
      INITIAL_PRIZE = 100;
let start = true, // ask user about start game
    randomNum, // generate random number
    enterNum, // user unter number 
    pocket = INITIAL_POCKET, // show number from 0 to 8 or more if will win
    attempts = INITIAL_ATTEMMPTS, // how many attempts user have
    posPrize = INITIAL_PRIZE, // possible reward per 3 attempts
    prizePerGame = INITIAL_PRIZE, // prize for game, will be more if last time user win
    prize = 0, // prize per one set
    totalPrize = 0; // total prize if user winner step by step
    start = confirm('Do you want to play a game?');
    if(!confirm){
        alert('You did not become a billionaire, but can.');
    }else{
        do{
            randomNum = Math.round(Math.random()*pocket);
            console.log(randomNum)
            for(let i=0; i<INITIAL_ATTEMMPTS; i++){
                enterNum = parseInt(prompt(`Choose a roulette pocket number from 0 to ${pocket}
Attempts left: ${attempts}
Total prize: ${totalPrize}$ 
Possible prize on current attempt: ${posPrize}$`));
                if(randomNum === enterNum){
                    prize = posPrize;
                    totalPrize+=posPrize;
                    posPrize = prizePerGame*2;
                    prizePerGame = posPrize;
                    pocket+=4;
                    attempts = INITIAL_ATTEMMPTS;
                    break;
                }
                attempts--;
                posPrize/=2;
            }
            if(enterNum !== randomNum){
                alert(`Thank you for your participation. Your prize is: ${totalPrize}$`);
                start = confirm('Do you want to continue?');
                posPrize = INITIAL_PRIZE;
                pocket = INITIAL_POCKET;
                attempts = INITIAL_ATTEMMPTS;
                totalPrize = 0;
                prizePerGame = INITIAL_PRIZE;
                posPrize = INITIAL_PRIZE;
                prize = 0;
            }else if(enterNum === randomNum){
                start = confirm(`Congratulation, you won! Your prize is: ${prize}$. Do you want to continue?`);
            }
        }while(start)
    }

