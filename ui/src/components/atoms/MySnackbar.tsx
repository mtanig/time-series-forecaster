import React from 'react';

import { Snackbar } from '@material/react-snackbar';
import '@material/react-snackbar/dist/snackbar.min.css';

type Props = {
    message: string,
    actionText: string,
    timeoutMs: number,
}

export const MySnackbar = (props: Props) => {
    return (
        <div className={'my-snackbar'}>
            <Snackbar
                message={props.message}
                actionText={props.actionText}
                timeoutMs={props.timeoutMs}
            />
        </div>
    );
}

MySnackbar.defaultProps = {
    message: 'message',
    actionText: 'dismiss',
    timeoutMs: 10 * 1000,
}