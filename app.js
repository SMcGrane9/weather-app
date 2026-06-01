<!DOCTYPE html>
<html>
<head>
  <title>Buggy SF Weather App</title>
  <style>
    body {
      font-family: Arial;
      background: #dff6ff;
      text-align: center;
      padding-top: 60px;
    }

    .card {
      background: white;
      padding: 25px;
      border-radius: 12px;
      display: inline-block;
      box-shadow: 0 4px 12px #999;
    }
  </style>
</head>
<body>
  <div class="card">
    <h1>🐛 San Francisco Weather</h1>
    <h2 id="time">Loading time...</h2>
    <h2 id="weather">Loading weather...</h2>
  </div>

  <script>
    const latitude = 37.7749;
    const longitude = -122.4194;

    function updateTime() {
      const now = new Date();

      // BUG: Uses user's local timezone, not San Francisco timezone
      document.getElementById("time").innerText =
        "Local Time: " + now.toLocaleTimeString();
    }

    async function getWeather() {
      try {
        const url =
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

        const response = await fetch(url);
        const data = await response.json();

        // BUG: Misspelled property name
        const temp = data.current_weather.temprature;

        document.getElementById("weather").innerText =
          `Temperature: ${temp}°C`;
      } catch (error) {
        document.getElementById("weather").innerText =
          "Weather bug escaped 🐞";
      }
    }

    updateTime();
    setInterval(updateTime, 1000);

    getWeather();
  </script>
</body>
</html>
