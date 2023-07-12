import { CurrentUserContext } from '../contexts/CurrentUserContext';
import React from 'react';

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some((profile) => profile._id === currentUser._id);

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <div>
      {isOwn && (
        <button
          className="elements__delete-button"
          type="button"
          aria-label="Удалить"
          onClick={handleDeleteClick}
        ></button>
      )}
      <img
        className="elements__photo"
        alt={props.card.name}
        src={props.card.link}
        onClick={handleClick}
      />
      <div className="elements__bottom-part">
        <h2 className="elements__heading">{props.card.name}</h2>
        <div className="elements__like-block">
          <button
            className={`elements__like-button ${isLiked ? 'elements__like-button_active' : ''}`}
            type="button"
            aria-label="Понравилось"
            onClick={handleLikeClick}
          ></button>
          <p className="elements__like-counter">{props.card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
