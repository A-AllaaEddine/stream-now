

export const  isSupported = (resources, types) => {
    if (resources === 'catalog' && Array.isArray(manifest.catalogs)) {
		return manifest.catalogs.some(function(c) {
			return c.type === type && c.id === id
		})
	}
}