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
        // console.log(res.addon.manifest);
        return [res.addon.manifest.resources, res.addon.manifest.catalogs]
    })

    return Data;
}

export const GetAddonData = async (url) => {

    const manifest = await Client.detectFromURL(url)
    .then((res) => {
        // console.log(res.addon.manifest);
        return { addonUrl: url, data: res.addon.manifest};
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