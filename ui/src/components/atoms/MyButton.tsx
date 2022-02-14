import React from 'react';
import { Button } from '@material/react-button';
import '@material/react-button/dist/button.min.css';

type Props = {
    text: string,
    dense: boolean,
    onClick: (e:any)=>void,
}

export const MyButton = (props: Props) => {
    return (
        <div className={'my-button'}>
            <Button
                onClick={props.onClick}
                dense ={props.dense}
            >
                {props.text}
            </Button>
        </div>
    );
}

MyButton.defaultProps = {
    text: '',
    dense: false,
    onClick: ()=>{},
}