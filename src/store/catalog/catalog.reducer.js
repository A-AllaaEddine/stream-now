
import { CATALOG_ACTION_TYPE } from "./catalog.types";


const CATALOG_INITIAL_STATE = {
    catalogMetas : [],
    addonCatalogs: [],
    addonResources: [],
    defaultResources: [],
    AddonsData: [],
    TypeCatalogs: [],
    MovieMetas:  [],
    MovieStreams: [],
    AddonsUrls: [
        'https://v3-cinemeta.strem.io/manifest.json',
        'https://1fe84bc728af-imdb-catalogs.baby-beamup.club/manifest.json',
        'https://2ecbbd610840-trakt.baby-beamup.club/manifest.json',
        'https://3bf59d9737bf-mycimaaddonbylazydzv.baby-beamup.club/manifest.json',
        'https://2ecbbd610840-kisskh.baby-beamup.club/manifest.json',
],
    isLoading: false,
    isMetaLoading: false,
    isStreamLoading: false,
    error: null
}



export const catalogReducer = (state = CATALOG_INITIAL_STATE, action) => {
    const { type, payload } = action;

    switch(type) {
        case CATALOG_ACTION_TYPE.FETCH_CATALOG_METAS_START:
        case CATALOG_ACTION_TYPE.FETCH_CATALOGS_AND_RESOURCES_START:
        case CATALOG_ACTION_TYPE.FETCH_ADDON_DATA_START:
        case CATALOG_ACTION_TYPE.FETCH_TYPE_CATALOGS_START:
        case CATALOG_ACTION_TYPE.FETCH_SEARCH_CATALOGS_START:
            return {
                ...state,
                isLoading: true
            };
        case CATALOG_ACTION_TYPE.FETCH_MOVIE_STREAM_START:
            return {
                ...state,
                isStreamLoading: true
            }
        case CATALOG_ACTION_TYPE.FETCH_MOVIE_META_START:
            return {
                ...state,
                MovieMetas: [],
                isMetaLoading: true,

            }
        case CATALOG_ACTION_TYPE.FETCH_CATALOG_METAS_FAILED:
        case CATALOG_ACTION_TYPE.FETCH_CATALOGS_AND_RESOURCES_FAILED:
        case CATALOG_ACTION_TYPE.FETCH_ADDON_DATA_FAILED:
        case CATALOG_ACTION_TYPE.FETCH_TYPE_CATALOGS_FAILED:
        case CATALOG_ACTION_TYPE.FETCH_SEARCH_CATALOGS_FAILED:
        case CATALOG_ACTION_TYPE.FETCH_MOVIE_META_FAILED:
        case CATALOG_ACTION_TYPE.FETCH_MOVIE_STREAM_FAILED:
            return {
                ...state,
                error: payload,
                isLoading: false
            };
        case CATALOG_ACTION_TYPE.FETCH_CATALOG_METAS_SUCCESS:
        case CATALOG_ACTION_TYPE.FETCH_SEARCH_CATALOGS_SUCCESS:
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
        case CATALOG_ACTION_TYPE.FETCH_TYPE_CATALOGS_SUCCESS:
            return {
                ...state,
                TypeCatalogs: payload,
                isLoading: false
            }
        case CATALOG_ACTION_TYPE.FETCH_MOVIE_META_SUCCESS:
            return {
                ...state,
                MovieMetas: payload,
                isMetaLoading: false
            }
        case CATALOG_ACTION_TYPE.FETCH_MOVIE_STREAM_SUCCESS:
            return {
                ...state,
                MovieStreams: payload,
                isStreamLoading: false
            }
        default:
            return state;
    }
}  