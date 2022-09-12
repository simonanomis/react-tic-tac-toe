import '../index.css';
import * as React from "react";

export function Square(props) {
        return (
            <button className={"square " + (props.isWinning ? "square--winning" : null)} onClick={props.onClick}>
                {props.value}
            </button>
        );

}