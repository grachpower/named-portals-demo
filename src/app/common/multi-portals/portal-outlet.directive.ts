import { CdkPortalOutlet } from '@angular/cdk/portal';
import { ComponentFactoryResolver, Directive, Input, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { MultiPortalsService } from './multi-portals.service';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[namedPortal]',
})
export class NamedPortalOutlet extends CdkPortalOutlet implements OnInit, OnDestroy {
  @Input()
  public set namedPortal(name: string | undefined | null) {
    if (!!name && !!this._namedPortal && name !== this.namedPortal) {
      this.destroy()
    }

    if (!!name) {
      this._namedPortal = name;
      this.register();
    }
  }
  public get namedPortal(): string | undefined | null {
    return this._namedPortal;
  }
  private _namedPortal!: string;

  constructor(
    public viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private multiPortalsService: MultiPortalsService,
  ) {
    super(componentFactoryResolver, viewContainerRef);
  }

  public override ngOnDestroy() {
    super.ngOnDestroy();
    this.destroy();
  }

  private register(): void {
    this.multiPortalsService.registerOutlet(this._namedPortal, this);
  }

  private destroy(): void {
    this.multiPortalsService.removeOutlet(this._namedPortal);
  }
}
