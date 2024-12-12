import {TDocumentDefinitions} from "pdfmake/interfaces";
import fs from 'fs';
import * as Utils from '../helpers/index'

const svgContent = fs.readFileSync('src/assets/ford.svg', 'utf8');

const generateChartImage = async () => {
    const chartConfig =  {
        type:'bar',
        data: {
           labels: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio'],
            datasets: [
                {
               label: 'Mi primer gráfico',
                data: [65,59,80,81,56,55,10],
                backgroundColor:'rgba(93,75,192,0.2)',
                borderColor:'rgba(81,75,192)',
                borderWidth:1,
            }
            ]
        }
    }
    return Utils.chartJSToImage(chartConfig);
};

export const getBasicChartSvgReport = async (): Promise<TDocumentDefinitions> => {

    const chart = await generateChartImage();

    return {
        content: [
            {
                svg: svgContent,
                width:100,
                fit:[100,100]
            },
            {
                image: chart,
                width: 500
            }
        ]
    }


}
