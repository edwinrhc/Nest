import type{ TDocumentDefinitions } from "pdfmake/interfaces";
import * as Utils from 'src/helpers/chart-utils';
import { getDonutChart } from './charts/donut.chart';
import { headerSection } from './sections/header.section';
import { getLineChart } from './charts/line.chart';
import { getBarsChart } from './charts/bars.chart';
import { footerSection } from './sections/footer.section';
import { getPolarChart } from './charts/polar.chart';


interface TopCountry{
  country: string;
  customers: number;
}

interface ReportOptions {
  title?: string;
  subTitle?: string;
  topCountries: TopCountry[];
}



export const getStatisticReport =  async (
    options: ReportOptions):
    Promise<TDocumentDefinitions> => {

  const [donutChart, lineChart, barChart,polarChart] = await Promise.all([
    getDonutChart({
      entries: options.topCountries.map((c) => ({
        label: c.country,
        value: c.customers
      })),
      posicion: 'left'
    }),
    getLineChart(),
    getBarsChart(),
    getPolarChart()
  ])


  const docDefinition : TDocumentDefinitions = {
    pageMargins: [40,100,40,60],
    header:  headerSection({
      title: options.title ?? 'Estadisticas de clientes',
      subTitle: options.subTitle ?? 'Top 10 países con más clientes',
    }),
    footer: footerSection,
    content: [
      {
        columns: [
          {
            stack: [
              {
                text: '10  países con más clientes',
                alignment: 'center',
                margin: [0,0,0,10]
              },
              { image:donutChart,
                width:320
              },
            ]
          },
          {
            layout: 'lightHorizontalLines',
            width: 'auto',
            table:{
              headerRows: 1,
              widths:[100,'auto'],
              body: [
                ['País','Clientes'],
                ...options.topCountries.map((c)=> [c.country,c.customers])
              ]
            }
          }
        ]
      },
      {
        image: lineChart,
        width: 500,
        margin:[0,20]
      },
      {
        columnGap: 10,
        columns: [
          {
            image: barChart,
            width: 250,
          },
          {
            image: polarChart,
            width: 250,
          }
        ]
      }
    ]
  };
  return docDefinition;
}
