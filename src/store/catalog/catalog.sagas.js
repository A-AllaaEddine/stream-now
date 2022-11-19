
import { takeLatest, all, call, put } from 'redux-saga/effects';

import { GetCatalogFromAddon, GetCatalogsAndResources, GetAddonData, GetExtraCatalogFromAddon, GetMovieMetaFromAddon, GetMovieStreamsFromAddon, isSupported, dispatchDelay } from '../../utils/addonUtils';

import { 
    fetchCatalogMetasFailed,
    fetchCatalogMetasSuccess,
    fetchCatalogsAndResourcesSuccess,
    fetchCatalogsAndResourcesFailed,
    fetchAddonDataFailed,
    fetchAddonDataSuccess,
    fetchCTypeatalogSuccess,
    fetchCTypeatalogFailed,
    fetchSeachCatalogsFailed,
    fetchSeachCatalogsSuccess,
    fetchMovieMetaFailed,
    fetchMovieMetaSuccess,
    fetchMovieStreamsSuccess,
    fetchMovieStreamsFailed
} from './catalog.actions';

import { CATALOG_ACTION_TYPE } from './catalog.types';


// fetch catalog for all type from all addons for home screen display
export function* fetchCatalogMetasAsync(action) {
    const {defaultTypesCatalog} = action.payload;

    // console.log(defaultTypesCatalog);

    if (defaultTypesCatalog.length <= 0) {
        return [];
    };

    try {
        var MetaData = []

        for(let type of defaultTypesCatalog) {
            var f = yield all(type.map(t => {
                // console.log(t);
                const moviesData = {addonUrl: t.addonUrl, resource: 'catalog', type: `${t && t.type}`, id: `${t && t.id}`, extra: {}};
                return call(GetCatalogFromAddon, t && t.addonUrl, moviesData);
            }))
            // console.log(f);
            MetaData.push(f);
            yield put(fetchCatalogMetasSuccess([...MetaData]));
        }
        
        // console.log(MetaData);

        if(MetaData.length === 0) {
            yield put(fetchCatalogMetasSuccess([]));
        }
    }catch(error) {
        yield put(fetchCatalogMetasFailed(error));
    }
}

// fetch catalog from url based on types (movie, series...)
export function* fetchTypeCatalogsAsync(action) {
    const { selectedAddonUrl, selectedType, selectedId } = action.payload;

    if(!selectedAddonUrl || !selectedId || !selectedType) {
        return []
    }

    try {
        const moviesData = {addonUrl: selectedAddonUrl, resource: 'catalog', type: selectedType, id: selectedId, extra: {}};
        const TypeCatalogs = yield call(GetCatalogFromAddon, selectedAddonUrl, moviesData);
        if(TypeCatalogs.length > 0) {
            yield put(fetchCTypeatalogSuccess(TypeCatalogs));
        }
        else {
            yield put(fetchCTypeatalogSuccess([]));
        }
    }catch(error) {
        yield put(fetchCTypeatalogFailed(error));
    }

}

// fetch catalog from search query
export function* fetchSearchCatalogsAsync(action) {
    const {searchInput, AddonsCatalogs} = action.payload;
    // console.log(AddonsCatalogs);

    if ( AddonsCatalogs.length <= 0) {
        return [];
    };

    try {
        var MetaData = [];
        for (let Catalog of AddonsCatalogs) {
            var types = [];
            // console.log(Catalog);
            Catalog.map( cat => {
                if(cat.extra) {
                    var extra = cat.extra;
                    for(let i=0; i< extra.length; i++ ){
                        if(extra[i].name === "search") {
                            types.push(cat);
                        }
                    }
                }
            })

            for (let type of types) {
                // console.log(type);
                var data = [];
                const moviesData = {addonName: type.addonName, resource: 'catalog', type: `${type && type.type}`, id: `${type  && type.id}`, extra: `search=${searchInput}`};
                // console.log(moviesData);
                data.push(yield call(GetExtraCatalogFromAddon, type.addonUrl, moviesData));
                // console.log(data);
                MetaData.push(data);
                // console.log(MetaData);
                // MetaData is an Array = [AddonArray = [TypeArray],....]
            }
        }
        if(MetaData.length > 0) {
            yield put(fetchSeachCatalogsSuccess(MetaData));
        } else {
            yield put(fetchSeachCatalogsSuccess([]));
        }
    }catch(error) {
        yield put(fetchSeachCatalogsFailed(error));
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
        if(AddonData.length > 0) {
            yield put(fetchAddonDataSuccess(AddonData));
        } else {
            yield put(fetchAddonDataSuccess([]));
        }
    } catch (error) {
        yield put(fetchAddonDataFailed(error));
    }
}


