import { DefaultTemplate } from './components/templates/DefaultTemplate';
import { useCallback, useState } from 'react';
import { AddDialogState, DefaultAddDialogState } from './components/organisms/AddDialog';

function App() {
    const [addDialogState, setAddDialogState] = useState<AddDialogState>(DefaultAddDialogState)
    const [isOpenAddDialog, setIsOpenAddDialog] = useState(false);

    const onClickFab = useCallback(()=>{
        setIsOpenAddDialog(true)
    },[]);
    const onClickAddDialogCloseButton = useCallback(()=>{
        setIsOpenAddDialog(false)
    },[]);

    return (
        <div className="app">
            <DefaultTemplate
                className={'template'}
                title={'Time Series Forecaster'}
                onClickFab={onClickFab}
                addDialogState={addDialogState}
                setAddDialogState={setAddDialogState}
                isOpenAddDialog={isOpenAddDialog}
                onClickAddDialogCloseButton={onClickAddDialogCloseButton}
            />
        </div>
    )
}

export default App
