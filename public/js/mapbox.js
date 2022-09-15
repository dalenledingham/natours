/* eslint-disable */
export const displayMap = (locations) => {
    mapboxgl.accessToken =
        'pk.eyJ1IjoiZGFsZW5sZWRpbmdoYW0iLCJhIjoiY2w3cXd6c2JpMDI0aDNvbnk4NmRoMzBrdCJ9.oKMgUDYQpJmKzpO_ljDB2Q';

    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/dalenledingham/cl7qxk6z7002h15p0uzto6mo2',
        scrollZoom: false,
    });

    const bounds = new mapboxgl.LngLatBounds();

    locations.forEach((location) => {
        // Create marker
        const element = document.createElement('div');
        element.className = 'marker';

        // Add marker
        new mapboxgl.Marker({
            element,
            anchor: 'bottom',
        })
            .setLngLat(location.coordinates)
            .addTo(map);

        // Create popup
        new mapboxgl.Popup({ offset: 30 })
            .setLngLat(location.coordinates)
            .setHTML(`<p>Day ${location.day}: ${location.description}</p>`)
            .addTo(map);

        // Extend map bounds to include location
        bounds.extend(location.coordinates);
    });

    // Add padding to map bounds
    map.fitBounds(bounds, {
        padding: {
            top: 200,
            bottom: 150,
            left: 100,
            right: 100,
        },
    });
};
