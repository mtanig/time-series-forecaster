import React, { useCallback, useState } from 'react';
import { AddDialog, AddDialogState, DefaultAddDialogState } from './components/organisms/AddDialog';
import { MyTopAppBar } from './components/atoms/MyTopAppBar';
import { MyFab } from './components/atoms/MyFab';

function App() {
    const [addDialogState, setAddDialogState] = useState<AddDialogState>(DefaultAddDialogState)
    const [isOpenAddDialog, setIsOpenAddDialog] = useState<boolean>(false);

    const onClickFab = useCallback(()=>{
        setIsOpenAddDialog(true)
    },[]);

    return (
        <div className="app">
            <MyTopAppBar
                title={'Time Series Forecaster'}
                toolbarInner={
                    <MyFab
                        textLabel={'ADD'}
                        onClick={onClickFab}
                    />
                }
            />
            <AddDialog
                state={addDialogState}
                setState={setAddDialogState}
                isOpen={isOpenAddDialog}
                setIsOpenAddDialog={setIsOpenAddDialog}
            />
        </div>
    )
}

export default App
