import React from 'react';
import ReactDOM from 'react-dom';
import './21blackjack.css';
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
                <input type="text" class="form-control" id="amount"></input>
                <button type="button" class="btn btn-dark bet" onClick={props.onClick}>Bet</button>
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
      
            <button type="button" id="hit" class="btn btn-secondary hit" onClick={props.onClick}>Hit</button>
            <button type="button" id="stick" class="btn btn-secondary stick" onClick={props.onClick}>Stick</button>
     
          
            <button type="button" id="new-game" class="btn btn-secondary new-game" onClick={props.onClick}>New Game</button>
        </div>
    </div>
)
}

class Board extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
         
        };

}
        render() {
        return( 
            <Elements />
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