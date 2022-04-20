import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPhotos, updPhoto } from '../actions/photoActions'
import { useParams } from 'react-router'
import AddPhoto from './addPhoto';
import Button from './button';

class Photos extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this)
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
    }

    componentDidMount() {
        const { albumId } = this.props.params
        this.props.fetchPhotos(albumId)
        console.log(this.props.photos)
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(nextProps.photo) {
            this.props.photos.unshift(nextProps.photo)
            return true
        }
        else if(nextProps.updPhoto) {
            const photoIndex = this.props.photos.findIndex((photo) => photo.id === nextProps.updPhoto.id);

            if(photoIndex !== -1) {
                this.props.photos.splice(photoIndex, 1, nextProps.updPhoto)
            }
            
        }
        else{
            return false;
        }
    }

    render() {
    
        const photoItems = this.props.photos.map((photo) => {
            return <div className="card mb-5 me-4" style={{width: '18rem'}} key={photo.id}>
                        <img className="card-img-top" src={photo.url} alt={photo.title}/>
                        <div className="card-body">
                            <p className="card-title">{ photo.title }</p>
                        </div>
                        <div className="card-footer bg-white">
                            <Button btnClick={this.handleClick(photo)}><i className='las la-heart'></i></Button>
                        </div>
                    </div>
        })

        // console.log(this.props.photos)

        return (
        <div>
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
    photo: state.photos.photo,
    updPhoto: state.photos.updPhoto
})

export default connect(mapStateToProps, {fetchPhotos, updPhoto} )(withRouter(Photos))


