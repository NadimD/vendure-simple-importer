import { PluginCommonModule, VendurePlugin } from "@vendure/core";

import { adminApiExtensions } from "./api/api-extensions";

import path from "path";
import { SimpleImporterService } from "./services/simple-importer.service";
import { SimpleImporterResolver } from "./api/resolvers/admin/simple-importer.resolver";
import { AdminUiExtension } from "@vendure/ui-devkit/compiler";

/**
 * Infos :
 * /ui/ path is actually the only path that is built as an extension
 * Make sure any "common" data to be used both in the admin UI and the plugin core
 * are included into /ui/ because a relative path will break due to the /admin-ui/ folder
 * being rebuilt.
 **/

@VendurePlugin({
  compatibility: "^2.0.0",
  imports: [PluginCommonModule],
  adminApiExtensions: {
    schema: adminApiExtensions,
    resolvers: [SimpleImporterResolver],
  },
  providers: [
    //
    SimpleImporterService,
  ],
})
export class SimpleImporterPlugin {
  static uiExtensions: AdminUiExtension = {
    extensionPath: path.join(__dirname, "ui"),
    ngModules: [
      {
        type: "shared" as const,
        ngModuleFileName: "simple-importer-ui-extension.module.ts",
        ngModuleName: "SimpleImporterUiExtensionModule",
      },
      {
        type: "lazy" as const,
        route: "simple-importer",
        ngModuleFileName: "simple-importer-ui-lazy.module.ts",
        ngModuleName: "SimpleImporterUiLazyModule",
      },
    ],
  };
}
