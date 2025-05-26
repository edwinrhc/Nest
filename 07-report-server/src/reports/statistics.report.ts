import type{ TDocumentDefinitions } from "pdfmake/interfaces";
import * as Utils from 'src/helpers/chart-utils';


interface TopCountry{
  country: string;
  customers: number;
}

interface ReportOptions {
  title?: string;
  subTitle?: string;
  topCountries: TopCountry[];
}

const generateTopCountriesDonut =
    async  (topCountries: TopCountry[]) :Promise<string> =>{
  const data = {
    labels: topCountries.map((country)  => country.country),
    datasets: [
      {
        label: 'Dataset 1',
        data: topCountries.map((country) => country.customers),
       // backgroundColor: Object.values(Utils.CHART_COLORS),
      }
    ]
  };

      const config = {
        type: 'doughnut',
        data: data,
        options: {
          responsive: true,
          legend: {
            position: 'left',
          },
          title: {
            text: 'Chart.js Doughnut Chart',
            display: true,
          },
          plugins: {
            datalabels: {
              color: 'white',
              font:{
                weight: 'bold',
                size: 14,
              }
            },
          }
        },
      };

  return Utils.chartJSToImage(config)
}

export const getStatisticReport =  async (
    options: ReportOptions):
    Promise<TDocumentDefinitions> => {

  const dountChart = await generateTopCountriesDonut(options.topCountries);

  const docDefinition : TDocumentDefinitions = {
    content: [
      { image:dountChart,
        width:500
      }
    ]
  };
  return docDefinition;
}
