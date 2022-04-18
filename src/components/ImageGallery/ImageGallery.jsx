import { Component } from 'react';
// import { GalleryWrap } from './ImageGallery.styled';
import { GalleryErrorView } from 'components/GalleryErrorView/GalleryErrorView';
import { GalleryImagesView } from 'components/GalleryImagesView/GalleryImagesView';
import { GalleryPendingView } from 'components/GalleryPendingView/GalleryPendingView';

export class ImageGallery extends Component {
  state = {
    pictures: [],
    error: null,
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.keyWord !== this.props.keyWord) {
      const KEY = '25171774-7b79c52a8837e6f3634106172';

      this.setState({ status: 'pending' });

      setTimeout(() => {
        fetch(
          `https://pixabay.com/api/?q=${this.props.keyWord}s&page=1&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
        )
          .then(result => {
            console.log(result);
            if (result.ok) {
              return result.json();
            }
            return Promise.reject(new Error('Try another request'));
          })
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
      return <GalleryImagesView pictures={this.state.pictures} />;
    }
  }
}
