import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Input,
} from "@angular/core";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { DataService } from "@vendure/admin-ui/core";
import { ImportProgress } from "@vendure/core";

import gql from "graphql-tag";

import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

interface ImportCsvFileResponse {
  importCsvFile: ImportProgress;
}

@Component({
  templateUrl: "./import-products.component.html",
  styleUrls: ["./import-products.component.scss"],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ImportProductsComponent implements OnInit {
  form: FormGroup;

  @Input() dropZoneTarget = "body";
  @Input() uploading = false;

  importResult: ImportProgress | null = null;

  dragging = false;
  overDropZone = false;
  dropZoneStyle = {
    "width.px": 0,
    "height.px": 0,
    "top.px": 0,
    "left.px": 0,
  };
  accept: string = ".csv";

  import = {
    name: "",
    products: "",
    fileContent: "",
  };

  constructor(
    private formBuilder: FormBuilder,
    protected dataService: DataService
  ) {
    //
    this.form = this.formBuilder.group({
      step1: this.formBuilder.group({
        file: [null, Validators.required],
        // separator: [",", Validators.required],
      }),
      step2: this.formBuilder.group({}),
      step3: this.formBuilder.group({}),
    });
  }

  async ngOnInit() {
    //
  }

  async select(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if (files && files.length > 0) {
      const file = files[0];
      console.log(file);
      this.import.name = file.name;

      const reader = new FileReader();
      reader.onload = async (event2: any) => {
        // Code to handle the file contents goes here
        const contents = event2.target.result as string;
        this.import.fileContent = contents;
      };
      reader.readAsText(file);
    }
  }

  async startImport(): Promise<void> {
    if (!this.import.fileContent) {
      return;
    }
    this.importResult = null; // Reset the importResult before starting a new import
    const IMPORT_CSV_FILE_MUTATION = gql`
      mutation importCsvFile($fileContent: String!) {
        importCsvFile(fileContent: $fileContent) {
          currentProduct
          processed
          errors
        }
      }
    `;

    this.dataService
      .mutate<ImportCsvFileResponse>(IMPORT_CSV_FILE_MUTATION, {
        fileContent: this.import.fileContent,
      })
      .subscribe({
        next: (data) => {
          console.log("DATA", data);
          if (data.importCsvFile) {
            this.importResult = { ...this.importResult, ...data.importCsvFile };
          }
        },
        error: (error) => {
          console.error("An error occurred:", error);
        },
      });
  }

  submit() {
    // console.log("reactive form submit", this.form.value);
  }

  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
}
