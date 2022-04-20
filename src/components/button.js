import React, { Component } from 'react'

class Button extends Component {  

    render() {
        return (
        <>
            <button  className={`btn ${this.props.btnClass}`} onClick={this.props.btnClick}>
                {this.props.children}
            </button>
        </>
        )
    }
    }

export default Button;