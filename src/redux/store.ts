import { createStore, applyMiddleware } from "redux";
// import logger from "redux-logger";
// import {persistStore} from "redux-persist";
import rootReducer from "./root-reducer";

// const middlewares = [logger];

// const store = createStore(rootReducer, applyMiddleware(...middlewares));
// const presist = persistStore(store);
// const store = createStore(rootReducer, applyMiddleware(...middlewares));
export const store = createStore(rootReducer);
// export store;
