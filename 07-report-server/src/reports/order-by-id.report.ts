import {Content, StyleDictionary, TDocumentDefinitions } from "pdfmake/interfaces"
import { DateFormatter } from "src/helpers"


const logo: Content = {
    image: 'src/assets/tucan-banner.png',
    width:100,
    height:30,
    margin:[10,30],
}

const styles: StyleDictionary = {
    header: {
        fontSize: 20,
        bold: true,
        margin:[0,30,0,0]
    }
}


export const orderByIdReport = (): TDocumentDefinitions  => {


    return {
        styles: styles,
        header: logo,
        pageMargins:[40,60,40,60],
        content: [
            {
                text: 'Tucan Code',
                style: 'header',
            },
            {
                columns: [
                    {
                        text: '15 Montgomery Str, Suite 100, \nOttawa ON K2Y 9X1, CANADA\nBN: 12783671823\nhttps://devtalles.com',
                    },
                    {
                        text: `Recibo No. $12333\nFecha del recibo ${DateFormatter.getDDMMMMYYYY(new Date())}\nPagar antes de: ${DateFormatter.getDDMMMMYYYY(new Date)}\n`,
                        alignment: 'right'
                    }
                ]
            }
        ]
    }

}
