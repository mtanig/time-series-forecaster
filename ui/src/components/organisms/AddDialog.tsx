import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

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
import { Cycle, CycleTabs, CycleType } from '../molecules/CycleTabs';
import { AddData } from '../molecules/AddData';
import { MyTextField } from '../atoms/MyTextField';

export type AddDialogState = {
    dataUrl: string | null,
    selectedFile: string,
    cycleValue: CycleType,
    periodValue: string,
    ciValue: string,
}

export const DefaultAddDialogState: AddDialogState = {
    dataUrl: null,
    selectedFile: AddData.defaultProps.selectedFile,
    cycleValue: Cycle.DAILY,
    periodValue: '5',
    ciValue: '99',
}

export type SetAddDialogState = Dispatch<SetStateAction<AddDialogState>>;

type AddDialogProps = {
    state: AddDialogState,
    setState: SetAddDialogState,
    isOpen: boolean,
    setIsOpenAddDialog: Dispatch<SetStateAction<boolean>>,
    onClickFinishButton: Function,
}


// TODO: fix error when building
export const AddDialog = (props: AddDialogProps) => {
    const [addDialogState, setAddDialogState] = useState(props.state);
    const inputFile = useRef(null);

    useEffect(()=>{
        setAddDialogState(props.state);
    }, [props.isOpen])

    const onClose = ()=>{
        props.setIsOpenAddDialog(false);
    };
    const onClickAddDataFab = ()=>{
        if (!inputFile.current) {
            return;
        }
        // @ts-ignore
        inputFile.current.click();
    }
    const onChangeInputFile = ()=>{
        // @ts-ignore
        if (inputFile.current && inputFile.current.files) {
            // @ts-ignore
            const file = inputFile.current.files.item(0);
            if (!file) {
                return;
            }
            const fr = new FileReader();
            fr.onload = (e)=>{
                const dataUrl = fr.result;
                setAddDialogState({
                    ...addDialogState,
                    dataUrl: dataUrl && dataUrl.toString(),
                    selectedFile: file.name
                })
            }
            fr.readAsDataURL(file)
        }
    }

    return (
        <div
            className={'add-dialog'}
            data-testid={AddDialog.defaultProps.dataTestId}
        >
            <Dialog
                onClose={onClose}
                open={props.isOpen}
                role={'dialog'}
            >
                <DialogTitle>Forecast Setting</DialogTitle>
                <DialogContent>
                    <input type='file' accept='text/csv' ref={inputFile} style={{display: 'none'}} onChange={onChangeInputFile} />
                    <FormRow
                        titleText={'Data'}
                        element={
                            <AddData
                                onClick={onClickAddDataFab}
                                selectedFile={addDialogState.selectedFile}
                            />
                        }
                    />
                    <Divider/>
                    <FormRow
                        titleText={'Cycle'}
                        element={
                            <CycleTabs
                                value={addDialogState.cycleValue}
                                onFocus={(value: CycleType)=>{
                                    setAddDialogState({...addDialogState, cycleValue: value})
                                }}
                            />
                        }
                    />
                    <Divider/>
                    <FormRow
                        titleText={'Period'}
                        element={
                            <MyTextField
                                label={'Input number of cycle'}
                                value={addDialogState.periodValue}
                                type={'number'}
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
                                type={'number'}
                                onChange={(e)=>{
                                    setAddDialogState({...addDialogState, ciValue: e.target.value})
                                }}
                            />
                        }
                    />
                </DialogContent>
                <DialogFooter>
                    <DialogButton
                        className={'dialog-cancel-button'}
                        action='dismiss'
                    >
                        CANCEL
                    </DialogButton>
                    <DialogButton
                        className={'dialog-finish-button'}
                        action='confirm'
                        onClick={()=>{props.onClickFinishButton(addDialogState)}}
                    >
                        FINISH
                    </DialogButton>
                </DialogFooter>
            </Dialog>
        </div>
    );
}

AddDialog.defaultProps = {
    dataTestId: 'add-dialog',
    state: DefaultAddDialogState,
    setState: () => {},
    isOpen: false,
    setIsOpenAddDialog: () => {},
    onClickFinishButton: () => {},
}