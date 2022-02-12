import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';

import '@material/react-dialog/dist/dialog.min.css';
import '@material/react-button/dist/button.min.css';
import './AddDialog.scss';

import Dialog, {
    DialogTitle,
    DialogContent,
    DialogFooter,
    DialogButton,
} from '@material/react-dialog';
import { FormRow } from '../atoms/FormRow';
import { Divider } from '../atoms/Divider';
import { CycleTabs } from '../molecules/CycleTabs';
import { AddData } from '../molecules/AddData';
import { MyTextField } from '../atoms/MyTextField';

export type AddDialogState = {
    periodValue: string,
    ciValue: string,
}

export const DefaultAddDialogState: AddDialogState = {
    periodValue: '5',
    ciValue: '99',
}

export type SetAddDialogState = Dispatch<SetStateAction<AddDialogState>>;

type AddDialogProps = {
    state: AddDialogState,
    setState: SetAddDialogState,
    isOpen: boolean,
    setIsOpenAddDialog: Dispatch<SetStateAction<boolean>>,
}


// TODO: fix error when building
export const AddDialog = (props: AddDialogProps) => {
    const [addDialogState, setAddDialogState] = useState(props.state);

    useEffect(()=>{
        setAddDialogState(props.state);
    }, [props.isOpen])

    const onClose = () => {
        props.setIsOpenAddDialog(false);
    };
    const onClickFinishButton = ()=>{
        props.setState(addDialogState);
    }

    return (
        <div className={'add-dialog'}>
            <Dialog
                onClose={onClose}
                open={props.isOpen}
                role={'dialog'}
            >
                <DialogTitle>Forecast Setting</DialogTitle>
                <DialogContent>
                    <FormRow
                        titleText={'Data'}
                        element={
                            <AddData/>
                        }
                    />
                    <Divider/>
                    <FormRow
                        titleText={'Cycle'}
                        element={
                            <CycleTabs/>
                        }
                    />
                    <Divider/>
                    <FormRow
                        titleText={'Period'}
                        element={
                            <MyTextField
                                label={'Input number of cycle'}
                                value={addDialogState.periodValue}
                                onChange={(e)=>{
                                    setAddDialogState({...addDialogState, periodValue: e.target.value})
                                }}
                            />
                        }
                    />
                    <Divider/>
                    <FormRow
                        titleText={'Confidence interval'}
                        element={
                            <MyTextField
                                label={'Input % of CI'}
                                value={addDialogState.ciValue}
                                onChange={(e)=>{
                                    setAddDialogState({...addDialogState, ciValue: e.target.value})
                                }}
                            />
                        }
                    />
                </DialogContent>
                <DialogFooter>
                    <DialogButton
                        action='dismiss'
                    >
                        CANCEL
                    </DialogButton>
                    <DialogButton
                        action='confirm'
                        onClick={onClickFinishButton}
                    >
                        FINISH
                    </DialogButton>
                </DialogFooter>
            </Dialog>
        </div>
    );
}

AddDialog.defaultProps = {
    state: DefaultAddDialogState,
    setState: () => {},
    isOpen: false,
    setIsOpenAddDialog: () => {},
}