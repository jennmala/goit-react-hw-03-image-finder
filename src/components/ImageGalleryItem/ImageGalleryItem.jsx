import { Item, Image } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ smallImage, largeImage, alt }) => {
  return (
    <Item>
      <Image src={smallImage} alt={alt} />
    </Item>
  );
};
