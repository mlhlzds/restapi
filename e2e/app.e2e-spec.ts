import { RestapiPage } from './app.po';

describe('restapi App', () => {
  let page: RestapiPage;

  beforeEach(() => {
    page = new RestapiPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
