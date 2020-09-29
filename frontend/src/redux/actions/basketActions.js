import * as basketActions from "../actionTypes/basketConsts";
import Cookie from "js-cookie"

const addToBasket = (item, qty) => (dispatch, getState) => {
  dispatch({
    type: basketActions.ADD_TO_BASKET,
    payload: {
      id: item.id,
      title: item.title,
      price: item.price,
      rating: item.rating,
      qty,
      image: item.image,
      count: item.countInStock,
    },
  });
  const { basket: { basketItems } } = getState();
  Cookie.set("basketItems", JSON.stringify(basketItems))
};

const removeFromBasket = (itemId) => (dispatch, getState) => {
  dispatch({
    type: basketActions.REMOVE_FROM_BASKET,
    payload: itemId,
  });
  const { basket: { basketItems } } = getState();
  Cookie.set("basketItems", JSON.stringify(basketItems))
};

export { addToBasket, removeFromBasket };
