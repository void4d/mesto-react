function ImagePopup(props) {
  return (
    <div className={`popup popup_type_open-card ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__photo-container">
        <button
          className="popup__close-button"
          type="button"
          aria-label="Закрыть"
          onClick={props.onClose}
        ></button>
        <img className="popup__photo" alt="" src={props.card.link} />
        <p className="popup__caption">{props.card.name }</p>
      </div>
    </div>
  );
}

export default ImagePopup;
