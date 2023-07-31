from dataclasses import dataclass
from io import BytesIO
import pandas as pd
import chardet

from api.libs.KfForecaster import KfForecaster
from api.models.Ci import Ci
from api.models.DataUrl import DataUrl
from api.models.ForecastInterval import ForecastInterval
from api.models.SeasonalFreq import SeasonalFreq


@dataclass
class ForecastService:
    data_url: DataUrl
    ci: Ci
    seasonal_freq: SeasonalFreq
    forecast_interval: ForecastInterval

    def __call__(self) -> DataUrl:
        csv = self.data_url.get_as_decoded_str()
        char_type = chardet.detect(csv)['encoding']
        df = pd.read_csv(BytesIO(csv), index_col=0, encoding=char_type)
        df.index = pd.to_datetime(df.index)

        kff = KfForecaster(df, seasonal_freq=self.seasonal_freq.value)
        kff.run(n_interval=self.forecast_interval.value, ci=self.ci.value)
        result_csv_str = kff.get_combined_result_as_str()
        result_data_url = DataUrl(DataUrl.encode(result_csv_str))

        return result_data_url
