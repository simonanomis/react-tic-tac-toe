import '../index.css';
import * as React from "react";

export function Square(props) {
        return (
            <button className="square" onClick={props.onClick}>
                {props.value}
            </button>
        );

}