$(document).ready(function() {
  $('#location-form').submit(function(event) {
    event.preventDefault();
    const location = $('#location-input').val();
    const apiKey = 'your-API-KEY'; // replace with your API key from Taiwan Central Weather Bureau
    const url = `https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?locationName=${location}&Authorization=${apiKey}&format=JSON`;
    $.ajax(url).done(function(response) {
      const locationName = response.records.location[0].locationName;
      const weather = response.records.location[0].weatherElement[0].time[0].parameter.parameterName;
      const startTime = response.records.location[0].weatherElement[0].time[0].startTime
      const endTime = response.records.location[0].weatherElement[0].time[0].endTime
      const minTemp = response.records.location[0].weatherElement[2].time[0].parameter.parameterName;
      const maxTemp = response.records.location[0].weatherElement[4].time[0].parameter.parameterName;
      const weatherString = `${locationName},${weather}<br>預報有效時間從${startTime}到${endTime}<br>最低溫: ${minTemp}℃<br>最高溫: ${maxTemp}℃`;
      $('#weather-results').html(weatherString);
    }).fail(function() {
      $('#weather-results').html('Error retrieving weather data. Please try again.');
    });
  });
});