const initialState = {
  allProducts: [],
  products: [],
  details: [],
  users: [],
  cart: [],
  carousel: [],
  mostViewed: [],
  recentlyAdded: [],
  filteredProducts: [],
  wishList: [],
  operation: "",
  categories: [],
  brands: [],
  nameSearched: "",
};

const GET_PRODUCTS = "GET_PRODUCTS";
const GET_DETAILS = "GET_DETAILS";
const SORT_PRICE = "SORT_PRICE";
const SORT_RATING = "SORT_RATING";
const ADD_TO_CART = "ADD_TO_CART";
const CAROUSEL = "CAROUSEL";
const MOST_VIEWED = "MOST_VIEWED";
const RECENTLY_ADDED = "RECENTLY_ADDED";
const SEARCH_BAR = "SEARCH_BAR";
const REMOVE_CART = "REMOVE_CART";
const ADD_TO_WISHLIST = "ADD_TO_WISHLIST";
const REMOVE_WISHLIST = "REMOVE_WISHLIST";
const POST_PRODUCT = "POST_PRODUCT"
const GET_CATEGORIES = "GET_CATEGORIES"
const GET_BRANDS = "GET_BRANDS"

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        allProducts: action.payload,
        filteredProducts: action.payload.filter((e) => state.nameSearched?e.name.toLowerCase().includes(state.nameSearched.toLowerCase()) : e.name !== "uzk"),
        operation: "Default"
      };

    case GET_DETAILS:
      return {
        ...state,
        details: action.payload,
        operation: "Details",
      };
    
    case ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };

    case REMOVE_CART:
      return {
        ...state,
        cart: state.cart.filter((e) => e._id !== action.payload)
      }

    case ADD_TO_WISHLIST:
      return {
        ...state,
        wishList: [...state.wishList, action.payload]
      }

    case REMOVE_WISHLIST:
      return {
        ...state,
        wishList: state.wishList.filter((e) => e._id !== action.payload)
      }

    case CAROUSEL:
      return {
        ...state,
        carousel: action.payload,
      };

    case MOST_VIEWED:
      return {
        ...state,
        mostViewed: action.payload,
      };

    case RECENTLY_ADDED:
      return {
        ...state,
        recentlyAdded: action.payload,
      };
    case SEARCH_BAR:
      let a = action.payload === "aklsjdhlaksjdaskldazzzz" ? state.allProducts : [...state.allProducts].filter((x) => x.name.toLowerCase().includes(action.payload.toLowerCase()))
      return {
        ...state,
        filteredProducts: a.length > 0 ? a : state.allProducts,
        nameSearched: action.payload,
        operation: a.length < 1 ? "Error SearchBar" : action.payload === "aklsjdhlaksjdaskldazzzz" ? "No hacer nada" : "SearchBar"
      };

    case POST_PRODUCT:
      return {
        ...state,
      }

    case SORT_PRICE:
      const sortedArray = action.payload === "Ascending" ? [...state.filteredProducts].sort(function (a, b) {
        if (a.price > b.price) {
          return 1
        }
        if (b.price > a.price) {
          return -1
        }
        return 0
      })
        :
        [...state.filteredProducts].sort(function (a, b) {
          if (a.price > b.price) {
            return -1
          }
          if (b.price > a.price) {
            return 1
          }
        })
      return {
        ...state,
        products: action.payload === "Default" ? [...state.products] : sortedArray,
        filteredProducts: action.payload === "Default" ? [...state.filteredProducts] : sortedArray,
        operation: "No hacer nada",
      }

    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload
      }

    case GET_BRANDS:
      return {
        ...state,
        brands: action.payload
      }

    default:
      return state;
  }
};

export default rootReducer;
