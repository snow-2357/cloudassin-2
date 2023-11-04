const axios = require("axios");

// let sampleInvoiceData = {
//   date: "2023-11-04",
//   currency: "DKK",
//   paymentTerms: {
//     paymentTermsNumber: 2,
//     daysOfCredit: 30,
//     name: "Lobende maned 30 dage",
//     paymentTermsType: "invoiceMonth",
//   },
//   customer: {
//     customerNumber: 10,
//   },
//   recipient: {
//     name: "Sima test",
//     vatZone: {
//       name: "Domestic",
//       vatZoneNumber: 1,
//       enabledForCustomer: true,
//       enabledForSupplier: true,
//     },
//   },

//   layout: {
//     layoutNumber: 21,
//   },

//   lines: [
//     {
//       quantity: 1.0,
//       product: {
//         productNumber: "44282244628708",
//       },
//     },
//     {
//       quantity: 1.0,
//       product: {
//         productNumber: "44282239090916",
//       },
//     },
//   ],
// };
function transformLineItems(orderData) {
  return lineItems.map((item) => ({
    quantity: item.quantity,
    product: {
      productNumber: item.variant_id.toString(),
    },
  }));
}

async function createInvoice(orderData, date, customerId) {
  const transformedData = transformLineItems(orderData);

  let sampleInvoiceData = {
    date: date,
    currency: orderData.currency,
    customer: {
      customerNumber: customerId,
    },
    recipient: {
      name: "Sima test",
      vatZone: {
        name: "Domestic",
        vatZoneNumber: 1,
        enabledForCustomer: true,
        enabledForSupplier: true,
      },
    },
    lines: transformedData,
    // required
    paymentTerms: {
      paymentTermsNumber: 2,
      daysOfCredit: 30,
      name: "Lobende maned 30 dage",
      paymentTermsType: "invoiceMonth",
    },

    layout: {
      layoutNumber: 21,
    },
  };

  const settings = {
    method: "post",
    url: `https://restapi.e-conomic.com/invoices/drafts`,
    headers: {
      "x-appsecrettoken": process.env.APPSECRETTOKEN,
      "x-agreementgranttoken": process.env.AGREEMENTGRANTTOKEN,
      "Content-Type": "application/json",
    },
    data: orderData,
  };

  return axios(settings)
    .then((response) => {
      console.log(response.data, "invoice");

      //   return response.data.collection;
      return response.data;
    })
    .catch((error) => {
      throw error;
      console.log("api error");
    });
}

module.exports = { createInvoice };
