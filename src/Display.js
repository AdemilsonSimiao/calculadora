import React from "react";
import "./Display.css";
import PropTypes from "prop-types";

export default class Display extends React.Component{
    static propTypes = {
        value: PropTypes.string,
    };
    render(){
        return(
            <div className="component-display">
                <div>{this.props.value}</div>
            </div>
        );
    }
}