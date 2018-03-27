import { Subject } from 'rxjs/Subject';

export class PagesService {
  currentPageSource = new Subject<string>();
  currentPage = this.currentPageSource.asObservable();

  setCurrentPage(value: string) {
    console.log(
    'set current page' + value
    );
    this.currentPageSource.next(value);
  }
}
