
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
        // console.log(addon.data.types)
        // const addonTypes = addon.data.types;
        // let t = {};
        // for (let type of addonTypes) {
        //     t = {...t, [type]: type};
        // }
        return addon.data.types;
    }
))
// filter the type to get final types array
export const selectAddonsTypesArray = createSelector(
    [selectAddonsTypes],
    (addonTypes) => addonTypes.map(addonType => {
        

        // const ids = addonTypes.map(o => o.type)
        // const filtered = addonTypes.filter(({type}, index) => !ids.includes(type, index + 1))
        console.log(addonTypes);
        
        // var types = {};
        // for (let typeCat of filtered) {
        //     const type = addon.data.catalogs.filter(cat => {
        //         return cat.type === typeCat.type;
        //     })
        //     types = {...types, [typeCat.type]: type}
        // }

        // console.log(types);
        // // console.log({addonUrl: addon.addonUrl, ...types});
        // // console.log({addonUrl: addon.addonUrl, movie: typeMovies, series: typeSeries});
        // return {addonUrl: addon.addonUrl, ...types};
    })
)

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

        // console.log(types);
        // console.log({addonUrl: addon.addonUrl, ...types});
        // console.log({addonUrl: addon.addonUrl, movie: typeMovies, series: typeSeries});
        return {addonUrl: addon.addonUrl, ...types};
    })
)


// selecct the default catalog names from each addon
export const selectDefaultTypesCatalogs = createSelector(
    [selectAddonsData],
    (AddonData) => AddonData.map(addon => {


        var catalogs = {};
        const addonUrl = addon.addonUrl;
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
            types.push({addonUrl: addonUrl, ...type[0]});
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