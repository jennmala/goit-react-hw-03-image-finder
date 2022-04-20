import { Component } from 'react';
import { Modal } from 'components/Modal/Modal';
import { Item, Image } from './ImageGalleryItem.styled';

export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    return (
      <>
        <Item onClick={this.toggleModal}>
          <Image src={this.props.smallImage} alt={this.props.alt} />
        </Item>

        {this.state.showModal && (
          <Modal
            largeImage={this.props.largeImage}
            alt={this.props.alt}
            closeModal={this.toggleModal}
          />
        )}
      </>
    );
  }
}
