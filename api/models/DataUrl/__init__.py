from dataclasses import dataclass
import re
from urllib import request
import base64

pattern = '^data:'
p = re.compile(pattern)


@dataclass
class DataUrl:
    value: str

    def __post_init__(self):
        if type(self.value) is not str:
            raise TypeError(f'{self.__class__.__name__} is not str.')
        if len(self.value) == 0:
            raise ValueError(f'{self.__class__.__name__} is empty.')
        if not p.match(self.value):
            raise ValueError(f'{self.__class__.__name__} format is invalid.')

    def get_as_decoded_str(self) -> str:
        return DataUrl.decode(self.value)

    def get_as_encoded_str(self) -> str:
        return self.value

    @staticmethod
    def decode(data_url: str) -> bytes:
        with request.urlopen(data_url) as response:
            data = response.read()
            return data

    @staticmethod
    def encode(data: str, media_type: str = 'text/csv') -> str:
        base64_data = DataUrl.to_base64(data)
        data_url = 'data:{0};base64,{1}'.format(media_type, base64_data)

        return data_url

    @staticmethod
    def to_base64(string: str) -> str:
        base64_str = base64.b64encode(string.encode('utf-8')).decode('utf-8')

        return base64_str
