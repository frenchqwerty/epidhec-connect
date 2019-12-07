const harborEntering = [
    [0.082633, 49.484874],
    [0.091061, 49.485347]
];

const firstDest = [
    [0.093268, 49.490274]
];

const secondDest = [
    [0.112516, 49.477411],
    [0.124618, 49.477139]
];

const steps = 500;

const routes = [
    {
        "type": "FeatureCollection",
        "features": [{
            "type": "Feature",
            "geometry": {
                "type": "LineString",
                "coordinates": [
                    ...harborEntering,
                    ...firstDest
                ]
            }
        }]
    },
    {
        "type": "FeatureCollection",
        "features": [{
            "type": "Feature",
            "geometry": {
                "type": "LineString",
                "coordinates": [
                    ...harborEntering,
                    ...secondDest
                ]
            }
        }]
    }
];

function traceArc(collectionIndex) {
    const lineDistance = turf.lineDistance(routes[collectionIndex].features[0], 'kilometers');
    const arc = [];

    const localSteps = (collectionIndex === 0 ? 1 : collectionIndex + 1) * steps;

    for (let i = 0; i < lineDistance; i += lineDistance / localSteps) {
        const segment = turf.along(routes[collectionIndex].features[0], i, 'kilometers');
        arc.push(segment.geometry.coordinates);
    }

    routes[collectionIndex].features[0].geometry.coordinates = arc;
}

class Animate {

    routeIndex = 0;

    counter = 0;

    point = {
        "type": "FeatureCollection",
        "features": [{
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Point",
                "coordinates": harborEntering[0]
            }
        }]
    };

    constructor(routeIndex) {
        this.routeIndex = routeIndex;
        map.addSource(`route-${routeIndex}`, {
            "type": "geojson",
            "data": routes[this.routeIndex]
        });

        map.addSource(`boat-${routeIndex}`, {
            "type": "geojson",
            "data": this.point
        });

        map.addLayer({
            "id": `route-${routeIndex}`,
            "source": `route-${routeIndex}`,
            "type": "line",
            "paint": {
                "line-width": 2,
                "line-color": "#007cbf"
            }
        });

        map.addLayer({
            "id": `boat-${routeIndex}`,
            "source": `boat-${routeIndex}`,
            "type": "symbol",
            "layout": {
                "icon-image": "boat",
                "icon-rotate": ["get", "bearing"],
                "icon-rotation-alignment": "map",
                "icon-allow-overlap": true,
                "icon-ignore-placement": true
            }
        });
    }

    animate() {
        this.point.features[0].geometry.coordinates = routes[this.routeIndex].features[0].geometry.coordinates[this.counter];

        const localSteps = (this.routeIndex === 0 ? 1 : this.routeIndex + 1) * steps;

        this.point.features[0].properties.bearing = turf.bearing(
            turf.point(routes[this.routeIndex].features[0].geometry.coordinates[this.counter >= localSteps ? this.counter - 1 : this.counter]),
            turf.point(routes[this.routeIndex].features[0].geometry.coordinates[this.counter >= localSteps ? this.counter : this.counter + 1])
        );

        map.getSource(`boat-${this.routeIndex}`).setData(this.point);

        if (this.counter < localSteps) {
            requestAnimationFrame(this.animate.bind(this));
        }

        this.counter = this.counter + 1;
    }
}


traceArc(0);
traceArc(1);


map.on('load', function () {


    map.loadImage("./boat.png", function (error, image) {
        if (error) throw error;

        map.addImage("boat", image, {pixelRatio: 10});


        const boat1 = new Animate(0);
        const boat2 = new Animate(1);

        boat1.animate();
        boat2.animate();

    })

});