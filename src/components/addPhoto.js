import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createPhoto } from '../actions/photoActions';
import { useParams } from 'react-router';

class AddPhoto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: '',
            title: ''
        };
        this.onChange = this.onChange.bind(this);

        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault()
        const { albumId } = this.props.params

        const newPhoto = {
            title: this.state.title,
            url: this.state.url,
            albumId: albumId
        }

        this.props.createPhoto(newPhoto)
    }

    render() {
        return (
        <>
            <form onSubmit={this.onSubmit} className="my-3 form mx-auto">
                <div className="mb-3">
                    <label htmlFor="photoUrl" className="form-label">Photo url</label>
                    <input type="url" name="url" className="form-control" id="photoUrl" value={this.state.url} onChange={this.onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" name="title" className="form-control" id="title" value={this.state.title} onChange={this.onChange}/>
                </div>
                <div className="text-center btn-div">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </>
        )
    }
}

// const mapStateToProps = state => ({
//     photo: state.photo.photo
// })

const withRouter = WrappedComponent => props => {
    const params = useParams();

    return (
        <WrappedComponent {...props} params={params}/>
    );
};

export default connect(null, {createPhoto})(withRouter(AddPhoto));
