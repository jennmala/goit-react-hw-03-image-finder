import { Component } from 'react';
import { ToastContainer } from 'react-toastify';

import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { ErrorView } from 'components/ErrorView/ErrorView';
import { PendingView } from 'components/PendingView/PendingView';

import { fetchPictures } from 'services/pictures-api';

import { AppWrap } from './App.styled';

export class App extends Component {
  state = {
    word: null,
    pictures: [],
    error: 'null',
    status: 'idle',
    page: 1,
    isLoadingMore: false,
  };

  onFormSubmit = data => {
    this.setState({ word: data });
  };

  onLoadMoreClick = () => {
    this.setState(prevState => ({
      isLoadingMore: true,
      page: prevState.page + 1,
    }));
  };

  componentDidUpdate(prevProps, prevState) {
    const { word, page } = this.state;

    if (prevState.word !== word) {
      this.setState({ status: 'pending', page: 1 });

      fetchPictures(word, 1)
        .then(pictures => {
          if (pictures.hits.length === 0) {
            return Promise.reject(
              new Error(`No images matching request ${word}. Try another.`)
            );
          }
          this.setState({ pictures: pictures.hits, status: 'resolved' });
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }

    if (prevState.page !== page && page > 1) {
      fetchPictures(word, page)
        .then(pictures => {
          this.setState(prevState => ({
            pictures: [...prevState.pictures, ...pictures.hits],
            isLoadingMore: false,
          }));
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  render() {
    const { status, error, pictures } = this.state;

    return (
      <AppWrap>
        <Searchbar onSubmit={this.onFormSubmit} />

        {status === 'pending' && <PendingView />}

        {status === 'rejected' && <ErrorView message={error.message} />}

        {status === 'resolved' && (
          <ImageGallery
            pictures={pictures}
            isLoadingMore={this.state.isLoadingMore}
            onMoreBtnClick={this.onLoadMoreClick}
          />
        )}

        <ToastContainer autoClose={2000} />
      </AppWrap>
    );
  }
}
