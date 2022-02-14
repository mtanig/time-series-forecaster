import traceback

from flask import request, Blueprint, jsonify
import json

from api.models.Ci import Ci
from api.models.DataUrl import DataUrl
from api.models.ForecastInterval import ForecastInterval
from api.models.SeasonalFreq import SeasonalFreq
from api.services.ForecastService import ForecastService

ForecastApp = Blueprint('ForecastApp', __name__)


@ForecastApp.route('/forecast', methods=['POST'])
def forecast():
    try:
        try:
            body = json.loads(request.get_data())

            data = body['data']
            data_url = DataUrl(data['dataUrl'])

            params = data['params']
            ci = Ci(params['ci'])
            seasonal_freq = SeasonalFreq(params['seasonalFreq'])
            forecast_interval = ForecastInterval(params['forecastInterval'])
        except Exception as e:
            traceback.print_exc()
            return jsonify({
                "status": "error",
                "message": str(e),
            }), 400

        result_data_url = ForecastService.run(data_url, ci, seasonal_freq, forecast_interval)

        return jsonify({
                   "status": "success",
                   "data": {
                       "dataUrl": result_data_url.get_as_encoded_str()
                   },
               }), 201

    except Exception as e:
        traceback.print_exc()
        return jsonify({
                   "status": "error",
                   "message": str(e),
               }), 500
