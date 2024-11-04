// 动态加载导航栏模板
fetch("nav1.html")
  .then((response) => response.text())
  .then((html) => {
    document.getElementById("nav1").innerHTML = html;
  })
  .catch((error) => {
    console.error("Error loading navigation template:", error);
  });

// 动态加载导航栏模板
fetch("nav2.html")
  .then((response) => response.text())
  .then((html) => {
    document.getElementById("nav2").innerHTML = html;
  })
  .catch((error) => {
    console.error("Error loading navigation template:", error);
  });

function dianZan() {
  let dianZanShuBiaoQian = window.document.getElementById("dzs");
  let dianZanShu = parseInt(dianZanShuBiaoQian.innerText);
  let xinShuzi = dianZanShu + 1;
  dianZanShuBiaoQian.innerText = xinShuzi;
  return;
}

window.onscroll = function () {
  var navbar = document.getElementById("navbar");
  if (window.pageYOffset > 158) {
    navbar.style.position = "fixed";
    navbar.style.top = "0";
  } else {
    navbar.style.position = "relative"; /* 或者不设置position属性 */
    navbar.style.top = ""; /* 清除top样式 */
  }
};

// 假设你有一个用于读取文件的input元素
const inputElement = document.getElementById("input-file");

inputElement.addEventListener("change", function (e) {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: "array" });

    // 假设我们读取第一个工作表
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    // 假设我们读取A1单元格的数字
    const cellValue = worksheet["A1"].v;
    console.log("Cell Value:", cellValue);

    // 如果数字是数值类型，可以转换为Number
    const numericCellValue = Number(cellValue);
    console.log("Numeric Cell Value:", numericCellValue);
  };

  reader.readAsArrayBuffer(file);
});
