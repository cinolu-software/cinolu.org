import { Component, Input } from '@angular/core';
import { IJob } from '../../../../shared/models/entities.models';

@Component({
  selector: 'app-job-component',
  imports: [],
  templateUrl: './job-component.html',
})
export class JobComponent {
  @Input() job!: IJob;
}