// fetch Metas for selected movie/series
export function* fetchMovieMetasAsync(action) {
    const {AddonUrl, type, decodedID, AddonsData} = action.payload;
    // console.log(AddonUrl);

    if ( AddonsData.length <= 0) {
        return [];
    };

    var id = encodeURIComponent(decodedID);

    // console.log(url);

    try {
        
        //get the current addon data
        var currentAddon;
        AddonsData.map(addon => {
            // console.log(addon.addonUrl);
            // console.log(url);
            if(addon.addonUrl === AddonUrl) {
                    currentAddon = addon;
            }
        })

        // check for addons that support that prefix
        var servingAddon = null;
        for (let addon of AddonsData) {
            // if((addon.data.resources.includes("meta") || addon.data.resources.some(res => res.name === "meta")) && (addon.data.resources.some(res => res.idPrefixes && res.idPrefixes.length > 0) || (addon.data.idPrefixes && addon.data.idPrefixes.length > 0))) {
            //     var addonPrefix = [];
            //     addon.data.resources && addon.data.resources.map(resource => {
            //         if(resource.idPrefixes && resource.idPrefixes.length > 0) {
            //             addonPrefix.push(...resource.idPrefixes);
            //         }
            //     })
            //     addon.data.idPrefixes && addon.data.idPrefixes.length > 0 && addonPrefix.push(...addon.data.idPrefixes)
            //     if(addonPrefix.some(prefix => decodedID.toLowerCase().startsWith(prefix.toLowerCase()))) {
            //         servingAddon = addon;
            //     }
            //     break;
            // }
            servingAddon = isSupported(addon, "meta", decodedID);
            if(servingAddon) {
                break;
            }
        }
        if(!servingAddon) {
            servingAddon = currentAddon;
        }

      
        const moviesData = {addonUrl: servingAddon.addonUrl, resource: 'meta', type: type, id: id, extra: {}};
        const movieMeta = yield call(GetMovieMetaFromAddon, servingAddon.addonUrl, moviesData);
        if(movieMeta[1] !== undefined) {
            yield put(fetchMovieMetaSuccess(movieMeta));
        } else {
            yield put(fetchMovieMetaSuccess([]));
        }
        



        


    }catch(error) {
        yield put(fetchMovieMetaFailed(error));
    }

}

// fetch Streams for selected movie/series
export function* fechMovieStreamAsync(action) {
    const {AddonUrl, type, decodedID, AddonsData} = action.payload;
    // console.log(AddonUrl);

    if ( AddonsData.length <= 0) {
        return [];
    };

    var id = encodeURIComponent(decodedID);


    try {
        var MovieStreams = [];
        
        //get the current addon data
        var currentAddon;
        AddonsData.map(addon => {
            // console.log(addon.addonUrl);
            // console.log(url);
            if(addon.addonUrl === AddonUrl) {
                    currentAddon = addon;
            }
        })
        // console.log(currentAddon);

        // check for addons that support that prefix
        var servingAddons = [];
        for (let addon of AddonsData) {
            // console.log(addon.data.resources.includes("stream") || addon.data.resources.some(res => res.name === "stream"));
            // if((addon.data.resources.includes("stream") || addon.data.resources.some(res => res.name === "stream")) && (addon.data.resources.some(res => res.idPrefixes && res.idPrefixes.length > 0) || (addon.data.idPrefixes && addon.data.idPrefixes.length > 0))) {
            //     var addonPrefix = [];
            //     addon.data.resources && addon.data.resources.map(resource => {
            //         if(resource.idPrefixes && resource.idPrefixes.length > 0) {
            //             addonPrefix.push(...resource.idPrefixes);
            //         }
            //     })
            //     addon.data.idPrefixes && addon.data.idPrefixes.length > 0 && addonPrefix.push(...addon.data.idPrefixes)
            //     // console.log(addonPrefix);
            //     if(addonPrefix.some(prefix => decodedID.toLowerCase().startsWith(prefix.toLowerCase()))) {
            //         servingAddons.push(addon.addonUrl);
            //     }
            // }
            // console.log(isSupported(addon, "stream", decodedID));
            servingAddons.push(isSupported(addon, "stream", decodedID));
        }

        servingAddons = servingAddons.filter(add => { return add !== undefined});
        // console.log(servingAddons);
        if(servingAddons.length === 0) {
            servingAddons.push(currentAddon);
        }
        // console.log(servingAddons);

        for (let addon of servingAddons) {
            if(addon.data.resources.includes("stream") || addon.data.resources.some(res => res.name === "stream")) {
                const moviesData = {addonUrl: addon.addonUrl, addonName: addon.addonName, resource: 'stream', type: type, id: id, extra: {}};
                const streamData = yield call(GetMovieStreamsFromAddon, addon.addonUrl, moviesData);
                MovieStreams.push(streamData);
            }
        }

        // console.log(MovieStreams);
        yield put(fetchMovieStreamsSuccess(MovieStreams));


    }catch(error) {
        yield put(fetchMovieStreamsFailed(error));
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

export function* onFetchSearchCatalogs() {
    yield takeLatest(CATALOG_ACTION_TYPE.FETCH_SEARCH_CATALOGS_START, fetchSearchCatalogsAsync);
}

export function* onFetchCatalogsAndResources() {
    yield takeLatest(CATALOG_ACTION_TYPE.FETCH_CATALOGS_AND_RESOURCES_START, fetchCatalogsAndResourcesAsync);
}

export function* onFetchMovieMetasStart() {
    yield takeLatest(CATALOG_ACTION_TYPE.FETCH_MOVIE_META_START, fetchMovieMetasAsync)
}

export function* onFetchMovieStreamsStart() {
    yield takeLatest(CATALOG_ACTION_TYPE.FETCH_MOVIE_STREAM_START, fechMovieStreamAsync)
}



export function* catalogSaga() {
    yield all([
        call(onFetchCatalogMetas),
        call(onFetchCatalogsAndResources),
        call(onFetchAddonData),
        call(onFetchTypeCatalogs),
        call(onFetchSearchCatalogs),
        call(onFetchMovieMetasStart),
        call(onFetchMovieStreamsStart)
    ])
}