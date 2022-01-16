import os
from flask import Flask

from api.controllers.ForecastController import ForecastApp

app = Flask(__name__)
app.logger.setLevel(os.getenv('LOG_LEVEL', 'INFO'))
app.config['JSON_AS_ASCII'] = False

app.register_blueprint(ForecastApp)

if __name__ == '__main__':
    app.run(port=os.getenv("PORT"), host="0.0.0.0", threaded=False)
