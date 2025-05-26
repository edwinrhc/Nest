import type{ TDocumentDefinitions } from "pdfmake/interfaces";
import * as Utils from 'src/helpers/chart-utils';
import { getDonutChart } from './charts/donut.chart';


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

  const dountChart = await getDonutChart({
    entries: options.topCountries.map((c) => ({
      label: c.country,
        value: c.customers
    })),
    posicion: 'left'
  });

  const docDefinition : TDocumentDefinitions = {
    content: [
      { image:dountChart,
        width:500
      }
    ]
  };
  return docDefinition;
}
