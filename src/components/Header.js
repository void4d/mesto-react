import logo from '../images/logo.svg'

function Header() {
  return (
    <header className="header">
      <img src={logo} alt="Место. Россия" className="header__logo" />
      {/* <div className="header__login-block">
        <p className="header__email">email@mail.com</p>
        <p className="header__login-logout-text">Выйти</p>
      </div> */}
    </header>
  )
}

export default Header
