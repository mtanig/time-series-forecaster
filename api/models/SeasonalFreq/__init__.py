from dataclasses import dataclass


@dataclass
class SeasonalFreq:
    value: str

    def __post_init__(self):
        if type(self.value) is not str:
            raise TypeError(f'{self.__class__.__name__} is not str.')

        # TODO: add validations
