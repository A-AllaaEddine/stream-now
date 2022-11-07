
import { type } from "@testing-library/user-event/dist/type";
import { createSelector } from "reselect";
export const selectCatalog = (state) => state.catalog;


// select Catalogs Metas
export const selectCatalogMetas = createSelector(
    [selectCatalog],
    (catalog) => catalog.catalogMetas
)

// select Catalogs for selected Type
export const selectTypeCatalog = createSelector(
    [selectCatalog],
    (catalog) => catalog.TypeCatalogs
)

// select All Addons Data
export const selectAddonsData = createSelector(
    [selectCatalog],
    (catalog) => catalog.AddonsData
)

// select Addons URLS
export const selectAddosnUrls = createSelector(
    [selectCatalog],
    (catalog) => catalog.AddonsUrls
)

// select catalogs from reducers
// export const selectCatalogs = createSelector(
//     [selectCatalog],
//     (catalog) => catalog.catalogs
// )


// select addon resources
// export const selectAddonsResources = createSelector(
//     [selectAddonsData],
//     (AddonData) => AddonData.resources
// )

// select addon catalogs
// export const selectAddonCatalogs = createSelector(
//     [selectCatalog],
//     (catalog) => catalog.addonCatalogs
// )


// select all types name from every addon
export const selectAddonsTypes = createSelector(
    [selectAddonsData],
    (AddonData) => AddonData.map(addon => {
        return addon.data.types;
    }
))


// select addons types catalog
export const selectAddonsTypesCatalogs = createSelector(
    [selectAddonsData],
    (AddonData) => AddonData.map(addon => {
        
        const typeCatalog = addon.data.catalogs.map(cat => {
            return {type: cat.type};
        })
        const ids = typeCatalog.map(o => o.type)
        const filtered = typeCatalog.filter(({type}, index) => !ids.includes(type, index + 1))

        var types = {};
        for (let typeCat of filtered) {
            const type = addon.data.catalogs.filter(cat => {
                return cat.type === typeCat.type;
            })
            types = {...types, [typeCat.type]: type}
        }

        return {addonUrl: addon.addonUrl, addonName: addon.addonName, ...types};
    })
)

// select Addons Catalogs
export const selectAddonExtraCatalogs = createSelector(
    [selectAddonsData],
    (AddonData) => AddonData.map(addon => {

        const Catalogs = addon.data.catalogs;

        var catalogs = []
        for (let i=0; i< Catalogs.length; i++) {
            if (Catalogs[i].extra) {
                // console.log(Catalogs);
                // console.log({addonUrl: addon.addonUrl, addonName: addon.addonName, ...cat});
                catalogs.push({addonUrl: addon.addonUrl, addonName: addon.addonName, ...Catalogs[i]});
            }
        }
        // const ids = catalogs.map(o => o.id)
        // const types = catalogs.map(o => o.type)
        // const filtered = catalogs.filter(({id, type}, index) => !ids.includes((id, type), index + 1))
        // console.log(filtered);
        return catalogs;
    })
)




// selecct the default catalog names from each addon
export const selectDefaultTypesCatalogs = createSelector(
    [selectAddonsData],
    (AddonData) => AddonData.map(addon => {


        const typeCatalog = addon.data.catalogs.map(cat => {
            return {type: cat.type};
        })
        const ids = typeCatalog.map(o => o.type)
        const filtered = typeCatalog.filter(({type}, index) => !ids.includes(type, index + 1))

        // console.log(filtered);
        var types = [];
        for (let typeCat of filtered) {
            const type = addon.data.catalogs.filter(cat => {
                return cat.type === typeCat.type;
            })
            types.push({addonUrl: addon.addonUrl, addonName: addon.addonName, ...type[0]});
        }
        // console.log(types);

        // console.log([typeMovies[0], typeSeries[0]])
        return types;
    })
)

// select isLoading from reducer
export const selectIsLoading = createSelector(
    [selectCatalog],
    (catalog) => catalog.isLoading
)
export const selectIsMetaLoading = createSelector(
    [selectCatalog],
    (catalog) => catalog.isMetaLoading
)

// select Movie Meta from reducer
export const selectMovieMetas = createSelector(
    [selectCatalog],
    (catalog) => catalog.MovieMetas
)
export const selectMovieStreams = createSelector(
    [selectCatalog],
    (catalog) => catalog.MovieStreams
)