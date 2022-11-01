import { takeLatest, all, call, put } from 'redux-saga/effects';

import { GetCatalogFromAddon, GetCatalogsAndResources } from '../../utils/addonUtils';

import { 
    fetchCatalogMetasFailed,
    fetchCatalogMetasSuccess,
    fetchCatalogsAndResourcesSuccess,
    fetchCatalogsAndResourcesFailed
} from './catalog.actions';

import { CATALOG_ACTION_TYPE } from './catalog.types';

export function* fetchCatalogMetasAsync(action) {
    // console.log(action.payload);
    const { url, moviesData, seriesData } = action.payload;
    // console.log(data);
    try {
        const CatalogMetasMovies = yield call(GetCatalogFromAddon, url, moviesData);
        const CatalogMetasSeries = yield call(GetCatalogFromAddon, url, seriesData);
        yield put(fetchCatalogMetasSuccess([CatalogMetasMovies, CatalogMetasSeries]));
    }catch(error) {
        yield put(fetchCatalogMetasFailed(error));
    }
}

export function* fetchCatalogsAndResourcesAsync(action) {
    const  url  = action.payload;
    // console.log(data);
    try {
        const CatalogsAndResources = yield call(GetCatalogsAndResources, url);
        yield put(fetchCatalogsAndResourcesSuccess(CatalogsAndResources));
    }catch(error) {
        yield put(fetchCatalogsAndResourcesFailed(error));
    }
}




export function* onFetchCatalogMetas() {
    yield takeLatest(CATALOG_ACTION_TYPE.FETCH_CATALOG_METAS_START, fetchCatalogMetasAsync);
}

export function* onFetchCatalogsAndResources() {
    yield takeLatest(CATALOG_ACTION_TYPE.FETCH_CATALOGS_AND_RESOURCES_START, fetchCatalogsAndResourcesAsync);
}



export function* catalogSaga() {
    yield all([
        call(onFetchCatalogMetas),
        call(onFetchCatalogsAndResources)
    ])
}