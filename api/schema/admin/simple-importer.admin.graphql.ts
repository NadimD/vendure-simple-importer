const schema = `
  type ImportProgress {
    currentProduct: String
    processed: Int
    errors: [String]
  }
  
  type Subscription {
    importProgress: ImportProgress
  }

  extend type Mutation {
    importCsvFile(fileContent: String!): ImportProgress!
  }
`;
export default schema;
