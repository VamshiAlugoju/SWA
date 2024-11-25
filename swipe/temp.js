const prompt = `
You are given a list of invoices in the following format:

[
    {
        "Serial Number": "INV-TEST-1526",
        "Invoice Date": "12 Nov 2024",
        "Products": [
            {
                "name": "Shipping Charges",
                "quantity": 1,
                "price": "60.00000000",
                "priceWithTax": "60.00000000",
                "tax": 0
            },
            {
                "name": "Matrix and Pillows",
                "quantity": "1.000",
                "price": "45084.75",
                "priceWithTax": "53200.00",
                "tax": 18
            },
            {
                "name": "Shipping Charges",
                "quantity": 1,
                "price": "60.00000000",
                "priceWithTax": "60.00000000",
                "tax": 0
            },
            {
                "name": "Shipping Charges",
                "quantity": 1,
                "price": "60.00000000",
                "priceWithTax": "60.00000000",
                "tax": 0
            },
            {
                "name": "debit card charges ",
                "quantity": 1,
                "price": "12345.00000000",
                "priceWithTax": "12345.00000000",
                "tax": 0
            },
            {
                "name": "Making charges",
                "quantity": 1,
                "price": "123456.00000000",
                "priceWithTax": "123456.00000000",
                "tax": 0
            },
            {
                "name": "YONEX ZR 100 LIGHT  Racket",
                "quantity": "7.000",
                "price": "25600.00",
                "priceWithTax": "25600.00",
                "tax": 0
            }
        ],
        "customerDetails": {
            "name": "",
            "companyName": "",
            "phNumber": ""
        }
    },
    {
        "Serial Number": "INV-148CZS",
        "Invoice Date": "12 Nov 2024",
        "Products": [
            {
                "name": "MILK BIKIS CLASSIC CASE 120PK",
                "quantity": "20.000",
                "price": "809.52",
                "priceWithTax": "850.00",
                "tax": 5
            },
            {
                "name": "Shipping Charges",
                "quantity": 1,
                "price": "60.00000000",
                "priceWithTax": "60.00000000",
                "tax": 0
            },
            {
                "name": "Making charges",
                "quantity": 1,
                "price": "123456.00000000",
                "priceWithTax": "123456.00000000",
                "tax": 0
            },
            {
                "name": "debit card charges ",
                "quantity": 1,
                "price": "12345.00000000",
                "priceWithTax": "12345.00000000",
                "tax": 0
            },
            {
                "name": "TREAT BKS CASE 80PKT",
                "quantity": "50.000",
                "price": "535.71",
                "priceWithTax": "600.00",
                "tax": 12
            },
            {
                "name": "Shipping Charges",
                "quantity": 1,
                "price": "60.00000000",
                "priceWithTax": "60.00000000",
                "tax": 0
            },
            {
                "name": "Shipping Charges",
                "quantity": 1,
                "price": "60.00000000",
                "priceWithTax": "60.00000000",
                "tax": 0
            },
            {
                "name": "NUTRI CHOICE BKS CASE",
                "quantity": "25.000",
                "price": "666.67",
                "priceWithTax": "700.00",
                "tax": 5
            },
            {
                "name": "GEMS CHOCLATE POUCH",
                "quantity": "1000.000",
                "price": "4.76",
                "priceWithTax": "5.00",
                "tax": 5
            }
        ],
        "customerDetails": {
            "name": "",
            "companyName": "",
            "phNumber": ""
        }
    },
]

Please process this data and output it in the following format:

{
  "Serial Number": string,
  "Invoice Date": string,
  "Products": [
    {
      "name": string,
      "quantity": string,
      "price": string,
      "tax": string,
      "priceWithTax": string
    }
  ],
  "Additional Charges": [
    {
      "name": string,
      "quantity": string,
      "price": string,
      "tax": string,
      "priceWithTax": string
    }
  ],
  "Customer Details": {
    "name": string,
    "companyName": string,
    "phNumber": string
  }
}

For each invoice:
- Extract the **Products** array, excluding any services like shipping charges, making charges, etc.
- Create an **Additional Charges** array that contains any non-product entries such as shipping charges, making charges, or other services.
- Ensure **customer details** (name, company, phone number) are included, even if some fields are missing.
- Provide the output in the exact format above.
Please do not include any programming functions or code. Just provide the processed data in the format above.
`;

const response = await model.generateText({ prompt });
console.log(response.text);
