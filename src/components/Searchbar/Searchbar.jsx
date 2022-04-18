import { Component } from 'react';
import { BsSearch } from 'react-icons/bs';
import { IconContext } from 'react-icons';
import { toast } from 'react-toastify';

import {
  Header,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    keyWord: '',
  };

  onInputChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  onFormSubmit = e => {
    e.preventDefault();
    const name = this.state.keyWord.trim();
    if (name === '') {
      toast.error('Enter a word!');
      return;
    }
    this.props.onSubmit(name.toLowerCase());
    this.setState({ keyWord: '' });
  };

  render() {
    return (
      <Header>
        <SearchForm onSubmit={this.onFormSubmit}>
          <SearchFormButton type="submit">
            <IconContext.Provider
              value={{ style: { width: '50%', height: 'auto' } }}
            >
              <div>
                <BsSearch />
              </div>
            </IconContext.Provider>

            <SearchFormButtonLabel>Search</SearchFormButtonLabel>
          </SearchFormButton>

          <SearchFormInput
            onChange={this.onInputChange}
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.keyWord}
            name="keyWord"
          />
        </SearchForm>
      </Header>
    );
  }
}
