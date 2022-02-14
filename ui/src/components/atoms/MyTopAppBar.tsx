import TopAppBar, {
    TopAppBarFixedAdjust,
    TopAppBarRow,
    TopAppBarSection,
    TopAppBarTitle
} from '@material/react-top-app-bar';
import '@material/react-top-app-bar/dist/top-app-bar.min.css';

import React from 'react';


type Props = {
    className: string,
    title: string,
    toolbarInner?: React.ReactNode,
}

export const MyTopAppBar = (props: Props) => {
    return (
        <div
            className={props.className}
        >
            <TopAppBar>
                <TopAppBarRow>
                    <TopAppBarSection align='start'>
                        <TopAppBarTitle>
                            {props.title}
                        </TopAppBarTitle>
                    </TopAppBarSection>
                    <TopAppBarSection align='end' role='toolbar'>
                        {props.toolbarInner}
                    </TopAppBarSection>
                </TopAppBarRow>
            </TopAppBar>
            <TopAppBarFixedAdjust>
            </TopAppBarFixedAdjust>
        </div>
    );
}

MyTopAppBar.defaultProps = {
    className: MyTopAppBar.name.toLowerCase(),
    title: MyTopAppBar.name.toLowerCase(),
}