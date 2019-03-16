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
import { ObjectPassport } from 'src/app/modules/samples/models/object-passport';
import { SamplesService } from 'src/app/modules/samples/samples.service';

@Component({
  selector: 'dc-object-passport',
  templateUrl: './object-passport.component.html',
  styleUrls: ['./object-passport.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ObjectPassportComponent implements OnChanges, OnDestroy {

  @Input()
  public objectPassport!: ObjectPassport | null;

  @Output()
  public objectPassportChanged = new EventEmitter<ObjectPassport>();

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
    if (changes.objectPassport) {
      this.updateForm();
    }
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public apply(): void {
    const code = this.form.get('code')!.value;
    const name = this.form.get('name')!.value;
    const commander = this.form.get('commander')!.value;
    const deputy = this.form.get('deputy')!.value;
    const paramedic = this.form.get('paramedic')!.value;
    const phone = this.form.get('phone')!.value;

    this.setLoading(true);
    const request = this.objectPassport
      ? this.samplesService.updateObjectPassport(this.objectPassport.id, code, name, commander, deputy, paramedic, phone)
      : this.samplesService.createObjectPassport(code, name, commander, deputy, paramedic, phone);

    const saveSubscription = request
      .pipe(
        finalize(() => this.setLoading(false)),
      )
      .subscribe(objectPassport => this.objectPassportChanged.emit(objectPassport));
    this.subscriptions.add(saveSubscription);
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      code: [null],
      name: [null],
      commander: [null],
      deputy: [null],
      paramedic: [null],
      phone: [null],
    });
    this.changeDetectorRef.markForCheck();
  }

  private updateForm(): void {
    const value: any = {};
    (
      <(keyof ObjectPassport)[]>Object
        .keys(this.form.controls)
    )
      .forEach(key => value[key] = this.objectPassport ? this.objectPassport[key] : null);

    this.form.setValue(value);
  }

  private setLoading(loading: boolean): void {
    this.loading = loading;
    this.changeDetectorRef.markForCheck();
  }

}
