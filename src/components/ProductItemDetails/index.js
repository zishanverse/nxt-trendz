import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import SimilarProductItem from '../SimilarProductItem'
import Header from '../Header'
import './index.css'

class ProductItemDetails extends Component {
  state = {count: 1, list: [], isLoading: 'INITIAL'}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({isLoading: 'IN-PROGRESS'})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(`https://apis.ccbp.in/products/${id}`, options)
    const data = await response.json()
    const update = this.convertCase(data)
    console.log(response)
    if (response.ok) {
      this.setState({isLoading: 'SUCCESS', list: update})
    } else {
      this.setState({isLoading: 'FAILURE'})
    }
  }

  convertCase = data => ({
    availability: data.availability,
    brand: data.brand,
    description: data.description,
    id: data.id,
    imageUrl: data.image_url,
    price: data.price,
    rating: data.rating,
    style: data.style,
    title: data.title,
    totalReviews: data.total_reviews,
    similarProducts: data.similar_products.map(each =>
      this.convertSimilar(each),
    ),
  })

  convertSimilar = data => ({
    availability: data.availability,
    brand: data.brand,
    description: data.description,
    id: data.id,
    imageUrl: data.image_url,
    price: data.price,
    rating: data.rating,
    style: data.style,
    title: data.title,
    totalReviews: data.total_reviews,
  })

  increase = () => this.setState(pre => ({count: pre.count + 1}))

  decrease = () => {
    const {count} = this.state
    if (count > 1) {
      this.setState(pre => ({count: pre.count - 1}))
    }
  }

  renderList = () => {
    const {count, list} = this.state
    const {
      imageUrl,
      title,
      similarProducts,
      price,
      rating,
      totalReviews,
      description,
      availability,
      brand,
    } = list

    return (
      <>
        <Header />
        <div className="success-container">
          <div>
            <div className="detail-card">
              <img
                src={imageUrl}
                alt="product"
                className="details-product-img"
              />
              <div className="detail-content">
                <h1 className="detail-title">{title}</h1>
                <p className="rupees">Rs {price}/-</p>
                <div className="rate-review">
                  <div className="rate-card">
                    <p className="rate">{Math.round(rating)}</p>
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                      alt="star"
                      className="star"
                    />
                  </div>
                  <p className="reviews">{totalReviews} Reviews</p>
                </div>
                <p className="para">{description}</p>
                <p className="para">
                  <span className="similar-title">Available:</span>{' '}
                  {availability}
                </p>
                <p className="para">
                  <span className="similar-title">Brand:</span> {brand}
                </p>
                <hr className="line" />

                <div className="count-card">
                  <button
                    type="button"
                    className="count-btn"
                    onClick={this.decrease}
                    testid="minus"
                  >
                    <BsDashSquare className="icon" />
                  </button>
                  <p className="count">{count}</p>
                  <button
                    type="button"
                    className="count-btn"
                    onClick={this.increase}
                    testid="plus"
                  >
                    <BsPlusSquare className="icon" />
                  </button>
                </div>
                <button type="button" className="add-cart">
                  ADD TO CART
                </button>
              </div>
            </div>
            <h1 className="similar">Similar Products</h1>
            <ul className="list">
              {similarProducts.map(each => (
                <SimilarProductItem key={each.id} item={each} />
              ))}
            </ul>
          </div>
        </div>
      </>
    )
  }

  redirectToProduct = () => {
    const {history} = this.props
    history.replace('/products')
  }

  failureView = () => (
    <>
      <Header />
      <div className="failure-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
          alt="failure view"
          className="fail"
        />
        <h1 className="fail-text">Product Not Found</h1>
        <button
          type="button"
          className="shopping"
          onClick={this.redirectToProduct}
        >
          Continue Shopping
        </button>
      </div>
    </>
  )

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height={80} width={80} />
    </div>
  )

  renderContent = () => {}

  render() {
    const {isLoading} = this.state

    switch (isLoading) {
      case 'IN-PROGRESS':
        return this.renderLoader()
      case 'SUCCESS':
        return this.renderList()
      case 'FAILURE':
        return this.failureView()
      default:
        return null
    }
  }
}

export default ProductItemDetails
