
import htmlToPdfmake from 'html-to-pdfmake';
import {JSDOM} from 'jsdom';

export const getHtmlContent = (html:string) => {

  const {window } = new JSDOM();

    return htmlToPdfmake(html, {window});
}