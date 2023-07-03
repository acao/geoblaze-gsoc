export const GSOCMapTiffUrl =
  "/googlestore/fao-maps-catalog-data/geonetwork/gsoc/GSOCmap/GSOCmap1.5.0.tif";

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
          [
            [-56.76538673791676, -1.1448131165600302],
            [-56.76224492519023, -1.1470801905946075],
            [-56.75056287874895, -1.1486264100492036],
            [-56.739939862779735, -1.1441519159568116],
            [-56.75617907415285, -1.147149121884432],
            [-56.76538673791676, -1.1448131165600302],
          ],
        ],
        [
          [
            [-56.749401858680656, -1.1312517241399291],
            [-56.749975312977654, -1.1325895244794282],
            [-56.74701246577668, -1.1327806387627248],
            [-56.74729919292518, -1.1314428385120436],
            [-56.749401858680656, -1.1312517241399291],
          ],
        ],
        [
          [
            [-56.7652674275665, -1.1321117387143715],
            [-56.76517185185065, -1.1331628672934784],
            [-56.762782458945736, -1.1331628672934784],
            [-56.76316476181013, -1.1318250672178038],
            [-56.7652674275665, -1.1321117387143715],
          ],
        ],
      ],
      type: "MultiPolygon",
    },
  },
  null,
  2
);

export const FAOGSOCSourceLink ="https://data.apps.fao.org/glosis/?share=f-e6875d44-d798-4e9a-b84b-48916cf9e4d8"
