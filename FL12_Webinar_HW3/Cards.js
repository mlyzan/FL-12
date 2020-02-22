let _suit = Symbol();
let _rank = Symbol();
 class Card {
     constructor (suit, rank) {
        this[_suit] = suit;
        this[_rank] = rank;
     }
     get isFaceCard () {
        return this[_rank] === 1 || this[_rank] > 10 ? true : false;
    }
     toString () {
        return `${this[_rank]} of ${this[_suit]}`
    }
    compare (cardOne, cardTwo) {
        if(cardOne[0][_rank] === cardTwo[0][_rank]) {
            //cards are equal in value
            return `nobody`
        }else if(cardOne[0][_rank] > cardTwo[0][_rank]) {
            //cardOne is wins
            return `first`;
        }else {
            //cardTwo is wins
            return `second`;
        }
    }
 }

 class Deck {
     constructor () {
        this.cards = [];
        const SUITS =['Hearts', 'Diamonds', 'Clubs', 'Spades'];
        // 1=='Ace', 11=='Jack', 12=='Queen', 13=='King'
        const VALUES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
        for(let suit of SUITS) {
            for(let value of VALUES) {
                this.cards.push(new Card(suit, value))
            }
         }
     }
     get count () {
         return this.cards.length
     }
     shuffle() {
        const { cards } = this;
        let m = cards.length, i;
            while (m) {
            i = Math.floor(Math.random() * m--);
            [cards[m], cards[i]] = [cards[i], cards[m]];
            }
        return this;
      }
      draw (n) {
          let removedCards = this.cards.splice(this.cards.length - n, n);
          return removedCards
      }
 }

 const _win = Symbol();
 class Player {
     constructor (name) {
        this.name = name;
        this[_win] = 0;
        this.deck = (() => {
            let createDeck = new Deck();
            createDeck.shuffle();
            return createDeck;
        })();
     }
     get win() {
         return this[_win]
     }
    static Play (playerOne, playerTwo) {
        while( playerOne.deck.count ) {
            let compare = new Card().compare(playerOne.deck.draw(1), playerTwo.deck.draw(1));
            if(compare.includes('nobody')) {
                console.log('Nobody wins in this round')
            }else if(compare.includes('first')) {
                playerOne[_win]++
                console.log(`Player ${playerOne.name} wins in this round`)
            }else if(compare.includes('second')) {
                playerTwo[_win]++
                console.log(`Player ${playerTwo.name} wins in this round`)
            }
        }
        if(playerOne.win === playerTwo.win) {
            console.log(`Friendship won :)`)
        }else if(playerOne.win > playerTwo.win) {
            console.log(`${playerOne.name} wins ${playerOne.win} to ${playerTwo.win}`); 
        }else if(playerOne.win < playerTwo.win) {
            console.log(`${playerTwo.name} wins ${playerTwo.win} to ${playerOne.win}`); 
        }
     }
}
const Oksana = new Player('Oksana');
const Volodymyr = new Player('Volodymyr');
Player.Play(Oksana, Volodymyr)