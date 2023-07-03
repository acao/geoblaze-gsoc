"use client";

import { useRef, useState } from "react";
// todo: finish types PR
// @ts-expect-error
import { mean, parse } from "geoblaze";
import { FAOGSOCSourceLink, GSOCMapTiffUrl, defaultGeo } from "./constants";
import { MultiPolygon, Polygon, area } from "@turf/turf";
import { DataTable } from "./components/DataTable";
import geoPolygonNormalizer from "./lib/geoPolygonNormalizer";
import { GeoJSONEditor } from "./components/GeoJSONEditor";
import Link from "next/link";

const m2ToHa = (m2: number): number => m2 * 0.0001;

const haFormatter = Intl.NumberFormat("en", {
  notation: "compact",
  style: "unit",
  unit: "hectare",
  unitDisplay: "narrow",
});

const digits = new Intl.NumberFormat("en-DE", { maximumFractionDigits: 3 });

export const revalidate = 3600;

export default function Home() {
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const [statusMessage, setStatusMessage] = useState<null | string>(null);
  const [polygon, setPolygon] = useState<Polygon | MultiPolygon | null>(null);
  const [jsonString, setJsonString] = useState<string | null>(null);
  const [dataResult, setDataResult] = useState<number[]>([]);
  const data = [];
  const totalArea = polygon && m2ToHa(area(polygon));
  const result = dataResult[0];
  if (totalArea) {
    data.push([
      "Total Hectares:",
      totalArea ? haFormatter.format(totalArea) : "",
    ]);
  }
  if (result) {
    data.push(
      ...[
        ["Tonnes/Hectare:", digits.format(result)],
        [
          "Total Predicted SOC Tonnage:",
          result && totalArea && digits.format(result * totalArea),
        ],
      ]
    );
  }
  const message = errorMessage ?? statusMessage;
  // this is messy but fine for now
  const buttonDisabled = Boolean(
    !errorMessage && message && message !== "Raster computation complete!"
  );

  const handleOnClick = async () => {
    if (jsonString) {
      const data = geoPolygonNormalizer(jsonString);
      if ("error" in data) {
        return setErrorMessage(data.error);
      }
      if (data.result) {
        setPolygon(data.result);
        setStatusMessage("Valid GeoJSON");
        if (totalArea && totalArea > 100) {
          setErrorMessage(
            "Disabled for areas over 100 hectares.\nIf you'd like to do heavy weight processing, just fork and deploy your own instance on zeit!"
          );
        }

        try {
          setStatusMessage("Fetching GeoTIFF metadata range...");
          const raster = await parse(
            new URL(GSOCMapTiffUrl, self.location.href).href
          );
          setStatusMessage(
            "Fetched GeoTIFF metadata range, fetching raster range and computing..."
          );
          const results = await mean(raster, data.result);
          setStatusMessage("Raster computation complete!");
          setDataResult(results);
        } catch (err) {
          return setErrorMessage(
            // @ts-expect-error
            `There was an error with Geoblaze: \n ${err.message}`
          );
        }
      }
    }
  };

  return (
    <div className="grid md:grid-cols-2 md:grid-rows-1 md:gap-6 gap-0 grid-cols-1">
      <div>
        <h2>Enter GeoJSON Feature/Geometry</h2>
        <div className="mt-6 mb-6">
          <GeoJSONEditor initialValue={defaultGeo} setCode={setJsonString} />
          <div className="text-right">
            <button
              className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-blue-200 disabled:hover:bg-blue-200"
              onClick={() => handleOnClick()}
              disabled={buttonDisabled}
              aria-disabled={buttonDisabled}
            >
              Compute SOC
            </button>
          </div>
        </div>
      </div>
      <div>
        {message && (
          <div>
            <h2>Status</h2>
            <div
              className={`mt-6 p-6 ${
                errorMessage
                  ? "text-red-800 bg-red-50"
                  : "text-green-800 bg-green-50"
              }`}
            >
              {message}
            </div>
          </div>
        )}

        {result && (
          <div>
            <h2>Results</h2>
            {/* @ts-expect-error fix lagter */}
            <DataTable data={data} />
          </div>
        )}
        <div>
          <h2>About</h2>
          <div className="mt-6">
          <p>
            This tool computes the estimated{" "}
            <a href="https://en.wikipedia.org/wiki/Soil_carbon#Organic_carbon">
              soil organic carbon (SOC)
            </a>{" "}
            for any area of interest (under 100 hectares for now) using the{" "}
            <a href={FAOGSOCSourceLink}>FAO GSOC Map v1.5 data</a>
          </p>
          <h2>Credits</h2>
          <p>
            The tool was created by{" "}
            <a href="https://rikki.dev">Rikki Schulte</a> for fun and for the
            earth, using <a href="https://geoblaze.io/">GeoBlaze</a>, powered by{" "}
            <a href="https://geotiffjs.github.io/">GeoTIFF.js</a>. Check out{" "}
            <a href="https://github.com/acao/geoblaze-gsoc">
              the source on github
            </a>
          </p>
          <p>
            <Link href="/about">Learn more about the project</Link>
          </p>
          </div>
        </div>
      </div>
    </div>
  );
}
