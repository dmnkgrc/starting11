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
    page.getJersey().then(src => {
      console.log(src);
    });
    expect(page.getJersey()).toContain(
      "http://www.w3.org/2000/svg' width='48' height='54' viewBox='0 0 26 30'"
    );
    expect(page.getJersey()).toContain("path");
    expect(page.getJersey()).toContain("data:image/svg+xml");
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
