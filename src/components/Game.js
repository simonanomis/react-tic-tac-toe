import {Board} from "./Board";
import * as React from "react";
import '../index.css';
import {calculateWinner, lines} from "../calculate-winner";

export class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                locations: Array(9)
            }],
            //We’ll set the first move to be “X” by default.
            xIsNext: true,
            //which step we’re currently viewing.
            stepNumber: 0,
            isDescending: true
        }
    }

    handleClick(i) {
        const locations = [
            [1, 1],
            [2, 1],
            [3, 1],
            [1, 2],
            [2, 2],
            [3, 2],
            [1, 3],
            [2, 3],
            [3, 3]
        ];
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
                locations: locations[i]
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

    sortHistory() {
        this.setState({
            isDescending: !this.state.isDescending
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
                'Go to move #' + move + " @ col " +
                history[move].locations[0] +
                " and row " + history[move].locations[1] :
                'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{
                        move == this.state.stepNumber ? <b>{description}</b> : description}
                    </button>
                </li>
            )
        });

        let draw = true;
        for (let k = 0; k < current.squares.length; k++) {
            if (current.squares[k] === null || winner) {
                draw = false;
            }
        }

        let status;
        let winningSquares;
        if (winner) {
            status = 'Winner: ' + winner[0];
            winningSquares = lines[winner[1]];
        } else {
            if (draw){
                status = "No more moves: Draw Again!";
            } else {
                status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O')
            }
            winningSquares = [];
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                    squares={current.squares}
                    winningSquares={winningSquares}
                    onClick={i => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{this.state.isDescending ? moves : moves.reverse()}</ol>
                    <button onClick={() => this.sortHistory()}>
                        Sort by: {this.state.isDescending ? 'Descending' : 'Ascending'}
                    </button>
                </div>
            </div>
        );
    }
}