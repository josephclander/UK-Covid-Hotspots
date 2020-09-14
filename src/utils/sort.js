// expected data format received
// raw = [..{
// "date": "2020-09-07",
// "areaName": "Aberdeenshire",
// "newCases": 2,
// "cumCases": 635
// "cumCasesPercentIncrease": 0.31
// }..]
const sort = (list) => {
  const sorted = list.sort((a, b) => {
    return b.cumPercentIncrease - a.cumPercentIncrease;
  });
  return sorted;
};

module.exports = sort;
