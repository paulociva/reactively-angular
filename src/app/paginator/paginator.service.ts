import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, tap} from "rxjs";

@Injectable()
export class PaginatorService {
  readonly paginator = new BehaviorSubject<{ pageIndex: number, pageSize: number }>(
    {pageIndex: 0, pageSize: 10}
  );
  readonly paginator$ = this.paginator.asObservable();

  resetPageIndex(paginator: BehaviorSubject<{ pageIndex: number, pageSize: number }>) {
    return function <T>(source: Observable<T>) {
      return source.pipe(tap(() => paginator.next({
        ...paginator.value,
        pageIndex: 0
      })));
    }
  }
}
