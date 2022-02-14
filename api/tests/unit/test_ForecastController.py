import json
import os

from api.models.DataUrl import DataUrl


def get_relative_path(path):
    return os.path.join(os.path.dirname(__file__), path)


def test_valid_seasonal_week(client):
    with open(get_relative_path('../data/valid_series_week_request.json')) as f1,\
            open(get_relative_path('../data/valid_series_week_response.json')) as f2, \
            open(get_relative_path('../data/sales.csv')) as f3, \
            open(get_relative_path('../data/sales_result.csv')) as f4:
        test_request_raw = json.load(f1)
        expected_response_raw = json.load(f2)
        test_csv = f3.read()
        expected_csv = f4.read()

        test_request = test_request_raw.copy()
        test_request['data']['dataUrl'] = DataUrl.encode(test_csv)

        expected_response = expected_response_raw.copy()

        expected_response['data']['dataUrl'] = DataUrl.encode(expected_csv)

        result = client.post(
            '/forecast',
            data=json.dumps(test_request),
            headers={'content-type': 'application/json'}
        )

        assert result.status_code == 201
        assert json.loads(result.data.decode()) == expected_response


def test_invalid_params_data_url(client):
    with open(get_relative_path('../data/valid_series_week_request.json')) as f1,\
            open(get_relative_path('../data/invalid_response.json')) as f2:
        test_request_raw = json.load(f1)
        expected_response_raw = json.load(f2)

        test_invalid_request = test_request_raw.copy()
        expected_response = expected_response_raw.copy()
        expected_response['message'] = 'data_url format is invalid.'

        result = client.post(
            '/forecast',
            data=json.dumps(test_invalid_request),
            headers={'content-type': 'application/json'}
        )

        assert result.status_code == 400
        assert json.loads(result.data.decode()) == expected_response
