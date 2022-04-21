import { Component } from 'react';
import { GalleryErrorView } from 'components/GalleryErrorView/GalleryErrorView';
import { GalleryImagesView } from 'components/GalleryImagesView/GalleryImagesView';
import { GalleryPendingView } from 'components/GalleryPendingView/GalleryPendingView';
import { fetchPictures } from 'services/pictures-api';

export class ImageGallery extends Component {
  state = {
    pictures: [],
    error: null,
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.keyWord !== this.props.keyWord) {
      this.setState({ status: 'pending' });

      fetchPictures(this.props.keyWord, 1)
        .then(pictures => {
          if (pictures.hits.length === 0) {
            return Promise.reject(
              new Error(
                `No images matching request ${this.props.keyWord}. Try another.`
              )
            );
          }
          this.setState({ pictures: pictures.hits, status: 'resolved' });
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  render() {
    const { status, error, pictures } = this.state;

    if (status === 'pending') {
      return <GalleryPendingView />;
    }

    if (status === 'rejected') {
      return <GalleryErrorView message={error.message} />;
    }

    if (status === 'resolved') {
      return (
        <GalleryImagesView pictures={pictures} keyWord={this.props.keyWord} />
      );
    }
  }
}
