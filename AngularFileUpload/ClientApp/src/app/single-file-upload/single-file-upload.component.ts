import { Component, OnInit } from '@angular/core';
import {
  HttpClient,
  HttpRequest,
  HttpEventType,
  HttpResponse,
} from '@angular/common/http';
import { finalize } from 'rxjs/operators';

import { FormSubmissionResult } from '../models/FormSubmissionResult';


@Component({
    selector: 'app-single-file-upload',
    templateUrl: './single-file-upload.component.html',
    styleUrls: ['./single-file-upload.component.css']
})
/** single-file-upload component*/
export class SingleFileUploadComponent implements OnInit {
  id = 9;
  formId = 1;
  uploadProgress = 0;
  selectedFile: File;
  uploading = false;
  errorMsg = '';
  names: string[] = ['Math', 'Reading'];
  submissionResult: FormSubmissionResult;

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void { }

  chooseFile(files: FileList) {
    this.selectedFile = null;
    this.errorMsg = '';
    this.uploadProgress = 0;

    if (files.length === 0) {
      return;
    }

    this.selectedFile = files[0];
  }

  upload() {
    if (!this.selectedFile) {
      this.errorMsg = 'Please choose a file.';
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('formid', this.formId.toString());

    this.names.forEach(x => {
      formData.append('names', x);
    });

    const req = new HttpRequest(
      'POST',
      `api/upload/${this.id}/single`,
      formData,
      {
        reportProgress: true,
      }
    );

    this.uploading = true;
    this.httpClient
      .request<FormSubmissionResult>(req)
      .pipe(
        finalize(() => {
          this.uploading = false;
          this.selectedFile = null;
        })
      )
      .subscribe(
        event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.uploadProgress = Math.round(
              (100 & event.loaded) / event.total
            );
          } else if (event instanceof HttpResponse) {
            this.submissionResult = event.body;
          }
        },
        error => { throw error; });
  }

  humanFileSize(bytes: number): string {
    if (Math.abs(bytes) < 1024) {
      return bytes + ' B';
    }

    const units = ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    let u = -1;

    do {
      bytes /= 1024;
      u++;
    } while (Math.abs(bytes) >= 1024 && u < units.length - 1);

    return bytes.toFixed(1) + ' ' + units[u];
  }
}
