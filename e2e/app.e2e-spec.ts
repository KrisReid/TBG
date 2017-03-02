import { TBGPage } from './app.po';

describe('tbg App', () => {
  let page: TBGPage;

  beforeEach(() => {
    page = new TBGPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
