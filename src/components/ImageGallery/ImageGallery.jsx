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

      setTimeout(() => {
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
      }, 2000);
    }
  }

  render() {
    if (this.state.status === 'pending') {
      return <GalleryPendingView />;
    }

    if (this.state.status === 'rejected') {
      return <GalleryErrorView message={this.state.error.message} />;
    }

    if (this.state.status === 'resolved') {
      return (
        <GalleryImagesView
          pictures={this.state.pictures}
          keyWord={this.props.keyWord}
        />
      );
    }
  }
}
