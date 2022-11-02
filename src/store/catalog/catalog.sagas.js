import { takeLatest, all, call, put } from 'redux-saga/effects';

import { GetCatalogFromAddon, GetCatalogsAndResources, GetAddonData } from '../../utils/addonUtils';

import { 
    fetchCatalogMetasFailed,
    fetchCatalogMetasSuccess,
    fetchCatalogsAndResourcesSuccess,
    fetchCatalogsAndResourcesFailed,
    fetchAddonDataFailed,
    fetchAddonDataSuccess
} from './catalog.actions';

import { CATALOG_ACTION_TYPE } from './catalog.types';



export function* fetchCatalogMetasAsync(action) {
    const { AddonUrls, typeCatalogs } = action.payload;
    // console.log(typeCatalogs);
    // const { moviesData, seriesData } = typeCatalogs;
    if (typeCatalogs.length <= 0 || AddonUrls.length <= 0) {
        return [];
    };

    try {
        var MetaData = [];
        for (let i=0; i< AddonUrls.length; i++) {
            var t = typeCatalogs[i];
            var data = [];
            for (let j=0; j< t.length; j++) {
                const moviesData = {resource: 'catalog', type: `${t[j].type}`, id: `${t && t[j].id}`, extra: {}};
                // console.log(moviesData);
                data.push(yield call(GetCatalogFromAddon, AddonUrls[i], moviesData));
            }
            MetaData.push(data);
        }
        // console.log(MetaData);
        yield put(fetchCatalogMetasSuccess(MetaData));
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



export function* fetchAddonDataAsync(action) {
    const urls = action.payload;
    try {
        var AddonData = [];
        for (var url of urls) {
            AddonData.push(yield call(GetAddonData, url));
        }
        // console.log(AddonData);
        yield put(fetchAddonDataSuccess(AddonData));
    } catch (error) {
        yield put(fetchAddonDataFailed(error));
    }
}


export function* onFetchAddonData () {
    yield takeLatest(CATALOG_ACTION_TYPE.FETCH_ADDON_DATA_START, fetchAddonDataAsync)
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
        call(onFetchCatalogsAndResources),
        call(onFetchAddonData)
    ])
}