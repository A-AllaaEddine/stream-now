import { createSelector } from "reselect";
export const selectCatalog = (state) => state.catalog;

// select Catalogs Metas
export const selectCatalogMetas = createSelector(
  [selectCatalog],
  (catalog) => catalog.catalogMetas
);

// select Catalogs for selected Type
export const selectTypeCatalog = createSelector(
  [selectCatalog],
  (catalog) => catalog.TypeCatalogs
);

// select All Addons Data
export const selectAddonsData = createSelector(
  [selectCatalog],
  (catalog) => catalog.AddonsData
);

// select Addons URLS
export const selectAddosnUrls = createSelector(
  [selectCatalog],
  (catalog) => catalog.AddonsUrls
);

// select all types name from every addon
export const selectAddonsTypes = createSelector(
  [selectAddonsData],
  (AddonData) =>
    AddonData.map((addon) => {
      return addon.data.types;
    })
);

// select addons types catalog
export const selectAddonsTypesCatalogs = createSelector(
  [selectAddonsData],
  (AddonData) =>
    AddonData.map((addon) => {
      const typeCatalog = addon.data.catalogs.map((cat) => {
        return { type: cat.type };
      });
      const ids = typeCatalog.map((o) => o.type);
      const filtered = typeCatalog.filter(
        ({ type }, index) => !ids.includes(type, index + 1)
      );

      var types = {};
      for (let typeCat of filtered) {
        const type = addon.data.catalogs.filter((cat) => {
          return cat.type === typeCat.type;
        });
        types = { ...types, [typeCat.type]: type };
      }

      return { addonUrl: addon.addonUrl, addonName: addon.addonName, ...types };
    })
);

// select Addons Catalogs
export const selectAddonExtraCatalogs = createSelector(
  [selectAddonsData],
  (AddonData) =>
    AddonData.map((addon) => {
      const Catalogs = addon.data.catalogs;

      var catalogs = [];
      for (let i = 0; i < Catalogs.length; i++) {
        if (Catalogs[i].extra) {
          catalogs.push({
            addonUrl: addon.addonUrl,
            addonName: addon.addonName,
            ...Catalogs[i],
          });
        }
      }
      return catalogs;
    })
);

// select the default catalog names from each addon
export const selectDefaultTypesCatalogs = createSelector(
  [selectAddonsData],
  (AddonData) =>
    AddonData.map((addon) => {
      if (
        addon.data.resources.includes("catalog") ||
        addon.data.catalogs.length > 0
      ) {
        const typeCatalog = addon.data.catalogs.map((cat) => {
          return { type: cat.type };
        });
        const ids = typeCatalog.map((o) => o.type);
        const filtered = typeCatalog.filter(
          ({ type }, index) => !ids.includes(type, index + 1)
        );

        // console.log(filtered);
        var types = [];
        for (let typeCat of filtered) {
          const type = addon.data.catalogs.filter((cat) => {
            return cat.type === typeCat.type;
          });
          types.push({
            addonUrl: addon.addonUrl,
            addonName: addon.addonName,
            ...type[0],
          });
        }
        // console.log(types);

        // console.log([typeMovies[0], typeSeries[0]])
        return types;
      }
    }).filter((type) => {
      return type !== undefined;
    })
);

// select isLoading from reducer
export const selectIsLoading = createSelector(
  [selectCatalog],
  (catalog) => catalog.isLoading
);
export const selectIsMetaLoading = createSelector(
  [selectCatalog],
  (catalog) => catalog.isMetaLoading
);
export const selectIsStreamLoading = createSelector(
  [selectCatalog],
  (catalog) => catalog.isStreamLoading
);

// select Movie Meta from reducer
export const selectMovieMetas = createSelector(
  [selectCatalog],
  (catalog) => catalog.MovieMetas
);
export const selectMovieStreams = createSelector(
  [selectCatalog],
  (catalog) => catalog.MovieStreams
);
