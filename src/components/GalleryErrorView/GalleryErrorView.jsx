import PropTypes from 'prop-types';

import errorImage from 'images/sadCat.jpg';
import { Wrap, ImageError } from './GalleryErrorView.styled';

export const GalleryErrorView = ({ message }) => {
  return (
    <Wrap>
      {message}
      <ImageError src={errorImage} width="500" alt="sad cat" />
    </Wrap>
  );
};

GalleryErrorView.propTypes = {
  message: PropTypes.string.isRequired,
};
