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
