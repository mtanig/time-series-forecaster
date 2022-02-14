class SeasonalFreq:
    def __init__(self, seasonal_freq):
        if type(seasonal_freq) is not str:
            raise TypeError('seasonal_freq is not str.')

        # TODO: add validations

        self.seasonal_freq = seasonal_freq

    def get_as_str(self) -> str:
        return self.seasonal_freq
