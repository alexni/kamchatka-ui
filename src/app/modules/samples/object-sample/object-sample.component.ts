import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ObjectSample } from 'src/app/modules/samples/models/object-sample';
import { SamplesService } from 'src/app/modules/samples/samples.service';

@Component({
  selector: 'dc-object-sample',
  templateUrl: './object-sample.component.html',
  styleUrls: ['./object-sample.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ObjectSampleComponent implements OnChanges, OnDestroy {

  @Input()
  public objectPassportId!: string;

  @Input()
  public objectSample!: ObjectSample | null;

  @Output()
  public objectSampleChanged = new EventEmitter<ObjectSample>();

  @Output()
  public cancel = new EventEmitter<void>();

  public form!: FormGroup;

  public loading = false;

  private subscriptions = new Subscription();

  constructor(
    private samplesService: SamplesService,
    private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
    this.createForm();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.objectSample) {
      this.updateForm();
    }
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public apply(): void {
    const code = this.form.get('code')!.value;
    const name = this.form.get('name')!.value;
    const dateTimeOfReceipt = this.form.get('dateTimeOfReceipt')!.value;
    const dateTimeOfSampling = this.form.get('dateTimeOfSampling')!.value;
    const target = this.form.get('target')!.value;
    const place = this.form.get('place')!.value;
    const value = this.form.get('value')!.value;

    this.setLoading(true);
    const request = this.objectSample
      ? this.samplesService
        .updateObjectSample(
          this.objectSample.id,
          this.objectPassportId,
          code,
          name,
          dateTimeOfReceipt,
          dateTimeOfSampling,
          target,
          place,
          value,
        )
      : this.samplesService
        .createObjectSample(
          this.objectPassportId,
          code,
          name,
          dateTimeOfReceipt,
          dateTimeOfSampling,
          target,
          place,
          value,
        );

    const saveSubscription = request
      .pipe(
        finalize(() => this.setLoading(false)),
      )
      .subscribe(objectSample => this.objectSampleChanged.emit(objectSample));
    this.subscriptions.add(saveSubscription);
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      code: [null],
      name: [null],
      dateTimeOfReceipt: [null],
      dateTimeOfSampling: [null],
      target: [null],
      place: [null],
      value: [null],
    });
    this.changeDetectorRef.markForCheck();
  }

  private updateForm(): void {
    const value: any = {};
    (
      <(keyof ObjectSample)[]>Object
        .keys(this.form.controls)
    )
      .forEach(key => value[key] = this.objectSample ? this.objectSample[key] : null);

    this.form.setValue(value);
  }

  private setLoading(loading: boolean): void {
    this.loading = loading;
    this.changeDetectorRef.markForCheck();
  }

}
