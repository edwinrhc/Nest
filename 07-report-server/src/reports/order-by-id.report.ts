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

export interface CompleteOrder {
    order_id:      number;
    customer_id:   number;
    order_date:    Date;
    customers:     Customers;
    order_details: OrderDetail[];
}

export interface Customers {
    customer_id:   number;
    customer_name: string;
    contact_name:  string;
    address:       string;
    city:          string;
    postal_code:   string;
    country:       string;
}

export interface OrderDetail {
    order_detail_id: number;
    order_id:        number;
    product_id:      number;
    quantity:        number;
    products:        Products;
}

export interface Products {
    product_id:   number;
    product_name: string;
    category_id:  number;
    unit:         string;
    price:        string;
}
interface ReportValues {
    title?: string;
    subTitle?: string;
    data:CompleteOrder;

}


export const orderByIdReport = (value: ReportValues): TDocumentDefinitions => {

    const { data} = value;

    const { customers, order_details} = data;

    const subTotal = order_details.reduce( (acc,detail) => acc + detail.quantity * +detail.products.price, 0);

    const total = subTotal * 1.15;

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
                            {text: `Recibo No. ${data.order_id}\n`, bold: true},
                            `\nFecha del recibo ${DateFormatter.getDDMMMMYYYY(data.order_date)}\nPagar antes de: ${DateFormatter.getDDMMMMYYYY(new Date)}\n`
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
                    `Razón Social: ${customers.customer_name}
                    Contacto: ${customers.contact_name} `
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

                        ...order_details.map((detail) =>[
                            detail.order_detail_id.toString(),
                            detail.products.product_name,
                            detail.quantity.toString(),
                            {
                                text: CurrencyFormatter.formatCurrency(+detail.products.price),
                                alignment: 'right'
                            },
                            {
                                text: CurrencyFormatter.formatCurrency(+detail.products.price * detail.quantity),
                                alignment: 'right'
                            }
                        ])

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
                            text: CurrencyFormatter.formatCurrency(subTotal),
                            alignment: 'right'
                        }],
                        [   {
                                text: 'Total',bold:true
                            },
                            {
                                text: CurrencyFormatter.formatCurrency(total),
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
