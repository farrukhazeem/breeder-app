module.exports = {
  animals: [
    {
      displayName: "Name",
      name: "name",
      mandatory: true,
      type: "text",
      validation: {
        required: true,
        allowNumber: false,
        allowSpecialCharacter: false,
        allowString: true,
        maxLength: "30",
        minLength: "2",
      },
    },
    {
      displayName: "Breed",
      name: "breed",
      type: "select",
      mandatory: true,
      values: [],
      validation: {
        required: true,
      },
    },

    {
      displayName: "Quantity",
      name: "quantity",
      type: "number", onlyBusiness: true,
      mandatory: true,
      validation: {
        required: true,
        allowNumber: true,
        allowSpecialCharacter: false,
        allowString: false,
        maxLength: "6",
        minLength: "1",
      },
    },
    {
      displayName: "Price",
      name: "price",
      type: "number",
      mandatory: true, onlyBusiness: true,
      validation: {
        required: true,
        allowNumber: true,
        allowSpecialCharacter: false,
        allowString: false,
        maxLength: "6",
        minLength: "1",
      },
    },
    {
      displayName: "DOB",
      name: "DOB",
      type: "date",
      mandatory: false,
      validation: {
        required: true,
      },
      values: [],
    },
    // {
    //   displayName: "Sex",
    //   name: "sex",
    //   type: "radio",
    //   mandatory: true,
    //   values: [
    //     {
    //       name: "MALE",
    //       value: "male",
    //     },
    //     {
    //       name: "FEMALE",
    //       value: "female",
    //     },
    //   ],
    //   validation: {
    //     required: true,
    //   },
    // },
    {
      displayName: "Genes and Traits",
      name: "traits",
      type: "select",
      mandatory: true,
      values: [],
      validation: {
        required: true,
      },
    },
  ],

  products: [
    {
      displayName: "Name",
      name: "name",
      type: "text",
      mandatory: true,
      validation: {
        required: true,
        allowNumber: false,
        allowSpecialCharacter: false,
        allowString: true,
        maxLength: "30",
        minLength: "2",
      },
    },

    {
      displayName: "Quantity",
      name: "quantity",
      type: "number", onlyBusiness: true,
      mandatory: true,
      validation: {
        required: true,
        allowNumber: true,
        allowSpecialCharacter: false,
        allowString: false,
        maxLength: "6",
        minLength: "1",
      },
    },
    {
      displayName: "Price",
      name: "price",
      type: "number",
      mandatory: true, onlyBusiness: true,
      validation: {
        required: true,
        allowNumber: true,
        allowSpecialCharacter: false,
        allowString: false,
        maxLength: "6",
        minLength: "1",
      },
    },
    {
      displayName: "Model number",
      name: "model",
      mandatory: true,
      type: "text",
      validation: {
        required: true,
        allowNumber: true,
        allowSpecialCharacter: false,
        allowString: true,
        maxLength: "12",
        minLength: "2",
      },
    },
    {
      displayName: "SKU",
      name: "sku",
      // mandatory: true,
      type: "text",
      validation: {
        required: true,
        allowNumber: true,
        allowSpecialCharacter: false,
        allowString: true,
        maxLength: "20",
        minLength: "2",
      },
    },
    {
      displayName: "Sub Category",
      name: "subCategory",
      type: "select",
      mandatory: true,
      values: [],
      validation: {
        required: true,
      },
    },
  ],
  traits: {
    displayName: "Traits",
    name: "traits",
    type: "select",
    mandatory: true,
    values: [],
    validation: {
      required: true,
    },
  },
};
