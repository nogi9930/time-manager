import { applyMiddleware, createStore } from "redux"
import rootReducer from "./rootReducer"

// Import the necessary methods for saving and loading
import { save, load } from "redux-localstorage-simple"

/*
  Saving to LocalStorage is achieved using Redux 
  middleware. The 'save' method is called by Redux 
  each time an action is handled by your reducer.
*/    
const createStoreWithMiddleware = applyMiddleware(
    save() // Saving done here
  )(createStore)
    
/*
  Loading from LocalStorage happens during
  creation of the Redux store.
*/  
export const store = createStoreWithMiddleware(
  rootReducer,    
  load() // Loading done here
)

store.subscribe(() => console.log(store.getState()))