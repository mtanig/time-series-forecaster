import React  from 'react';
import './AddData.scss'

import { MyFab } from '../atoms/MyFab';
import { MyButton } from '../atoms/MyButton';
import { WindowHelper } from '../../libs/WindowHelper';

type Props = {
    selectedFile: string,
    onClick: (e: any)=>void,
}

export const AddData = (props: Props) => {
    return (
        <div
            className={'add-data'}
        >
            <div className={'selected-file'}>
                {props.selectedFile}
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
    selectedFile: 'Not Selected',
    onClick: ()=>{},
}
