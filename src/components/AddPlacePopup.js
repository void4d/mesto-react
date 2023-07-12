import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      name: name,
      link: link,
    });
  }

  function handleSetName(e) {
    setName(e.target.value);
  }

  function handleSetLink(e) {
    setLink(e.target.value);
  }

  return (
    <PopupWithForm
      class="add-card"
      id="addform"
      name="profile-name"
      title="Новое место"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
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
          onChange={handleSetName}
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
          onChange={handleSetLink}
        />
        <span id="link-error" className="popup__error-message"></span>
      </div>
      <button className="popup__save-button" type="submit">
        Создать
      </button>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
