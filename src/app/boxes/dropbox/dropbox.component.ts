import { Component } from '@angular/core';
import { CertService } from 'src/app/shared/cert.service';
import { ModeService } from 'src/app/shared/mode.service';

@Component({
  selector: 'app-dropbox',
  templateUrl: './dropbox.component.html',
  styleUrls: ['./dropbox.component.css'],
})
export class DropboxComponent {
  constructor(private certService: CertService) {}

  fileHandler($event: any) {
    if ($event instanceof FileList) {
      this.prepareFilesList($event);
    } else if ($event.target.files) {
      this.prepareFilesList($event.target.files);
    } else throw new Error('File not found');
  }

  prepareFilesList(fileList: FileList) {
    const files = Object.values(fileList);
    for (const item of files) {
      this.certService.parseCert(item);
    }
  }
}
