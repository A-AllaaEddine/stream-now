import { createAction } from '../../utils/reducer.utils';
import { CATALOG_ACTION_TYPE } from './catalog.types';
// import { createAction } from '@reduxjs/toolkit';

export const fetchCatalogMetasStart = (data) => {
    return createAction(CATALOG_ACTION_TYPE.FETCH_CATALOG_METAS_START, data)
}

export const fetchCatalogMetasSuccess = (catalogMetas) => {
    return createAction(CATALOG_ACTION_TYPE.FETCH_CATALOG_METAS_SUCCESS, catalogMetas)
}
export const fetchCatalogMetasFailed = (error) => {
    return createAction(CATALOG_ACTION_TYPE.FETCH_CATALOG_METAS_FAILED, error)
}

export const fetchCatalogsAndResourcesStart = (url) => {
    return createAction(CATALOG_ACTION_TYPE.FETCH_CATALOGS_AND_RESOURCES_START, url)
}

export const fetchCatalogsAndResourcesSuccess = (catalogsAndResources) => {
    return createAction(CATALOG_ACTION_TYPE.FETCH_CATALOGS_AND_RESOURCES_SUCCESS, catalogsAndResources)
}

export const fetchCatalogsAndResourcesFailed = (error) => {
    return createAction(CATALOG_ACTION_TYPE.FETCH_CATALOGS_AND_RESOURCES_FAILED, error)
}