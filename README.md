# vendure-simple-importer

![Preview of the plugin](https://i.imgur.com/0au661u.png)

⚠️ This plugin is not production-ready, please be cautious and use it only on development environments.

Feel free to modify it to suit your needs.

## Requirements

You must install the official Vendure `ui-devkit` in order to build the Admin UI extensions of this plugin.

A well-structured CSV file. Take example on the official `sample` from Vendure :
https://github.com/vendure-ecommerce/vendure/blob/master/packages/core/mock-data/data-sources/products.csv

Official Vendure docs provide the structure and information about the import:
https://docs.vendure.io/developer-guide/importing-product-data/

## Getting started

1. Import plugin into `vendure-config.ts`

```ts
import { SimpleImporterPlugin } from "./plugins/simple-importer/simple-importer-plugin";
```

2. Add the plugin to your `AdminUiPlugin` extensions

See link to learn about Admin UI Extensions : https://docs.vendure.io/plugins/extending-the-admin-ui/

OR

See link on how to setup Admin UI Extensions in the `real-world-vendure` plugin : https://github.com/vendure-ecommerce/real-world-vendure/blob/master/src/compile-admin-ui.ts

Example of `vendure-config.ts` file :
```ts
// ...
import { customAdminUi } from "./compile-admin-ui";
const IS_PROD = path.basename(__dirname) === "dist";
const IS_DEV = process.env.APP_ENV === "dev";

// ...
export const config: VendureConfig = {
// ...
plugins: [
  AdminUiPlugin.init({
    route: "admin",
    port: 3002,
    adminUiConfig: {
      apiHost: "http://localhost",
      apiPort: 3000,
    },
    app: customAdminUi({ recompile: !IS_PROD, devMode: !IS_PROD }),
  }),
  SimpleImporterPlugin,
  // ...
],
```

`compile-admin-ui.ts` file :
```ts
import { compileUiExtensions } from "@vendure/ui-devkit/compiler";
import path from "path";
import { SimpleImporterPlugin } from "./plugins/simple-importer/simple-importer-plugin";

if (require.main === module) {
  // Called directly from command line
  customAdminUi({ recompile: true, devMode: false })
    .compile?.()
    .then(() => {
      process.exit(0);
    });
}

export function customAdminUi(options: {
  recompile: boolean;
  devMode: boolean;
}) {
  const compiledAppPath = path.join(__dirname, "../admin-ui");
  if (options.recompile) {
    return compileUiExtensions({
      outputPath: compiledAppPath,
      extensions: [SimpleImporterPlugin.uiExtensions],
      devMode: options.devMode,
    });
  } else {
    return {
      path: path.join(compiledAppPath, "dist"),
    };
  }
}
```

## How to use

Simply navigate to `Simple Importers > Import Products` and upload a `.csv` file.

Imported files will be stored into a newly created `/src/imports/products` folder.

## File size

If you have issues uploading a big file, make sure to add a Middleware to the `apiOptions` object :

```ts
export const config: VendureConfig = {
  // ...
  apiOptions: {
    middleware: [
      {
        handler: json({ limit: "10mb" }),
        route: "*",
        beforeListen: true,
      },
    ],
  },
};
```

See Vendure docs about Middleware : https://docs.vendure.io/reference/typescript-api/common/middleware/

> **Warning**
Since Vendure 2.1.0 you no longer need to put the middleware in your Vendure Config :
https://github.com/vendure-ecommerce/vendure/blob/master/CHANGELOG.md#210-2023-10-11


⚠️ The Vendure `Payments Plugin` uses a Middleware for `raw body`, so if you define a Middleware like above, it will be overriden and ignored, which is a problem. Make sure to import the `Payments Plugin` Middleware into the array.

## Future

At the moment this plugin doesn't represent what an import plugin should be and it does not track progress, only the import result. It is only made for fast imports while developping or in development environments.
