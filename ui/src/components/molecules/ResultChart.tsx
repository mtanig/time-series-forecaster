import React  from 'react';
import './ResultChart.scss';
import { C3Chart, ChartProps } from '../atoms/C3Chart';
import { DataUrl } from '../../libs/DataUrl';
import { Csv } from '../../libs/Csv';

type Props = {
    dataUrl: string | null,
}

export const ResultChart = (props: Props) => {
    if (!props.dataUrl) {
        const sampleChartProps: ChartProps = {
            data: {
                x: 'date',
                columns: [
                    ['date', '2021-04-05', '2021-04-06', '2021-04-07', '2021-04-08', '2021-04-09', '2021-04-10', '2021-04-11', '2021-04-12', '2021-04-13', '2021-04-14'],
                    ['values', '10.0', '11.0', '12.0', '13.0', '14.0', '15.0', '16.0', null, null, null],
                    ['y_prediction',  null, null, null, null, null, null, null, '17.0', '18.0','19.0'],
                    ['y_prediction_upper', null, null, null, null, null, null, null, '18.0', '20.0','22.5'],
                    ['y_prediction_lower', null, null, null, null, null, null, null, '16.0', '16.0','15.5'],
                ]
            },
            axis: {
                x: {
                    type: 'timeseries',
                }
            }
        }

        return (
            <div className={'result-chart sample'}>
                <C3Chart
                    props={sampleChartProps}
                />
            </div>
        )
    }

    const csv = DataUrl.decode(props.dataUrl);
    const csvObj = Csv.toObjectByHeader(csv);
    const headers = Object.keys(csvObj);
    const axisLabel = headers[0];
    let columns = [];
    for (const header of headers) {
        // @ts-ignore
        columns.push([header, ...csvObj[header]])
    }
    const chartProps: ChartProps = {
        data: {
            x: axisLabel,
            columns: columns,
        },
        axis: {
            x: {
                type: 'timeseries',
            }
        }
    }

    return (
        <div className={'result-chart'}>
            <C3Chart
                props={chartProps}
            />
        </div>
    )
}