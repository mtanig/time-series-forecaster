import React  from 'react';

import '@material/react-card/dist/card.css';
import './MyCard.scss';
import Card, {
    CardActionButtons,
    CardActionIcons,
    CardActions,
    CardPrimaryContent
} from '@material/react-card';

type Props = {
    title: string,
    outlined: boolean,
    primaryContent: JSX.Element,
    content: JSX.Element,
    actionButtons: JSX.Element,
    actionIcons: JSX.Element,
    onClick: (e: any)=>void,
}

export const MyCard = (props: Props) => {
    return (
        <div
            className={'my-card'}
        >
            <Card
                outlined={props.outlined}
            >
                <h1>{props.title}</h1>
                {props.primaryContent}
                {props.content}
                <CardActions>
                    <CardActionButtons>
                        {props.actionButtons}
                    </CardActionButtons>

                    <CardActionIcons>
                        {props.actionIcons}
                    </CardActionIcons>
                </CardActions>
            </Card>
        </div>
    );
}

MyCard.defaultProps = {
    title: 'card-title',
    outlined: false,
    primaryContent: undefined,
    content: undefined,
    actionButtons: undefined,
    actionIcons: undefined,
    onClick: ()=>{},
}