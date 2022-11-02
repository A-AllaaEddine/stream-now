import { createAction } from '../../utils/reducer.utils';
import { CATALOG_ACTION_TYPE } from './catalog.types';
// import { createAction } from '@reduxjs/toolkit';

// fetch home catalogs
export const fetchCatalogMetasStart = (data) => {
    return createAction(CATALOG_ACTION_TYPE.FETCH_CATALOG_METAS_START, data)
}

export const fetchCatalogMetasSuccess = (catalogMetas) => {
    return createAction(CATALOG_ACTION_TYPE.FETCH_CATALOG_METAS_SUCCESS, catalogMetas)
}
export const fetchCatalogMetasFailed = (error) => {
    return createAction(CATALOG_ACTION_TYPE.FETCH_CATALOG_METAS_FAILED, error)
}


// fetch discover catalog based on type
export const fetchTypeCatalogsStart = (data) => {
    return createAction(CATALOG_ACTION_TYPE.FETCH_TYPE_CATALOGS_START, data)
}

export const fetchCTypeatalogSuccess = (catalogMetas) => {
    return createAction(CATALOG_ACTION_TYPE.FETCH_TYPE_CATALOGS_SUCCESS, catalogMetas)
}
export const fetchCTypeatalogFailed = (error) => {
    return createAction(CATALOG_ACTION_TYPE.FETCH_TYPE_CATALOGS_FAILED, error)
}


// fetch catalogs and resources from addon url
export const fetchCatalogsAndResourcesStart = (url) => {
    return createAction(CATALOG_ACTION_TYPE.FETCH_CATALOGS_AND_RESOURCES_START, url)
}

export const fetchCatalogsAndResourcesSuccess = (catalogsAndResources) => {
    return createAction(CATALOG_ACTION_TYPE.FETCH_CATALOGS_AND_RESOURCES_SUCCESS, catalogsAndResources)
}

export const fetchCatalogsAndResourcesFailed = (error) => {
    return createAction(CATALOG_ACTION_TYPE.FETCH_CATALOGS_AND_RESOURCES_FAILED, error)
}



// fetch addon data
export const fetchAddonDataStart = (urls) => {
    return createAction(CATALOG_ACTION_TYPE.FETCH_ADDON_DATA_START, urls)
}

export const fetchAddonDataSuccess = (data) => {
    return createAction(CATALOG_ACTION_TYPE.FETCH_ADDON_DATA_SUCCESS, data)
}

export const fetchAddonDataFailed = (error) => {
    return createAction(CATALOG_ACTION_TYPE.FETCH_ADDON_DATA_FAILED, error)
}