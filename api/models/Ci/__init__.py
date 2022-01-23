class Ci:
    def __init__(self, ci):
        if type(ci) is not float:
            raise TypeError('ci is not float.')
        self.ci = ci

    def get_as_float(self) -> float:
        return self.ci
