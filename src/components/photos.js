import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPhotos, updPhoto, fetchPhoto } from '../actions/photoActions'
import { fetchLikedItems, addLikedItem , removeItemwithId} from '../actions/likedPhotosActions'
import { useParams } from 'react-router'
import AddPhoto from './addPhoto';
import Button from './button';
import Modal from './modal';
import DisplayImage from './displayImage';


class Photos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        }
        this.handleClick = this.handleClick.bind(this)
        this.showImage = this.showImage.bind(this)
        this.hideImage = this.hideImage.bind(this)
    }

    handleClick(photo) {
        const updatedPhoto = {
            id: photo.id,
            albumId: photo.albumId,
            title: photo.title,
            url: photo.url,
            thumbnailUrl: photo.thumbnailUrl,
            liked: !photo.liked
        } 
        this.props.updPhoto(updatedPhoto)
        // this.setState({
        //     heartColor: 'red'
        // })
        if(updatedPhoto.liked === true) {
            this.props.addLikedItem(updatedPhoto)
        }
        else if(updatedPhoto.liked === false) {
            this.props.removeItemwithId(photo.id)
        }
        // setTimeout(() => this.setState({heartColor: 'red'}), 3000)
    }

    showImage(photo) {
        console.log(photo)
        this.props.fetchPhoto(photo)
        this.setState({
            showModal: true
        })
     }

    hideImage() {
        this.setState({
            showModal: false
        })
    }

    componentDidMount() {
        const { albumId } = this.props.params
        this.props.fetchPhotos(albumId)
        this.props.fetchLikedItems()
        setTimeout(() => {
            this.props.likedPhotos.forEach((likedPhoto) => {
                this.props.photos.forEach((photo) => {
                    if (likedPhoto.id === photo.id) {
                        const updPhoto = {
                            id: photo.id,
                            albumId: photo.albumId,
                            title: photo.title,
                            url: photo.url,
                            thumbnailUrl: photo.thumbnailUrl,
                            liked: likedPhoto.liked
                        }                    
                        this.props.updPhoto(updPhoto);
                    }
                })           
            })
        }, 800)

    }

    // componentDidUpdate(prevProps) {
    //     if(prevProps.photo !== this.props.photo) {
    //         this.props.photos.unshift(this.props.photo)
    //         console.log("phhhh", prevProps.photo !== this.props.photo, prevProps.photo, this.props.photo)
    //         console.log(this.props.photos)

    //     }
    //     else if(prevProps.updatePhoto !== this.props.updatePhoto) {
    //         const photoIndex = this.props.photos.findIndex((photo) => photo.id === this.props.updatePhoto);

    //         if(photoIndex !== -1) {
    //             this.props.photos.splice(photoIndex, 1, this.props.updatePhoto)
    //         }
    //         console.log(prevProps.updatePhoto, 'jj', 'h')
    //         console.log(this.props.photos)
            
    //     }
    // }

    render() {
    
        const photoItems = this.props.photos.map((photo) => {
            let color = photo.liked ? 'red' : ''
            return <div className="card mb-5 me-4" style={{width: '18rem'}} key={photo.id}>
                        <img className="card-img-top" src={photo.url} onClick={(e) => this.showImage(photo)} alt={photo.title}/>
                        <div className="card-body">
                            <p className="card-title">{ photo.title }</p>
                        </div>
                        <div className="card-footer bg-white">
                            <Button btnClick={(e) => this.handleClick(photo)}><i className={`${ color } las la-heart`}></i></Button>
                        </div>
                    </div>
        })

        // console.log(this.props.photos)

        return (
        <div>
            {this.state.showModal && <Modal hideModal={(e)=>this.hideImage()}>
                <DisplayImage />
            </Modal>}
            <AddPhoto />
            <section className="d-flex flex-wrap justify-content-center ps-4">
            {photoItems}
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
    photos: state.photos.photos,
    updatePhoto: state.photos.updPhoto,
    likedPhotos: state.likedPhotos.likedPhotos
})

export default connect(mapStateToProps, {fetchPhotos, fetchPhoto, updPhoto, removeItemwithId, addLikedItem, fetchLikedItems} )(withRouter(Photos))


