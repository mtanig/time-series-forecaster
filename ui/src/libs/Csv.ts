export class Csv {
    static toObjectByHeader(csv: string) {
        const csvRows = csv.split('\n');

        let dividedRows = [];
        for(let i = 0; i < csvRows.length; i++){
            if(csvRows[i] == '') break;

            dividedRows[i] = csvRows[i].split(',');
        }

        const obj = {};
        const headers = dividedRows[0];
        for (let i = 0; i < dividedRows.length; i++) {
            for (let j = 0; j < dividedRows[i].length; j++) {
                if (i == 0) {
                    // @ts-ignore
                    obj[headers[j]] = [];
                    continue;
                }
                // @ts-ignore
                obj[headers[j]].push(dividedRows[i][j] !== '' ? dividedRows[i][j] : null);
            }
        }

        return obj;
    }
}