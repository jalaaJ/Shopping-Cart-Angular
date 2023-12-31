import {
  RouteReuseStrategy,
  ActivatedRouteSnapshot,
  DetachedRouteHandle,
} from "@angular/router";

export class CustomReuseStrategy implements RouteReuseStrategy {
  private storedRoutes = new Map<string, DetachedRouteHandle>();

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return !!route.routeConfig && route.routeConfig.path === "cart";
  }

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    const routeConfigPath = route.routeConfig?.path;
    if (typeof routeConfigPath === 'string') {
      this.storedRoutes.set(routeConfigPath, handle);
    }
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    const routeConfigPath = route.routeConfig?.path;
    return !!routeConfigPath && !!this.storedRoutes.get(routeConfigPath);
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    return route.routeConfig?.path
      ? this.storedRoutes.get(route.routeConfig.path) || null
      : null;
  }

  shouldReuseRoute(
    future: ActivatedRouteSnapshot,
    curr: ActivatedRouteSnapshot
  ): boolean {
    return future.routeConfig === curr.routeConfig;
  }
}