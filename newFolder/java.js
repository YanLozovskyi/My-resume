const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {
  const browser = await puppeteer.launch({ headless: true }); // Здесь используйте true, чтобы окно браузера было скрыто
  const page = await browser.newPage();

  // Загрузите ваше HTML-резюме
  await page.goto(`file://${__dirname}/index.html`, {
    waitUntil: "networkidle0",
  });

  // Генерируйте PDF
  const pdfBuffer = await page.pdf({
    path: "resume.pdf",
    format: "A3",
    printBackground: true,
  });

  // Сохраните PDF в файл
  try {
    fs.writeFileSync("resume.pdf", pdfBuffer);
    console.log("PDF-файл успешно сохранен");
  } catch (error) {
    console.error("Ошибка при сохранении PDF:", error);
  }

  await browser.close();
})();
