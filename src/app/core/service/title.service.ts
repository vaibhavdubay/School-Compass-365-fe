import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BehaviorSubject, filter, map } from 'rxjs';
import { SharedStoreService } from './shared-store.service';
import { Role } from '@sc-enums/role';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TitleService {
  private _title = new BehaviorSubject('Dashboard');
  title$ = this._title.asObservable();
  mainTitle: string = 'School Compass 365';
  constructor(
    private titleService: Title,
    route: Router,
    sharedStore: SharedStoreService,
  ) {
    route.events
      .pipe(
        filter((event) => {
          const paths = route.url.split('/');
          return (
            event instanceof ActivationEnd &&
            event.snapshot.routeConfig?.path == paths[paths.length - 1]
          );
        }),
      )
      .subscribe((event) => {
        if (event instanceof ActivationEnd) {
          if (event.snapshot.data && event.snapshot.data['title']) {
            this.title = event.snapshot.data['title'];
          }
          console.log(event);
        }
      });
    sharedStore.loggedInUserWithSchool$
      .pipe(filter(({ loggedInUser }) => loggedInUser.role !== Role.ADMIN))
      .subscribe(({ schoolProfile }) => {
        this.mainTitle = schoolProfile.name
          .split(' ')
          .map((s) => s[0])
          .join('');
      });
  }

  set title($value: string) {
    this.titleService.setTitle(`${this.mainTitle} | ${$value}`);
    this._title.next($value);
  }
}
