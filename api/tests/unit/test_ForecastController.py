import json
import os
import csv
import io
import pytest

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
        test_request = test_request_raw.copy()
        test_request['data']['dataUrl'] = DataUrl.encode(test_csv)

        expected_csv = [row for row in csv.reader(f4)]
        expected_csv_last3 = expected_csv[-3:]

        result = client.post(
            '/forecast',
            data=json.dumps(test_request),
            headers={'content-type': 'application/json'}
        )
        resp = json.loads(result.data.decode())

        assert result.status_code == 201
        assert resp['status'] == expected_response_raw['status']

        resp_data_encoded = resp['data']['dataUrl']
        resp_data = DataUrl.decode(resp_data_encoded).decode()
        resp_csv = [row for row in csv.reader(io.StringIO(resp_data))]
        resp_csv_last3 = resp_csv[-3:]
        REL = 0.001
        for rrow, erow in zip(resp_csv_last3, expected_csv_last3):
            _, _, resp_pred, resp_pred_upper, resp_pred_lower = rrow
            _, _, expected_pred, expected_pred_upper, expected_pred_lower = erow
            assert pytest.approx(resp_pred, REL) == expected_pred
            assert pytest.approx(resp_pred_upper, REL) == expected_pred_upper
            assert pytest.approx(resp_pred_lower, REL) == expected_pred_lower


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
