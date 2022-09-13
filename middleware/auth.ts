import { MiddlewareRedirectEvent } from '../interfaces/middleware.interface';

export default function ({ store, redirect, route }: MiddlewareRedirectEvent) {
  // If the user is not authenticated
  if (!store.state.token && route.name !== 'signup' && route.name !== 'login') {
    return redirect("/login");
  }
}