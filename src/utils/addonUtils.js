import Client from 'stremio-addon-client';

export const GetCatalogFromAddon = async (url, data) => {
    const { resource, type, id, extra } = data;
    const Data =  await Client.detectFromURL(url)
    .then (res => { 
        // console.log(res.addon.manifest.resources);
        // console.log(res.addon.manifest.catalogs);
        return res.addon.get(resource, type, id)})
    .then (res => {return res.metas});

    return Data;
}
export const GetCatalogsAndResources = async (url) => {
    const Data =  await Client.detectFromURL(url)
    .then (res => { 
        // console.log([res.addon.manifest.resources, res.addon.manifest.catalogs]);
        
        return [res.addon.manifest.resources, res.addon.manifest.catalogs]
    })

    return Data;
}

export const GetManifest = async (url) => {
    const manifest = await Client.detectFromURL(url)
    .then (res => {
        return res.addon.manifest;
    })

    return manifest;
}