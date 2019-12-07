const harborEntering = [
    [0.082633, 49.484874],
    [0.091061, 49.485347]
];

map.on('load', function () {


    const destination = [0.093268, 49.490274];

    const route = {
        "type": "FeatureCollection",
        "features": [{
            "type": "Feature",
            "geometry": {
                "type": "LineString",
                "coordinates": [
                    ...harborEntering,
                    destination
                ]
            }
        }]
    };

    const point = {
        "type": "FeatureCollection",
        "features": [{
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Point",
                "coordinates": origin
            }
        }]
    };

    // Calculate the distance in kilometers between route start/end point.
    const lineDistance = turf.lineDistance(route.features[0], 'kilometers');

    const arc = [];

    const steps = 500;

    for (let i = 0; i < lineDistance; i += lineDistance / steps) {
        const segment = turf.along(route.features[0], i, 'kilometers');
        arc.push(segment.geometry.coordinates);
    }

    route.features[0].geometry.coordinates = arc;

    let counter = 0;

    map.loadImage("./boat.png", function (error, image) {
        if (error) throw error;

        map.addImage("boat", image, {pixelRatio: 10});

        map.addSource('route', {
            "type": "geojson",
            "data": route
        });

        map.addSource('point-1', {
            "type": "geojson",
            "data": point
        });

        map.addLayer({
            "id": "route",
            "source": "route",
            "type": "line",
            "paint": {
                "line-width": 2,
                "line-color": "#007cbf"
            }
        });

        map.addLayer({
            "id": "boat",
            "source": "point-1",
            "type": "symbol",
            "layout": {
                "icon-image": "boat",
                "icon-rotate": ["get", "bearing"],
                "icon-rotation-alignment": "map",
                "icon-allow-overlap": true,
                "icon-ignore-placement": true
            }
        });

        function animate() {
            point.features[0].geometry.coordinates = route.features[0].geometry.coordinates[counter];

            point.features[0].properties.bearing = turf.bearing(
                turf.point(route.features[0].geometry.coordinates[counter >= steps ? counter - 1 : counter]),
                turf.point(route.features[0].geometry.coordinates[counter >= steps ? counter : counter + 1])
            );

            map.getSource('point-1').setData(point);

            if (counter < steps) {
                requestAnimationFrame(animate);
            }

            counter = counter + 1;
        }

        animate(counter);
    })

});