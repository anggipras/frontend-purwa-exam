import React, { Component } from 'react';
import './button.css'

class Button extends Component {

    render() { 
        return (
            <button className={`btn button-orange ${this.props.className}`} onClick={this.props.onClick}>
                {this.props.children}
            </button>
        );
    }
}
 
export default Button;