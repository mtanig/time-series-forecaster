import { MyTopAppBar } from '../atoms/MyTopAppBar';
import { MyFab } from '../atoms/MyFab';
import React from 'react';

type Props = {
    className: string,
    title: string,
}

export const Header = (props: Props) => {
    return (
        <div
            className={props.className}
        >
            <MyTopAppBar
                title={props.title}
                toolbarInner={
                    <MyFab textLabel={'ADD'}/>
                }
            />
        </div>
    );
}

Header.defaultProps = {
    className: Header.name.toLowerCase(),
    title: Header.name.toLowerCase(),
}