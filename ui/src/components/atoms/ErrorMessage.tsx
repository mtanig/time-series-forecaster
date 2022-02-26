import './ErrorMessage.scss';

type Props = {
    title: string,
    message: string,
}

export const ErrorMessage = (props: Props) =>{
    return (
        <div
            className={'error-message'}
        >
            <div className={'title'}>
                {props.title}
            </div>
            <div className={'message'}>
                {props.message}
            </div>
        </div>
    )
}

ErrorMessage.defaultProps = {
    title: 'Error',
    message: 'error message',
}