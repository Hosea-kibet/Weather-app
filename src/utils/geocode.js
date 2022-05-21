const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1Ijoia2lwdHVtIiwiYSI6ImNsMml3cDNvczA5NzUzY3FuNGY5aW94dXMifQ.hwQBjHHsgS6JVU-ImaAHIw";
  request({ url, json: true }, (error, response) => {
    if (error) {
      callback(
        "Unable to connect to the locations services/ No internet connection",
        undefined
      );
    } else if (response.body.features.length === 0) {
      callback("unable to find location, Try another search.", undefined);
    } else {
      callback(undefined, {
        latitude: response.body.features[0].center[0],
        longitude: response.body.features[0].center[1],
        location:response.body.features[0].place_name
      });
    }
  });
};

// geocode("New Delhi", (error, data) => {
//   console.log("Error", error);
//   console.log("Data", data);
// });

module.exports = geocode;
