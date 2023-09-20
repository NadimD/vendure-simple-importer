import { NgModule } from "@angular/core";
import { SharedModule } from "@vendure/admin-ui/core";
@NgModule({
  imports: [SharedModule],
  exports: [SharedModule],
})
export class SimpleImporterSharedModule {}
