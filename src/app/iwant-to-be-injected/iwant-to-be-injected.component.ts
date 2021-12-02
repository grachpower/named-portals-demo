import { Component, ChangeDetectionStrategy, Input, SimpleChanges, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-iwant-to-be-injected',
  templateUrl: './iwant-to-be-injected.component.html',
  styleUrls: ['./iwant-to-be-injected.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IwantToBeInjectedComponent {
  @Input() text: string | undefined;

  constructor(public cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Changes: ', changes);
  }

  ngOnInit(): void {
    console.log('Init injected component');
  }
}
