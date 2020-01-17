class Fighter {
    constructor({name, damage, hp, strength, agility}){
        this._name = name;
        this._damage = damage;
        this._hp = hp;
        this._strength = strength;
        this._agility= agility;
        this._Wins = 0;
        this._Losses = 0;
    }

    getName(){
        return this._name
    }

    getDamage(){
        return this._damage
    }

    getStrength(){
        return this._strength
    }

    getAgility(){
        return this._agility
    }

    getHealth(){
        return this._hp
    }
    
    attack(fighter){
        let probability = 100-(fighter.getStrength() + fighter.getAgility());
        let rand = Math.round(Math.random()*100);
        if(rand<=probability){
            fighter.dealDamage(this._damage)
            console.log(`${this._name} makes ${this._damage} damage to ${fighter.getName()}`)
        }else{
            console.log(`${this._name} attack missed`)
        }
    }

    logCombatHistory(){
        console.log(`Name: ${this._name} Wins: ${this._Wins} Losses: ${this._Losses}`)
    }
    
    heal(hp){
        this._hp += hp;
        if(this._hp > 100){
            this._hp = 100;
        }
    }

    dealDamage(damage){
        this._hp -= damage;
        if(this._hp < 0){
            this._hp = 0;
        }
    }

    addWin(){
        this._Wins++
    }

    addLoss(){
        this._Losses++
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

const fighter1 = new Fighter({name: 'Maximus', damage: 20, strength: 20, agility: 20, hp:100 });
const fighter2 = new Fighter({name: 'Commodus', damage: 25, strength: 25, agility: 20, hp: 90});
battle(fighter1, fighter2)