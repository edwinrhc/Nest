import * as Utils from '../../helpers/chart-utils';

interface DonuEntry{
  label: string;
  value: number;
}

interface DonutOptions{
  posicion?: 'left' | 'right' | 'top' | 'bottom',
  entries: DonuEntry[];
}

export const getDonutChart = async  (options: DonutOptions) :Promise<string> => {
  const { posicion = 'top' } = options;

    const data = {
      labels: options.entries.map((e)  => e.label),
      datasets: [
        {
          label: 'Dataset 1',
          data: options.entries.map((e) => e.value),
          backgroundColor: Object.values(Utils.CHART_COLORS),
        }
      ]
    };

    const config = {
      type: 'doughnut',
      data: data,
      options: {
        responsive: true,
        legend: {
          position: posicion,
        },
/*        title: {
          text: 'Chart.js Doughnut Chart',
          display: true,
        },*/
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

    return Utils.chartJsToImage(config)
  }