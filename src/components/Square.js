import '../index.css';
import * as React from "react";

export class Square extends React.Component {
    render() {
        return (
            <button className="square"
                    onClick={() => this.props.onClick()}
            >
                {this.props.value}
            </button>
        );
    }
}