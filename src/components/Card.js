import React from 'react';
import PropTypes from 'prop-types';
import '../components/css/Card.css';


function Card({ imageSource, title }) {
  return (
    <div className='card text-center bg-dark animate__animated animate__fadeInUp'>
      <div className='overflow'>
        <img src={imageSource} alt='a wallpaper' className='card-img-top'/>
      </div>
      <div className='card-body text-light'>
        <h3 data-testid='name' className='card-title'>{title}</h3>
      </div>
    </div>
  );
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  imageSource: PropTypes.string
};

export default Card;