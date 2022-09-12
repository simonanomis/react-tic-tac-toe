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
            xIsNext: true
        }
    }

    handleClick(i) {
        const history = this.state.history;
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
            xIsNext: !this.state.xIsNext,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[history.length - 1];
        const winner = calculateWinner(current.squares);
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
                    onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}