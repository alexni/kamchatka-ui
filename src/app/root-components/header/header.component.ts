import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { IdentityService } from 'src/app/modules/users/identity.service';
import { TitleService } from 'src/app/ui/common/services/title.service';

@Component({
  selector: 'dc-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy {

  public isSigned!: boolean;

  public title!: Observable<string>;

  private subscriptions = new Subscription();

  constructor(
    private identityService: IdentityService,
    private changeDetectorRef: ChangeDetectorRef,
    titleService: TitleService,
  ) {
    this.title = titleService.title.asObservable();
  }

  public ngOnInit(): void {
    const changeSignedSubscription = this.identityService
      .isSigned
      .subscribe(isSigned => {
        this.isSigned = isSigned;
        this.changeDetectorRef.markForCheck();
      });
    this.subscriptions.add(changeSignedSubscription);
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public logout(): void {
    this.identityService.logout();
  }
}
