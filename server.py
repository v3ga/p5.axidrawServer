from aiohttp                    import web
from aiohttp.web_middlewares    import normalize_path_middleware
from pyaxidraw                  import axidraw

# https://axidraw.com/doc/py_api/#options-general
AXIDRAW_OPTIONS_DEFAULT = {
    'speed_pendown' : 7, 
    'speed_penup'   : 15,
    'accel'         : 25,
    'pen_pos_down'  : 20, 
    'pen_pos_up'    : 40, 
    'pen_rate_lower': 10,
    'pen_rate_raise': 10,
    'pen_delay_down': 0,
    'pen_delay_up'  : 0,
    'const_speed'   : True,
    'penlift'       : 0,
    'model'         : 1
}
axidraw_user_options = {}
axidraw_user_options.update(AXIDRAW_OPTIONS_DEFAULT)


# From http request to AxiDraw 
async def drive_axidraw(request):
    command = request.match_info['command']
    try:
        request_json = await request.json()
    except Exception as e:
        return format_response(True, f"invalid JSON: {e}")

    ad = axidraw.AxiDraw()
    if (command == "version"):
        ad.plot_setup()
        ad.options.mode = command
        ad.plot_run()
        return format_response(False, ad.version_string)
    elif (command in ("align", "cycle", "toggle")):
        ad.plot_setup()
        apply_options(ad,request_json.get('options') or {})
        ad.options.mode = command
        ad.plot_run()
    elif (command == 'plot'):
        svg = request_json.get("svg")
        if (svg is None):
            return format_response(True, f"svg is not set")
        ad.plot_setup(svg)
        apply_options(ad,request_json.get('options') or {})
        ad.plot_run()

    return format_response(False, f"ok executed {command}")

# Json message formating for client 
def format_response(bError,message):
    return web.json_response({"status" : "error" if bError else "ok", "message":message})

# Apply user options
def apply_options(ad, user_options):
    axidraw_user_options.update(user_options)
    vars(ad.options).update(axidraw_user_options)

# Create webserver
app = web.Application(middlewares=[normalize_path_middleware(merge_slashes=True)])
app.router.add_static('/', path="sketches", show_index=True)
app.router.add_post('/axidraw/{command}', drive_axidraw)

# Entry point
if __name__ == '__main__':
    web.run_app(app, host="127.0.0.1", port=8080, ssl_context=None)
