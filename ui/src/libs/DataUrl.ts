import { WindowHelper } from './WindowHelper';

export class DataUrl {
    static encode(mimeType: string, data: string) {
        const dataBase64 = WindowHelper.btoa(data);

        return `data:${mimeType};base64,${dataBase64}`;
    }

    static decode(encodedData: string) {
        const fileData = encodedData.replace(/^data:\w+\/\w+;base64,/, '');
        const decodedString = WindowHelper.atob(fileData);

        return decodedString;
    }
}