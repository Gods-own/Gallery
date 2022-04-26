import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPhoto} from '../actions/photoActions'

class DisplayImage extends Component {
  render() {
    return (
      <>
        <img className="modal-content-component image-modal" src={this.props.photo.url} alt={this.props.photoUrl} /> 
      </>
    )
  }
}

const mapStateToProps = state => ({
    photo: state.photos.clickedPhoto,
})

export default connect(mapStateToProps, { fetchPhoto })(DisplayImage)
