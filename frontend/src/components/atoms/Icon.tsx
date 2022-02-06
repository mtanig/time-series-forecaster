import MaterialIcon from '@material/react-material-icon';
import '@material/react-material-icon/dist/material-icon.min.css';
import React from 'react';

type Props = {
    icon: string,
}

export const Icon = (props: Props) => {
    return (
        <MaterialIcon icon={props.icon}/>
    );
}

Icon.defaultProps = {
    icon: 'add'
}