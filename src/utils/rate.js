const rate = (raw) => {
  // expected data format received
  // raw = [..{
  // "date": "2020-09-07",
  // "areaName": "Aberdeenshire",
  // "newCases": 2,
  // "cumCases": 635
  // }..]
  let rateAddedArray = [];
  raw.forEach((obj) => {
    if (obj.new > 0) {
      let rate = obj.new / (obj.cum - obj.new);
      rate = rate * 10000;
      const twoDP = Math.round(rate) / 100;
      obj.cumPercentIncrease = twoDP;
      rateAddedArray.push(obj);
    }
  });

  return rateAddedArray;
};

module.exports = rate;
