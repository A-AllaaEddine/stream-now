import { memo } from "react";
import TypeCatalogs from "../type-catalogs/type-catalogs.component";

const AddonCatalog = ({ catalog, selectItem }) => {
  return (
    <div className="addon-items-container">
      {catalog.map((cat, idx) => {
        if (cat && cat.length > 1) {
          return <TypeCatalogs key={idx} cat={cat} selectItem={selectItem} />;
        }
      })}
    </div>
  );
};

export default AddonCatalog;
