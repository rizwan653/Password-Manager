import './index.css'

const PasswordItem = props => {
  const {eachPasswordDetails, deletePassword, showPasswords} = props
  const {id, website, name, password, initialClassName} = eachPasswordDetails
  const initial = name ? name[0].toUpperCase() : ''
  const deleteHandler = () => {
    deletePassword(id)
  }

  let displayPassword = null
  if (showPasswords) {
    displayPassword = <p className="input-texts">{password}</p>
  } else {
    displayPassword = (
      <img
        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
        className="stars-image"
        alt="stars"
      />
    )
  }

  return (
    <li className="each-list">
      <div className="flex-container">
        <div className={initialClassName}>
          <p className="initial">{initial}</p>
        </div>
        <div>
          <p className="input-texts">{website}</p>
          <p className="input-texts">{name}</p>
          {displayPassword}
        </div>
        <div className="delete-btn-container">
          <button
            className="delete-btn"
            type="button"
            onClick={deleteHandler}
            data-testid="delete"
          >
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
              alt="delete"
              className="delete-icon"
            />
          </button>
        </div>
      </div>
    </li>
  )
}
export default PasswordItem
