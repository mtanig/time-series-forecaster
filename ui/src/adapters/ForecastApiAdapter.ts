import { AddDialogState } from '../components/organisms/AddDialog';

interface forecastApiRequest {
    data: {
        dataUrl: string,
        params: {
            ci: number,
            seasonalFreq: string,
            forecastInterval: number,
        }
    }
}
interface forecastApiResponse {
    data: {
        dataUrl: string,
    },
    status: string,
}

class ForecastApiAdapter {
    readonly URL = import.meta.env.VITE_FORECAST_API_URL;

    async post(addDialogState: AddDialogState): Promise<forecastApiResponse> {
        try {
            // TODO: check before adapters
            if (!addDialogState.dataUrl) {
                throw new Error('csv data is empty.');
            }
            const path = '/forecast';
            const body: forecastApiRequest = {
                data: {
                    dataUrl: addDialogState.dataUrl,
                    params: {
                        // TODO: use models
                        ci: parseFloat(addDialogState.ciValue) / 100,
                        seasonalFreq: addDialogState.cycleValue,
                        forecastInterval: parseInt(addDialogState.periodValue),
                    }
                }
            };

            const res = await window.fetch(this.URL + path, {
                method: 'POST',
                body: JSON.stringify(body),
            });
            if (!res.ok) {
                throw new Error(`status: ${res.status}, statusText: ${res.statusText}`);
            }

            const data: forecastApiResponse = await res.json();

            return data;
        } catch (e: any) {
            throw e;
        }
    }
}

export const forecastApiAdapter = new ForecastApiAdapter();