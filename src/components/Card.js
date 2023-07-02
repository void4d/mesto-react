function Card(props) {

    function handleClick() {
      props.onCardClick(props.card);
    }

  return (
    <li className="elements__card" key={props.card.key}>
      <button className="elements__delete-button" type="button" aria-label="Удалить"></button>
      <img
        className="elements__photo"
        alt=""
        src={props.card.link}
        onClick={handleClick}
      />
      <div className="elements__bottom-part">
        <h2 className="elements__heading">{props.card.name}</h2>
        <div className="elements__like-block">
          <button className="elements__like-button" type="button" aria-label="Понравилось"></button>
          <p className="elements__like-counter">{props.card.likes.length}</p>
        </div>
      </div>
    </li>
    );
    debugger;
}

export default Card;
