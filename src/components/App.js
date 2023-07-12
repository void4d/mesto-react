import '../index.css';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import React from 'react';
import { api } from '../utils/Api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  const [currentUser, setCurrentUser] = React.useState('');
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getUserInfoApi(), api.getInitialCardsApi()]).then(([profile, cards]) => {
      setCards(cards);
      setCurrentUser(profile);
    });
  }, []);


  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);

  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

  const isAnyPopupOpen =
    isEditProfilePopupOpen || isAddPlacePopupOpen || isEditAvatarPopupOpen || isImagePopupOpen;

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setImagePopupOpen(false);

    setSelectedCard({});
  }

  function handleCardClick(card) {
    setImagePopupOpen(true);
    setSelectedCard(card);
  }

  React.useEffect(() => {
    if (isAnyPopupOpen) {
      function handleCloseByEsc(evt) {
        if (evt.key === 'Escape') {
          closeAllPopups();
        }
      }
      document.addEventListener('keydown', handleCloseByEsc);

      return () => {
        document.removeEventListener('keydown', handleCloseByEsc);
      };
    }
  }, [isAnyPopupOpen]);

  function handleCardLike(card) {
    const isLiked = card.likes.some((profile) => profile._id === currentUser._id);

    if (!isLiked) {
      api.putLikeApi(card._id).then((newCard) => {
        setCards((state) => {
          state.map((c) => (c._id === card._id ? newCard : c));
        });
      });
    } else {
      api.deleteLikeApi(card._id).then((newCard) => {
        setCards((state) => {
          state.map((c) => (c._id === card._id ? newCard : c));
        })
      });
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Header />
          <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            cards={cards}
          />
          <Footer />

          <ImagePopup isOpen={isImagePopupOpen} card={selectedCard} onClose={closeAllPopups} />

          <PopupWithForm
            class="profile-edit"
            id="editform"
            name="profile-name"
            title="Редактировать профиль"
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
          >
            <div className="popup__input-container">
              <input
                id="username"
                className="popup__input popup__input_type_name"
                name="name"
                placeholder="Имя"
                required
                minLength="2"
                maxLength="40"
              />
              <span id="username-error" className="popup__error-message"></span>
            </div>
            <div className="popup__input-container">
              <input
                id="about"
                className="popup__input popup__input_type_about"
                name="about"
                placeholder="Описание"
                required
                minLength="2"
                maxLength="200"
              />
              <span id="about-error" className="popup__error-message"></span>
            </div>
            <button className="popup__save-button" type="submit">
              Сохранить
            </button>
          </PopupWithForm>
          <PopupWithForm
            class="add-card"
            id="addform"
            name="profile-name"
            title="Новое место"
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
          >
            <div className="popup__input-container">
              <input
                id="cardname"
                className="popup__input popup__input_type_name"
                name="name"
                placeholder="Название"
                required
                minLength="2"
                maxLength="30"
              />
              <span id="cardname-error" className="popup__error-message"></span>
            </div>
            <div className="popup__input-container">
              <input
                id="link"
                className="popup__input popup__input_type_link"
                name="link"
                placeholder="Ссылка на картинку"
                required
                type="url"
              />
              <span id="link-error" className="popup__error-message"></span>
            </div>
            <button className="popup__save-button" type="submit">
              Создать
            </button>
          </PopupWithForm>

          <PopupWithForm
            class="change-avatar"
            id="change-avatar-form"
            name="change-avatar"
            title="Обновить аватар"
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
          >
            <div className="popup__input-container">
              <input
                id="avatar-link"
                className="popup__input popup__input_type_link"
                name="link"
                placeholder="Ссылка на картинку"
                required
                type="url"
              />
              <span id="avatar-link-error" className="popup__error-message"></span>
            </div>
            <button className="popup__save-button" type="submit">
              Сохранить
            </button>
          </PopupWithForm>
          <PopupWithForm
            class="confirm-deletion"
            id="confirm-deletion"
            name="confirm-deletion"
            title="Вы уверены?"
          >
            <button className="popup__save-button" type="submit">
              Да
            </button>
          </PopupWithForm>
        </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
