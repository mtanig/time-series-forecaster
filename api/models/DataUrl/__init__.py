import re
from urllib import request
import base64

pattern = '^data:'
p = re.compile(pattern)


class DataUrl:
    def __init__(self, data_url):
        if type(data_url) is not str:
            raise TypeError('data_url is not str.')
        if len(data_url) == 0:
            raise ValueError('data_url is empty.')
        if not p.match(data_url):
            raise ValueError('data_url format is invalid.')

        self.dataUrl = data_url

    def get_as_decoded_str(self) -> str:
        return DataUrl.decode(self.dataUrl)

    def get_as_encoded_str(self) -> str:
        return self.dataUrl

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
