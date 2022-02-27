import React from 'react';

import './CycleTabs.scss';

import { MyTab } from '../atoms/MyTab';

// https://pandas.pydata.org/pandas-docs/stable/user_guide/timeseries.html#dateoffset-objects
export const Cycle = {
    WEEKLY: '1W',
    DAILY: '1D',
    YEARLY: '1Y',
} as const;

export type CycleType = typeof Cycle[keyof typeof Cycle];

type Props = {
    value: CycleType,
    onFocus: Function,
}

export const CycleTabs = (props: Props) => {
    return (
        <div className={'cycle-tabs'}>
            <MyTab
                text={'Daily'}
                active={props.value === Cycle.DAILY}
                onFocus={()=>{props.onFocus(Cycle.DAILY)}}
            />
            <MyTab
                text={'Weekly'}
                active={props.value === Cycle.WEEKLY}
                onFocus={()=>{props.onFocus(Cycle.WEEKLY)}}
            />
            <MyTab
                text={'Yearly'}
                active={props.value === Cycle.YEARLY}
                onFocus={()=>{props.onFocus(Cycle.YEARLY)}}
            />
        </div>
    );
}

CycleTabs.defaultProps = {
    value: Cycle.DAILY,
}