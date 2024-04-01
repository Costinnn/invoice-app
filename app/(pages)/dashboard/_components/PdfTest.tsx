"use client";

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const PdfTest = () => {
  var docDefinition: any = {
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
                      text: `xxxx xxxxxx SRL`,
                      margin: [20, 3, 0, 0],
                    },
                    {
                      text: `RO 31313432`,
                      margin: [20, 3, 0, 0],
                    },
                    {
                      text: `Iasi, sat. Bogonos`,
                      margin: [20, 3, 0, 0],
                    },
                    {
                      text: `xxxx.xxxx@gmail.com`,
                      margin: [20, 3, 0, 0],
                    },
                    {
                      text: `RO33 INGB 0000 9999 3333 3333`,
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
                  { text: `2`, margin: [0, 3, 0, 0] },
                  { text: `WEB`, margin: [0, 3, 0, 0] },
                  { text: `22.2.2024`, margin: [0, 3, 0, 0] },
                  { text: `-`, margin: [0, 10, 0, 0] },
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
            [
              {
                text: "1",
                alignment: "center",
              },
              {
                text: "Dezvoltare website de prezentare",
                alignment: "center",
              },
              {
                text: "1",
                alignment: "center",
              },
              {
                text: "buc",
                alignment: "center",
              },
              {
                text: "500",
                alignment: "center",
              },
              {
                text: "0%",
                alignment: "center",
              },
              {
                text: "500",
                alignment: "center",
              },
            ],
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
                  { text: `DISCOUNT`, bold: true, margin: [0, 3, 0, 0] },
                  {
                    text: `TOTAL DE PLATA (lei)`,
                    bold: true,
                    margin: [0, 3, 0, 0],
                  },
                ],
              },
              {
                alignment: "right",
                stack: [
                  { text: `1.500`, margin: [0, 3, 0, 0] },
                  { text: `0`, margin: [0, 3, 0, 0] },
                  { text: `1.500`, margin: [0, 3, 0, 0] },
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
          {
            text: `Platile se fac in contul bancar mentionat`,
            margin: [0, 3, 0, 0],
            fontSize: 10,
          },
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
          { text: `Rest de plata`, margin: [0, 3, 0, 0], fontSize: 10 },
        ],
      },
    ],

    styles: {},
  };

  const createPdf = () => {
    const generatedPdf = pdfMake.createPdf(docDefinition);
    generatedPdf.open();
  };

  return (
    <>
      <h1>TEST</h1>
      <button className="btn-violet" onClick={createPdf}>
        Create pdf invoice
      </button>
    </>
  );
};

export default PdfTest;
