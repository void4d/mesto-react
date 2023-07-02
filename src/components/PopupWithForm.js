function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_type_${props.class} ${props.isOpen ? 'popup_opened' : ''}`}
      onClick={props.onClose}
    >
      <div className="popup__container" onClick={(evt) => evt.stopPropagation()}>
        <button
          className="popup__close-button"
          type="button"
          aria-label="Закрыть"
          onClick={props.onClose}
        ></button>
        <form id={`${props.id}`} className="popup__form" name={`${props.name}`} noValidate>
          <h2 className="popup__heading">{`${props.title}`}</h2>
          {props.children}
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
