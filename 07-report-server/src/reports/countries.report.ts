import { TDocumentDefinitions } from "pdfmake/interfaces";
import { headerSection } from "./sections/header.section";
import { countries as Country} from "@prisma/client";
import { footerSection } from "./sections/footer.section";

interface ReportOptions {
    title?: string;
    subTitle?: string;
    countries: Country[];
}



export const getCountryReport = (options: ReportOptions):TDocumentDefinitions => {

    const {title,subTitle, countries}  = options;

    return {
        pageOrientation: 'landscape',
        header: headerSection({
            title: title ??'Countries Report',
            subTitle: subTitle ?? 'List of countries',

        }),
        footer: footerSection,
        pageMargins:[40,110,40,60],
        content:[
            {
                layout:'lightHorizontalLines',
                table:{
                    headerRows: 1,
                    widths:[50,50,50,'*','auto','*'],
                    body:[
                        ['ID','ISO2','ISO3','Name','Continent','Local Name'],
                        ...countries.map((country) => [
                            country.id.toString(),
                            country.iso2,
                            country.iso3,
                            {text: country.name,bold:true},
                            country.continent,
                            country.local_name
                        ])
                        // ['First','Second','Third','The last one'],
               //         ['Value 1','Value 2','Value 3','Value 4'], [{text:'Bold value ',bold:true,},'Val 2','Val 3','Val 4' ],
                    ]
                }
            }
        ]
    }
};
