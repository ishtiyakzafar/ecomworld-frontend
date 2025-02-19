export const getCartItems = () => {
  const products = JSON.parse(localStorage.getItem('cart'));

  if (products) {
    let data = []

    for (const element of products) {
      data.push({
        productId: element.product._id,
        quantity: element.quantity,
        size: element.size
      })
    }

    return data;
  }
}