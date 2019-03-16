import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TitleService } from 'src/app/ui/common/services/title.service';

@Component({
  templateUrl: './samples.component.html',
  styleUrls: ['./samples.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SamplesComponent {
  constructor(private titleService: TitleService) {
    this.titleService.setTitle('Отчет по пробам');
  }
}
