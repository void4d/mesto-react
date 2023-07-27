import failIcon from '../images/fail-icon.svg';

function FailPopup ({ onClose }) {
    return (
      <div
      className={`popup popup_type_fail`}
        onClick={onClose}
      >
        <div className="popup__container" onClick={(evt) => evt.stopPropagation()}>
          <button
            className="popup__close-button"
            type="button"
            aria-label="Закрыть"
            onClick={onClose}
          ></button>
          <img src={failIcon} className='popup__success-fail-icon'></img>
          <p className='popup__success-fail-text'>Что-то пошло не так! Попробуйте еще раз.</p>
        </div>
      </div>
    );
  }
  
  export default FailPopup;