import { MyTopAppBar } from '../atoms/MyTopAppBar';
import { MyFab } from '../atoms/MyFab';
import React  from 'react';
import { AddDialog, AddDialogState, SetAddDialogState } from '../organisms/AddDialog';

type Props = {
    className: string,
    title: string,
    onClickFab: (e: any)=>void,
    addDialogState: AddDialogState,
    setAddDialogState: SetAddDialogState,
    isOpenAddDialog: boolean,
    onClickAddDialogCloseButton: (e:any)=>void,
}

export const DefaultTemplate = (props: Props) => {
    return (
        <div
            className={props.className}
        >
            <MyTopAppBar
                title={props.title}
                toolbarInner={
                    <MyFab
                        textLabel={'ADD'}
                        onClick={props.onClickFab}
                    />
                }
            />
            <AddDialog
                state={props.addDialogState}
                setState={props.setAddDialogState}
                isOpen={props.isOpenAddDialog}
                onClickCloseButton={props.onClickAddDialogCloseButton}
            />
        </div>
    );
}

DefaultTemplate.defaultProps = {
    className: DefaultTemplate.name.toLowerCase(),
    title: DefaultTemplate.name.toLowerCase(),
    onClickFab: ()=>{},
}