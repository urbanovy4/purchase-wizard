import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { WizardService } from '../../../../../shared/services';

@Component({
  selector: 'app-complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.scss']
})
export class CompleteComponent implements OnInit, OnDestroy {

  public isCompleted: Observable<boolean>;

  constructor(
    private wizardService: WizardService
  ) {
  }

  public ngOnInit(): void {
    this.onGetCompletionStatus();
    this.checkForRedirect();
  }

  public ngOnDestroy(): void {
    this.wizardService.onUnsubscribe();
  }

  public toHomePage(): void {
    this.wizardService.navigateTo('');
  }

  private onGetCompletionStatus(): void {
    this.isCompleted = this.wizardService.isCompleted;
  }

  private checkForRedirect(): void {
    this.isCompleted
      .pipe(
        takeUntil(this.wizardService.notifyToUnsubscribe)
      )
      .subscribe((status: boolean) => {
        if (!status) {
          this.wizardService.navigateTo('')
        }
      })
  }
}
