import React from 'react';
import './AddData.scss'

import { MyFab } from '../atoms/MyFab';
import { MyButton } from '../atoms/MyButton';

type Props = {
    onClick: (e: any)=>void,
}

export const AddData = (props: Props) => {
    const selectedFile = 'Not Selected';
    return (
        <div
            className={'add-data'}
        >
            <MyButton
                text={'sample1'}
                onClick={()=>{
                    location.href = "assets/sample1.csv";
                }}
            />
            <MyButton
                text={'sample2'}
                onClick={()=>{
                    location.href = "assets/sample2.csv";
                }}
            />
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

function useHistory() {
    throw new Error('Function not implemented.');
}
