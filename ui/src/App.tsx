import React, { useCallback, useState } from 'react';
import { AddDialog, AddDialogState, DefaultAddDialogState } from './components/organisms/AddDialog';
import { Header } from './components/organisms/Header';
import { forecastApiAdapter } from './adapters/ForecastApiAdapter';
import { Content } from './components/organisms/Content';

function App() {
    const [addDialogState, setAddDialogState] = useState<AddDialogState>(DefaultAddDialogState)
    const [isOpenAddDialog, setIsOpenAddDialog] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [resultDataUrl, setResultDataUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onClickFab = useCallback(()=>{
        setIsOpenAddDialog(true)
    },[]);
    const onClickAddDialogFinishButton = useCallback(async (addDialogState: AddDialogState)=>{
        try {
            setIsLoading(true);
            const res = await forecastApiAdapter.post(addDialogState);
            setResultDataUrl(res.data ? res.data.dataUrl : null);
            setIsLoading(false);
            setErrorMessage(null);
        } catch (e: any) {
            setIsLoading(false);
            setErrorMessage(e.message);
        }

        setAddDialogState(addDialogState);
    }, [addDialogState]);

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
                onClickFinishButton={onClickAddDialogFinishButton}
            />
            <Content
                dataUrl={resultDataUrl}
                isLoading={isLoading}
                errorMessage={errorMessage}
            />
        </div>
    )
}

export default App
