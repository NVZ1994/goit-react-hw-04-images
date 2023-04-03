import React, { Component } from "react";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Searchbar } from "./Searchbar/Searchbar";
import { Button } from './Button/Button';
import {Loader} from './Loader/Loader'
import {Modal} from "./Modal/Modal";
import {getPictures} from './API/Api'
import './App.css'

export default class App extends Component {
  state = {
    search: '',
    page: 1,
    showLoadMore: false,
    showModal: false,
    modalPictureURL: '',
    modalPictureALT: '',
    loader: false,
    searchResults: [],
    error: null,
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      search,
      page,
    } = this.state

    if (prevState.search !== search || prevState.page !== page) {
      this.loaderToggle()
      getPictures(search, page)
        .then(response => response.json())
        .catch(error => this.setState({ error }))
        .then(searchResults => {
          const hits = searchResults.hits
          this.showLoadMore(hits.length)
          this.setState((prevState) => ({
            searchResults: [...prevState.searchResults, ...hits]
          }))
        })
        .finally(this.loaderToggle())
    }
  }

  showLoadMore = (length) => {
    if (length % 12 === 0 && length !== 0) {
      return this.setState({ showLoadMore: true })
    }
    return this.setState({showLoadMore: false})
  }

  onSubmit = (data) => {
    this.setState({
      search: (data.search).trim().toLowerCase(),
      page: 1,
      searchResults: [],
    })
  }

  onLoadMore = () => {
    this.setState((prevState) => ({
      page: prevState.page + 1
    }))
  }

  loaderToggle = () => {
    this.setState(prevState => ({loader: !prevState.loader}))
  }
  
  openModal = ({ largeImageURL, tags }) => {
    this.setState({
      modalPictureURL: largeImageURL,
      modalPictureALT: tags,
      showModal: true,
    })
  }

  closeModal = () => {
    this.setState({
      showModal: false
    })
  }

  render() {
    const {
      searchResults,
      loader,
      showModal,
      modalPictureURL,
      modalPictureALT,
      showLoadMore
    } = this.state
    
    return (
        <div className='App'>
          <Searchbar onSubmit={this.onSubmit} />
            <div className='Container'>
              <ImageGallery searchResults={searchResults} openModal={this.openModal}/>
              {showLoadMore && <Button onClick={this.onLoadMore} />}
            </div>
          {loader && (<Loader />)}
          {showModal && (<Modal closeModal={this.closeModal} picture={modalPictureURL} alt={modalPictureALT} />)}
      </div>
    );
  }
};