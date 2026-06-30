const rateEndpoint = "https://api.frankfurter.dev/v1/latest?from=USD&to=CNY";

const state = {
  direction: "intl-to-cn",
};

const tabs = document.querySelectorAll(".tab");
const priceInput = document.querySelector("#price");
const rateInput = document.querySelector("#rate");
const priceLabel = document.querySelector("#priceLabel");
const priceUnit = document.querySelector("#priceUnit");
const resultValue = document.querySelector("#resultValue");
const resultUnit = document.querySelector("#resultUnit");
const statusEl = document.querySelector("#status");
const rateDate = document.querySelector("#rateDate");

function setStatus(message, type = "") {
  statusEl.textContent = message;
  statusEl.className = type ? `status ${type}` : "status";
}

function setDirection(direction) {
  state.direction = direction;
  tabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.direction === direction);
    tab.setAttribute("aria-selected", String(tab.dataset.direction === direction));
  });

  if (direction === "intl-to-cn") {
    priceLabel.textContent = "国际金价";
    priceUnit.textContent = "美元/盎司";
    priceInput.placeholder = "例如 2300";
    resultUnit.textContent = "结果单位：人民币/克";
  } else {
    priceLabel.textContent = "国内金价";
    priceUnit.textContent = "人民币/克";
    priceInput.placeholder = "例如 536";
    resultUnit.textContent = "结果单位：美元/盎司";
  }
  resultValue.textContent = "--";
}

async function loadRate() {
  setStatus("正在获取实时汇率...");
  try {
    const response = await fetch(rateEndpoint, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const data = await response.json();
    const rate = Number(data?.rates?.CNY);
    if (!Number.isFinite(rate) || rate <= 0) {
      throw new Error("汇率响应缺少 CNY");
    }
    rateInput.value = rate.toFixed(4);
    rateDate.textContent = data.date ? `汇率日期：${data.date}` : "汇率日期：--";
    setStatus("汇率已更新，也可以手动修改。");
  } catch (error) {
    setStatus("自动汇率暂不可用，请手动输入美元兑人民币汇率。", "warn");
    rateDate.textContent = "汇率日期：--";
  }
}

function convert() {
  try {
    const price = Number(priceInput.value);
    const rate = Number(rateInput.value);
    const result =
      state.direction === "intl-to-cn"
        ? GoldPriceConverter.internationalToDomestic(price, rate)
        : GoldPriceConverter.domesticToInternational(price, rate);

    resultValue.textContent = result.toFixed(2);
    resultUnit.textContent = state.direction === "intl-to-cn" ? "人民币/克" : "美元/盎司";
    setStatus("换算完成。");
  } catch (error) {
    resultValue.textContent = "--";
    resultUnit.textContent = "请检查输入";
    setStatus("请输入大于 0 的金价和汇率。", "error");
  }
}

tabs.forEach((tab) => tab.addEventListener("click", () => setDirection(tab.dataset.direction)));
document.querySelector("#refreshRate").addEventListener("click", loadRate);
document.querySelector("#convert").addEventListener("click", convert);
priceInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") convert();
});
rateInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") convert();
});

setDirection(state.direction);
loadRate();
