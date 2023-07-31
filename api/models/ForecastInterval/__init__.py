from dataclasses import dataclass


@dataclass
class ForecastInterval:
    value: int

    def __post_init__(self):
        if type(self.value) is not int:
            raise TypeError(f'{self.__class__.__name__} is not int.')
