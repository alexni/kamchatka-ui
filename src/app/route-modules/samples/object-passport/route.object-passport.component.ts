import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, finalize } from 'rxjs/operators';
import { ObjectPassport } from 'src/app/modules/samples/models/object-passport';
import { ObjectSample } from 'src/app/modules/samples/models/object-sample';
import { ObjectPassportDialogService } from 'src/app/modules/samples/object-passport/object-passport.dialog.service';
import { ObjectSampleDialogService } from 'src/app/modules/samples/object-sample/object-sample.dialog.service';
import { ObjectSamplesComponent } from 'src/app/modules/samples/object-samples/object-samples.component';
import { SamplesService } from 'src/app/modules/samples/samples.service';
import { TitleService } from 'src/app/ui/common/services/title.service';

@Component({
  templateUrl: './route.object-passport.component.html',
  styleUrls: ['./route.object-passport.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RouteObjectPassportComponent implements OnDestroy {

  public objectPassport!: ObjectPassport | null;

  public loading = true;

  @ViewChild(ObjectSamplesComponent)
  private objectSamplesComponent!: ObjectSamplesComponent;

  private subscriptions = new Subscription();

  private loadObjectPassportSubscription: Subscription | null = null;

  constructor(
    private titleService: TitleService,
    private samplesService: SamplesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    private objectPassportDialogService: ObjectPassportDialogService,
    private objectSampleDialogService: ObjectSampleDialogService,
  ) {
    this.titleService.setTitle('Паспорт объекта');
    this.initialRoute();
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public setObjectPassport(objectPassport: ObjectPassport | null): void {
    this.objectPassport = objectPassport;
    this.changeDetectorRef.markForCheck();
  }

  public editObjectPassport(): void {
    this.objectPassportDialogService
      .openEditor(this.objectPassport)
      .pipe(
        filter(objectPassport => !!objectPassport),
      )
      .subscribe(objectPassport => this.setObjectPassport(objectPassport));
  }

  public addSample(): void {
    this.objectSampleDialogService
      .openEditor(this.objectPassport!.id, null)
      .pipe(
        filter(objectSample => !!objectSample),
      )
      .subscribe(() => this.objectSamplesComponent.reloadList());
  }

  public updateSample(sample: ObjectSample): void {
    this.objectSampleDialogService
      .openEditor(this.objectPassport!.id, sample)
      .pipe(
        filter(objectSample => !!objectSample),
      )
      .subscribe(() => this.objectSamplesComponent.reloadList());
  }

  private initialRoute(): void {
    const changeRouteParamsSubscription = this.activatedRoute
      .params
      .subscribe(params => {
        const id = params['objectPassportId'] || null;
        if (id) {
          this.loadObjectPassport(id);
        } else {
          this.setObjectPassport(null);
          this.setLoading(false);
        }
      });
    this.subscriptions.add(changeRouteParamsSubscription);
  }

  private loadObjectPassport(id: string): void {
    this.loadObjectPassportUnsubscribe();

    this.setLoading(true);
    this.loadObjectPassportSubscription = this.samplesService
      .loadObjectPassport(id)
      .pipe(
        finalize(() => this.setLoading(false)),
      )
      .subscribe(
        objectPassport => this.setObjectPassport(objectPassport),
        () => this.router.navigate(['/']),
      );
  }

  private setLoading(loading: boolean): void {
    this.loading = loading;
    this.changeDetectorRef.markForCheck();
  }

  private loadObjectPassportUnsubscribe(): void {
    if (this.loadObjectPassportSubscription) {
      this.loadObjectPassportSubscription.unsubscribe();
      this.loadObjectPassportSubscription = null;
    }
  }
}
