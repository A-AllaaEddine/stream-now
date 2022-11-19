import { combineReducers } from "redux";

import { catalogReducer } from "./catalog/catalog.reducer";

export const rootReducer = combineReducers({
    catalog: catalogReducer
})