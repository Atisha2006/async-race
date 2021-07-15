import {
  BASE,
  EngineApi,
  EngineService,
  GarageApi,
  GarageService,
  Router,
  States,
  WinnersApi,
  WinnersService
} from '../../core';
import { IContent } from '../../models';
import { NavButton } from '../../shared';
import { GarageModule, WinnersModule } from '../contentModules';
import { Navbar } from '../navbar';
import { Controller } from './controller';

export class App {
  private readonly application: HTMLElement;

  private navbar: Navbar;

  private garageModule: GarageModule;

  private winnersModule: WinnersModule;

  private garageApi: GarageApi;

  private garageService: GarageService;

  private engineApi: EngineApi;

  private engineService: EngineService;

  private winnersApi: WinnersApi;

  private winnersService: WinnersService;

  private routeStates = new Map<string, IContent>();

  private router: Router;

  private controller: Controller;

  constructor(private readonly rootElement: HTMLElement) {
    this.navbar = new Navbar();
    this.navbar.append(new NavButton('Garage', 'gear.svg', States.garage, 'active'));
    this.navbar.append(new NavButton('Winners', 'star.svg', States.winners));

    this.application = document.createElement('main');
    this.application.classList.add('main');
    this.garageApi = new GarageApi(BASE);
    this.garageService = new GarageService(this.garageApi);
    this.engineApi = new EngineApi(BASE);
    this.engineService = new EngineService(this.engineApi);
    this.winnersApi = new WinnersApi(BASE);
    this.winnersService = new WinnersService(this.winnersApi);
    this.garageModule = new GarageModule();
    this.winnersModule = new WinnersModule();

    this.routeStates.set(States.garage, this.garageModule);
    this.routeStates.set(States.winners, this.winnersModule);
    this.router = new Router(this.routeStates);
    this.controller = new Controller(
      this.garageModule,
      this.winnersModule,
      this.garageService,
      this.engineService,
      this.winnersService
    );
  }

  render(): HTMLElement {
    this.application.append(this.garageModule.render(), this.winnersModule.render());
    this.rootElement.append(this.navbar.render(), this.application);
    return this.rootElement;
  }
}
