import { Component, OnInit } from '@angular/core';
import { CertService } from '../../shared/cert.service';
import { CertData } from '../../shared/certificate.model';

@Component({
  selector: 'app-textbox',
  templateUrl: './textbox.component.html',
  styleUrls: ['./textbox.component.css'],
})
export class TextboxComponent implements OnInit {
  selectedItem!: CertData;
  dataLoaded = false;

  constructor(private certService: CertService) {}

  ngOnInit() {
    this.certService.selectedItem.subscribe((item) => {
      if (item !== null) {
        this.selectedItem = item;
        this.dataLoaded = true;
      }
    });
  }
}
