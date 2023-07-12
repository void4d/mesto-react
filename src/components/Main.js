import React from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext)

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__avatar-container">
          <img className="profile__avatar" src={currentUser.avatar} alt="Аватар пользователя" />
          <button
            className="profile__avatar-edit-icon"
            type="button"
            aria-label="Редактировать"
            onClick={props.onEditAvatar}
          ></button>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <p className="profile__about">{currentUser.about}</p>
          <button
            className="profile__edit-button"
            type="button"
            aria-label="Редактировать"
            onClick={props.onEditProfile}
          ></button>
        </div>
        <button
          className="profile__add-button"
          type="button"
          aria-label="Добавить"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <section>
        <ul className="elements">
          {props.cards.map((card) => {
            return (
              <li className="elements__card" key={card._id}>
                <Card card={card} onCardClick={props.onCardClick} onCardLike={props.onCardLike} />
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
