import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';

import ASN1 from '@lapo/asn1js';
import { CertData } from './certificate.model';
import { ModeService } from './mode.service';

@Injectable({
  providedIn: 'root',
})
export class CertService {
  private _selectedItem = new BehaviorSubject<CertData | null>(null);
  private _loadedCertificates = new BehaviorSubject<CertData[] | null>(null);

  constructor(private modeService: ModeService) {}

  get selectedItem() {
    return this._selectedItem.asObservable();
  }

  get loadedCertificates() {
    return this._loadedCertificates.asObservable();
  }

  getCertificates() {
    const savedCertificates = localStorage.getItem('certificates');
    return this.loadedCertificates.pipe(
      take(1),
      switchMap((certs) => {
        if (!certs && savedCertificates) {
          const loadCerts = JSON.parse(savedCertificates);
          this._loadedCertificates.next(loadCerts);
          return of(loadCerts);
        } else {
          return this._loadedCertificates;
        }
      }),
      tap((certs) => {
        if (!certs) {
          this.modeService.setMode('empty');
        }
      })
    );
  }

  setSelectedItem(item: CertData) {
    if (item) this._selectedItem.next(item);
  }

  async parseCert(file: File) {
    if (file.type !== 'application/x-x509-ca-cert') {
      throw new Error('Не вірний тип файл сертіката');
    }
    const fileData = await this.readFileContent(file);
    const result = ASN1.decode(fileData);
    if (result.typeName() !== 'SEQUENCE') {
      throw new Error(
        'Неправильна структура конверта сертифіката (очікується SEQUENCE)'
      );
    }
    if (result.sub[0].sub[0].sub[0].content() !== '2') {
      throw new Error('Не вірна версія сертифіката');
    }
    console.log(new CertData(result).tbsCertificate);
    this.loadedCertificates
      .pipe(
        take(1),
        tap((certs) => {
          const resArray = certs ? [...certs] : [];
          resArray.push(new CertData(result));
          this._loadedCertificates.next(resArray);
          localStorage.setItem('certificates', JSON.stringify(resArray));
          this.modeService.setMode('select');
        })
      )
      .subscribe();
  }

  private readFileContent(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      if (!file) {
        resolve('');
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        if (reader.result) {
          const text = reader.result.toString();
          resolve(text);
        }
      };
      reader.readAsBinaryString(file);
    });
  }
}
