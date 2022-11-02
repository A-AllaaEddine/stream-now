import { takeLatest, all, call, put } from 'redux-saga/effects';

import { GetCatalogFromAddon, GetCatalogsAndResources, GetAddonData } from '../../utils/addonUtils';

import { 
    fetchCatalogMetasFailed,
    fetchCatalogMetasSuccess,
    fetchCatalogsAndResourcesSuccess,
    fetchCatalogsAndResourcesFailed,
    fetchAddonDataFailed,
    fetchAddonDataSuccess,
    fetchCTypeatalogSuccess,
    fetchCTypeatalogFailed
} from './catalog.actions';

import { CATALOG_ACTION_TYPE } from './catalog.types';


// fetch catalog for all type from all addons for home screen display
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

// fetch catalog from url based on types (movie, series...)
export function* fetchTypeCatalogsAsync(action) {
    const { selectedAddonUrl, selectedType, selectedId } = action.payload;

    if(!selectedAddonUrl || !selectedId || !selectedId) {
        return []
    }

    try {
        const moviesData = {resource: 'catalog', type: selectedType, id: selectedId, extra: {}};
        const TypeCatalogs = yield call(GetCatalogFromAddon, selectedAddonUrl, moviesData);
        yield put(fetchCTypeatalogSuccess(TypeCatalogs));
    }catch(error) {
        yield put(fetchCTypeatalogFailed(error));
    }

}


// fetch catalog and resources from addon url
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


// fetch addon data based on url
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




// listeners
export function* onFetchAddonData () {
    yield takeLatest(CATALOG_ACTION_TYPE.FETCH_ADDON_DATA_START, fetchAddonDataAsync)
}


export function* onFetchCatalogMetas() {
    yield takeLatest(CATALOG_ACTION_TYPE.FETCH_CATALOG_METAS_START, fetchCatalogMetasAsync);
}

export function* onFetchTypeCatalogs() {
    yield takeLatest(CATALOG_ACTION_TYPE.FETCH_TYPE_CATALOGS_START, fetchTypeCatalogsAsync);
}

export function* onFetchCatalogsAndResources() {
    yield takeLatest(CATALOG_ACTION_TYPE.FETCH_CATALOGS_AND_RESOURCES_START, fetchCatalogsAndResourcesAsync);
}



export function* catalogSaga() {
    yield all([
        call(onFetchCatalogMetas),
        call(onFetchCatalogsAndResources),
        call(onFetchAddonData),
        call(onFetchTypeCatalogs)
    ])
}