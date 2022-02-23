import { MyTopAppBar } from '../atoms/MyTopAppBar';
import { MyFab } from '../atoms/MyFab';
import React from 'react';

type Props = {
    className: string,
    title: string,
    onClickFab: (e:any)=>void,
}

export const Header = (props: Props) => {
    return (
        <div
            className={props.className}
            data-testid={Header.defaultProps.dataTestId}
        >
            <MyTopAppBar
                title={props.title}
                toolbarInner={
                    <MyFab
                        dataTestId={'fab-in-header'}
                        textLabel={'ADD'}
                        onClick={props.onClickFab}
                    />
                }
            />
        </div>
    );
}

Header.defaultProps = {
    dataTestId: 'header',
    className: 'header',
    title: 'header',
    onClickFab: ()=>{},
}