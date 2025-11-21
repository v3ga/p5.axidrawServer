# p5.axidrawServer
Minimal exemple showing how to "live plot" with [p5.js](https://p5js.org/) &amp; [p5.svgPlot](https://github.com/golanlevin/p5.plotSvg) using [Axidraw Python API](https://axidraw.com/doc/py_api/#introduction) with a client-server architecture.<br />It uses a slighly modified version of [p5.svgPlot](https://github.com/golanlevin/p5.plotSvg) to get a svg string from [endRecordSVG()](https://github.com/v3ga/p5.axidrawServer/blob/main/sketches/sketchPlot/p5.plotSvg.js#L178) function.

## Installation
1. Clone or download this repository.
2. Create a Python *venv* environment in the folder<br>
```
python -m venv venv
```
4. Activate it (MacOS, not sure about Windows / Linux)<br>
```
source venv/bin/activate
```
5. Install *aiohttp* & *axidraw* libraries<br />
```
pip install aiohttp
pip install https://cdn.evilmadscientist.com/dl/ad/public/AxiDraw_API.zip
```
6. Change [model & penlift](https://github.com/v3ga/p5.axidrawServer/blob/main/sketches/sketchPlot/sketch.js#L10) variables to match your AxiDraw model & pen-lift motor.
7. Go to ```http://127.0.0.1:8080```in your browser. 

