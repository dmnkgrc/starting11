import { AppPage } from "./app.po";
import { browser, logging, by, element } from "protractor";
import * as utf8 from "utf8";

describe("workspace-project App", () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it("should display the correct jersey svg", () => {
    page.navigateTo();
    expect(page.getJersey().isPresent()).toBe(true);
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser
      .manage()
      .logs()
      .get(logging.Type.BROWSER);
    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE
      })
    );
  });
});
