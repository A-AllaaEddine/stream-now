
import { createSelector } from "reselect";
export const selectCatalog = (state) => state.catalog;

export const selectCatalogMetas = createSelector(
    [selectCatalog],
    (catalog) => catalog.catalogMetas
)
export const selectTypeCatalog = createSelector(
    [selectCatalog],
    (catalog) => catalog.TypeCatalogs
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


export const selectAddonsResources = createSelector(
    [selectAddonsData],
    (AddonData) => AddonData.resources
)

export const selectAddonCatalogs = createSelector(
    [selectCatalog],
    (catalog) => catalog.addonCatalogs
)

export const selectAddonsTypesCatalogs = createSelector(
    [selectAddonsData],
    (AddonData) => AddonData.map(addon => {
        // console.log(addon.catalogs);

        const typeMovies = addon.data.catalogs.filter(movie => {
                return movie.type === 'movie';
        });
        
        const typeSeries = addon.data.catalogs.filter(serie => {
                return serie.type === 'series'
        });
        // const AddonUrl = addon.url

        // console.log({movie: typeMovies, series: typeSeries})
        return {addonUrl: addon.addonUrl, movie: typeMovies, series: typeSeries};
    })
)

export const selectDefaultTypesCatalogs = createSelector(
    [selectAddonsData],
    (AddonData) => AddonData.map(addon => {
        // console.log(addon.catalogs);
        const typeMovies = addon.data.catalogs.filter(movie => {
                return movie.type === 'movie';
        });
        
        const typeSeries = addon.data.catalogs.filter(serie => {
                return serie.type === 'series'
        });

        return [typeMovies[0], typeSeries[0]];
    })
)


export const selectIsLoading = createSelector(
    [selectCatalog],
    (catalog) => catalog.isLoading
)