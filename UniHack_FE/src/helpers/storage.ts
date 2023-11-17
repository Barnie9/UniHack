enum StorageKeys {
	AccessToken = 'token',
	RefreshToken = 'refresh-token',
	Theme = 'theme',
	Username = 'username',
	DashboardsCount = 'dashboards-count',
}

export const Storage = {
	set: function(getKey: (keys: typeof StorageKeys) => string, value: string) {
		const key = getKey(StorageKeys);
		localStorage.setItem(key, value);
	},
	get: function(getKey: (keys: typeof StorageKeys) => string) {
		const key = getKey(StorageKeys);
		return localStorage.getItem(key);
	},
	remove: function(getKeys: (keys: typeof StorageKeys) => string | string[]) {
		const keys = getKeys(StorageKeys);

		if (Array.isArray(keys)) {
			keys.forEach(key => localStorage.removeItem(key));
		} else {
			localStorage.removeItem(keys);
		}
	},
	clear: function() {
		localStorage.clear();
	}
};
