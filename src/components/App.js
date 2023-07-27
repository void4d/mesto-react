import '../index.css'
import Header from './Header.js'
import Main from './Main.js'
import Footer from './Footer.js'
import PopupWithForm from './PopupWithForm'
import ImagePopup from './ImagePopup'
import React from 'react'
import { api } from '../utils/Api.js'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import Login from './Login'
import Register from './Register'
import SuccessPopup from './SuccessPopup'
import FailPopup from './FailPopup'

function App() {
  const [currentUser, setCurrentUser] = React.useState({ name: '', about: '' })
  const [cards, setCards] = React.useState([])

  React.useEffect(() => {
    Promise.all([api.getUserInfoApi(), api.getInitialCardsApi()])
      .then(([profile, cards]) => {
        setCards(cards)
        setCurrentUser(profile)
      })
      .catch((err) => console.log(err))
  }, [])

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] =
    React.useState(false)
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false)

  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState({})

  const isAnyPopupOpen =
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isEditAvatarPopupOpen ||
    isImagePopupOpen

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true)
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false)
    setAddPlacePopupOpen(false)
    setEditAvatarPopupOpen(false)
    setImagePopupOpen(false)

    setSelectedCard({})
  }

  function handleCardClick(card) {
    setImagePopupOpen(true)
    setSelectedCard(card)
  }

  React.useEffect(() => {
    if (isAnyPopupOpen) {
      function handleCloseByEsc(evt) {
        if (evt.key === 'Escape') {
          closeAllPopups()
        }
      }
      document.addEventListener('keydown', handleCloseByEsc)

      return () => {
        document.removeEventListener('keydown', handleCloseByEsc)
      }
    }
  }, [isAnyPopupOpen])

  function handleCardLike(card) {
    const isLiked = card.likes.some(
      (profile) => profile._id === currentUser._id
    )

    if (!isLiked) {
      api
        .putLikeApi(card._id)
        .then((newCard) => {
          setCards((state) => {
            return state.map((c) => (c._id === card._id ? newCard : c))
          })
        })
        .catch((err) => console.log(err))
    } else {
      api
        .deleteLikeApi(card._id)
        .then((newCard) => {
          setCards((state) => {
            return state.map((c) => (c._id === card._id ? newCard : c))
          })
        })
        .catch((err) => console.log(err))
    }
  }

  function handleCardDelete(card) {
    api
      .deleteCardApi(card._id)
      .then(() => {
        setCards((state) => {
          return state.filter((c) => c._id !== card._id)
        })
      })
      .catch((err) => console.log(err))
  }

  function handleUpdateUser(data) {
    api
      .setUserInfoApi(data.name, data.about)
      .then((profile) => {
        setCurrentUser(profile)
        closeAllPopups()
      })
      .catch((err) => console.log(err))
  }

  function handleUpdateAvatar(avatarLink) {
    api
      .changeAvatar(avatarLink.avatar)
      .then((profile) => {
        setCurrentUser(profile)
        closeAllPopups()
      })
      .catch((err) => console.log(err))
  }

  function handleAddPlaceSubmit(data) {
    api
      .postCardApi(data.name, data.link)
      .then((newCard) => {
        setCards([newCard, ...cards])
        closeAllPopups()
      })
      .catch((err) => console.log(err))
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
          onCardDelete={handleCardDelete}
          cards={cards}
        />
        {/* <Login />
        <Register /> */}
        <SuccessPopup onClose={closeAllPopups} />
        <FailPopup onClose={closeAllPopups} />
        <Footer />

        <ImagePopup
          isOpen={isImagePopupOpen}
          card={selectedCard}
          onClose={closeAllPopups}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
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
  )
}

export default App
