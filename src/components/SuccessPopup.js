import successIcon from '../images/success-icon.svg';

function SuccessPopup ({ onClose }) {
    return (
      <div
      className={`popup popup_type_success`}
        onClick={onClose}
      >
        <div className="popup__container" onClick={(evt) => evt.stopPropagation()}>
          <button
            className="popup__close-button"
            type="button"
            aria-label="Закрыть"
            onClick={onClose}
          ></button>
          <img src={successIcon} className='popup__success-fail-icon'></img>
          <p className='popup__success-fail-text'>Вы успешно зарегистрировались!</p>
        </div>
      </div>
    );
  }
  
  export default SuccessPopup;
  