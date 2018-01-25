import { WorkschainFrontPage } from './app.po';

describe('workschain-front App', () => {
  let page: WorkschainFrontPage;

  beforeEach(() => {
    page = new WorkschainFrontPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
