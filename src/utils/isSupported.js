

export const  isSupported = (manifest, resources, type) => {
    if (manifest.resources === 'catalog' && Array.isArray(manifest.catalogs)) {
		return manifest.catalogs.some(function(c) {
			return c.type === type && c.id === id
		})
	}
}