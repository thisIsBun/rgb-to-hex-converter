// Spec行為：
// 1. 在左邊輸入 RGB數字後，focusout時 RGB色磚會同步變色，讓使用者確認該 RGB顏色是否符合設定
// 2. RGB裡只能輸入 0~255整數
// 3. RGB輸入完後，按 Convert按鍵後，右邊會轉換成 HEX字串及色磚
// 4. 若 RGB沒輸入則以 0帶入

//  JS實作：

// 第一部：處理 RGB裡 input值輸入後的行為

// 宣告 RGB的 input, brick變數
const rInput = document.querySelector(".R-input");
const rBrick = document.querySelector(".R-brick");

const gInput = document.querySelector(".G-input");
const gBrick = document.querySelector(".G-brick");

const bInput = document.querySelector(".B-input");
const bBrick = document.querySelector(".B-brick");

// 在 R input放監聽器，監聽 focusout行為，發生時改變 R-brick色磚顏色
rInput.addEventListener("focusout", function () {
  fixInputValue(rInput);
  rBrick.style.backgroundColor = `rgb(${rInput.value}, 0, 0)`;
});

// 在 G input放監聽器，監聽 focusout行為，發生時改變 G-brick色磚顏色
gInput.addEventListener("focusout", function () {
  fixInputValue(gInput);
  gBrick.style.backgroundColor = `rgb(0,${gInput.value}, 0)`;
});

// 在 B input放監聽器，監聽 focusout行為，發生時改變 B-brick色磚顏色
bInput.addEventListener("focusout", function () {
  fixInputValue(bInput);
  bBrick.style.backgroundColor = `rgb(0, 0,${bInput.value})`;
});

// 函式：處理 input值輸入非 0~255時，input.value該回傳什麼值在 UI上顯示
function fixInputValue(input) {
  //當 input < 0時 -> input.value回傳 0
  if (input.value < 0) {
    input.value = 0;

    //當 input > 255時 -> input.value回傳 255
  } else if (input.value > 255) {
    input.value = 255;

    //當 input 非整數 -> input.value會四捨五入
  } else if (Math.round(input.value) !== input.value) {
    input.value = Math.round(input.value);
  }
  return input.value;
}

// 第二步，處理 Convert鍵按下後的行為

// 宣告 按鈕、HEX標籤、HEX色磚為變數
const btn = document.querySelector("button");
const hexLabel = document.querySelector("#hex-label");
const bigBrick = document.querySelector(".color-brick-big");

// 在 btn放監聽器，監聽 click行為，發生時 RGB數值要轉成HEX標籤、且 HEX色磚上色
btn.addEventListener("click", function () {
  // 宣告 hex變數，這是 HEX標籤的 innerText
  let hex = "";

  // RGB字串轉數值，再放到 rgbToHex函式轉成 HEX數值後，放進 hex裡
  hex += rgbToHex(Number(rInput.value));
  hex += rgbToHex(Number(gInput.value));
  hex += rgbToHex(Number(bInput.value));

  // 將 hex放進 HEX標籤裡
  hexLabel.innerText = hex;

  // 用 hex改變 HEX色磚背景色
  bigBrick.style.backgroundColor = `#${hex}`;
});

// 函式：處理 RGB數值轉 HEX字串
function rgbToHex(num) {
  //處理當 HEX字串只有一位數時，前面要補"0"
  let hexNum = num.toString(16);
  if (hexNum.length < 2) {
    hexNum = "0" + hexNum;
  }
  return hexNum;
}
