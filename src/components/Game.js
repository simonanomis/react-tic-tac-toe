import {Board} from "./Board";
import * as React from "react";
import '../index.css';
import {calculateWinner} from "../calculate-winner";

export class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            //We’ll set the first move to be “X” by default.
            xIsNext: true,
            //which step we’re currently viewing.
            stepNumber: 0
        }
    }

    handleClick(i) {
        //This ensures that if we “go back in time” and then make a new move from that point,
        // we throw away all the “future” history that would now be incorrect.
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        //we call .slice() to create a copy of the squares array to modify instead of modifying the existing array
        const squares = current.squares.slice();
        //return early by ignoring a click if someone has won the game or if a Square is already filled
        if(calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            //xIsNext to true if the number that we’re changing stepNumber to is even
            xIsNext: (step % 2) === 0
        })
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        // step variable refers to the current history element value,
        // and move refers to the current history element index.
        const moves = history.map((step, move) => {
            const description = move ?
                'Go to move #' + move :
                'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{description}</button>
                </li>
            )
        });

        let status;
        if(winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O')
        }
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                    squares={current.squares}
                    onClick={i => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}