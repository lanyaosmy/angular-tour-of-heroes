import { Injectable } from '@angular/core';
import { Subject, of, Observable, pipe } from 'rxjs';
import { map, filter, catchError, retry } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

@Injectable({
  providedIn: 'root',
})
export class MissionService {
  constructor() {}

  // 可观察的字符串对象
  private missionAnnouncedSource = new Subject<string>();
  private missionConfirmedSource = new Subject<string>();

  // 可观察的字符串流
  missionAnnounced$ = this.missionAnnouncedSource.asObservable();
  missionConfirmed$ = this.missionConfirmedSource.asObservable();

  announceMission(mission: string) {
    this.missionAnnouncedSource.next(mission);
  }

  confirmMission(astronaut: string) {
    this.missionConfirmedSource.next(astronaut);
  }
}

// const apiData = ajax('./mock.json').pipe(
//   retry(3), // 重试失败的请求
//   map((res) => {
//     if (!res.response) {
//       throw new Error('Value expected!');
//     }
//     return res.response;
//   }),
//   catchError((err) => of([]))
// );

// apiData.subscribe({
//   next(x) {
//     console.log('data:', x);
//   },
//   error(err) {
//     console.log('errors already caught... will not run');
//   },
// });
