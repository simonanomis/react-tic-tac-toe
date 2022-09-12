import * as React from "react";
import {Square} from "./Square";
import '../index.css';
import {calculateWinner} from "../calculate-winner";

export class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            //We’ll set the first move to be “X” by default.
            xIsNext: true
        }
    }

    handleClick(i) {
        //we call .slice() to create a copy of the squares array to modify instead of modifying the existing array
        const sq = this.state.squares.slice();
        //return early by ignoring a click if someone has won the game or if a Square is already filled
        if(calculateWinner(sq) || sq[i]) {
            return;
        }
        sq[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares: sq,
            xIsNext: !this.state.xIsNext
        });
    }

    renderSquare(i) {
        return (
            <Square
                value={this.state.squares[i]}
                onClick={() => this.handleClick(i)}
            />
        );
    }

    render() {
        const winner = calculateWinner(this.state.squares);
        let status;

        if(winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O')
        }

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}