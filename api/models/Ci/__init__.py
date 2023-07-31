from dataclasses import dataclass


@dataclass
class Ci:
    value: float
    MAX = 1.0
    MIN = 0.0

    def __post_init__(self):
        if type(self.value) is not float:
            raise TypeError(f'{self.__class__.__name__} is not float.')
        if not self.MIN <= self.value <= self.MAX:
            raise ValueError(f'{self.__class__.__name__} must be between {self.MIN} and {self.MAX}')

