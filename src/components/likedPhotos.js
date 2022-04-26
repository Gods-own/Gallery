import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPhoto } from '../actions/photoActions'
import { fetchLikedItems, removeLikedItem, clearLikedItems } from '../actions/likedPhotosActions'
import { useParams } from 'react-router'
import Button from './button';
import Modal from './modal';
import DisplayImage from './displayImage';


class LikedPhotos extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this)
        this.showImage = this.showImage.bind(this)
        this.hideImage = this.hideImage.bind(this)
        this.deleteItem = this.deleteItem.bind(this)
        this.state = {
            showModal: false,
            deleteConfirmation: false,
            imageModal: false
        }
    }

    componentDidMount() {
        this.props.fetchLikedItems()
        console.log(this.props.likedPhotos)
    }

    handleClick(likedPhoto, index) {
        this.setState({
            imageModal: false,
            deleteConfirmation: true,
            showModal: true
        })
        let clickedImage = {...likedPhoto, index}
        // this.imageModal = false
        // this.deleteConfirmation = true
        this.props.fetchPhoto(clickedImage)
        // this.props.removeLikedItem(index)
        // console.log(this.props.likedPhotos.length)
        // this.setState({
        //     deleteConfirmation: true
        // })
    }


    showImage(likedPhoto) {
        // console.log(likedPhoto)
        // let likedImage = {...liked}
        // this.props.clickedImage = 
        console.log(likedPhoto)
        this.props.fetchPhoto(likedPhoto)
        this.setState({
            imageModal: true,
            showModal: true
        })
     }

     deleteItem() {
         console.log(this.props.clickedImage.index)
        this.props.removeLikedItem(this.props.clickedImage.index)
        this.setState({
            deleteConfirmation: false,
            showModal: false
        })
     }

    hideImage() {
        this.setState({
            imageModal: false,
            showModal: false
        })
    }

    render() {
        const likedPhotoItems = this.props.likedPhotos.map((likedPhoto, index) => {

            return <div className="card mb-5 me-4" style={{width: '18rem'}} key={likedPhoto.id}>
                        <img className="card-img-top" src={likedPhoto.url} onClick={(e) => this.showImage({...likedPhoto, index})} alt={likedPhoto.title}/>
                        <div className="card-body">
                            <p className="card-title">{ likedPhoto.title }</p>
                        </div>
                        <div className="card-footer bg-white">
                            <Button btnClick={(e) => this.handleClick(likedPhoto, index)}><i className={`las la-trash`}></i></Button>
                        </div>
                    </div>
        })

        return (
        <div>
            {this.state.showModal && <Modal hideModal={(e)=>this.hideImage()}>
                {this.state.deleteConfirmation && <article className="modal-content-component warning-message-modal">
                    <p>Are you sure you want to delete this picture?</p>
                    <Button className="blackColor me-2 text-white" btnClick={(e) => this.hideImage()} >No</Button>
                    <Button className="blackColor text-white"  btnClick={(e) => {this.deleteItem(); this.hideImage();}} >Yes</Button>
                </article>}
                {this.state.imageModal && <DisplayImage />}
            </Modal>}
            <div className='mb-4'>
                <Button btnClick={(e) => this.props.clearLikedItems()}><i className={`las la-trash`}></i></Button>
            </div>
           <section className="d-flex flex-wrap justify-content-center mt-4 ps-4">
            {likedPhotoItems}
            </section> 
        </div>
        )
    }
}

const withRouter = WrappedComponent => props => {
    const params = useParams();

    return (
        <WrappedComponent {...props} params={params}/>
    );
};

const mapStateToProps = state => ({
    likedPhotos: state.likedPhotos.likedPhotos,
    clickedImage: state.photos.clickedPhoto
})

export default connect(mapStateToProps, {fetchLikedItems, fetchPhoto, removeLikedItem, clearLikedItems} )(withRouter(LikedPhotos))
