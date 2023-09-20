import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ImportProductsComponent } from "./components/import-products/import-products.component";
import { SimpleImporterSharedModule } from "./simple-importer-shared.module";

@NgModule({
  imports: [
    SimpleImporterSharedModule,
    RouterModule.forChild([
      {
        path: "import-products",
        component: ImportProductsComponent,
        data: {
          // locationId: "importer-products",
          breadcrumb: [
            {
              label: "Import products",
              link: [
                "/extensions/simple-importer/import-products",
                "import-products",
              ],
            },
          ],
        },
      },
    ]),
  ],
  declarations: [
    //
    ImportProductsComponent,
  ],
})
export class SimpleImporterUiLazyModule {}
