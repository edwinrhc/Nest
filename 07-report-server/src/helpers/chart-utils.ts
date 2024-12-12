import axios from "axios";

export const chartJSToImage = async (chartConfig: unknown ) => {
    const encodeUri = encodeURIComponent(JSON.stringify(chartConfig));
    const chartUrl = `https://quickchart.io/chart?c=${encodeUri}`;

    const response = await axios.get(chartUrl,{responseType: 'arraybuffer'});

    return `data:image/png;base64,${Buffer.from(response.data).toString('base64')}`;
}
