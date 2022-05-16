self.addEventListener('install', event => {
    console.log('Service worker installing...');
});

self.addEventListener('activate', event => {
    console.log('Service worker activating...');
});

self.addEventListener('fetch', event => {
    const url = event.request.url;
    console.log('Fetch called for this URL: ', url);

    if (url.endsWith('.jpg') && (url.startsWith('http://www.tobereplaced.com/') || url.startsWith('https://www.tobereplaced.com/'))) {
        let newUrl = new URL(url);
        newUrl.hostname = "upload.wikimedia.org";
        console.log('Fetching this URL instead: ', newUrl);
        event.respondWith(fetch(newUrl, {
            method: event.request.method,
            headers: event.request.headers
        }));
    }
});