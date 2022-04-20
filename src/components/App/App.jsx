// import './App.css';
import { Component } from 'react';
import { ToastContainer } from 'react-toastify';

import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';

// import 'react-toastify/dist/ReactToastify.css';
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { AppWrap } from './App.styled';

export class App extends Component {
  state = {
    word: null,
  };

  onFormSubmit = data => {
    this.setState({ word: data });
  };

  render() {
    return (
      <AppWrap>
        <Searchbar onSubmit={this.onFormSubmit} />
        <ImageGallery keyWord={this.state.word} />

        <ToastContainer autoClose={2000} />
      </AppWrap>
    );
  }
}
