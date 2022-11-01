import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import { rootReducer } from "./root-reducer";

import { rootSaga } from './root-saga';
import createSagaMiddleware from 'redux-saga';

import { loggerMiddleware } from './middleware/logger';



const sagaMiddleware = createSagaMiddleware();

const middleWares = [
    process.env.NODE_ENV !== 'production' && 
    logger, 
    sagaMiddleware
].filter(Boolean);

// const composedEnhancers = compose(applyMiddleware(...middleWares))

// export const store = createStore(rootReducer, composedEnhancers);

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([sagaMiddleware, logger])
  })

sagaMiddleware.run(rootSaga);
