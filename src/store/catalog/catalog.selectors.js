import { createSelector } from "reselect";
export const selectCatalog = (state) => state.catalog;

export const selectCatalogMetas = createSelector(
    [selectCatalog],
    (catalog) => catalog.catalogMetas
)

export const selectAddonsData = createSelector(
    [selectCatalog],
    (catalog) => catalog.AddonsData
)

export const selectAddosnUrls = createSelector(
    [selectCatalog],
    (catalog) => catalog.AddonsUrls
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

export const selectTypesCatalogs = createSelector(
    [selectAddonsData],
    (AddonData) => AddonData.map(addon => {
        // console.log(addon.catalogs);
        const typeMovies = addon.catalogs.filter(movie => {
                return movie.type === 'movie';
        });
        
        const typeSeries = addon.catalogs.filter(serie => {
                return serie.type === 'series'
        });

        return [typeMovies[0], typeSeries[0]];
    })
)

export const selectSeriesCatalogs = createSelector(
    [selectAddonsData],
    (AddonData) => AddonData.catalogs.filter(movie => {
        return movie.type === 'series'
    })
)
export const selectMoviesDefaultCatalog = createSelector(
    [selectAddonsData],
    (AddonData) => AddonData.map((addon) => 
    addon.catalogs.filter(cat => {
        return cat.type === 'movie'
    })[0])
)

export const selectSeriesDefaultCatalog = createSelector(
    [selectAddonsData],
    (AddonData) => AddonData.map((addon) => 
    addon.catalogs.filter(cat => {
        return cat.type === 'series'
    })[0])
)

export const selectIsLoading = createSelector(
    [selectCatalog],
    (catalog) => catalog.isLoading
)