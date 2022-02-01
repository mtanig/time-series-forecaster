class ForecastInterval:
    def __init__(self, forecast_interval):
        if type(forecast_interval) is not int:
            raise TypeError('forecast_interval is not int.')
        self.forecast_interval = forecast_interval

    def get_as_int(self) -> int:
        return self.forecast_interval
