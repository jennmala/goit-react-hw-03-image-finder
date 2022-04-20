import { Component } from 'react';
import { fetchPictures } from 'services/pictures-api';

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { GalleryPendingView } from 'components/GalleryPendingView/GalleryPendingView';
import { LoadMoreButton } from 'components/LoadMoreButton/LoadMoreButton';

import { GalleryWrap } from './GalleryImagesView.styled';

export class GalleryImagesView extends Component {
  state = {
    pictures: this.props.pictures,
    page: 1,
    loadingMore: false,
  };

  onLoadMoreBtnClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      loadingMore: true,
    }));

    setTimeout(() => {
      fetchPictures(this.props.keyWord, this.state.page)
        .then(pictures => {
          this.setState(prevState => ({
            pictures: [...prevState.pictures, ...pictures.hits],
            loadingMore: false,
          }));
        })
        .catch(error => {
          console.log(error);
        });
    }, 2000);
  };

  render() {
    return (
      <>
        <GalleryWrap>
          {this.state.pictures.map(
            ({ id, webformatURL, largeImageURL, tags }) => (
              <ImageGalleryItem
                key={id}
                smallImage={webformatURL}
                largeImage={largeImageURL}
                alt={tags}
              />
            )
          )}
        </GalleryWrap>

        {this.state.loadingMore ? (
          <GalleryPendingView />
        ) : (
          <LoadMoreButton onClick={this.onLoadMoreBtnClick} />
        )}
      </>
    );
  }
}
