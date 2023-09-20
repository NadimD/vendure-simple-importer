import gql from "graphql-tag";

import adminSchemaSimpleImporter from "./schema/admin/simple-importer.admin.graphql";

export const adminApiExtensions = gql`
  ${adminSchemaSimpleImporter}
`;
