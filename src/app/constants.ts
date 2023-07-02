export const GSOCMapTiffUrl =
  "http://localhost:3000/googlestore/fao-maps-catalog-data/geonetwork/gsoc/GSOCmap/GSOCmap1.5.0.tif";

// Uma amostra geojson da Reserva Biológica do Rio Trombetas, Brasil
export const defaultGeo = JSON.stringify(
  {
    type: "Feature",
    properties: {
      name: "Uma amostra geojson da Reserva Biológica do Rio Trombetas, Brasil"
    },
    geometry: {
      coordinates: [
        [
          [-56.74430663606735, -1.0741224470971673],
          [-56.78802872322484, -1.1439866166643355],
          [-56.71698033159302, -1.2158005252928774],
          [-56.61821525970986, -1.219313114042862],
          [-56.571760542104556, -1.1033953442396438],
          [-56.706049809803616, -1.1958957697754613],
          [-56.74430663606735, -1.0741224470971673],
        ],
      ],
      type: "Polygon",
    },
  },
  null,
  2
);
