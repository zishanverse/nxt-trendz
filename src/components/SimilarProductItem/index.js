import './index.css'

const SimilarProductItem = props => {
  const {item} = props
  const {imageUrl, title, price, rating, brand} = item

  return (
    <li className="similar-card">
      <img
        src={imageUrl}
        alt={`similar product ${title}`}
        className="similar-img"
      />
      <h1 className="similar-title">{title}</h1>
      <p className="similar-brand">by {brand}</p>

      <div className="similar-price-rating">
        <p className="similar-price">Rs {price}/-</p>

        <div className="similar-rate-card">
          <p className="similar-rate">{rating}</p>
          <img
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
            alt="star"
            className="similar-star"
          />
        </div>
      </div>
    </li>
  )
}

export default SimilarProductItem
