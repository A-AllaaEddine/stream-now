
import { memo } from "react";
import TypeCatalogs from "../type-catalogs/type-catalogs.component";

const AddonCatalog = memo(({ catalog, selectItem }) => {
    return (
        <div  className='addon-items-container'>
            {
                catalog.map((cat, idx) => {
                    if(cat.length > 1) {
                            return <TypeCatalogs key={idx} cat={cat} selectItem={selectItem}/>
                        }
                })
            }
        </div>
    )
})

export default AddonCatalog;