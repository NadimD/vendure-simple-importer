# vendure-simple-importer

![Preview of the plugin](https://i.imgur.com/0au661u.png)

⚠️ This plugin is not production-ready, please be cautious and use it only on development environments.

Feel free to modify it to suit your needs.

## Getting started

1. Import plugin into `vendure-config.ts`

```ts
import { SimpleImporterPlugin } from "./plugins/simple-importer/simple-importer-plugin";
```

2. Add the plugin to your `AdminUiPlugin` extensions

See link to learn about Admin UI Extensions : https://docs.vendure.io/plugins/extending-the-admin-ui/

OR

See link on how to setup Admin UI Extensions in the `real-world-vendure` plugin : https://github.com/vendure-ecommerce/real-world-vendure/blob/master/src/compile-admin-ui.ts

## How to use

Simply navigate to `Simple Importers > Import Products` and upload a `.csv` file.

Imported files will be stored into a newly created `/src/imports/products` folder.

Official Vendure docs provide the structure of the `.csv` file : https://docs.vendure.io/developer-guide/importing-product-data/

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

See Vendure docs about Middleware : https://docs.vendure.io/typescript-api/common/middleware/

⚠️ The Vendure `Payments Plugin` uses a Middleware for `raw body`, so if you define a Middleware like above, it will be overriden and ignored, which is a problem. Make sure to import the `Payments Plugin` Middleware into the array.

## Future

At the moment this plugin doesn't represent what an import plugin should be and it does not track progress, only the import result. It is only made for fast imports while developping or in development environments.
