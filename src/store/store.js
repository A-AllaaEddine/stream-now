import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";
import logger from "redux-logger";

import { rootReducer } from "./root-reducer";

import { rootSaga } from "./root-saga";
import createSagaMiddleware from "redux-saga";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["catalog"],
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [
  process.env.NODE_ENV !== "production" && logger,
  sagaMiddleware,
].filter(Boolean);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleWares),
});

sagaMiddleware.run(rootSaga);
