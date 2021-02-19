import { Component, OnInit } from '@angular/core';
import {
  HttpClient,
  HttpRequest,
  HttpEventType,
  HttpResponse,
} from '@angular/common/http';

import { finalize } from 'rxjs/operators';
import { SubmissionResult } from "../models/SubmissionResult";


@Component({
    selector: 'app-multiple-files-upload',
    templateUrl: './multiple-files-upload.component.html',
    styleUrls: ['./multiple-files-upload.component.css']
})

export class MultipleFilesUploadComponent implements OnInit {
  id = 9;
  formId = 1;
  uploadProgress = 0;
  selectedFiles: File[];
  uploading = false;
  errorMsg = '';
  submissionResults: SubmissionResult[] = [];

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void { }

  chooseFile(files: FileList) {
    this.selectedFiles = [];
    this.errorMsg = '';
    this.uploadProgress = 0;

    if (files.length === 0) {
      return;
    }

    for (var i = 0; i < files.length; i++) {
      this.selectedFiles.push(files[i]);
    }
  }

  upload() {
    if (!this.selectedFiles || this.selectedFiles.length === 0) {
      this.errorMsg = 'Please choose a file.';
      return;
    }

    const formData = new FormData();
    this.selectedFiles.forEach(f => formData.append('files', f));

    console.log(formData);
    const req = new HttpRequest(
      'POST',
      `api/upload/${this.id}/multiple`,
      formData,
      {
        reportProgress: true,
      }
    );

    this.uploading = true;
    this.httpClient
      .request<SubmissionResult[]>(req)
      .pipe(
        finalize(() => {
          this.uploading = false;
          this.selectedFiles = null;
        })
      ).subscribe(
        event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.uploadProgress = Math.round((100 * event.loaded) / event.total);
          } else if (event instanceof HttpResponse) {
            this.submissionResults = event.body as SubmissionResult[];
          }
        },
        error => { throw error; }
    );
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
