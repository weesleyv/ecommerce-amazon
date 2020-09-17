export const initialState = {
    basket: [
      {
        id: 4,
        title: "AmazonBasics Electric Glass and Steel Kettle - 1.7-Liter",
        price: 23.99,
        rating: 4,
        image:
          "https://images-na.ssl-images-amazon.com/images/I/812C5q3i5%2BL._AC_SL1500_.jpg",
      },
      {
        id: 4,
        title: "AmazonBasics Electric Glass and Steel Kettle - 1.7-Liter",
        price: 23.99,
        rating: 4,
        image:
          "https://images-na.ssl-images-amazon.com/images/I/812C5q3i5%2BL._AC_SL1500_.jpg",
      },
    ],
    menu: false,
  };
  
  export const getBasketTotal = (basket) =>
    basket?.reduce((amount, item) => item.price + amount, 0);
  
  function reducer(state, action) {
    console.log(action, state);
    switch (action.type) {
      case "ADD_TO_BASKET":
        return {
          ...state,
          basket: [...state.basket, action.item],
        };
  
      case "REMOVE_FROM_BASKET":
        let newBasket = [...state.basket];
        const index = state.basket.findIndex(
          (basketItem) => basketItem.id === action.id
        );
        newBasket.splice(index, 1);
        return { ...state, basket: newBasket };
  
      case "TOGGLE_MENU":
        return {
          ...state,
          menu: !state.menu
        };
      default:
        return state;
    }
  }
  
  export default reducer;
  