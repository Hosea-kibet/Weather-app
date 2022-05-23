const request = require("request");

// const forecast = (latitude, longitude, callback) => {
//   const url =
//     "http://api.weatherstack.com/current?access_key=490b128aadf675f79fc13883376cae64&query=" +
//     latitude +
//     "," +
//     longitude +
//     "&units=f";

//   request({ url: url, json: true }, (error, response) => {
//     if (error) {
//       callback("Unable to connect to weather service!", undefined);
//     } else if (response.body.error) {
//       callback("Unable able to find location", undefined);
//     } else {
//       callback(
//         undefined,
//         response.body.current.weather_descriptions[0] +
//           ". It is currently " +
//           response.body.current.temperature +
//           " degrees out. It feels like " +
//           response.body.current.feelslike +
//           " degrees out."
//       );
//     }
//   });
// };

//Refactor forecast
const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=490b128aadf675f79fc13883376cae64&query=" +
    latitude +
    "," +
    longitude +
    "";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable able to find location", undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          ". It is currently " +
          body.current.temperature +
          " degrees out. It feels like " +
          body.current.feelslike +
          " degrees out." +
          "The humidity is " +
          body.current.humidity
         
      );
    }
  });
};

// forecast(40.0115,-75.1327,  (error, data) => {
//   console.log('Error', error)
//   console.log('Data', data)
// })

module.exports = forecast;
