import type{ TDocumentDefinitions } from "pdfmake/interfaces";

interface ReportOptions {
  name: string;
}


export const getStatisticReport = (options: ReportOptions): TDocumentDefinitions => {
  const docDefinition : TDocumentDefinitions = {
    content: [`Mundo aqui`]
  };
  return docDefinition;
}
