import { LwsmPage } from './app.po';

describe('lwsm App', () => {
  let page: LwsmPage;

  beforeEach(() => {
    page = new LwsmPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
