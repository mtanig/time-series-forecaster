import c3 from 'c3';
import './c3.css'

import { useEffect } from 'react';

export interface ChartProps {
    data: object,
    axis?: object
}

export const DefaultChartProps = {
    data: {},
    axis: {},
}

type Props = {
    props: ChartProps
}

export const C3Chart = (props: Props) =>{
    const id = 'c3-chart';

    useEffect(()=> {
        c3.generate({
            bindto: `#${id}`,
            data: props.props.data,
            axis: props.props.axis,
        });
    }, [props.props]);

    return (
        <div id={id}>
        </div>
    );
}

C3Chart.defaultProps = {
    props: DefaultChartProps,
}