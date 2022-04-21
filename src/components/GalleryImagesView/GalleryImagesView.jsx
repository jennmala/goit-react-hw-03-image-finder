import { Component } from 'react';
import { fetchPictures } from 'services/pictures-api';
import PropTypes from 'prop-types';

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { GalleryPendingView } from 'components/GalleryPendingView/GalleryPendingView';
import { LoadMoreButton } from 'components/LoadMoreButton/LoadMoreButton';

import { GalleryWrap } from './GalleryImagesView.styled';

export class GalleryImagesView extends Component {
  state = {
    pictures: this.props.pictures,
    page: 2,
    isLoadingMore: false,
  };

  static propTypes = {
    keyWord: PropTypes.string.isRequired,
    pictures: PropTypes.arrayOf(PropTypes.object.isRequired),
  };

  onLoadMoreBtnClick = () => {
    this.setState({ isLoadingMore: true });

    fetchPictures(this.props.keyWord, this.state.page)
      .then(pictures => {
        this.setState(prevState => ({
          pictures: [...prevState.pictures, ...pictures.hits],
          isLoadingMore: false,
          page: prevState.page + 1,
        }));
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const { pictures, isLoadingMore } = this.state;

    return (
      <>
        <GalleryWrap>
          {pictures.map(({ id, webformatURL, largeImageURL, tags }) => (
            <ImageGalleryItem
              key={id}
              smallImage={webformatURL}
              largeImage={largeImageURL}
              alt={tags}
            />
          ))}
        </GalleryWrap>

        {isLoadingMore ? (
          <GalleryPendingView />
        ) : (
          <LoadMoreButton onClick={this.onLoadMoreBtnClick} />
        )}
      </>
    );
  }
}
