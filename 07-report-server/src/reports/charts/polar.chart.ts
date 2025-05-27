import * as Utils from 'src/helpers/chart-utils';

export const getPolarChart = async () : Promise<string> => {

  const DATA_COUNT = 5;
  const NUMBER_CFG = {count: DATA_COUNT, min: 0, max: 100};

  const labels = ['Red', 'Orange', 'Yellow', 'Green', 'Blue'];
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: Utils.numbers(NUMBER_CFG),
        backgroundColor: [
          Utils.transparentize(Utils.NAMED_COLORS.red, 0.5),
          Utils.transparentize(Utils.NAMED_COLORS.orange, 0.5),
          Utils.transparentize(Utils.NAMED_COLORS.yellow, 0.5),
          Utils.transparentize(Utils.NAMED_COLORS.green, 0.5),
          Utils.transparentize(Utils.NAMED_COLORS.blue, 0.5),
        ]
      }
    ]
  };

  const config = {
    type: 'polarArea',
    data: data,
    options: {
      responsive: true,
      scales: {
        r: {
          pointLabels: {
            display: true,
            centerPointLabels: true,
            font: {
              size: 18
            }
          }
        }
      },
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Chart.js Polar Area Chart With Centered Point Labels'
        }
      }
    },
  };

  return Utils.chartJsToImage(config);

};