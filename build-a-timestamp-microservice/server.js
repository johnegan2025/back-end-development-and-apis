import express from "express";

const app = express();
const port = process.env.PORT || 8000;

app.use(express.static("public"));

// /api with no date
app.get("/api", (req, res) => {
  const date = new Date();

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// /api/:date with a date
app.get("/api/:date", (req, res) => {
  const dateString = req.params.date;

  let date;

  // Handle Unix timestamp
  if (/^\d+$/.test(dateString)) {
    date = new Date(Number(dateString));
  } else {
    // Handle normal date strings
    date = new Date(dateString);
  }

  // Invalid date
  if (isNaN(date.getTime())) {
    return res.json({
      error: "Invalid Date"
    });
  }

  // Valid date
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});