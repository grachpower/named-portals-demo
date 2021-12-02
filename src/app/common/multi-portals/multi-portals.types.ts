import { ComponentType } from '@angular/cdk/overlay';
import { ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import {
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Injector,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { NamedPortalOutlet } from './portal-outlet.directive';

// ============ Result portal Types ============== ///

export interface BaseCreatePortalResult {
  outlet: NamedPortalOutlet;
}

export interface CreateComponentPortalResult<T> extends BaseCreatePortalResult {
  portal: ComponentPortal<T>;
  componentRef: ComponentRef<T>;
}

export interface CreateTemplatePortalResult<T> extends BaseCreatePortalResult {
  portal: TemplatePortal<T | null>;
  embeddedViewRef: EmbeddedViewRef<T | null>;
}

export type CreatePortalResult<T> = CreateComponentPortalResult<T> | CreateTemplatePortalResult<T>;

// ============ Create portal Types ============== ///

export interface BaseCreatePortalParams {
  outletName: string;
}

export type ComponentPropsToPredefine<T> = {
  [P in keyof T]?: T[P];
};

export interface CreateComponentPortalParams<T> extends BaseCreatePortalParams {
  componentType: ComponentType<T>;
  initialProps?: ComponentPropsToPredefine<T> | null;
  viewContainerRef?: ViewContainerRef | null;
  injector?: Injector | null;
  componentFactoryResolver?: ComponentFactoryResolver | null;
}

export interface CreateTemplatePortalParams<T> extends BaseCreatePortalParams {
  templateRef: TemplateRef<T>;
  context?: T | null;
}

export type CreatePortalParams<T> = CreateComponentPortalParams<T> | CreateTemplatePortalParams<T>;
