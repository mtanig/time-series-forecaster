import React, { useCallback, useState } from 'react';
import { AddDialog, AddDialogState, DefaultAddDialogState } from './components/organisms/AddDialog';
import { Header } from './components/organisms/Header';
import { forecastApiAdapter } from './adapters/ForecastApiAdapter';
import { ResultChart } from './components/organisms/ResultChart';

function App() {
    const [addDialogState, setAddDialogState] = useState<AddDialogState>(DefaultAddDialogState)
    const [isOpenAddDialog, setIsOpenAddDialog] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [resultDataUrl, setResultDataUrl] = useState<string | null>(null);

    const onClickFab = useCallback(()=>{
        setIsOpenAddDialog(true)
    },[]);
    const onClickAddDialogFinishButton = useCallback(async (addDialogState: AddDialogState)=>{
        try {
            const res = await forecastApiAdapter.post(addDialogState);
            setResultDataUrl(res.data.dataUrl);
        } catch (e: any) {
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
            <ResultChart
                dataUrl={resultDataUrl}
            />
        </div>
    )
}

export default App