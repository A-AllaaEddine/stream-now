
import { CATALOG_ACTION_TYPE } from "./catalog.types";


const CATALOG_INITIAL_STATE = {
    catalogMetas : [],
    addonCatalogs: [],
    addonResources: [],
    defaultResources: [],
    AddonsData: [],
    AddonsUrls: [
        'https://3bf59d9737bf-mycimaaddonbylazydzv.baby-beamup.club/manifest.json',
        'https://3bf59d9737bf-mycimaaddonbylazydzv.baby-beamup.club/manifest.json',
        'https://3bf59d9737bf-mycimaaddonbylazydzv.baby-beamup.club/manifest.json',
        'https://3bf59d9737bf-mycimaaddonbylazydzv.baby-beamup.club/manifest.json',
        'https://3bf59d9737bf-mycimaaddonbylazydzv.baby-beamup.club/manifest.json',
],
    isLoading: false,
    error: null
}



export const catalogReducer = (state = CATALOG_INITIAL_STATE, action) => {
    const { type, payload } = action;

    switch(type) {
        case CATALOG_ACTION_TYPE.FETCH_CATALOG_METAS_START:
        case CATALOG_ACTION_TYPE.FETCH_CATALOGS_AND_RESOURCES_START:
        case CATALOG_ACTION_TYPE.FETCH_ADDON_DATA_START:
            return {
                ...state,
                isLoading: true
            };
        case CATALOG_ACTION_TYPE.FETCH_CATALOG_METAS_FAILED:
        case CATALOG_ACTION_TYPE.FETCH_CATALOGS_AND_RESOURCES_FAILED:
        case CATALOG_ACTION_TYPE.FETCH_ADDON_DATA_FAILED:
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
        case CATALOG_ACTION_TYPE.FETCH_ADDON_DATA_SUCCESS:
            return {
                ...state,
                AddonsData: payload,
                isLoading: false
            }
        default:
            return state;
    }
}  