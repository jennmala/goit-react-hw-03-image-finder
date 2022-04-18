import errorImage from 'images/sadCat.jpg';

export const GalleryErrorView = ({ message }) => {
  return (
    <div>
      {message}
      <img src={errorImage} width="500" alt="sad cat" />
    </div>
  );
};
