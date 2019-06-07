// import {getDocument, queries} from 'pptr-testing-library';

describe('Index', () => {
  // const {getByTestId, getByText, getNodeText} = queries;

  beforeAll(async () => {
    page.setViewport({width: 1200, height: 800});
    await page.goto('http://localhost:8888');
  });

  it('This is a boilerplate for Vue.js"', async () => {
    await page.waitFor(1000);
    const h1 = await page.$eval('h1', el => el.textContent);
    await expect(h1).toBe('This is a boilerplate for Vue.js');
  });
});
