import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getDasboardText() {
    return element(by.css('.header__dashboard-link')).getText() as Promise<
      string
    >;
  }
}
