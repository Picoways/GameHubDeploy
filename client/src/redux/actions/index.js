import axios from 'axios';
import swal from 'sweetalert';

export function getProducts() {
  return async function (dispatch) {
    let json = await axios.get('https://gamehub-chi.vercel.app/home', {});
    return dispatch({
      type: 'GET_PRODUCTS',
      payload: json.data,
    });
  };
}

export function getUsers() {
  return async function (dispatch) {
    let json = await axios.get('https://gamehub-chi.vercel.app/accounts', {});
    return dispatch({
      type: 'GET_USERS',
      payload: json.data,
    });
  };
}

export function getUserPayments(email) {
  return async function (dispatch) {
    let r = await axios.get(
      'https://gamehub-chi.vercel.app/api/checkoutEmail?email=' + email
    );
    return dispatch({
      type: 'GET_USER_PAYMENTS',
      payload: r.data,
    });
  };
}

export function getProductDetails(id) {
  return async function (dispatch) {
    try {
      let json = await axios.get('https://gamehub-chi.vercel.app/product/' + id);
      await axios.put('https://gamehub-chi.vercel.app/product/' + id, {
        views: json.data.views + 1,
      });
      return dispatch({
        type: 'GET_DETAILS',
        payload: json.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function getPaymentHistory(id) {
  return async function (dispatch) {
    let json = await axios.get(
      'https://gamehub-chi.vercel.app/api/paymentHistory/' + id
    );
    return dispatch({
      type: 'GET_PAYMENT_HISTORY',
      payload: json.data,
    });
  };
}

export function sortPrice(price) {
  return {
    type: 'SORT_PRICE',
    payload: price,
  };
}

export function sortDate(date) {
  return {
    type: 'SORT_DATE',
    payload: date,
  };
}

export function sortRating(rating) {
  return {
    type: 'SORT_RATING',
    payload: rating,
  };
}

export function deleteProduct(id) {
  return async function (dispatch) {
    await axios.delete('https://gamehub-chi.vercel.app/product/' + id);
  };
}

export function addToCart(id) {
  return async function (dispatch) {
    try {
      let json = await axios.get('https://gamehub-chi.vercel.app/product/' + id);
      if (json.data.stock > 0) {
        swal('Listo!', 'El producto fue agregado al carrito!', 'success');
        return dispatch({
          type: 'ADD_TO_CART',
          payload: json.data,
        });
      }
      return swal(
        'Lo siento',
        'No hay stock disponible de este producto',
        'error'
      );
    } catch (e) {
      console.log(e);
    }
  };
}

export function addToBuilder(id) {
  return async function (dispatch) {
    let json = await axios.get('https://gamehub-chi.vercel.app/product/' + id)
    return dispatch({
      type: "ADD_TO_BUILDER",
      payload: json.data
    })
  }
}


export function deleteFromCart(id) {
  return {
    type: 'REMOVE_CART',
    payload: id,
  };
}

export function modifyCart(carrito) {
  return {
    type: 'MODIFY_CART',
    payload: carrito,
  };
}

export function addToWishList(id, idUser) {
  return async function (dispatch) {
    try {
      let json = await axios.get('https://gamehub-chi.vercel.app/product/' + id);
      await axios.put(
        'https://gamehub-chi.vercel.app/accounts/wishList/' + idUser,
        json.data
      );
      return dispatch({
        type: 'ADD_TO_WISHLIST',
        payload: json.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function removeFromWishList(idUser, id) {
  return async function (dispatch) {
    try {
      await axios.put(
        'https://gamehub-chi.vercel.app/accounts/removeFromWishList/' + idUser,
        { id }
      );
      return dispatch({
        type: 'REMOVE_FROM_WISHLIST',
        payload: id,
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function filterProducts() {
  return async function (dispatch) {
    try {
      let json = await axios.get('https://gamehub-chi.vercel.app/carousel');
      return dispatch({
        type: 'CAROUSEL',
        payload: json.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function filterProductsByViews() {
  return async function (dispatch) {
    try {
      let json = await axios.get('https://gamehub-chi.vercel.app/mostViewed');
      return dispatch({
        type: 'MOST_VIEWED',
        payload: json.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function filterProductsByDate() {
  return async function (dispatch) {
    try {
      let json = await axios.get('https://gamehub-chi.vercel.app/recentlyAdded');
      return dispatch({
        type: 'RECENTLY_ADDED',
        payload: json.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function searchName(word) {
  return function (dispatch, getState) {
    // primero hacemos el llamado a nuestra store, en donde tengamos todos los productos

    const allProducts = getState().allProducts; //suponiendo que el arr del store se llame products
    // realizamos el filtrado

    allProducts.filter((element) =>
      element.name.toLowerCase().includes(word.toLowerCase())
    );
    dispatch({
      type: 'SEARCH_BAR',
      payload: word,
    });
  };
}

export function searchUserByUsername(payload) {
  return async function (dispatch) {
    let r = await axios.post('https://gamehub-chi.vercel.app/findUser', {
      username: payload,
    });
    return dispatch({
      type: 'FIND_USER',
      payload: r.data,
    });
  };
}

export function postProduct(payload) {
  return async function (dispatch) {
    const response = await axios.post(
      'https://gamehub-chi.vercel.app/createProduct',
      payload
    );
    return response;
  };
}

export function getCategories() {
  return async function (dispatch) {
    let json = await axios.get('https://gamehub-chi.vercel.app/categories', {});
    return dispatch({
      type: 'GET_CATEGORIES',
      payload: json.data,
    });
  };
}

export function getBrands() {
  return async function (dispatch) {
    let json = await axios.get('https://gamehub-chi.vercel.app/brands', {});
    return dispatch({
      type: 'GET_BRANDS',
      payload: json.data,
    });
  };
}

export function clearPage() {
  return {
    type: 'CLEAR_PAGE',
  };
}

export function postUser(payload) {
  return async function (dispatch) {
    const response = await axios.post(
      'https://gamehub-chi.vercel.app/register',
      payload
    );
    return response;
  };
}

export function postUsersGoogle(payload) {
  return async function (dispatch) {
    const responseGoogle = await axios.post(
      'https://gamehub-chi.vercel.app/registerGoogle',
      payload
    );
    return responseGoogle;
  };
}

export function editProduct(payload, id) {
  return async function (dispatch) {
    const edit = await axios.put(
      'https://gamehub-chi.vercel.app/product/' + id,
      payload
    );
    return edit;
  };
}

export function editUser(payload, id) {
  return async function (dispatch) {
    const editUs = await axios.put('https://gamehub-chi.vercel.app/accounts/' + id, payload
    );
    return editUs
  };
}

// export function finishOrder(emailUser, items, total){
//   return async function (dispatch){
//     const responsePay = await axios.post("https://gamehub-chi.vercel.app/api/paymentMerpago", {emailUser, items, total})
//     // return responsePay
//     return dispatch({
//       type: "FINISH_ORDER",
//       payload: json.data,
//     });
//   }
// }

export const finishOrder = function (emailUser, items /*, total*/) {
  return function (dispatch) {
    return axios
      .post('https://gamehub-chi.vercel.app/api/paymentMerpago', {
        emailUser,
        items /*, total*/,
      })
      .then((payment) => dispatch({ type: 'FINISH_ORDER', payload: payment }))
      .catch((error) => console.log(error));
  };
};

export function updateUserState(payload, id) {
  return async function (dispatch) {
    const ban = await axios.put(
      'https://gamehub-chi.vercel.app/accounts/' + id,
      payload
    );
    return ban;
  };
}

export function adminUser(payload, id) {
  return async function (dispatch) {
    const ban = await axios.put(
      'https://gamehub-chi.vercel.app/accounts/' + id,
      payload
    );
    return ban;
  };
}

export function loginRefresher() {
  return function (dispatch) {
    dispatch({
      type: 'LOGIN_REFRESHER',
    });
  };
}

export function modifyQuantityUp(id) {
  return function (dispatch) {
    dispatch({
      type: 'MODIFY_QUANTITY_UP',
      payload: id,
    });
  };
}

export function modifyQuantityDown(id) {
  return function (dispatch) {
    dispatch({
      type: 'MODIFY_QUANTITY_DOWN',
      payload: id,
    });
  };
}

export function changeState(payload) {
  return async function (dispatch) {
    const updated = await axios.put(
      'https://gamehub-chi.vercel.app/updatestate',
      payload
    );
    return updated;
  };
}

export function searchStatePayment() {
  return async function () {
    const data = await axios.get('https://gamehub-chi.vercel.app/filterPaymentState');
    return data;
  };
}

export function getTotalPayments() {
  return async function (dispatch) {
    const json = await axios.get('https://gamehub-chi.vercel.app/filterPaymentState');
    return dispatch({
      type: 'TOTAL_PAYMENTS',
      payload: json.data,
    });
  };
}

export function getUserById(id) {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(`https://gamehub-chi.vercel.app/accounts/${id}`);
      return dispatch({
        type: 'GET_USER_DETAILS',
        payload: data,
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function getPaymentHistoryById(id) {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(
        `https://gamehub-chi.vercel.app/api/paymentHistoryId/${id}`
      );
      return dispatch({
        type: 'GET_PAYMENT_BY_ID',
        payload: data,
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function clearHistoryPage() {
  return function (dispatch) {
    return dispatch({
      type: 'CLEAR_HISTORY_PAGE',
    });
  };
}
