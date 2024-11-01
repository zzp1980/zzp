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

window.onscroll = function() {
  var navbar = document.getElementById("navbar");
  if (window.pageYOffset > 158) {
      navbar.style.position = "fixed";
      navbar.style.top = "0";
  } else {
      navbar.style.position = "relative"; /* 或者不设置position属性 */
      navbar.style.top = ""; /* 清除top样式 */
  }
};

