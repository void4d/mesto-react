export default class Auth {
  constructor(config) {
    this._url = config.url
  }

  register(email, password) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    })
  }

  authorize(email, password) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json" 
      },
      body: JSON.stringify({
        email,
        password
      })
    }).then(res => res.json())
  }
 
  getContent(token) {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers:
      {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }).then(res => res.json())
  }

}

export const auth = new Auth({
  url: 'https://auth.nomoreparties.co'
})
