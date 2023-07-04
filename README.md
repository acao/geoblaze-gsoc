# Geoblaze Soil Organic Carbon Example

![Alt text](image.png)

This simple demo project demonstrates the power of browser side raster analysis using [`geoblaze`](https://geoblaze.io), a project not dissimilar in aim from libraries like [`rasterstats`](https://pythonhosted.org/rasterstats/) for python, but with the ready-made ability to fetch data using geotiff range requests

- no tile server
- no servers at all
- ok, there is a proxy for the geotiff GET range requests, but that's because the FAO google storage bucket has same origin CORS enabled
