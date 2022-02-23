import { Fab } from '@material/react-fab';
import '@material/react-fab/dist/fab.min.css';
import './MyFab.scss'
import React from 'react';
import { MyMaterialIcon } from './MyMaterialIcon';

type Props = {
    dataTestId?: string
    icon: string,
    textLabel: string,
    onClick: (e: any)=>void,
}

export const MyFab = (props: Props) => {
    return (
        <div
            className={'my-fab'}
        >
            <Fab
                data-testid={props.dataTestId}
                icon={
                    <MyMaterialIcon icon={props.icon}/>
                }
                textLabel={props.textLabel}
                onClick={props.onClick}
            />
        </div>
    );
}

MyFab.defaultProps = {
    icon: 'add',
    textLabel: '',
    onClick: ()=>{},
}