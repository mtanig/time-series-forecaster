import React from 'react';
import { ResultChart } from '../molecules/ResultChart';
import { MyCard } from '../atoms/MyCard';
import { MyButton } from '../atoms/MyButton';
import { WindowHelper } from '../../libs/WindowHelper';
import { MyMaterialIcon } from '../atoms/MyMaterialIcon';
import { SampleChart } from '../molecules/SampleChart';
import { MyLinearProgress } from '../atoms/MyLinearProgress';
import { ErrorMessage } from '../atoms/ErrorMessage';

type Props = {
    className: string,
    dataUrl: string | null,
    isLoading: boolean,
    errorMessage: string | null,
}

export const Content = (props: Props) => {
    return (
        <div
            className={props.className}
            data-testid={Content.defaultProps.dataTestId}
        >
            <MyCard
                title={'Result'}
                outlined={true}
                primaryContent={
                    <div>
                        {props.errorMessage && (<ErrorMessage message={props.errorMessage}/>)}
                        {props.isLoading && (<MyLinearProgress/>)}
                        {props.dataUrl ? (<ResultChart dataUrl={props.dataUrl}/>) : (<SampleChart/>)}
                    </div>
                }
                content={
                    <div>
                        <p>HOW TO USE</p>
                        <ol>
                            <li>Add csv in a format like samples below.</li>
                            <li>Choose settings for forecasting.</li>
                            <li>Check the result.</li>
                        </ol>
                    </div>
                }
                actionButtons={
                    <div>
                        <MyButton
                            text={'daily.csv'}
                            onClick={() => {
                                WindowHelper.setLocationHref("/sample-daily.csv");
                            }}
                            dense={true}
                        />
                        <MyButton
                            text={'weekly.csv'}
                            onClick={() => {
                                WindowHelper.setLocationHref("/sample-weekly.csv");
                            }}
                            dense={true}
                        />
                        <MyButton
                            text={'yearly.csv'}
                            onClick={() => {
                                WindowHelper.setLocationHref("/sample-yearly.csv");
                            }}
                            dense={true}
                        />
                    </div>
                }
                actionIcons={
                    <div>
                        <i onClick={()=>{
                            if (props.dataUrl){
                                WindowHelper.setLocationHref(props.dataUrl)}
                            }
                        }>
                            <MyMaterialIcon
                                icon={'download'}
                            />
                        </i>
                    </div>
                }
            />
        </div>
    );
};

Content.defaultProps = {
    dataTestId: 'content',
    className: 'content',
    dataUrl: null,
    isLoading: false,
    errorMessage: null,
}