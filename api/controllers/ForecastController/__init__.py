from flask import Blueprint

ForecastApp = Blueprint('ForecastApp', __name__)


@ForecastApp.route('/forecast', methods=['POST'])
def forecast():
    return 'TODO', 201
