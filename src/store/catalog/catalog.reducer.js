
import { CATALOG_ACTION_TYPE } from "./catalog.types";


const CATALOG_INITIAL_STATE = {
    catalogMetas : [],
    addonCatalogs: [],
    addonResources: [],
    defaultResources: [],
    Addons: [],
    isLoading: false,
    error: null
}



export const catalogReducer = (state = CATALOG_INITIAL_STATE, action) => {
    const { type, payload } = action;

    switch(type) {
        case CATALOG_ACTION_TYPE.FETCH_CATALOG_METAS_START:
        case CATALOG_ACTION_TYPE.FETCH_CATALOGS_AND_RESOURCES_START:
            return {
                ...state,
                isLoading: true
            };
        case CATALOG_ACTION_TYPE.FETCH_CATALOG_METAS_FAILED:
        case CATALOG_ACTION_TYPE.FETCH_CATALOGS_AND_RESOURCES_FAILED:
            return {
                ...state,
                error: payload,
                isLoading: false
            };
        case CATALOG_ACTION_TYPE.FETCH_CATALOG_METAS_SUCCESS:
            return {
                ...state,
                catalogMetas: payload,
                isLoading: false
            };
        case CATALOG_ACTION_TYPE.FETCH_CATALOGS_AND_RESOURCES_SUCCESS:
            return {
                ...state,
                addonCatalogs: payload[1],
                addonResources: payload[0],
                isLoading: false
            };
        default:
            return state;
    }
}  