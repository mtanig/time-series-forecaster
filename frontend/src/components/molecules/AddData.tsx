import React from 'react';
import './AddData.scss'

import { MyFab } from '../atoms/MyFab';

type Props = {
    onClick: (e: any)=>void,
}

export const AddData = (props: Props) => {
    const selectedFile = 'Not Selected';
    return (
        <div
            className={'add-data'}
        >
            <div className={'selected-file'}>
                {selectedFile}
            </div>
            <div className={'icon'}>
                <MyFab
                    onClick={props.onClick}
                />
            </div>

        </div>
    );
}

AddData.defaultProps = {
    onClick: ()=>{},
}