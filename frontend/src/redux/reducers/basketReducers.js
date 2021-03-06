import * as basketActions from "../actionTypes/basketConsts";

const basketReducer = (state = { basketItems: [], shipping: {}, payment: {} }, action) => {
  switch (action.type) {
    case basketActions.ADD_TO_BASKET:
      const alreadyInBasket = state.basketItems.find(
        (item) => item.product === action.payload.product
      );
      if (alreadyInBasket) {
        alreadyInBasket.qty = Number(alreadyInBasket.qty) + Number(action.payload.qty);
        const index = state.basketItems.indexOf(alreadyInBasket);
        state.basketItems.splice(index, 1);
        return { basketItems: [...state.basketItems, alreadyInBasket] };
      }
      return { basketItems: [...state.basketItems, action.payload] };

    case basketActions.REMOVE_FROM_BASKET:
      const index = state.basketItems.findIndex(
        (item) => item.id === action.payload
      );
      state.basketItems.splice(index, 1);
      const newBasket = state.basketItems;
      return { ...state, basketItems: [...newBasket] };

    case basketActions.SAVE_SHIPPING:
      return {...state, shipping: action.payload}

    case basketActions.SAVE_PAYMENT:
      return {...state, payment: action.payload}

    default:
      return { ...state };
  }
};

const basketTotal = (basket) =>
  basket?.reduce((amount, item) => amount + item.price * item.qty, 0);

const itemsInBasket = (basket) =>
  basket?.reduce((amount, item) => amount + Number(item.qty), 0);

export { basketReducer, basketTotal, itemsInBasket };
