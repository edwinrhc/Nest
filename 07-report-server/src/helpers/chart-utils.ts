import axios from "axios";

interface ChartOptions {
  heigth?: number;
  width?: number;
}


export const chartJSToImage = async (

  chartConfig: unknown,
  options: ChartOptions =  {},
  ) => {
    const params = new URLSearchParams();
    if(options.heigth) params.append('height',options.heigth.toString());
    if(options.width) params.append('width',options.width.toString());
    const encodeUri = encodeURIComponent(JSON.stringify(chartConfig));
    const chartUrl = `https://quickchart.io/chart?c=${encodeUri}&${params.toString()}`;

    const response = await axios.get(chartUrl,{responseType: 'arraybuffer'});

    return `data:image/png;base64,${Buffer.from(response.data).toString('base64')}`;
}
