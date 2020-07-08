const webdriver = require("selenium-webdriver");
const path =  require("path");

function buildCapabilities() {
  switch (process.env.BROWSER) {
    case "ie": {
      const driverPath = path.join(
        __dirname,
        "../Selenium.WebDriver.IEDriver.3.150.0/driver/"
      );
      process.env.PATH = `${process.env.PATH};${driverPath};`;
      const capabilities = webdriver.Capabilities.ie();
      capabilities.set("ignoreProtectedModeSettings", true);
      capabilities.set("ignoreZoomSetting", true);
      return capabilities;
    }
    // TODO: implement other cases
    default: 
      throw new Error('process.env.BROWSER must be provided')
  }
}

async function main() {
  let driver;
  try {
    const capabilities = await buildCapabilities();
    driver = await new webdriver.Builder()
      .withCapabilities(capabilities)
      .build();

    const storyBookHtmlPath = path.join(
      __dirname,
      "../static/index.html"
    );

    await driver.get(`file:///${storyBookHtmlPath}`);
    const title = await driver.getTitle();
    console.log("title", title);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
  driver && (await driver.quit());
}

main();
