import { LoadButton } from './LoadMoreButton.styled';

export const LoadMoreButton = ({ onClick }) => {
  return (
    <LoadButton onClick={onClick} type="button">
      Load More
    </LoadButton>
  );
};
