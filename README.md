# p5.axidrawServer
Minimal exemple showing how to "live plot" with p5 &amp; p5.svgPlot using [Axidraw Python API](https://axidraw.com/doc/py_api/#introduction) with a client-server architecture.

## Installation
1. Clone or download this repository.
2. Create a Python *venv* environment in the folder<br>```python3 -m venv venv```
3. Activate it<br>```source venv/bin/activate```(MacOS)
4. Install *aiohttp* & *axidraw* libraries<br />```pip install aiohttp\npip install https://cdn.evilmadscientist.com/dl/ad/public/AxiDraw_API.zip```
5. Change model & penlift variables in sketches/sketchPlot/sketch.js to match your AxiDraw model & pen-lift motor.
6. Go to ```http://127.0.0.1:8080```in your browser. 

