import logo from '../images/logo.svg'
import line from '../images/line.svg'

function Header() {
  return (
    <header className="header">
      <img src={logo} alt="Место. Россия" className="header__logo" />
      <div className="header__login-block">
        <p className="header__email">email@mail.com</p>
        <p className="header__login-logout-text">Выйти</p>
      </div>

      <div className='header__menu-button'>
          <img src={line} className='header__line'></img>
          <img src={line} className='header__line'></img>
          <img src={line} className='header__line'></img>
        </div>
    </header>
  )
}

export default Header
