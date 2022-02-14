import React, { useCallback, useState } from 'react';
import { AddDialog, AddDialogState, DefaultAddDialogState } from './components/organisms/AddDialog';
import { Header } from './components/organisms/Header';

function App() {
    const [addDialogState, setAddDialogState] = useState<AddDialogState>(DefaultAddDialogState)
    const [isOpenAddDialog, setIsOpenAddDialog] = useState<boolean>(false);

    const onClickFab = useCallback(()=>{
        setIsOpenAddDialog(true)
    },[]);

    return (
        <div className="app">
            <Header
                title={'Time Series Forecaster'}
                onClickFab={onClickFab}
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
