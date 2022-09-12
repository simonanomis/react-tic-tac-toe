import * as React from "react";
import {Square} from "./Square";
import '../index.css';

export class Board extends React.Component {
    renderSquare(i) {
        let winning = false;
        for (let k = 0; k < this.props.winningSquares.length; k++) {
            if (this.props.winningSquares[k] === i) {
                winning = true;
            }
        }
        let content = this.props.squares[i];

        return (
            <Square
                key={"square" + i}
                isWinning={winning}
                value={content}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    renderSquares(n) {
        let squares = [];
        for (let i = n; i < n + 3; i++) {
            squares.push(this.renderSquare(i));
        }
        return squares;
    }

    renderRows(i) {
        return  <div className="board-row">{this.renderSquares(i)}</div>
    }

    render() {
        return (
            <div>
                {this.renderRows(0)}
                {this.renderRows(3)}
                {this.renderRows(6)}
            </div>
        );
    }
}