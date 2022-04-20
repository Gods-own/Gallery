import React, { Component } from 'react'

function TableHead() {
  return null
}

function TableBody() {
  return null
}

class Table extends Component {
  static TableHead = TableHead
  static TableBody = TableBody
  render() {
    const {children} = this.props
    const tablehead = children.find(child => child.type === TableHead)
    const tablebody = children.find(child => child.type === TableBody)

    return (
        <div className="table-responsive">
            <table className="table">
                <thead>{tablehead && tablehead.props.children}</thead>
                <tbody>{tablebody && tablebody.props.children}</tbody>
            </table>
        </div>
    )
  }
}

export default Table;
