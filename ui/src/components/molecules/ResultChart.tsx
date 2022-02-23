import React  from 'react';
import { C3Chart, ChartProps } from '../atoms/C3Chart';
import { DataUrl } from '../../libs/DataUrl';
import { Csv } from '../../libs/Csv';

type Props = {
    className?: string,
    dataUrl: string,
}

export const ResultChart = (props: Props) => {
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
            // https://github.com/d3/d3-time-format/blob/main/README.md
            xFormat: '%Y-%m-%d %H:%M:%S',
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
        <div className={props.className}>
            <C3Chart
                props={chartProps}
            />
        </div>
    )
}

ResultChart.defaultProps = {
    className: 'result-chart',
}
