import React from 'react';
import ReactDOM from 'react-dom';
import './21blackjack.css';
import $ from 'jquery'; 
// import App from './App';
import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

function Elements(props){

    return (   
        <div class="board">
        <h1 id="message">BlackJack</h1>
        <div id="dcard0">
            <p id="dc0">
            </p>
        </div>

        <div id="dcard1">
            <p id="dc1"></p>
        </div>

        <div id="dcard2">
            <p id="dc2"></p>
        </div>

        <div id="dcard3">
            <p id="dc3"></p>
        </div>

        <div id="dcard4">
            <p id="dc4"></p>
        </div>

        <div class="card playersmoney" >
            <div class="card-body">
                <h6 class="card-title" id="balance">Balance</h6>
                <input type="text" class="form-control" id="amount" ></input>
                <button type="button" class="btn btn-dark bet" onClick={props.onClickmakeBet}>Bet</button>
            </div>
        </div>

         <div id="pcard0">
            <p id="pc0"></p>
        </div> 

        <div id="pcard1">
            <p id="pc1"></p>
        </div>

        <div id="pcard2">
            <p id="pc2"></p>
        </div>
        <div id="pcard3">
            <p id="pc3"></p>
        </div>
        <div id="pcard4">
            <p id="pc4"></p>
        </div>
        <div class="playerchoices">
      
            <button type="button" id="hit" class="btn btn-secondary hit" onClick={props.onClickHit}>Hit</button>
            <button type="button" id="stick" class="btn btn-secondary stick" onClick={props.onClickStick}>Stick</button>
     
          
            <button type="button" id="new-game" class="btn btn-secondary new-game" onClick={props.onClickGame}>New Game</button>
        </div>
    </div>
)
}



class Board extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            deck : [],
             card : {},
             suits : ["♥", "♦", "♣", "♠"],
             values : ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "K", "Q", "J"],
            deck_random :[],
             playdeck : [],
             PCards : [],
             PPCards:[],
             DCards : [],
             NPCards : [],
             PDA : 0,
             DDA : 0,
             playerOption : '',
             balance : 100,
            firstHalf:''
             
        };
        
        } 

        firstHalfButtonEventListener() {
           this.firstHalf();
        }
        
         firstHalf() {
            this.makeBet();
            this.makedeck();
            this.shuffledeck();
            this.drawdeck();
            this.displayCards();
        }
        makeBet(){
            let betmade = document.getElementById('amount').value;
            console.log(betmade);
        }
        makedeck(){
            for (var s = 0; s < this.state.suits.length; s++) {
                for (var v = 0; v < this.state.values.length; v++) {
                    this.state.card = { Suit: this.state.suits[s], Value: this.state.values[v] };
                    this.state.deck.push(this.state.card);
                }
            }
        }
        shuffledeck(){
            this.state.playdeck = [];
            for (let i = 0; i < 4; i++) {
                this.state.deck_random = Math.floor(Math.random() * this.state.deck.length);
                this.state.playdeck.push(this.state.deck[this.state.deck_random]);
            }
           
            return this.state.deck;
        }
        drawdeck() {
            this.state.PCards.push(this.state.playdeck[0], this.state.playdeck[2]);
            this.state.DCards.push(this.state.playdeck[1], this.state.playdeck[3]);
            this.state.PPCards = this.state.PCards;
            console.log(this.state.PPCards);
        }

        displayCards() {
        for (let i = 0; i < this.state.PCards.length; i++) {
            let a = i;
            let card = this.state.PCards[i].Value + this.state.PCards[i].Suit;
            $('#pcard' + a).css("background", "url(./imgs/" + card + ".svg)");
            $('#pcard' + a).fadeIn(3000);
            document.getElementById('pcard' + a).style.backgroundSize = "145px 200px";
        }
        let dcard = this.state.DCards[0].Value + this.state.DCards[0].Suit;
        $('#dcard0').css("background", "url(./imgs/" + dcard + ".svg)");
        $('#dcard0').fadeIn(3000);
        document.getElementById('dcard0').style.backgroundSize = "145px 200px";
        $('#dcard1').css("background", "url(./imgs/cardback.jpg)");
        document.getElementById('dcard1').style.backgroundSize = "145px 200px";

        }

        hit(){

            var newcard = Math.floor(Math.random() * this.state.playdeck.length);
            this.state.NPCards.push(this.state.playdeck[newcard]);
            console.log(this.state.NPCards);
            if (this.state.NPCards.length === 1) {
                let card = this.state.NPCards[0].Value + this.state.NPCards[0].Suit;
                $('#pcard2').css("background", "url(imgs/" + card + ".svg)");
                document.getElementById('pcard2').style.backgroundSize = "145px 200px";;
                this.calculateCards();
            }
            if (this.state.NPCards.length === 2) {
                let card = this.state.NPCards[1].Value + this.state.NPCards[1].Suit;
                $('#pcard3').css("background", "url(./imgs/" + card + ".svg)");
                document.getElementById('pcard3').style.backgroundSize = "145px 200px";;
                this.calculateCards();
            }
            if (this.state.NPCards.length === 3) {
                let card = this.state.NPCards[2].Value + this.state.NPCards[2].Suit;
                $('#pcard4').css("background", "url(imgs/" + card + ".svg)");
                document.getElementById('pcard4').style.backgroundSize = "145px 200px";
                this.calculateCards();
            }
           

        }

        stick(){

            this.calculateCards();
            this.dealerdraw();
        }
        calculateCards(){
            let total = 0;
            let cardvalue = 0;
            if (this.state.NPCards.length === 0) {
              return  null;
            } else {
                this.state.PPCards = this.state.PCards.concat(this.state.NPCards);
            }
    
            //giving values to cards that values are either integer:2 => 10 or K,J,Q,A
            for (const key in this.state.PPCards) {
                if (typeof this.state.PPCards[key].Value != "string") {
                    total += this.state.PPCards[key].Value;
                } else if (this.state.PPCards[key].Value === 'K' || this.state.PPCards[key].Value === 'Q' || this.state.PPCards[key].Value === 'J') {
                    cardvalue += 10;
                } else if (this.state.PPCards[key].Value === 'A') {
                    cardvalue += 11;
                }
            }
    
            this.state.PDA = total + cardvalue;
            console.log(this.state.PDA);
            if (this.state.PDA > 21) {
                $('.playerchoices').click(false);
                $('#message').html('The House Wins');
                this.dealerdraw();
                let pwin = false;
            }
        }
        
        
        render() {
        return( 
            <Elements 
            onClickGame={() => this.firstHalfButtonEventListener()}
            onClickmakeBet={() => this.makeBet()} 
            onClickHit={() => this.hit()}
            onClickStick={() => this.stick()}
            />
            )
        }


}


class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            player: '',
            Winner: ''
        };
      

    }



    render() {
        return (          
            <Board />
        )
    }

}

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);


