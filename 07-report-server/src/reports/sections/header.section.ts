import {Content} from "pdfmake/interfaces";
import {DateFormatter} from "src/helpers";


const logo: Content = {
    image: 'src/assets/tucan-code-logo.png',
    width: 100,
    height: 100,
    alignment: 'center',
    margin: [0, 0, 0, 20]
}

const currentDate: Content = {
    text: DateFormatter.getDDMMMMYYYY(new Date()),
    alignment: 'right',
    margin: [45, 30],
    width: 250
}


interface HeaderOptions {
    title?: string;
    subTitle?: string;
    showLogo?: boolean;
    showDate?: boolean;
}


export const headerSection = (option: HeaderOptions): Content => {

    const {title, subTitle, showLogo = true, showDate = true} = option;
    const headerLogo: Content = showLogo ? logo : null;
    const headerDate: Content = showDate ? currentDate : null;
    const headerSubTitle: Content = subTitle ?
        {
            text:subTitle,
            alignment: 'center',
            margin:[0,2,0,0],
            style:{
                fontSize: 16,
                bold:true
            }
        } : null;
    const headerTitle: Content = title ? {
        stack: [
            {
                text: title,
                alignment: 'center',
                margin: [0, 15, 0, 0],
                style: {
                    bold: true,
                    fontSize: 22
                }
            },
            headerSubTitle
        ]
    } : null;



    return {
        columns: [
            headerLogo,
            headerTitle,
            headerDate
        ]
    }

}
