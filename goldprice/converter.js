(function (global) {
  const TROY_OUNCE_IN_GRAMS = 31.1034768;

  function assertPositiveNumber(value, name) {
    const number = Number(value);
    if (!Number.isFinite(number) || number <= 0) {
      throw new Error(`${name} must be greater than 0`);
    }
    return number;
  }

  function internationalToDomestic(priceUsdPerOunce, usdCnyRate) {
    const price = assertPositiveNumber(priceUsdPerOunce, "price");
    const rate = assertPositiveNumber(usdCnyRate, "rate");
    return (price * rate) / TROY_OUNCE_IN_GRAMS;
  }

  function domesticToInternational(priceCnyPerGram, usdCnyRate) {
    const price = assertPositiveNumber(priceCnyPerGram, "price");
    const rate = assertPositiveNumber(usdCnyRate, "rate");
    return (price * TROY_OUNCE_IN_GRAMS) / rate;
  }

  const api = {
    TROY_OUNCE_IN_GRAMS,
    internationalToDomestic,
    domesticToInternational,
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  } else {
    global.GoldPriceConverter = api;
  }
})(typeof window !== "undefined" ? window : globalThis);
