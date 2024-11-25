import {TDocumentDefinitions} from "pdfmake/interfaces";
import fs from 'fs';

const svgContent = fs.readFileSync('src/assets/ford.svg', 'utf8');

export const getBasicChartSvgReport = async (): Promise<TDocumentDefinitions> => {

    return {
        content: [
            {
                svg: svgContent,
                width:100,
                fit:[100,100]
            }
        ]
    }


}
