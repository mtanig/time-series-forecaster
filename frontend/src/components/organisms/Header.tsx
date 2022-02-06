import { TopBar } from '../atoms/TopBar';
import { IconFab } from '../molecules/IconFab';
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
            <TopBar
                title={props.title}
                toolbarInner={<IconFab textLabel={'ADD'}/>}
            />
        </div>
    );
}

Header.defaultProps = {
    className: Header.name.toLowerCase(),
    title: Header.name.toLowerCase(),
}