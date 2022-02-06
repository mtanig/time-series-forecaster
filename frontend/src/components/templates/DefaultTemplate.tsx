import { TopBar } from '../atoms/TopBar';
import { IconFab } from '../molecules/IconFab';
import React from 'react';

type Props = {
    className: string,
    title: string,
}

export const DefaultTemplate = (props: Props) => {
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

DefaultTemplate.defaultProps = {
    className: DefaultTemplate.name.toLowerCase(),
    title: DefaultTemplate.name.toLowerCase(),
}