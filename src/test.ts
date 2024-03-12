import { Builder, Capabilities } from 'selenium-webdriver';

async function exampleTest() {
  const capabilities = Capabilities.chrome();
  const driver = await new Builder().withCapabilities(capabilities).build();

  try {
    await driver.get('https://www.example.com');
    console.log('Page title:', await driver.getTitle());
  } finally {
    await driver.quit();
  }
}

exampleTest();