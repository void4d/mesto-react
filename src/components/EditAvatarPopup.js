import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      class="change-avatar"
      id="change-avatar-form"
      name="change-avatar"
      title="Обновить аватар"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <div className="popup__input-container">
        <input
          id="avatar-link"
          className="popup__input popup__input_type_link"
          name="link"
          placeholder="Ссылка на картинку"
          required
          type="url"
          ref={avatarRef}
          onSubmit={handleSubmit}
        ></input>
        <span id="avatar-link-error" className="popup__error-message"></span>
      </div>
      <button className="popup__save-button" type="submit">
        Сохранить
      </button>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
