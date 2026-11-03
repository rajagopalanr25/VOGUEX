import { store } from '../utils/dataStore.js';

export const getProductReviews = async (req, res) => {
  try {
    const reviews = store.getReviews(req.params.productId);
    const count = reviews.length;
    const average = count > 0 
      ? Math.round((reviews.reduce((acc, r) => acc + r.rating, 0) / count) * 10) / 10 
      : 5.0;

    res.json({
      reviews,
      count,
      averageRating: average
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createReview = async (req, res) => {
  try {
    const { rating, title, comment, images } = req.body;
    const { productId } = req.params;

    const product = store.getProductById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const review = store.addReview({
      product: productId,
      user: req.user ? req.user._id : 'usr_guest',
      userName: req.user ? req.user.name : (req.body.userName || 'Verified Client'),
      rating: Number(rating) || 5,
      title: title || '',
      comment: comment || 'Exceptional craftsmanship and bespoke luxury feel.',
      verifiedPurchase: true,
      images: images || []
    });

    // Update product rating aggregate
    const allProductReviews = store.getReviews(productId);
    const newAverage = allProductReviews.reduce((sum, r) => sum + r.rating, 0) / allProductReviews.length;
    product.rating = Math.round(newAverage * 10) / 10;
    product.numReviews = allProductReviews.length;

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

