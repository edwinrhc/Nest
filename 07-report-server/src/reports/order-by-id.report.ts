import {Content, StyleDictionary, TDocumentDefinitions} from "pdfmake/interfaces"
import {CurrencyFormatter, DateFormatter} from "src/helpers"
import {footerSection} from "./sections/footer.section"


const logo: Content = {
    image: 'src/assets/tucan-banner.png',
    width: 100,
    height: 30,
    margin: [10, 30],
}

const styles: StyleDictionary = {
    header: {
        fontSize: 18,
        bold: true,
        margin: [0, 30, 0, 0]
    },
    subHeader: {
        fontSize: 18,
        bold: true,
        margin: [0, 20, 0, 0]
    }
}


export const orderByIdReport = (): TDocumentDefinitions => {


    return {
        styles: styles,
        header: logo,
        pageMargins: [40, 60, 40, 60],
        footer: footerSection,
        content: [
            {
                text: 'Tucan Code',
                style: 'header',
            },
            {
                // Addrees y número recibo
                columns: [
                    {
                        text: '15 Montgomery Str, Suite 100, \nOttawa ON K2Y 9X1, CANADA\nBN: 12783671823\nhttps://devtalles.com',
                    },
                    {
                        text: [
                            {text: `Recibo No. 123123\n`, bold: true},
                            `nFecha del recibo ${DateFormatter.getDDMMMMYYYY(new Date())}\nPagar antes de: ${DateFormatter.getDDMMMMYYYY(new Date)}\n`
                        ],
                        alignment: 'right'
                    }
                ]
            },

            // Código QR
            {qr: 'https://devtalles.com', fit: 65, alignment: 'right'},

            // Direccion del cliente
            {
                text: [
                    {text: `Cobrar a: \n`, bold: true, style: 'subHeader'},
                    `Razón Social: Richter Supermark Michael Holz 
                    Grenzacherwer 237 `
                ]
            },
            // Tabla de detalle de la orden
            {
                layout: 'headerLineOnly',
                margin: [0, 20],
                table: {
                    headerRows: 1,
                    widths: [50, '*', 'auto', 'auto', 'auto'],
                    body: [
                        ['ID', 'Descripcion', 'Cantidad', 'Precio', 'Total'],
                        ['1', 'Producto 1', '1', '100', {
                            text: CurrencyFormatter.formatCurrency(100),
                            alignment: 'right'
                        }],
                        ['2', 'Producto 2', '2', '200', {
                            text: CurrencyFormatter.formatCurrency(4500),
                            alignment: 'right'
                        }],
                        ['3', 'Producto 3', '3', '300', {
                            text: CurrencyFormatter.formatCurrency(5500),
                            alignment: 'right'
                        }],
                        ['4', 'Producto 4', '4', '400', {
                            text: CurrencyFormatter.formatCurrency(1500),
                            alignment: 'right'
                        }],
                    ]
                }
            },
            // Salto de línea
            '\n',
            // Totales
            {
                columns: [
                    {width: '*', text: ''},
                    {
                    width: 'auto',
                    layout: 'noBorders',
                    table: {
                        body:
                        [
                        ['Subtotal',{
                            text: CurrencyFormatter.formatCurrency(5000),
                            alignment: 'right'
                        }],
                        [   {
                                text: 'Total',bold:true
                            },
                            {
                                text: CurrencyFormatter.formatCurrency(150000),
                                alignment: 'right',
                                bold:true
                        }]

                        ]}
                    }
                ]
            }

        ]
    }

}
