import { CdkPortalOutlet } from '@angular/cdk/portal';
import { ComponentFactoryResolver, Directive, Input, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { MultiPortalsService } from './multi-portals.service';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[namedPortal]',
})
export class NamedPortalOutlet extends CdkPortalOutlet implements OnInit, OnDestroy {
  @Input() public namedPortal!: string;

  constructor(
    public viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private multiPortalsService: MultiPortalsService,
  ) {
    super(componentFactoryResolver, viewContainerRef);

  }

  public override ngOnInit(): void {
    super.ngOnInit();
    this.register();
  }

  public override ngOnDestroy() {
    super.ngOnDestroy();
    this.destroy();
  }

  private register(): void {
    this.multiPortalsService.registerOutlet(this.namedPortal, this);
  }

  private destroy(): void {
    this.multiPortalsService.removeOutlet(this.namedPortal);
  }
}
