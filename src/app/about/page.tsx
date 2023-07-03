import { FAOGSOCSourceLink } from "../constants";

const About = () => (
  <div>
    <h2>About</h2>
    <p className="mt-6">
      The source data used for this computation comes from the{" "}
      <a href={FAOGSOCSourceLink}>
        FAO Global Soil Organic Carbon Map v1.5 (GSOC).
      </a>
    </p>
    <p>
      Please read about their methodology in the technical report, it is
      fascinating! It uses World Harmonized Soil Database, SoilGrids, and many
      other sources from around the globe, for a total of over 1 million real
      soil samples. That said, an actual assessment with your soil samples will
      give a more accurate estimate.
    </p>
    <p>
      This is one of the few things that the fantastic{" "}
      <a href="https://data.apps.fao.org/glosis/">FAO Glosis</a> tool
      doesn&apos;t do, and the moment they do I will take this project down.
    </p>
  </div>
);

export default About
