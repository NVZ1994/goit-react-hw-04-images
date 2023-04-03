import './ImageGallery.css';
import React from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export function ImageGallery({ searchResults, openModal }) {
  return (
    <>
      {searchResults && (
        <ul className="ImageGallery">
          {searchResults.map(item => (
            <ImageGalleryItem onClick={openModal} data={item} key={nanoid(6)} />
          ))}
        </ul>
      )}
    </>
  );
}

ImageGallery.propTypes = {
  searchResults: PropTypes.array.isRequired,
  openModal: PropTypes.func.isRequired,
};
