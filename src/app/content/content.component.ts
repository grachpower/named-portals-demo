import { AfterViewInit, ChangeDetectorRef, TemplateRef } from '@angular/core';
import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { MultiPortalsService } from '../common/multi-portals/multi-portals.service';
import { IwantToBeInjectedComponent } from '../iwant-to-be-injected/iwant-to-be-injected.component';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentComponent implements OnInit, AfterViewInit {
  @ViewChild('templateToPass', {static: true, read: TemplateRef}) temp!: TemplateRef<unknown>;

  constructor(
    private mps: MultiPortalsService,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.injectComponent();
    this.injectTemplate();
  }

  ngAfterViewInit(): void {
    
  }

  injectComponent(): void {
    const result = this.mps.attach({
      outletName: 'my-portal-1',
      componentType: IwantToBeInjectedComponent,
      initialProps: {text: `I'm provided text through component`},
    });

    setTimeout(() => {
      result.componentRef.instance.text = `i'm changed text im component`;
      result.componentRef.instance.cdr.markForCheck();

      result.componentRef.instance.user.subscribe();
      console.log('Do it');
    }, 2000);
  }

  injectTemplate(): void {
    const res = this.mps.attach({
      outletName: 'my-portal-2',
      templateRef: this.temp,
      context: {$implicit: 'provided text though context'}
    })

    this.cdr.markForCheck();
  }

}
