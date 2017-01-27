# Python libraries
import flask
import requests # must be pip installed - super useful get/post requests library in python
import threading
import os
import time
import json

# GLOBALS #####################################################################
HOSTNAME = '0.0.0.0'
PORT = 5002 
STATIC = os.path.join(os.path.dirname(__file__),'webpage_stuff')
TEMPLATES = os.path.join(os.path.dirname(__file__),'webpage_stuff/templates')
app = flask.Flask(__name__, static_folder=STATIC, template_folder=TEMPLATES)

def print_config():
    """
    prints configuration to console
    """
    global HOSTNAME, GITLAB_SERVER, PORT, STATIC, TEMPLATES, DEMO_DIR, API_TOKEN, API_URL, API_URL
    print(80*"=")
    print('HOSTNAME : {}'.format(HOSTNAME))
    print('PORT : {}'.format(PORT))
    print('STATIC : {}'.format(STATIC))
    print('TEMPLATES : {}'.format(TEMPLATES))
    print(80*"=")
    return

@app.route('/get_data', methods=['GET'])
def get_data():
    pass

@app.route('/post_data', methods=['POST'])
def post_data():
    data = json.loads(flask.request.get_data().decode('utf-8'))
    print(data)

    table = {'x':[1,2,3], 'y':[4,5,6], 'z':[7,8,9]}
    img_path = "website_stuff/img/img-2.jpg"
    slider_info = {"max":10,"min":0,"divisions":20}

    if len(data) == 4:
        out = {
            data[0]:table,
            data[1]:img_path,
            data[2]:slider_info,
        }
    
    return flask.jsonify({"msg":"success","data":out})


@app.route('/favicon.ico')
def favicon():
    search_path = os.path.join(app.root_path,STATIC)
    print ('FAVICON PATH:',search_path)
    return flask.send_from_directory(
        search_path,
        'favicon.ico',
        mimetype='image/vnd.microsoft.icon'
    )

@app.route('/')
def index():
    return flask.render_template('index.html')


if __name__ == "__main__":
    print_config()
    time.sleep(0.1)
    app.run(
        host=HOSTNAME,
        port=PORT,
        debug=True
    )
