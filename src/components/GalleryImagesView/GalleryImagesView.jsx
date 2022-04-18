import { Component } from 'react';

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

import { GalleryWrap } from './GalleryImagesView.styled';

export class GalleryImagesView extends Component {
  render() {
    return (
      this.props.pictures.length > 0 && (
        <GalleryWrap>
          {this.props.pictures.map(
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
      )
    );
  }
}
