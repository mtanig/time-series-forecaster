import numpy as np

np.random.seed(555)
import pandas as pd
from scipy.stats import norm
from pykalman import KalmanFilter


class KfForecaster:
    def __init__(
            self,
            df,
            seasonal_freq,
            initial_state_mean=None,
            initial_state_covariance=None,
            transition_covariance=None,
            observation_covariance=None,
    ):

        df.index = pd.to_datetime(df.index)
        df.index.name = 'date'
        df = df.interpolate()
        self.df = df

        self.df_result = None

        n_dim_trend = 2
        # https://pandas.pydata.org/pandas-docs/stable/user_guide/timeseries.html#dateoffset-objects
        self.seasonal_freq = pd.Timedelta(seasonal_freq)
        self.data_interval = self.df.index[1] - self.df.index[0]
        n_data_seasonal_freq = round(self.seasonal_freq / self.data_interval)
        obs = self.df.iloc[:, 0].values

        self.obs = np.array(obs)
        self.n_dim_obs = obs.ndim
        self.n_obs = len(self.obs)
        self.n_dim_trend = n_dim_trend
        self.n_dim_series = n_data_seasonal_freq
        self.n_dim_state = self.get_n_dim_state()

        initial_state_mean = np.zeros(self.n_dim_state)
        initial_state_covariance = np.ones((self.n_dim_state, self.n_dim_state))

        F, Q, H, R = self.init_kf_params()
        self.kf = KalmanFilter(
            n_dim_obs=self.n_dim_obs,
            n_dim_state=self.n_dim_state,
            initial_state_mean=initial_state_mean,
            initial_state_covariance=initial_state_covariance,
            transition_matrices=F,
            transition_covariance=transition_covariance if transition_covariance is not None else Q,
            observation_matrices=H,
            observation_covariance=observation_covariance if observation_covariance is not None else R,
        )
        self.optimize_kf_params()

        self.smoothed_state_means = np.zeros(self.n_obs)
        self.smoothed_state_covs = np.zeros((self.n_obs, self.n_dim_state, self.n_dim_state))

    """
    F: transition matrices (k x k)
    Q: transition covariance matrices (m x m)
    H: ovservation matrices (l x k)
    R: ovservation covariance matrices (l x l)
    """

    def init_kf_params(self, Q_sigma2=10):
        n_dim_Q = (self.n_dim_trend != 0) + (self.n_dim_series != 0)

        G = np.zeros((self.n_dim_state, n_dim_Q))
        F = np.zeros((self.n_dim_state, self.n_dim_state))
        H = np.zeros((self.n_dim_obs, self.n_dim_state))
        Q = np.eye(n_dim_Q) * Q_sigma2
        R = 1.0

        ## create block matrix of trend component
        G[0, 0] = 1
        H[0, 0] = 1
        if self.n_dim_trend == 1:
            F[0, 0] = 1
        elif self.n_dim_trend == 2:
            F[0, 0] = 2
            F[0, 1] = -1
            F[1, 0] = 1
        elif self.n_dim_trend == 3:
            F[0, 0] = 3
            F[0, 1] = -3
            F[0, 2] = 1
            F[1, 0] = 1
            F[2, 1] = 1

        start_elem = self.n_dim_trend
        start_col = self.n_dim_trend

        ## create block matrix of seasonal component
        if self.n_dim_series > 0:
            G[start_elem, 1] = 1
            H[0, start_elem] = 1
            for i in range(self.n_dim_series - 1):
                F[start_elem, start_elem + i] = -1
            for i in range(self.n_dim_series - 2):
                F[start_elem + i + 1, start_elem + i] = 1

        Q = G.dot(Q).dot(G.T)

        return F, Q, H, R

    def get_n_dim_state(self):
        if self.n_dim_series > 0:
            n_dim_state = self.n_dim_trend + self.n_dim_series - 1
        else:
            n_dim_state = self.n_dim_trend

        return n_dim_state

    def optimize_kf_params(self, n_iter=10, em_vars='all'):
        self.emed_kf = self.kf.em(self.obs, n_iter=n_iter, em_vars=em_vars)

    def smooth(self):
        self.smoothed_state_means, self.smoothed_state_covs = self.emed_kf.smooth(self.obs)

    def forecast(self, n_interval, ci, current_state, current_cov):
        df_res = pd.DataFrame()

        n_test = n_interval * self.n_dim_series
        pred_y = np.empty(n_test)
        pred_lower = np.empty(n_test)
        pred_upper = np.empty(n_test)

        for i in range(n_test):
            current_state, current_cov = self.kf.filter_update(current_state, current_cov, observation=None)

            pred_cov = self.kf.observation_matrices.dot(np.abs(current_cov)).dot(self.kf.observation_matrices.T)
            pred_mean = current_state.dot(self.kf.observation_matrices.T)

            pred_y[i] = pred_mean
            pred_lower[i], pred_upper[i] = norm.interval(ci, pred_mean, scale=np.sqrt(pred_cov))

            new_df_res_row_index = self.df.index[-1] if i == 0 else np.datetime64(df_res.index[-1] + self.data_interval)
            new_df_res_row = pd.DataFrame([[pred_y[i], pred_upper[i], pred_lower[i]]],
                                          columns=['y_pred', 'y_pred_upper', 'y_pred_lower'],
                                          index=[new_df_res_row_index])
            new_df_res_row.index.name = self.df.index.name
            df_res = df_res.append(new_df_res_row)

        self.df_result = df_res

    def get_result(self):
        return self.df_result

    def get_combined_result(self):
        return pd.concat([self.df, self.df_result])

    def get_combined_result_as_str(self):
        return self.get_combined_result().to_csv()

    def run(self, n_interval, ci=0.95):
        self.smooth()
        current_state = self.smoothed_state_means[-1]
        current_cov = self.smoothed_state_covs[-1]
        self.forecast(n_interval, ci, current_state, current_cov)
