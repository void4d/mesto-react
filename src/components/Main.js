import React from 'react';
import { api } from '../utils/Api.js';
import Card from './Card.js';

function Main(props) {
  const [userName, setUserName] = React.useState();
  const [userDescription, setUserDescription] = React.useState();
  const [userAvatar, setUserAvatar] = React.useState();

  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getUserInfoApi(), api.getInitialCardsApi()])
      .then(([profile, cardData]) => {
        setUserName(profile.name);
        setUserDescription(profile.about);
        setUserAvatar(profile.avatar);
        setCards(cardData);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__avatar-container">
          <img className="profile__avatar" src={userAvatar} alt="Аватар пользователя" />
          <button
            className="profile__avatar-edit-icon"
            type="button"
            aria-label="Редактировать"
            onClick={props.onEditAvatar}
          ></button>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{userName}</h1>
          <p className="profile__about">{userDescription}</p>
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
          {cards.map((card) => {
            return <Card card={card} key={card._id} onCardClick={props.onCardClick} />;
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
