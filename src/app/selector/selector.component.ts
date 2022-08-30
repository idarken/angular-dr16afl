import { AppMode } from './../shared/mode.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CertData } from '../shared/certificate.model';
import { CertService } from '../shared/cert.service';
import { ModeService } from '../shared/mode.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.css'],
})
export class SelectorComponent implements OnInit, OnDestroy {
  mode: AppMode = 'select';
  list: CertData[] = [];
  selectedItem!: CertData | null;

  certSub!: Subscription;

  constructor(
    private certService: CertService,
    private modeService: ModeService
  ) {}

  ngOnInit() {
    this.modeService.mode.subscribe((mode) => {
      this.mode = mode;
    });
    this.certSub = this.certService
      .getCertificates()
      .subscribe((certificates) => {
        console.log(certificates);
        if (certificates) {
          this.list = certificates;
          this.selectedItem = this.list[0];
          this.certService.setSelectedItem(this.list[0]);
        }
      });
  }

  itemId(index: number, item: any) {
    return item;
  }

  selectItem(item: CertData) {
    this.certService.setSelectedItem(item);
    this.selectedItem = item;
    this.onCancel();
  }

  onAddNew() {
    this.modeService.setMode('drop');
  }

  onCancel() {
    this.modeService.setMode('select');
  }

  isActive(item: CertData) {
    return item === this.selectedItem;
  }

  ngOnDestroy(): void {
    if (this.certSub) this.certSub.unsubscribe();
  }
}
