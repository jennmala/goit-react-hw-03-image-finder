import { TailSpin } from 'react-loader-spinner';
import { Wrap } from './GalleryPendingView.styled';

export const GalleryPendingView = () => {
  return (
    <Wrap>
      <TailSpin height="100" width="100" color="grey" ariaLabel="loading" />
      Loading ...
    </Wrap>
  );
};
