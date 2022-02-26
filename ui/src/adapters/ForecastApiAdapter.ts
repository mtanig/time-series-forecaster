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
    message?: string,
    data?: {
        dataUrl: string,
    },
    status: string,
}

export class ForecastApiAdapter {
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

            const res = await window.fetch(path, {
                method: 'POST',
                body: JSON.stringify(body),
            });
            const data: forecastApiResponse = await res.json();
            if (!res.ok) {
                throw new Error(`status: ${res.status}, statusText: ${res.statusText}, message: ${data.message}`);
            }

            return data;
        } catch (e: any) {
            throw e;
        }
    }
}

export const forecastApiAdapter = new ForecastApiAdapter();