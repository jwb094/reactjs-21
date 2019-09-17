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
console.log(props);
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

        <div class="card playersmoney">
            <div class="card-body">
                <h6 class="card-title" id="balance">Balance : {props.balance}</h6>
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
            firstHalf:'',
            pwin:false,
            'bet':0
             
        };
        
        } 


         componentDidMount() {
         let balance = this.state.balance;
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
            this.state.bet = betmade;
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
                this.state.pwin = false;
                
            }
        }
        

     dealerdraw() {
        let dcard = this.state.DCards[1].Value + this.state.DCards[1].Suit;
        $('#dcard1').css("background", "url(imgs/" + dcard + ".svg)");
        document.getElementById('dcard1').style.backgroundSize = "145px 200px";
        if (this.state.pwin !== false) {
            this.checkforsafestand();
        } else {
            this.calculateDealersCards();
        }
        //checkforsafestand();
        //calculateDealersCards();
        //console.log(DDA);
        // if (DDA <= 17) {
        //     calculateDealersCards();
        //     var newcard = Math.floor(Math.random() * deck.length);
        //     DCards.push(deck[newcard]);
        //     if (DCards.length === 3) {
        //         let dcard = DCards[2].Value + DCards[2].Suit;
        //         $('#dcard2').css("background", "url(imgs/" + dcard + ".svg)");
        //         document.getElementById('dcard2').style.backgroundSize = "145px 200px";
        //         calculateDealersCards();
        //     }
        //     if (DCards.length === 4) {
        //         let dcard = DCards[3].Value + DCards[3].Suit;
        //         $('#dcard3').css("background", "url(imgs/" + dcard + ".svg)");
        //         document.getElementById('dcard3').style.backgroundSize = "145px 200px";
        //         calculateDealersCards();
        //     }
        //     if (DCards.length === 5) {
        //         let dcard = DCards[4].Value + DCards[4].Suit;
        //         $('#dcard4').css("background", "url(imgs/" + dcard + ".svg)");
        //         document.getElementById('dcard4').style.backgroundSize = "145px 200px";
        //         calculateDealersCards();
        //     }
        // } else {
        //     calculateDealersCards();
        // }
    }

     checkforsafestand() {
        let total = 0;
        let cardvalue = 0;
        for (const key in this.state.DCards) {
            if (typeof this.state.DCards[key].Value != "string") {
                total += this.state.DCards[key].Value;
            } else if (this.state.DCards[key].Value === 'K' || this.state.DCards[key].Value === 'Q' || this.state.DCards[key].Value === 'J') {
                cardvalue += 10;
            } else if (this.state.DCards[key].Value === 'A') {
                cardvalue += 11;
            }
        }
        //this.state.DDA = total + cardvalue;
        this.setState({
          DDA:total + cardvalue
        });
        if (this.state.DDA < 17) {
            var newcard = Math.floor(Math.random() * this.state.deck.length);
            this.state.DCards.push(this.state.deck[newcard]);
            if (this.state.DCards.length === 3) {
                console.log(this.state.DCards);
                let dcard = this.state.DCards[2].Value + this.state.DCards[2].Suit;
                $('#dcard2').css("background", "url(./imgs/" + dcard + ".svg)");
                document.getElementById('dcard2').style.backgroundSize = "145px 200px";
                // calculateDealersCards();
            }
            if (this.state.DCards.length === 4) {
                console.log(this.state.DCards);
                let dcard = this.state.DCards[3].Value + this.state.DCards[3].Suit;
                $('#dcard3').css("background", "url(./imgs/" + dcard + ".svg)");
                document.getElementById('dcard3').style.backgroundSize = "145px 200px";
                // calculateDealersCards();
            }
            if (this.state.DCards.length === 5) {
                console.log(this.state.DCards);
                let dcard = this.state.DCards[4].Value + this.state.DCards[4].Suit;
                $('#dcard4').css("background", "url(i./mgs/" + dcard + ".svg)");
                document.getElementById('dcard4').style.backgroundSize = "150px 200px";
                //calculateDealersCards();
            } else {
                this.calculateDealersCards();
            }
        }
        this.calculateDealersCards();
    }

     calculateDealersCards() {
        let total = 0;
        let cardvalue = 0;
        for (const key in this.state.DCards) {
            if (typeof this.state.DCards[key].Value != "string") {
                total += this.state.DCards[key].Value;
            } else if (this.state.DCards[key].Value === 'K' || this.state.DCards[key].Value === 'Q' || this.state.DCards[key].Value === 'J') {
                cardvalue += 10;
            } else if (this.state.DCards[key].Value === 'A') {
                cardvalue += 11;
            }
        }
        //this.state.DDA = total + cardvalue;
        this.setState({
            DDA:total + cardvalue
        });
        console.log(this.state.DDA);
        if (this.state.DDA < 17) {
            this.checkforsafestand();
        } else if (this.state.DDA <= 17 && this.state.pwin === true) {
            $('.playerchoices').click(false);
            this.setState({
                pwin:false
            });
            $('#message').html('You Lose');
            this.clearboard();
        } else {
            if (this.state.PDA > 21) { // Player lose
                //console.log(PDA);
                $('.playerchoices').click(false);
                this.setState({
                    pwin:false
                });
                $('#message').html('You Lose');
                this.clearboard();
            } else if (this.state.DDA > this.state.PDA && this.state.DDA <= 21) { // Player lose
                $('.playerchoices').click(false);
                //console.log(PDA + " " + DDA);
                $('#message').html('You lose');
                this.setState({
                    pwin:false
                });
                this.clearboard();
            } else if (this.state.DDA === this.state.PDA) { // Player lose
                $('.playerchoices').click(false);
                //console.log(PDA + " " + DDA);
                $('#message').html('You lose');
                this.setState({
                    pwin:false
                });
                this.clearboard();
            } else if (this.state.PDA > this.state.DDA && this.state.PDA <= 21) { // Player wins
                $('.playerchoices').click(false);
                //console.log(PDA + " " + DDA);
                $('#message').html('You Win');
                this.setState({
                    pwin:true
                });
                this.clearboard();
            } else if (this.state.DDA > this.state.PDA && this.state.DDA > 21 && this.state.PDA <= 21) { // Player wins
                $('.playerchoices').click(false);
                $('#message').html('You Win');
                this.setState({
                    pwin:true
                });
                this.clearboard();
            }
        }
    }

    clearboard(){
        $('#pcard0').css('background', '');
        $('#pcard0').empty();
        $('#pcard1').css('background', '');
        $('#pcard1').empty();
        $('#pcard2').css('background', '');
        $('#pcard2').empty();
        $('#pcard3').css('background', '');
        $('#pcard3').empty();
        $('#pcard4').css('background', '');
        $('#pcard4').empty();
        $('#dcard0').css('background', '');
        $('#dcard0').empty();
        $('#dcard1').css('background', '');
        $('#dcard1').empty();
        $('#dcard2').css('background', '');
        $('#dcard2').empty();
        $('#dcard3').css("background", '');
        $('#dcard3').empty();
        $('#dcard4').css('background', '');
        $('#dcard4').empty();
        $('#message').html('BlackJack');
        this.state.PCards = [];
        this.state.DCards = [];
        this.state.playdeck = [];
        this.state.NPCards = [];
        this.state.deck = [];
        this.state.balance ='';
    }
        
        render() {
            console.log(this.state.bet);
        return( 
            <Elements 
            onClickGame={() => this.firstHalfButtonEventListener()}
            onClickmakeBet={() => this.makeBet()} 
            onClickHit={() => this.hit()}
            onClickStick={() => this.stick()
            }
            balance={this.state.balance}
            />
            )
        }


}


class Game extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            player: '',
            Winner: '',
            
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


// refresh page with button new-game