import { createSelector } from "reselect";
export const selectCatalog = (state) => state.catalog;

export const selectCatalogMetas = createSelector(
    [selectCatalog],
    (catalog) => catalog.catalogMetas
)


export const selectCatalogs = createSelector(
    [selectCatalog],
    (catalog) => catalog.catalogs
)


export const selectResources = createSelector(
    [selectCatalog],
    (catalog) => catalog.resources
)
export const selectAddonCatalogs = createSelector(
    [selectCatalog],
    (catalog) => catalog.addonCatalogs
)

export const selectMoviesCatalogs = createSelector(
    [selectAddonCatalogs],
    (addonCatalogs) => addonCatalogs.filter(movie => {
        return movie.type === 'movie'
    })
)

export const selectSeriesCatalogs = createSelector(
    [selectAddonCatalogs],
    (addonCatalogs) => addonCatalogs.filter(movie => {
        return movie.type === 'series'
    })
)

export const selectIsLoading = createSelector(
    [selectCatalog],
    (catalog) => catalog.isLoading
)