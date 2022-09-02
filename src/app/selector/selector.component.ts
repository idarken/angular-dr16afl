import { AppMode } from './../shared/mode.service';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
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
    private modeService: ModeService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.modeService.mode.subscribe((mode) => {
      this.mode = mode;
    });
    this.certSub = this.certService
      .getCertificates()
      .subscribe((certificates) => {
        if (certificates) {
          this.list = certificates;
          this.certService.setSelectedItem(this.list[0]);
          this.ref.detectChanges();
        }
      });
    this.certService.selectedItem.subscribe((s) => {
      this.selectedItem = s;
      this.ref.detectChanges();
    });
  }

  itemId(index: number, item: any) {
    return item;
  }

  selectItem(item: CertData) {
    this.certService.setSelectedItem(item);
  }

  onAddNew() {
    this.modeService.setMode('drop');
  }

  onCancel() {
    this.modeService.setMode('select');
    this.onCancel();
  }

  isActive(item: CertData) {
    return item === this.selectedItem;
  }

  ngOnDestroy(): void {
    if (this.certSub) this.certSub.unsubscribe();
  }
}
