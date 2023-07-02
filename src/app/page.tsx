"use client";
import { useRef, useState } from "react";
import { mean, parse } from "geoblaze";
import { GSOCMapTiffUrl, defaultGeo } from "./constants";
import { MultiPolygon, Polygon, area } from "@turf/turf";
import { DataTable } from "./components/DataTable";
import geoPolygonNormalizer from "./lib/geoPolygonNormalizer";

const m2ToHa = (m2: number): number => m2 * 0.0001;

const haFormatter = Intl.NumberFormat("en", {
  notation: "compact",
  style: "unit",
  unit: "hectare",
  unitDisplay: "narrow",
});

const digits = new Intl.NumberFormat("en-DE", { maximumFractionDigits: 3 });

export default function Home() {
  const textRef = useRef<HTMLTextAreaElement>();
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const [statusMessage, setStatusMessage] = useState<null | string>(null);
  const [polygon, setPolygon] = useState<Polygon | MultiPolygon | null>(null);
  const [dataResult, setDataResult] = useState<number[]>([]);
  const handleOnClick = async () => {
    if (
      textRef.current &&
      textRef.current.value &&
      textRef.current.value.trim().length > 0
    ) {
      const data = geoPolygonNormalizer(textRef.current.value);
      if ("error" in data) {
        return setErrorMessage(data.error);
      }
      if (data.result) {
        setPolygon(data.result);
        setStatusMessage("Valid GeoJSON");

        try {
          setStatusMessage("Fetching GeoTIFF metadata range...");
          const raster = await parse(GSOCMapTiffUrl);
          console.log(raster)
          setStatusMessage(
            "Fetched GeoTIFF metadata range, fetching raster range and computing..."
          );
          const results = await mean(raster, data.result);
          setStatusMessage("Raster computation complete!");
          console.log(results);
          setDataResult(results);
        } catch (err) {
          return setErrorMessage(
            `There was an error with Geoblaze: \n ${err.message}`
          );
        }
      }
    }
  };
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

  return (
    <div className="App m-6 grid md:grid-cols-2 md:grid-rows-1 md:gap-6 gap-0 grid-cols-1">
      <div>
        <h2>Enter GeoJSON Feature/Geometry</h2>
        <div className="mt-6 mb-6">
          <textarea
            className="border border-black  w-[100%] h-[300px]"
            defaultValue={defaultGeo}
            ref={textRef}
          ></textarea>
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

            <DataTable data={data} />
          </div>
        )}
        <div>
          <h2>About</h2>
          <p className="mt-6">
            The source data used for this computation comes from the{" "}
            <a href="https://data.apps.fao.org/glosis/?share=f-e6875d44-d798-4e9a-b84b-48916cf9e4d8">
              FAO Global Soil Organic Carbon Map v1.5 (GSOC)
            </a>
          </p>
          <p>
            The tool was created by{" "}
            <a href="https://rikki.dev">Rikki Schulte</a> for fun, using{" "}
            <a href="https://geoblaze.io/">GeoBlaze</a>, powered by{" "}
            <a href="https://geotiffjs.github.io/">GeoTIFF.js</a>
          </p>
          <p>
            
            <a href="https://creativecommons.org/licenses/by-nc/3.0/">
              CC BY-NC 3.0
            </a>
            &copy;Rikki Schulte&nbsp;
          </p>
        </div>
      </div>
    </div>
  );
}
