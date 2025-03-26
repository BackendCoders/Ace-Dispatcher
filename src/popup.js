/** @format */

document.getElementById('clearCache').addEventListener('click', () => {
	chrome.browsingData.remove(
		{
			since: 0,
		},
		{
			cache: true,
		},
		() => {
			alert('Cache Cleared!');
		}
	);
});
