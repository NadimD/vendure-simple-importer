import { Injectable, OnModuleInit } from "@nestjs/common";
import { RequestContext, Importer } from "@vendure/core";

import { lastValueFrom } from "rxjs";

import fs from "fs-extra";
import path from "path";

@Injectable()
export class SimpleImporterService implements OnModuleInit {
  constructor(private importer: Importer) {}

  async onModuleInit() {}

  async readFile(filePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, "utf-8", (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  async importCsvFile(ctx: RequestContext, fileContent: string) {
    try {
      // Add a new job to the queue and immediately return the job itself.
      const options = {
        name: "product-import",
        outputDir: "./src/imports/products",
      };
      const timestamp = new Date().getTime();
      const filename = timestamp.toString() + "-" + options.name + ".csv";
      const directory = options.outputDir;
      const outputPath = directory
        ? path.join(directory, filename)
        : path.join(process.cwd(), filename);
      await fs.ensureFile(outputPath);
      fs.writeFileSync(outputPath, fileContent);
      const file = await this.readFile(outputPath);

      return lastValueFrom(this.importer.parseAndImport(file, ctx, true));
    } catch (error) {
      console.error("An error occurred:", error);
      throw new Error("Failed to import CSV file.");
    }
  }
}
