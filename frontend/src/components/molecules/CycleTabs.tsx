import React from 'react';

import './CycleTabs.scss';

import { MyTab } from '../atoms/MyTab';

export const Cycle = {
    HOURLY: 'Hourly',
    WEEKLY: 'Weekly',
    DAILY: 'Daily',
    MONTHLY: 'Monthly',
    YEARLY: 'Yearly',
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
                text={Cycle.HOURLY}
                active={props.value === Cycle.HOURLY}
                onFocus={()=>{props.onFocus(Cycle.HOURLY)}}
            />
            <MyTab
                text={Cycle.DAILY}
                active={props.value === Cycle.DAILY}
                onFocus={()=>{props.onFocus(Cycle.DAILY)}}
            />
            <MyTab
                text={Cycle.WEEKLY}
                active={props.value === Cycle.WEEKLY}
                onFocus={()=>{props.onFocus(Cycle.WEEKLY)}}
            />
            <MyTab
                text={Cycle.MONTHLY}
                active={props.value === Cycle.MONTHLY}
                onFocus={()=>{props.onFocus(Cycle.MONTHLY)}}
            />
            <MyTab
                text={Cycle.YEARLY}
                active={props.value === Cycle.YEARLY}
                onFocus={()=>{props.onFocus(Cycle.YEARLY)}}
            />
        </div>
    );
}

CycleTabs.defaultProps = {
    value: Cycle.DAILY,
}