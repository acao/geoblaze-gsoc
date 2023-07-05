import {
  Polygon,
  MultiPolygon,
  Geometry,

  GeometryTypes,
  LineString,
  MultiLineString,
} from "@turf/turf";
import lineToPolygon from "@turf/line-to-polygon";

export enum ValidationErrors {
  Empty = "Empty String",
  JSON = "Invalid JSON",
  GeoJSON = "Invalid GeoJSON",
  CRS = "Invalid CRS. Only ESPG:4326 is currently supported.\nIf no crs is supplied, this is assumed to be the default.",
  FeatureCollection = "GeoJSON Feature Collections Currently Not Supported",
  GeoJSONType = "Invalid GeoJSON Type",
}

type NormalizerResult =
  | {
      error: ValidationErrors;
    }
  | { result: Polygon | MultiPolygon };

function normalizeGeometry(geom: Geometry): NormalizerResult {
  const geoType = geom.type as GeometryTypes;
  if (!geoType) {
    // then this isn't a geojson
    return { error: ValidationErrors.GeoJSON };
  }
  
  if (geoType === "LineString" || geoType === "MultiLineString") {
    // convert the line to a polygon, return the geometry
    return {
      result: lineToPolygon(geom as LineString | MultiLineString).geometry,
    };
  } else if (geoType === "Polygon" || geoType === "MultiPolygon") {
    return { result: geom as Polygon | MultiPolygon };
  } else {
    return { error: ValidationErrors.GeoJSONType };
  }
}
/**
 * Normalizes input geojson strings to polygon or multipolygon geometries
 * Or returns validation errors
 * TODO: for feature collection support, we may want to return feature[s] or a geometry
 * so that we can use user provided feature.properties to label them
 */
export default function geoPolygonNormalizer(
  geoString: string
): NormalizerResult {
  if (geoString.trim().length < 2) {
    return { error: ValidationErrors.Empty };
  }
  let parsed;
  try {
    parsed = JSON.parse(geoString);
  } catch {
    return { error: ValidationErrors.JSON };
  }
  const type = parsed.type;
  if (!parsed.type) {
    return { error: ValidationErrors.GeoJSON };
  }
  /**
   * I need to test geoblaze for how it handles various CRSes (coordiante reference systems)
   */
  if(parsed?.crs?.name?.name && parsed?.crs?.name?.name !== 'EPSG:4326') {
    return { error: ValidationErrors.CRS }
  }
  if (type === "FeatureCollection") {
    return { error: ValidationErrors.FeatureCollection };
  }
  if (type === "Feature") {
    return normalizeGeometry(parsed.geometry as Geometry);
  }
  if (parsed.coordinates) {
    return normalizeGeometry(parsed as Geometry);
  } else {
    return { error: ValidationErrors.GeoJSONType };
  }
}
