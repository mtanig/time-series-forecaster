import React  from 'react';
import { C3Chart, ChartProps } from '../atoms/C3Chart';
import { DataUrl } from '../../libs/DataUrl';
import { Csv } from '../../libs/Csv';

type Props = {
    dataUrl: string | null,
}

export const ResultChart = (props: Props) => {
    if (!props.dataUrl) {
        return (
            <div className={'result-chart empty'}>
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