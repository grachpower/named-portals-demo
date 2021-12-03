import { ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import { ComponentRef, Injectable, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { ComponentPropsToPredefine, CreateComponentPortalParams, CreateComponentPortalResult, CreatePortalParams, CreatePortalResult, CreateTemplatePortalParams, CreateTemplatePortalResult } from './multi-portals.types';
import { NamedPortalOutlet } from './portal-outlet.directive';

@Injectable({
  providedIn: 'root',
})
export class MultiPortalsService {
  private portalOutletsMap = new Map<string, NamedPortalOutlet>();

  public hasOutlet(outletName: string): boolean {
    return this.portalOutletsMap.has(outletName);
  }

  public getOutlet(outletName: string): NamedPortalOutlet | null {
    if (!this.hasOutlet(outletName)) {
      return null;
    }

    return this.portalOutletsMap.get(outletName) ?? null;
  }

  public hasAttachedToOutlet(outletName: string): boolean {
    if (this.hasOutlet(outletName)) {
      const outlet = this.portalOutletsMap.get(outletName);
      return !!outlet?.portal;
    }

    console.warn(`Portal outlet '${outletName}' not registered`);
    return false;
  }

  public attach<T>(params: CreateComponentPortalParams<T>): CreateComponentPortalResult<T>;
  public attach<T>(params: CreateTemplatePortalParams<T>): CreateTemplatePortalResult<T>;
  public attach<T>(params: CreatePortalParams<T>): CreatePortalResult<T> | null {
    if (!this.hasOutlet(params.outletName)) {
      // throw new Error(`Cannot attach portal. Outlet '${params.outletName}' not registered.`);
      console.warn(`Cannot attach portal. Outlet '${params.outletName}' not registered.`);
      return null;
    }

    const outlet: NamedPortalOutlet = this.portalOutletsMap.get(params.outletName)!;

    if ('componentType' in params) {
      return this.initComponentPortal(outlet, params);
    }

    if ('templateRef' in params) {
      return this.initTemplatePortal(outlet, params);
    }

    throw new Error('Portal is not Component or Template');
  }

  public detach(outletName: string): void {
    if (!this.portalOutletsMap.has(outletName)) {
      return;
    }

    const outlet = this.portalOutletsMap.get(outletName);
    outlet!.detach();

  }

  public registerOutlet(name: string, outlet: NamedPortalOutlet): void {
    if (this.portalOutletsMap.has(name)) {
      return;
    }

    this.portalOutletsMap.set(name, outlet);
  }

  public removeOutlet(name: string): void {
    if (this.portalOutletsMap.has(name)) {
      this.portalOutletsMap.delete(name);
    }
  }

  private initComponentPortal<T>(outlet: NamedPortalOutlet, params: CreateComponentPortalParams<T>): CreateComponentPortalResult<T> {
    const portal = new ComponentPortal(params.componentType);
    const componentRef = outlet.attachComponentPortal(portal);

    this.initComponentDefaults(componentRef, params?.initialProps);

    return {
      outlet,
      portal,
      componentRef,
    };
  }

  private initTemplatePortal<T>(outlet: NamedPortalOutlet, params: CreateTemplatePortalParams<T>): CreateTemplatePortalResult<T> {
    const portal = new TemplatePortal(params.templateRef, outlet.viewContainerRef, params.context);
    const embeddedViewRef = outlet.attachTemplatePortal(portal);

    return {
      outlet,
      portal,
      embeddedViewRef,
    };
  }

  private initComponentDefaults<T>(componentRef: ComponentRef<T>, initialProps?: ComponentPropsToPredefine<T> | undefined | null): void {
    if (!componentRef || !initialProps) {
      return;
    }

    const changes: SimpleChanges = Object.keys(initialProps)
      .reduce((acc: SimpleChanges, key: string | number) => {
        const change = new SimpleChange(null, (initialProps as any)[key], true);
        return {
          ...acc,
          [key]: change,
        };
      }, {});

    const instance: T = componentRef.instance;

    Object.keys(initialProps)
      .forEach((key: string) => {
        (instance as any)[key] = (initialProps as any)[key];
      });

    if ('ngOnChanges' in instance) {
      (instance as T & OnChanges).ngOnChanges(changes);
    }

    componentRef.changeDetectorRef.detectChanges();
  }
}
