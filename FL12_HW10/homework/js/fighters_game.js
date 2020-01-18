function Fighter({name, damage, hp, strength, agility}){
    let Wins = 0,
        Losses = 0;
    const MAX_HP = hp;
    return {
        getName: function(){
            return name
        },
        getDamage: function(){
            return damage
        },
        getStrength: function(){
            return strength
        },
        getAgility: function(){
            return agility
        },
        getHealth: function(){
            return hp
        },  
        attack: function(fighter){
            const probability = 100-(fighter.getStrength() + fighter.getAgility());
            const rand = Math.round(Math.random()*100);
            if(rand<=probability){
                fighter.dealDamage(damage)
                console.log(`${name} makes ${damage} damage to ${fighter.getName()}`)
            }else{
                console.log(`${name} attack missed`)
            }
        },
        logCombatHistory: function(){
            console.log(`Name: ${name} Wins: ${Wins} Losses: ${Losses}`)
        },
        heal: function(addHp){
            MAX_HP < hp+addHp ? hp = MAX_HP : hp += addHp;
        },
        dealDamage: function(damage){
            hp -= damage;
            if(hp < 0){
                hp = 0;
            }
        },
        addWin: function(){
            Wins++
        },
        addLoss: function(){
            Losses++
        }  
    }
}

function battle(firstFighter, secondFighter){
    if(firstFighter.getHealth() && secondFighter.getHealth()){
        for(;;){
            firstFighter.attack(secondFighter)
            if(!secondFighter.getHealth()){
                firstFighter.addWin()
                secondFighter.addLoss()
                console.log(`${firstFighter.getName()} has won!`)
                break;
            }
            secondFighter.attack(firstFighter)
            if(!firstFighter.getHealth()){
                secondFighter.addWin()
                firstFighter.addLoss()
                console.log(`${secondFighter.getName()} has won!`)
                break;
            }
        }
    }else if(!firstFighter.getHealth()){
        console.log(`${firstFighter.getName()} is dead and can't fight`)
    }else if(!secondFighter.getHealth()){
        console.log(`${secondFighter.getName()} is dead and can't fight`)
    }
}