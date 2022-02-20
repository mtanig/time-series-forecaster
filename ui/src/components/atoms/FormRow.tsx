import React  from 'react';
import './FormRow.scss';

type Props = {
    titleText: string,
    element: JSX.Element,
}

export const FormRow = (props: Props) => {
    return (
        <div className={'form-row'}>
            <div className={'title'}>
                {props.titleText}
            </div>
            <div className={'body'}>
                {props.element}
            </div>
        </div>
    );
}

FormRow.defaultProps = {
    titleText: '',
    element: <span></span>,
}