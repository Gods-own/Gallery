import React, { Component } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router';
import { fetchAlbums } from '../actions/albumActions';
import { Link } from 'react-router-dom';
import Button from './button'
// import { withRouter } from 'react-router';

class Albums extends Component {

    componentDidMount() {
        const { userId } = this.props.params;
        this.props.fetchAlbums(userId)
    }

    render() {
        const albumItems = this.props.albums.map((album) => {
            return <li className="list-group-item" key={album.id}>
                        { album.title }
                        <Button btnClass="greenColor float-end">
                            <Link className="text-decoration-none text-white" to={`/album-photos/${album.id}`}>Explore</Link>
                        </Button>
                        <div className="clearfix"></div>
                    </li>
        })
        return (
            <div className="my-4">
                <h2 className="text-center fw-bold">Albums</h2>
                <ol className="list-group list-group-numbered">
                    {albumItems}
                </ol>
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
    albums: state.albums.albums 
})

export default connect(mapStateToProps, {fetchAlbums})(withRouter(Albums))