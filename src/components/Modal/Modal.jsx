import { Component } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalWindow } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onEscClick);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onEscClick);
  }

  onEscClick = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };

  onBackdropClick = e => {
    if (e.target === e.currentTarget) {
      this.props.closeModal();
    }
  };

  render() {
    const { largeImage, alt } = this.props;

    return createPortal(
      <Overlay onClick={this.onBackdropClick}>
        <ModalWindow>
          <img src={largeImage} alt={alt} />
        </ModalWindow>
      </Overlay>,
      modalRoot
    );
  }
}
