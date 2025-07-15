import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StudyModel } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private dataSubject = new BehaviorSubject<StudyModel[]>([]);

  data$ = this.dataSubject.asObservable();

  updateData(newData: StudyModel[]=[]) {
    this.dataSubject.next(newData);
  }
}
