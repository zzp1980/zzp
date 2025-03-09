const starts = document.getElementById("starts");
const grid = document.getElementById("grid");
const start = document.getElementById("start");
const time = document.getElementById("time");
const rest = document.getElementById("rest");
const timeS = document.getElementById("times");
const button1 = document.getElementById("bts1");
const button2 = document.getElementById("bts2");
const button3 = document.getElementById("bts3");
const button4 = document.getElementById("bts4");
input1.value = 5;
input2.value = 5;
input3.value = 2;
console.log(input1, input2, input3);
let row, col, num, rests, timers, rightClicks, mineNumber, seconds, times;

//载入阶段
Ready();
function Ready() {
  while (grid.firstChild) {
    grid.removeChild(grid.firstChild);
  }
  starts.innerText = "进行中";
  time.innerText = "用时：0 秒";
  rightClicks = 0;
  mineNumber = 0;
  seconds = 0;
  times = 0;
  row = Number(input1.value);
  col = Number(input2.value);
  num = Number(input3.value);
  if (num > row * col) {
    alert("出错了：雷数不能多于网格数量！");
    return;
  }
  rests = num;
  rest.innerText = "|" + " 剩余：" + rests + " 颗雷";
  timeS.innerText = "|" + " 点击次数：" + times;
  grids();
  mines();
  nums();
  grid.addEventListener("click", myClick);
  grid.addEventListener("contextmenu", myRightClick);
  clearInterval(timers);
  timers = setInterval(timer, 1000);
}

function timer() {
  seconds++;
  time.innerText = "用时：" + seconds + "  秒";
}

//点击事件
function myClick(event) {
  times++;
  timeS.innerText = "|" + " 点击次数：" + times;
  let target = event.target; // 获取点击的元素
  if (target.className != "newCol") {
    return;
  }
  if (target.innerText == "雷") {
    GameOver();
    target.className = "failling";
    return;
  }
  target.className = "click";
  if (target.innerText == "") {
    let ID = target.id;
    let x = Number(ID.substr(2, 2));
    let y = Number(ID.substr(4, 2));
    zero(x, y);
    searchNull();
  }

  win();
}

//胜利判断
function win() {
  mineNumber = 0;
  for (i = 0; i < row; i++) {
    for (j = 0; j < col; j++) {
      let I = i.toString().padStart(2, "0");
      let J = j.toString().padStart(2, "0");
      let leiZaiNa = document.getElementById("ID" + I + J);
      if (leiZaiNa.className != "newCol") {
        mineNumber++;
      }
    }
  }
  if (mineNumber == row * col) {
    clearInterval(timers);
    grid.removeEventListener("click", myClick);
    grid.removeEventListener("contextmenu", myRightClick);
    starts.innerText = "恭喜你，胜利了！";
  }
}

//右击事件
function myRightClick(event) {
  event.preventDefault();
  let target = event.target; // 获取点击的元素
  if (target.className == "rightClick") {
    target.className = "newCol";
    rightClicks--;
    rests++;
  } else if (rightClicks >= num) {
    alert("右击数不能超过雷数哦！");
  } else {
    target.className = "rightClick";
    rightClicks++;
    rests--;
  }
  rest.innerText = "|" + " 剩余：" + rests + " 颗雷";
  times++;
  timeS.innerText = "|" + " 点击次数：" + times;
  win();
}

//游戏结束
function GameOver() {
  for (let i = 0; i < row; i++) {
    if (times == 1) {
      Ready();
      alert("踩雷了，已为您重置地雷。");
      return;
    }
    for (let j = 0; j < col; j++) {
      let I = i.toString().padStart(2, "0");
      let J = j.toString().padStart(2, "0");
      let leiZaiNa = document.getElementById("ID" + I + J);
      if (leiZaiNa.innerText == "雷") {
        leiZaiNa.className = "failed";
      }

      starts.innerText = "很遗憾，你失败了！";
    }
  }
  clearInterval(timers);
  grid.removeEventListener("click", myClick);
  grid.removeEventListener("contextmenu", myRightClick);
}

//重新开始按钮事件
start.addEventListener("click", function () {
  Ready();
});

