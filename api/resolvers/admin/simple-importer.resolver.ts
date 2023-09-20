import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { Permission } from "@vendure/common/lib/generated-types";
import { Ctx, RequestContext, Transaction, Allow } from "@vendure/core";
import { SimpleImporterService } from "../../../services/simple-importer.service";

@Resolver()
export class SimpleImporterResolver {
  constructor(private simpleImporterService: SimpleImporterService) {}

  @Transaction()
  @Mutation()
  @Allow(Permission.CreateCatalog, Permission.CreateProduct) // Removed Permission.Public
  async importCsvFile(
    @Ctx() ctx: RequestContext,
    @Args() args: { fileContent: string }
  ) {
    try {
      return await this.simpleImporterService.importCsvFile(
        ctx,
        args.fileContent
      );
    } catch (error) {
      console.error("An error occurred in the resolver:", error);
      throw new Error("Failed to import CSV file.");
    }
  }
}
