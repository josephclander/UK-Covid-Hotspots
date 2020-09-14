const axios = require('axios');
const rate = require('./rate');
const sort = require('./sort');

const coronaData = async (selection, callback) => {
  let searchType;
  // selection = cases or deaths
  if (selection === 'cases') {
    searchType =
      'structure={"date":"date","areaName":"areaName","new":"newCasesByPublishDate","cum":"cumCasesByPublishDate"}&latestBy=newCasesByPublishDate';
  } else if (selection === 'deaths') {
    searchType =
      'structure={"date":"date","areaName":"areaName","new":"newDeaths28DaysByPublishDate","cum":"cumDeaths28DaysByPublishDate"}&latestBy=newCasesByPublishDate';
  }

  const endpoint =
    'https://api.coronavirus.data.gov.uk/v1/data?' +
    'filters=areaType=utla&' +
    searchType;

  try {
    const { data } = await axios.get(endpoint);
    const rateAdded = rate(data.data);
    const sortedList = sort(rateAdded);
    callback(sortedList);
  } catch (error) {
    callback(error.message);
  }
};

module.exports = coronaData;

// https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=utla&structure={"date":"date","areaName":"areaName","new":"newDeaths28DaysByPublishDate","cum":"cumDeaths28DaysByPublishDate"}&latestBy=newCasesByPublishDate

// https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=utla&structure={"date":"date","areaName":"areaName","new":"newCasesByPublishDate","cum":"cumCasesByPublishDate"}&latestBy=newCasesByPublishDate
