import logo from '../images/logo.svg'

function Header() {
  return (
    <header className="header">
      <img src={logo} alt="Место. Россия" className="header__logo" />
      {/* <h1 className="header__login-text">Войти</h1> */}
    </header>
  )
}

export default Header
