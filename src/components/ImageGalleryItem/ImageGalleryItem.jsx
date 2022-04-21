import { Component } from 'react';
import PropTypes from 'prop-types';

import { Modal } from 'components/Modal/Modal';
import { Item, Image } from './ImageGalleryItem.styled';

export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  static propTypes = {
    smallImage: PropTypes.string.isRequired,
    largeImage: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { smallImage, alt, largeImage } = this.props;

    return (
      <>
        <Item onClick={this.toggleModal}>
          <Image src={smallImage} alt={alt} />
        </Item>

        {this.state.showModal && (
          <Modal
            largeImage={largeImage}
            alt={alt}
            closeModal={this.toggleModal}
          />
        )}
      </>
    );
  }
}
