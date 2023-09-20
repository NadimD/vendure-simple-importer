import { NgModule } from "@angular/core";
import { addNavMenuSection } from "@vendure/admin-ui/core";

import { SimpleImporterSharedModule } from "./simple-importer-shared.module";

@NgModule({
  imports: [SimpleImporterSharedModule],
  declarations: [],
  providers: [
    addNavMenuSection(
      {
        id: "tools",
        label: "Simple Importer",
        items: [
          {
            id: "import-products",
            label: "Import products",
            routerLink: ["/extensions/simple-importer/import-products"],
            // Icon can be any of https://clarity.design/icons
            icon: "import",
          },
        ],
      },
      // Add this section before the "customers" section
      "customers"
    ),
  ],
  exports: [],
})
export class SimpleImporterUiExtensionModule {}
