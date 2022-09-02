import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type AppMode = 'drop' | 'select' | 'empty';

@Injectable({
  providedIn: 'root',
})
export class ModeService {
  private _mode = new BehaviorSubject<AppMode>('empty');

  constructor() {}

  get mode() {
    return this._mode.asObservable();
  }

  setMode(mod: AppMode) {
    this._mode.next(mod);
  }
}
