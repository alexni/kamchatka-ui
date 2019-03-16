import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import * as moment from 'moment';
import { DateTimeAdapter, OWL_DATE_TIME_FORMATS, OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
import { MomentDateTimeAdapter } from 'ng-pick-datetime/date-time/adapter/moment-adapter/moment-date-time-adapter.class';
import { Subscription } from 'rxjs';
import { delay, filter, map } from 'rxjs/operators';
import {
  ChangeEventFn,
  defaultChangeEventFn,
  defaultTouchEventFn,
  defaultValidateEventFn,
  TouchEventFn,
  ValidateEventFn,
} from 'src/app/ui/common/helpers/control-value-accessor.defaults';

export const DATE_FORMATS = {
  parseInput: 'YYYY-MM-DD HH:mm:ss',
  fullPickerInput: 'YYYY-MM-DD HH:mm:ss',
  datePickerInput: 'YYYY-MM-DD',
  timePickerInput: 'HH:mm:ss',
  monthYearLabel: 'MMM YYYY',
  dateA11yLabel: 'YYYY-MM-DD',
  monthYearA11yLabel: 'MMMM YYYY',
};

@Component({
  selector: 'dc-date-time-picker-control',
  templateUrl: './date-time-picker-control.component.html',
  styleUrls: ['./date-time-picker-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateTimePickerControlComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DateTimePickerControlComponent),
      multi: true,
    },
    { provide: DateTimeAdapter, useClass: MomentDateTimeAdapter, deps: [OWL_DATE_TIME_LOCALE] },
    { provide: OWL_DATE_TIME_FORMATS, useValue: DATE_FORMATS },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateTimePickerControlComponent implements OnInit, OnDestroy, ControlValueAccessor, Validator {

  @Input()
  public placeholder = 'Дата и время';

  public control!: FormControl;

  private touchEventHandler: TouchEventFn = defaultTouchEventFn;

  private changeEventHandler: ChangeEventFn<string> = defaultChangeEventFn;

  private validatorChange: ValidateEventFn = defaultValidateEventFn;

  private controlSubscriptions = new Subscription();

  private lastValue: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
  }

  public ngOnInit(): void {
    this.initialControl();
  }

  public writeValue(value: string | null): void {
    const inputData = this.createInputDataFromValue(value);

    this.lastValue = value;
    this.control.setValue(inputData);
  }

  public registerOnChange(fn: ChangeEventFn<string>): void {
    this.changeEventHandler = fn;
  }

  public registerOnTouched(fn: TouchEventFn): void {
    this.touchEventHandler = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.control.disable({ emitEvent: false });
    } else {
      this.control.enable({ emitEvent: false });
    }
    this.changeDetectorRef.markForCheck();
  }

  public registerOnValidatorChange(fn: ValidateEventFn): void {
    this.validatorChange = fn;
    const changeStatusSubscription = this.control
      .valueChanges
      .pipe(
        delay(1),
      )
      .subscribe(() => this.validatorChange());
    this.controlSubscriptions.add(changeStatusSubscription);
  }

  public validate(control: AbstractControl): ValidationErrors | null {
    if (control.invalid) {
      return { 'dc-date-time-picker-control': true };
    }

    return null;
  }

  public ngOnDestroy(): void {
    this.controlSubscriptions.unsubscribe();
  }

  public createInputDataFromValue(value: string | null): moment.Moment | null {
    if (!value) {
      return null;
    }

    return moment(value);
  }

  public createValueFromInputData(value: moment.Moment | null): string | null {
    if (!value) {
      return null;
    }

    return value.format('YYYY-MM-DD HH:mm:ss');
  }

  private createControl(): FormControl {
    return this.formBuilder.control(null);
  }

  private initialControl(): void {
    this.control = this.createControl();
    const changeValueSubscription = this.control
      .valueChanges
      .pipe(
        delay(1),
        map(rawValue => {
          this.touchEventHandler();
          return rawValue;
        }),
        map(rawValue => this.createValueFromInputData(rawValue)),
        filter(value => value !== this.lastValue),
      )
      .subscribe(value => {
        this.lastValue = value;
        this.changeEventHandler(value);
        this.changeDetectorRef.markForCheck();
      });
    this.controlSubscriptions.add(changeValueSubscription);

    this.validatorChange();
  }

}
