import { DbInvoiceType } from "@/types/prismaSchemaTypes";
import { InvoiceProductType } from "@/types/prismaSchemaTypes";

const PdfTemplate = (
  invoiceData: DbInvoiceType,
  invoiceProducts: InvoiceProductType[]
) => {
  const {
    clientName,
    clientCui,
    clientAddress,
    clientRc,
    clientIban,
    clientEmail,
    invoiceSeriesId,
    invoiceSerie,
    number,
    date,
    deadline,
    issuedByName,
    issuedByCnp,
    accompanyNotice,
    delegateName,
    delegateCnp,
    delegateAuto,
    terms,
    remarks,
    currency,
    subtotal,
    discount,
    tva,
    total,
  } = invoiceData;

  const createProductsData = (data: InvoiceProductType[]) => {
    const tableDisplayColumns: any[] = [];
    let idx = 1;
    for (const item of data) {
      tableDisplayColumns.push([
        {
          text: idx,
          alignment: "center",
          fontSize: 11,
        },
        {
          text: item.name,
          alignment: "center",
          fontSize: 11,
        },
        {
          text: item.quantity,
          alignment: "center",
          fontSize: 11,
        },
        {
          text: item.um,
          alignment: "center",
          fontSize: 11,
        },
        {
          text: item.price,
          alignment: "center",
          fontSize: 11,
        },
        {
          text: `${item.tva}%`,
          alignment: "center",
          fontSize: 11,
        },
        {
          text: item.totalValue.toLocaleString(),
          alignment: "center",
        },
      ]);
      idx++;
    }
    return tableDisplayColumns;
  };

  const createTermsRemarksData = (data: string[]) => {
    const dataDisplayColumns: any[] = [];
    for (const item of data) {
      dataDisplayColumns.push([
        { text: item, margin: [0, 3, 0, 0], fontSize: 10 },
      ]);
    }
    return dataDisplayColumns;
  };

  const productsTableDisplay = createProductsData(invoiceProducts);
  const termsDisplay = createTermsRemarksData(terms);
  const remarksDisplay = createTermsRemarksData(remarks);

  const docDefinition: any = {
    content: [
      // ROW 1
      {
        alignment: "justify",
        columns: [
          // col 1
          {
            stack: [
              { text: `FIRM NAME SRL\n`, fontSize: 18, bold: true },
              {
                text: `RC: J22/2222/2222 CUI: 31313131\n`,
                margin: [0, 5, 0, 0],
              },
              {
                text: `Adresa: Iasi, Romania, Capital social: 200 lei\n`,
                margin: [0, 3, 0, 0],
              },
              {
                text: `ING IBAN: RO33 INGB 0000 9999 3333 3333\n`,
                bold: true,
                margin: [0, 3, 0, 0],
              },
              {
                text: `Contact: contact.email@gmail.com\n`,
                margin: [0, 3, 0, 0],
              },
            ],
          },

          // col 1
          // { image: "logo.png" },
        ],
      },

      // ROW 2
      {
        text: "FACTURA",
        fontSize: 20,
        bold: true,
        alignment: "center",
        margin: [0, 30, 0, 20],
      },

      // ROW 3
      {
        columns: [
          // col1
          [
            { text: `FACTURAT CATRE`, bold: true, fontSize: 11 },
            {
              width: "*",
              columns: [
                // col 11
                {
                  width: "auto",
                  alignment: "right",
                  stack: [
                    {
                      text: `Client: `,
                      bold: true,
                      margin: [20, 3, 0, 0],
                    },
                    {
                      text: `CUI: `,
                      bold: true,
                      margin: [20, 3, 0, 0],
                    },
                    {
                      text: `Adresa: `,
                      bold: true,
                      margin: [20, 3, 0, 0],
                    },
                    {
                      text: `Contact: `,
                      bold: true,
                      margin: [20, 3, 0, 0],
                    },
                    {
                      text: `IBAN: `,
                      bold: true,
                      margin: [20, 5, 0, 0],
                    },
                  ],
                },

                // col 12
                {
                  width: "*",
                  stack: [
                    {
                      text: clientName,
                      margin: [20, 3, 0, 0],
                    },
                    {
                      text: clientCui,
                      margin: [20, 3, 0, 0],
                    },
                    {
                      text: clientAddress,
                      margin: [20, 3, 0, 0],
                    },
                    {
                      text: clientEmail ? clientEmail : " - ",
                      margin: [20, 3, 0, 0],
                    },
                    {
                      text: clientIban ? clientIban : " - ",
                      margin: [20, 5, 0, 0],
                    },
                  ],
                },
              ],
            },
          ],

          // col2
          {
            width: "auto",
            columns: [
              {
                width: "auto",
                alignment: "right",
                stack: [
                  { text: `Nr. Factura:`, bold: true, margin: [20, 3, 0, 0] },
                  { text: `Seria:`, bold: true, margin: [20, 3, 0, 0] },
                  { text: `Data:`, bold: true, margin: [20, 3, 0, 0] },
                  { text: `Scadenta:`, bold: true, margin: [20, 10, 0, 0] },
                ],
              },
              {
                alignment: "center",
                width: 100,
                stack: [
                  { text: number, margin: [0, 3, 0, 0] },
                  { text: invoiceSerie, margin: [0, 3, 0, 0] },
                  { text: date, margin: [0, 3, 0, 0] },
                  { text: deadline ? deadline : " - ", margin: [0, 10, 0, 0] },
                ],
              },
            ],
          },
        ],
      },

      // ROW 4
      {
        margin: [0, 20, 0, 20],
        table: {
          widths: ["auto", "*", "auto", "auto", "auto", "auto", "auto"],
          body: [
            // table Head
            [
              {
                text: "Nr.",
                border: [true, true, false, false],
                fillColor: "#eeeeee",
                alignment: "center",
              },
              {
                text: "Denumire",
                border: [false, true, false, false],
                fillColor: "#eeeeee",
                alignment: "center",
              },
              {
                text: "Cant.",
                border: [false, true, false, false],
                fillColor: "#eeeeee",
                alignment: "center",
              },
              {
                text: "UM",
                border: [false, true, false, false],
                fillColor: "#eeeeee",
                alignment: "center",
              },
              {
                text: "Pret",
                border: [false, true, false, false],
                fillColor: "#eeeeee",
                alignment: "center",
              },
              {
                text: "TVA",
                border: [false, true, false, false],
                fillColor: "#eeeeee",
                alignment: "center",
              },
              {
                text: "Valoare",
                border: [false, true, true, false],
                fillColor: "#eeeeee",
                alignment: "center",
              },
            ],
            // table Content
            ...productsTableDisplay,
          ],
        },
        layout: {
          fillColor: function (rowIndex: any) {
            return rowIndex % 2 === 0 ? "#CCCCCC" : null;
          },
        },
      },

      // ROW 5
      {
        alignment: "justify",
        columns: [
          // col 1
          {
            width: "*",
            alignment: "center",
            margin: [0, 10, 0, 0],
            italics: true,
            text: `www.site.com`,
            link: "https://",
          },

          // col 2
          {
            width: "auto",
            columns: [
              {
                alignment: "right",
                stack: [
                  { text: `SUBTOTAL`, bold: true, margin: [0, 3, 0, 0] },
                  { text: `TVA`, bold: true, margin: [0, 3, 0, 0] },
                  { text: `DISCOUNT`, bold: true, margin: [0, 3, 0, 0] },
                  {
                    text: `TOTAL DE PLATA (${currency})`,
                    bold: true,
                    margin: [0, 3, 0, 0],
                  },
                ],
              },
              {
                alignment: "right",
                stack: [
                  { text: subtotal.toLocaleString(), margin: [0, 3, 0, 0] },
                  { text: tva.toLocaleString(), margin: [0, 3, 0, 0] },
                  {
                    text: `${discount.toLocaleString()} %`,
                    margin: [0, 3, 0, 0],
                  },
                  { text: total.toLocaleString(), margin: [0, 3, 0, 0] },
                ],
              },
            ],
          },
        ],
      },

      // ROW 6
      {
        stack: [
          {
            text: "Termeni si conditii",
            bold: true,
            margin: [0, 50, 0, 0],
            fontSize: 11,
          },
           ...termsDisplay ,
        ],
      },

      // ROW 7
      {
        stack: [
          {
            text: "Observatii",
            bold: true,
            margin: [0, 20, 0, 0],
            fontSize: 11,
          },
          ...remarksDisplay,
        ],
      },
    ],

    styles: {},
  };

  return docDefinition;
};

export default PdfTemplate;
