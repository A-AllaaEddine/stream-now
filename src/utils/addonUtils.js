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

export const GetMovieStreamsFromAddon = async (url, data) => {
    const { resource, type, id, extra } = data;
    var addonUrl = url.replace("/manifest.json", '');
    // const addonName = await Client.detectFromURL(url)
    // .then(res => {return res.addon.manifest.name})
    // console.log(addonUrl);
    
    const dataLink = `${addonUrl}/${resource}/${type}/${id}.json`;

    // console.log(dataLink);
    var Data = [];
    Data.push(await fetch(dataLink).then(res => res.json()).then(res => { return  res.streams})
    .catch((error) => console.log(error)));

    Data.unshift({ addonUrl: url});

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