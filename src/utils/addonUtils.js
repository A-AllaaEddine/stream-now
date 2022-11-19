import Client from 'stremio-addon-client';

export const GetCatalogFromAddon = async (url, data) => {
    const { addonUrl, resource, type, id, extra } = data;
    // console.log(extra);
    var addonName;
    try {
        const Data =  await Client.detectFromURL(url)
        .then (res => { 
            // if (res.addon.isSupported(resource, type, id, [extra]))
            addonName = res.addon.manifest.name;
            // console.log(addonUrl)
            // console.log(res.addon.manifest.name);
            // console.log(res.addon);
            return res.addon.get(resource, type, id, [extra] )})
        .then (res => {return res.metas});
    
        // console.log(Data);
        Data.unshift({addonName: addonName}, {type: type}, {addonUrl: addonUrl});
        return Data;
    } catch (error){
        console.log(error);
    }
}
// get catalog based on extra params
export const GetExtraCatalogFromAddon = async (url, data) => {
    const { addonName, resource, type, id, extra } = data;
    var addonUrl = url.replace("/manifest.json", '');
    // const addonName = await Client.detectFromURL(url)
    // .then(res => {return res.addon.manifest.name})
    // console.log(addonName);
    
    const dataLink = `${addonUrl}/${resource}/${type}/${id}/${extra}.json`;

    try {
        const Data = await fetch(dataLink).then(res => res.json()).then(res => {return res.metas})
        .catch((error) => console.log(error));
    
        Data.unshift({addonName: addonName});
    
        // console.log(Data);
    
        return Data;

    } catch(error) {
        console.log(error);
    }

}

// get movie meta for meta page
export const GetMovieMetaFromAddon = async (url, data) => {
    const { resource, type, id, extra } = data;
    var addonUrl = url.replace("/manifest.json", '');
    // const addonName = await Client.detectFromURL(url)
    // .then(res => {return res.addon.manifest.name})
    // console.log(addonUrl);
    
    const dataLink = `${addonUrl}/${resource}/${type}/${id}.json`;

    // console.log(dataLink);
    var Data = [];
    Data.push(await fetch(dataLink).then(res => res.json()).then(res => { return  res.meta})
    .catch((error) => console.log(error)));

    Data.unshift({ addonUrl: url});

    // console.log(Data);

    return Data;

}

// get movie streams from addon
export const GetMovieStreamsFromAddon = async (url, data) => {
    const { addonName, resource, type, id, extra } = data;
    var addonUrl = url.replace("/manifest.json", '');
    // const addonName = await Client.detectFromURL(url)
    // .then(res => {return res.addon.manifest.name})
    // console.log(addonUrl);
    
    const dataLink = `${addonUrl}/${resource}/${type}/${id}.json`;

    // console.log(dataLink);
    var Data = [];
    Data.push(await fetch(dataLink).then(res => res.json()).then(res => { return  res.streams})
    .catch((error) => console.log(error)));

    Data.unshift({ addonUrl: url}, {addonName: addonName});

    // console.log(Data);

    return Data;

}


export const GetCatalogsAndResources = async (url) => {
    const Data =  await Client.detectFromURL(url)
    .then (res => { 
        // console.log([res.addon.manifest.resources, res.addon.manifest.catalogs]);
        // console.log(res.addon.manifest);
        return [res.addon.manifest.resources, res.addon.manifest.catalogs]
    })

    return Data;
}


// get addon Data
export const GetAddonData = async (url) => {

    const manifest = await Client.detectFromURL(url)
    .then((res) => {
        // console.log(res.addon.manifest);
        return { addonUrl: url, addonName: res.addon.manifest.name, data: res.addon.manifest};
    })

    // const manifests = await Promise.all(urls.map(u=>fetch(u)))
    // .then (response => Promise.all(response.map((res) => {

    //     return {
    //         manifest: res.addon.manifest
    //     }
    // } ) 
    // ))

    return manifest;
}


// check if the adodn support the requested data
export const isSupported = ( addon, resource, id ) => {
    if(resource === "catalog") {
        if(addon.data.resources.includes("catalog") || addon.data.catalogs.length > 0) {
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
        }
    }
    else if(resource === "meta") {
        if((addon.data.resources.includes("meta") || addon.data.resources.some(res => res.name === "meta")) && (addon.data.resources.some(res => res.idPrefixes && res.idPrefixes.length > 0) || (addon.data.idPrefixes && addon.data.idPrefixes.length > 0))) {
            var addonPrefix = [];
            addon.data.resources && addon.data.resources.map(resource => {
                if(resource.idPrefixes && resource.idPrefixes.length > 0) {
                    addonPrefix.push(...resource.idPrefixes);
                }
            })
            addon.data.idPrefixes && addon.data.idPrefixes.length > 0 && addonPrefix.push(...addon.data.idPrefixes)
            if(addonPrefix.some(prefix => id.toLowerCase().startsWith(prefix.toLowerCase()))) {
                return addon;
            }
        }
    }
    else if(resource === "stream") {
        if((addon.data.resources.includes("stream") || addon.data.resources.some(res => res.name === "stream")) && (addon.data.resources.some(res => res.idPrefixes && res.idPrefixes.length > 0) || (addon.data.idPrefixes && addon.data.idPrefixes.length > 0))) {
            let addonPrefix = [];
            addon.data.resources && addon.data.resources.map(resource => {
                if(resource.idPrefixes && resource.idPrefixes.length > 0) {
                    addonPrefix.push(...resource.idPrefixes);
                }
            })
            // console.log(addon);
            if(addon.data.idPrefixes && addon.data.idPrefixes.length > 0 ) {
                addonPrefix.push(...addon.data.idPrefixes)
            }
            // addonPrefix = addonPrefix.filter(addonPre => { return addonPre !== undefined});
            if(addonPrefix.some(prefix => id.toLowerCase().startsWith(prefix.toLowerCase()))) {
                // console.log(addonPrefix);
                return addon;
            }
        }
    }
}

