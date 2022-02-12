import React from 'react';
import { Button } from '@material/react-button';
import '@material/react-button/dist/button.min.css';

type Props = {
    text: string,
    onClick: (e:any)=>void,
}

export const MyButton = (props: Props) => {
    return (
        <div className={'my-button'}>
            <Button
                onClick={props.onClick}
            >
                {props.text}
            </Button>
        </div>
    );
}

MyButton.defaultProps = {
    text: '',
    onClick: ()=>{},
}