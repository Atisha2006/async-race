import { IContent } from '../models';
import { Context } from './context';

export class Router {
  private routes: Map<string, IContent>;

  private context: Context;

  constructor(routes: Map<string, IContent>) {
    this.routes = routes;
    this.context = Context.getInstance();

    window.onpopstate = () => {
      const activeState = this.routes.get(this.context.getActiveState());
      const currentRouteName = window.location.hash.slice(1);
      const module = this.routes.get(currentRouteName);
      if (module) {
        if (activeState) activeState.hide();
        module.show();
        this.context.setActiveState(currentRouteName);
      }
    };
  }
}
