const { NotionAPI } = require("notion-client");
(async () => {
  const notion = new NotionAPI();
  console.time("notion");
  const data = await notion.getPage("894025db3cfc43529eb4ffaba556852d");
  console.log(data);

  console.timeEnd("notion");
})();
