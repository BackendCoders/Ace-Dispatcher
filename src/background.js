/** @format */

chrome.runtime.onInstalled.addListener(() => {
	chrome.browsingData.remove(
		{
			since: 0,
		},
		{
			cache: true,
		},
		() => {
			console.log('Cache cleared automatically on installation!');
		}
	);
});
