import React from 'react';

import '@material/react-tab/dist/tab.min.css';
import Tab from '@material/react-tab';

type Props = {
    active: boolean,
    text: string,
}

export const MyTab = (props: Props) => {
    return (
        <Tab active={props.active}>
            <span className='mdc-tab__text-label'>
                {props.text}
            </span>
        </Tab>
    );
}

MyTab.defaultProps = {
    active: false,
    text: '',
}