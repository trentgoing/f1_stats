import { F1PublicPage } from './app.po';

describe('f1-public App', function() {
  let page: F1PublicPage;

  beforeEach(() => {
    page = new F1PublicPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
