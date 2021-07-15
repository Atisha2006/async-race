import './styles.scss';
import { App } from './components/app/app';

const rootNode: HTMLElement = document.body;

window.onload = () => {
  if (window.location.hash.slice(1)) window.location.hash = '/';
  new App(rootNode).render();
};