//生成网格
function grids() {
  for (let i = 0; i < row; i++) {
    let newRow = document.createElement("div");
    newRow.id = "newRow";
    grid.appendChild(newRow);
    for (let j = 0; j < col; j++) {
      let newCol = document.createElement("div");
      newCol.className = "newCol";
      let I = i.toString().padStart(2, "0");
      let J = j.toString().padStart(2, "0");
      newCol.id = "ID" + I + J;
      newRow.appendChild(newCol);
    }
  }
}

//生成地雷
function mines() {
  let NUM = 0;
  for (let i = 0; i < 1000; i++) {
    let A = Math.floor(Math.random() * row);
    let B = Math.floor(Math.random() * col);
    let I = A.toString().padStart(2, "0");
    let J = B.toString().padStart(2, "0");
    let ID = document.getElementById("ID" + I + J);
    let text = ID.innerText;

    if (text == "雷") {
      continue;
    }
    ID.innerText = "雷";
    NUM++;
    if (NUM == num) {
      return;
    }
  }
}

//填写数字
function nums() {
  let NUM = 0;
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      let I = i.toString().padStart(2, "0");
      let J = j.toString().padStart(2, "0");
      nowDiv = document.getElementById("ID" + I + J);
      if (nowDiv.innerText == "雷") {
        continue;
      }
      for (let ii = i - 1; ii <= i + 1; ii++) {
        if (ii < 0 || ii >= row) {
          continue;
        }
        for (let jj = j - 1; jj <= j + 1; jj++) {
          if (jj < 0 || jj >= col) {
            continue;
          }
          let II = ii.toString().padStart(2, "0");
          let JJ = jj.toString().padStart(2, "0");
          let itDiv = document.getElementById("ID" + II + JJ);
          if (itDiv.innerText == "雷") {
            NUM++;
          } else {
            continue;
          }
        }
      }
      if (NUM == 0) {
        continue;
      }
      nowDiv.innerText = NUM;
      NUM = 0;
    }
  }
}

//查找空值并展开周围
function searchNull() {
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      let I = i.toString().padStart(2, "0");
      let J = j.toString().padStart(2, "0");
      let thisDiv = document.getElementById("ID" + I + J);
      if (thisDiv.className == "click") {
        if (thisDiv.innerText == "") {
          ID = thisDiv.id;
          x = Number(ID.substr(2, 2));
          y = Number(ID.substr(4, 2));
          zero(x, y);
        }
      }
    }
  }
  for (let i = row - 1; i >= 0; i--) {
    for (let j = col - 1; j >= 0; j--) {
      let I = i.toString().padStart(2, "0");
      let J = j.toString().padStart(2, "0");
      let thisDiv = document.getElementById("ID" + I + J);
      if (thisDiv.className == "click") {
        if (thisDiv.innerText == "") {
          ID = thisDiv.id;
          x = Number(ID.substr(2, 2));
          y = Number(ID.substr(4, 2));
          zero(x, y);
        }
      }
    }
  }
}

//点击为空时展开周围
function zero(x, y) {
  for (let i = x - 1; i <= x + 1; i++) {
    if (i < 0 || i >= row) {
      continue;
    }
    for (let j = y - 1; j <= y + 1; j++) {
      if (j < 0 || j >= col) {
        continue;
      }
      let I = i.toString().padStart(2, "0");
      let J = j.toString().padStart(2, "0");
      let itDiv = document.getElementById("ID" + I + J);
      itDiv.className = "click";
    }
  }
}

//取消右键菜单
document.oncontextmenu = function () {
  return false;
};

//初级效果
button1.addEventListener("click", function () {
  input1.value = 5;
  input2.value = 5;
  input3.value = 2;
  Ready();
});

//中级效果
button2.addEventListener("click", function () {
  input1.value = 7;
  input2.value = 7;
  input3.value = 7;
  Ready();
});

//高级效果
button3.addEventListener("click", function () {
  input1.value = 10;
  input2.value = 10;
  input3.value = 10;
  Ready();
});

//特级效果
button4.addEventListener("click", function () {
  input1.value = 15;
  input2.value = 15;
  input3.value = 30;
  Ready();
});

//双击事件
//左右键同时点击事件
