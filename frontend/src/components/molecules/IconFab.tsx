import { Fab } from '@material/react-fab';
import '@material/react-fab/dist/fab.min.css';
import './IconFab.scss'
import React from 'react';
import { Icon } from '../atoms/Icon';

type Props = {
    className: string,
    icon: string,
    textLabel: string,
}

export const IconFab = (props: Props) => {
    return (
        <div
            className={props.className}
        >
            <Fab
                icon={<Icon icon={props.icon}/>}
                textLabel={props.textLabel}
            />
        </div>
    );
}

IconFab.defaultProps = {
    className: IconFab.name.toLowerCase(),
    icon: 'add',
    textLabel: '',
}