import React, { Dispatch, SetStateAction } from 'react';
import '@material/react-text-field/dist/text-field.min.css';
import './MyTextField.scss';
import TextField, {HelperText, Input} from '@material/react-text-field';

type Props = {
    value: string,
    onChange: Dispatch<SetStateAction<any>>,
    label: string,
    helperText: string,
    isValid: boolean,
}

export const MyTextField = (props: Props) => {
    return (
        <div className={'my-text-field'}>
            <TextField
                label={props.label}
                helperText={<HelperText>{props.helperText}</HelperText>}
            >
                <Input
                    value={props.value}
                    onChange={props.onChange}
                    isValid={props.isValid}
                />
            </TextField>
        </div>
    );
}

MyTextField.defaultProps = {
    value: 0,
    onChange: ()=>{},
    label: '',
    helperText: '',
    isValid: true,
}