/* eslint-disable react/prop-types */
import React from 'react';

export function CustomNextArrow(props) {
  const {
    className, style, onClick, onKeyPressHandler,
  } = props;

  return (
    <div
      className={className}
      style={{
        ...style,
        background: '#97BF0F',
        width: '60px',
        height: '70px',
        borderRadius: '50px 0 0 50px',
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'center',
        paddingLeft: '10px',
        position: 'absolute',
        right: '0px',
        zIndex: 50,
      }}
      onClick={onClick}
      onKeyPress={onKeyPressHandler}
      role="button"
      tabIndex={0}
    >
      <img alt="next" src="https://img.icons8.com/external-tanah-basah-glyph-tanah-basah/36/ffffff/external-Next-Page-arrows-tanah-basah-glyph-tanah-basah-3.png" />
    </div>
  );
}

export function CustomPrevArrow(props) {
  const {
    className, style, onClick, onKeyPressHandler,
  } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        background: '#97BF0F',
        width: '60px',
        height: '70px',
        borderRadius: '0 50px 50px 0',
        display: 'flex',
        justifyContent: 'right',
        alignItems: 'center',
        paddingRight: '10px',
        position: 'absolute',
        left: '0px',
        zIndex: 50,
      }}
      onClick={onClick}
      onKeyPress={onKeyPressHandler}
      role="button"
      tabIndex={0}
    >
      <img alt="prev" src="https://img.icons8.com/external-tanah-basah-glyph-tanah-basah/36/ffffff/external-Chevron-arrows-tanah-basah-glyph-tanah-basah-4.png" />

    </div>
  );
}
