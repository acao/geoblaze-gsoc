export const About = () => (
  <div>
    <h2>About</h2>
    <p className="mt-6">
      The source data used for this computation comes from the{" "}
      <a href="https://data.apps.fao.org/glosis/?share=f-e6875d44-d798-4e9a-b84b-48916cf9e4d8">
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
    <h2>Credits</h2>
    <p>
      The tool was created by <a href="https://rikki.dev">Rikki Schulte</a> for
      fun and for the earth, using <a href="https://geoblaze.io/">GeoBlaze</a>,
      powered by <a href="https://geotiffjs.github.io/">GeoTIFF.js</a>. Check
      out{" "}
      <a href="https://github.com/acao/geoblaze-gsoc">the source on github</a>
    </p>
    <p>
      <a href="https://creativecommons.org/licenses/by-nc/3.0/">CC BY-NC 3.0</a>
      &nbsp;&copy;&nbsp;Rikki Schulte&nbsp;
    </p>
  </div>
);
