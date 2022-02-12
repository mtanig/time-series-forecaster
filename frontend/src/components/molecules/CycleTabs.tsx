import React from 'react';

import './CycleTabs.scss';

import { MyTab } from '../atoms/MyTab';

type Props = {
    active: boolean,
    text: string,
}

export const CycleTabs = (props: Props) => {
    return (
        <div className={'cycle-tabs'}>
            <MyTab
                text={'Hourly'}
            />
            <MyTab
                text={'Daily'}
            />
            <MyTab
                text={'Weekly'}
            />
            <MyTab
                text={'Monthly'}
            />
            <MyTab
                text={'Yearly'}
            />
        </div>
    );
}

CycleTabs.defaultProps = {
    active: false,
    text: '',
}