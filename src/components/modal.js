import React, { Component } from 'react'

// function ModalComponent() {
//     return null
// }

class Modal extends Component {

    // static ModalComponent = ModalComponent

    render() {

        // const {children} = this.props
        // const modalComponent = children.find(child => child.type === ModalComponent)

        return (
            <div className="modal-component" onClick={this.props.hideModal}>
                {this.props.children}
            </div>
        )
    }
}

export default Modal
