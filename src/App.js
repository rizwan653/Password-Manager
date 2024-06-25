import {Component} from 'react'

import {v4} from 'uuid'

import PasswordItem from './components/PasswordItem'

import './App.css'

const initialContainerBackgroundClassNames = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
]

class App extends Component {
  state = {
    websiteText: '',
    nameText: '',
    passwordText: '',
    passwordsList: [],
    showPasswords: false,
    searchText: '',
  }

  onChangeWebsiteEvent = event => {
    this.setState({websiteText: event.target.value})
  }

  onChangeNameEvent = event => {
    this.setState({nameText: event.target.value})
  }

  onChangePasswordEvent = event => {
    this.setState({passwordText: event.target.value})
  }

  onChangeSearchEvent = event => {
    this.setState({searchText: event.target.value})
  }

  onSubmitFormEvent = event => {
    event.preventDefault()
    const {websiteText, nameText, passwordText} = this.state
    const initialContainerBackgroundClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`

    const newPassword = {
      id: v4(),
      website: websiteText,
      name: nameText,
      password: passwordText,
      initialClassName: initialContainerBackgroundClassName,
    }

    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, newPassword],
      websiteText: '',
      nameText: '',
      passwordText: '',
    }))
  }

  deletePassword = passId => {
    const {passwordsList} = this.state
    this.setState({
      passwordsList: passwordsList.filter(passwords => passwords.id !== passId),
    })
  }

  onToggleCheckbox = () => {
    this.setState(prevState => ({
      showPasswords: !prevState.showPasswords,
    }))
  }

  onChangeSearchEvent = event => {
    this.setState({searchText: event.target.value})
  }

  renderPasswordItems = () => {
    const {passwordsList, showPasswords, searchText} = this.state
    const filteredPassword = passwordsList.filter(eachPassword =>
      eachPassword.website.toLowerCase().includes(searchText.toLowerCase()),
    )

    if (filteredPassword.length !== 0) {
      return filteredPassword.map(eachPassword => (
        <PasswordItem
          key={eachPassword.id}
          eachPasswordDetails={eachPassword}
          deletePassword={this.deletePassword}
          showPasswords={showPasswords}
        />
      ))
    }
    return (
      <div className="no-password-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
          alt="no passwords"
          className="bottom-img"
        />
        <p className="no-class-name-text">No Passwords</p>
      </div>
    )
  }

  render() {
    const {
      websiteText,
      nameText,
      passwordText,
      passwordsList,
      searchText,
    } = this.state
    const passwordsCount = passwordsList.length
    let passwordContainerDisplay = null

    if (passwordsList.length === 0) {
      passwordContainerDisplay = (
        <div className="no-password-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
            alt="no passwords"
            className="bottom-img"
          />
          <p className="no-class-name-text">No Passwords</p>
        </div>
      )
    } else {
      passwordContainerDisplay = (
        <ul className="list-container">{this.renderPasswordItems()}</ul>
      )
    }

    return (
      <div className="app-container">
        <div className="logo-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            className="app-logo"
            alt="app logo"
          />
        </div>
        <div className="input-container">
          <div className="image-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
              className="top-image"
              alt="password manager"
              id="change-img"
            />
          </div>
          <div className="password-container">
            <form onSubmit={this.onSubmitFormEvent}>
              <h1 className="heading">Add New Password</h1>
              <div className="input-text-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  className="icon"
                  alt="website"
                />
                <input
                  type="text"
                  placeholder="Enter Website"
                  className="input-bar"
                  onChange={this.onChangeWebsiteEvent}
                  value={websiteText}
                />
              </div>
              <div className="input-text-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  className="icon"
                  alt="username"
                />
                <input
                  type="text"
                  placeholder="Enter Username"
                  className="input-bar"
                  onChange={this.onChangeNameEvent}
                  value={nameText}
                />
              </div>
              <div className="input-text-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  className="icon"
                  alt="password"
                />
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="input-bar"
                  onChange={this.onChangePasswordEvent}
                  value={passwordText}
                />
              </div>
              <div className="btn-container">
                <button className="button" type="submit">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="output-container">
          <div className="password-count-container">
            <div>
              <h1 className="password-text">Your Passwords </h1>
              <p className="count-style">{passwordsCount}</p>
            </div>
            <div>
              <div className="search-input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                  className="icon search-icon"
                />
                <input
                  type="search"
                  className="search-bar"
                  placeholder="Search"
                  onChange={this.onChangeSearchEvent}
                  value={searchText}
                />
              </div>
            </div>
          </div>
          <hr className="line" />
          <div className="checkbox-container">
            <input
              type="checkbox"
              className="checkbox"
              id="checkbox"
              onChange={this.onToggleCheckbox}
            />
            <label className="label-text" htmlFor="checkbox">
              Show Passwords
            </label>
          </div>
          {passwordContainerDisplay}
        </div>
      </div>
    )
  }
}

export default App
