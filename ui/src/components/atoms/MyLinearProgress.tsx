import React from 'react';
import LinearProgress from '@material/react-linear-progress';

import '@material/react-linear-progress/dist/linear-progress.min.css';

type Props = {
    dataTestId?: string
}

export const MyLinearProgress = (props: Props) => {
    return (
        <div
            data-testid={props.dataTestId}
            className={'my-linear-progress'}
        >
            <LinearProgress
                indeterminate={true}
            />
        </div>
    )
}