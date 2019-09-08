import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getDasboardText() {
    return element(
      by.css('app-root .content a.main__dashboard-link')
    ).getText() as Promise<string>;
  }
}
