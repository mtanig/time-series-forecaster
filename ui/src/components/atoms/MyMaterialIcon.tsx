import MaterialIcon from '@material/react-material-icon';
import '@material/react-material-icon/dist/material-icon.min.css';
import React from 'react';

type Props = {
    icon: string,
}

export const MyMaterialIcon = (props: Props) => {
    return (
        <MaterialIcon icon={props.icon}/>
    );
}

MyMaterialIcon.defaultProps = {
    icon: 'add'
}