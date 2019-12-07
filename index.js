mapboxgl.accessToken = 'pk.eyJ1IjoiZnJlbmNocXdlcnR5IiwiYSI6ImNqeTFjcDU3bzBibmgzbnBjMGs0amNleDMifQ.px-Nyv49yuKgQjkn9DVu_g';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9',
    zoom: 13,
    center: [0.14, 49.48],
    maxBounds: [
        [0.08, 49.46],
        [0.20, 49.50]
    ]
});

const size = 250;

let bornes = [
    {
        coordinates: [0.125546, 49.478897],
        charge: 0,
        name: 'borne1'
    },
    {
        coordinates: [0.108243, 49.481757],
        charge: 0,
        name: 'borne2'
    },
    {
        coordinates: [0.116746, 49.485081],
        charge: 0,
        name: 'borne3'
    },
    {
        coordinates: [0.093954, 49.491879],
        charge: 0,
        name: 'borne4'
    },
    {
        coordinates: [0.189413, 49.467266],
        charge: 0,
        name: 'borne5'
    },
    {
        coordinates: [0.130463, 49.469573],
        charge: 0,
        name: 'borne6'
    },
    {
        coordinates: [0.156911, 49.475245],
        charge: 0,
        name: 'borne7'
    },
    {
        coordinates: [0.165641, 49.469740],
        charge: 0,
        name: 'borne8'
    },
    {
        coordinates: [0.185676, 49.479746],
        charge: 0,
        name: 'borne9'
    },
    {
        coordinates: [0.147681, 49.467099],
        charge: 0,
        name: 'borne10'
    }
];

const pulsingDot = {
    width: size,
    height: size,
    data: new Uint8Array(size * size * 4),

    onAdd: function () {
        const canvas = document.createElement('canvas');
        canvas.width = this.width;
        canvas.height = this.height;
        this.context = canvas.getContext('2d');
    },

// called once before every frame where the icon will be used
    render: function () {
        const duration = 1000;
        const t = (performance.now() % duration) / duration;

        const radius = size / 2 * 0.3;
        const outerRadius = size / 2 * 0.7 * t + radius;
        const context = this.context;

// draw outer circle
        context.clearRect(0, 0, this.width, this.height);
        context.beginPath();
        context.arc(this.width / 2, this.height / 2, outerRadius, 0, Math.PI * 2);
        context.fillStyle = 'rgba(23, 180, 54,' + (1 - t) + ')';
        context.fill();

// draw inner circle
        context.beginPath();
        context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
        context.fillStyle = 'rgba(23, 180, 54, 1)';
        context.strokeStyle = 'white';
        context.lineWidth = 2 + 4 * (1 - t);
        context.fill();
        context.stroke();

// update this image's data with data from the canvas
        this.data = context.getImageData(0, 0, this.width, this.height).data;

// continuously repaint the map, resulting in the smooth animation of the dot
        map.triggerRepaint();

// return `true` to let the map know that the image was updated
        return true;
    }
};

map.on('load', function () {

    map.addImage('pulsing-dot', pulsingDot, {pixelRatio: 2});

    map.addLayer({
        "id": "points",
        "type": "symbol",
        "source": {
            "type": "geojson",
            "data": {
                "type": "FeatureCollection",
                "features": [
                    {
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [0.125546, 49.478897]
                        }
                    },
                    {
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [0.108243, 49.481757]
                        }
                    },
                    {
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [0.116746, 49.485081]
                        }
                    },
                    {
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [0.093954, 49.491879]
                        }
                    },
                    {
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [0.189413, 49.467266]
                        }
                    },
                    {
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [0.130463, 49.469573]
                        }
                    },
                    {
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [0.156911, 49.475245]
                        }
                    },
                    {
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [0.165641, 49.469740]
                        }
                    },
                    {
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [0.185676, 49.479746]
                        }
                    },
                    {
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [0.147681, 49.467099]
                        }
                    }

                ]
            }
        },
        "layout": {
            "icon-image": "pulsing-dot"
        }
    });
});
