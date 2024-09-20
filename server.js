const express = require("express");
const app = express();
const port = 3000;
const mongoDb = require("./database/mongo");
const multer = require("multer");
const XLSX = require("xlsx");
const path = require("path");
const policyParser = require("./services/policyParser");
const transformer = require("./adapters/parsedPolicyToSchema");
const benefit = require("./database/schema/benefit");
const scoringSystem = require("./services/scoringSystem");
const { calculatePercentile } = require("./services/calculatePercentile");
const {
  calculateSpecificPercentile,
} = require("./services/calculatePercentile");

require("dotenv").config();

// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Upload directory
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    ); // Unique file name
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /pdf/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Only Excel files are allowed!"));
    }
  },
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/deleteAll", async (req, res) => {
  await benefit.deleteMany({});
  res.sendStatus(200);
});

app.post("/benchmark", upload.single("excelFile"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  const customerName = req?.query?.customerName ?? "TEST";
  const industry = req?.query?.industry ?? "TEST";
  // Process the Excel file (optional)
  const filePath = req.file.path;
  const result = await policyParser(filePath);
  if (!result.success) {
    console.log("Failed to process the file:", result.error);
    return res.status(500).send("Failed to process the file.");
  }
  const transformedData = transformer(
    result.data.parsedPolicyData,
    customerName,
    industry,
    true
  );
  const calculateScore = scoringSystem(transformedData);
  console.log(calculateScore);
  console.log(transformedData);
  if (!calculateScore.success) {
    return res.status(500).send("Failed to calculate score.");
  }
  transformedData.score = calculateScore.data.score;
  transformedData.component = calculateScore.data.component;
  const saveData = await benefit.create(transformedData);
  // Send the extracted data as a response
  res.json({
    message: "File uploaded and processed successfully!",
    data: saveData,
  });
});

app.get("/refreshScores", async (req, res) => {
  try {
    const benefits = await benefit.find({});
    for (let i = 0; i < benefits.length; i++) {
      console.log(`Processing`, benefits[i]);
      const calculateScore = scoringSystem(benefits[i]);
      console.log("benefits[i]", benefits[i]._id, benefits[i].policyNumber);
      if (!calculateScore.success) {
        console.log(`Failed to calculate score for ${benefits[i].customer}`);
        continue;
      }
      benefits[i].score = calculateScore.data.score;
      benefits[i].component = calculateScore.data.component;
      await benefits[i].save();
    }
    return res.send("Scores refreshed successfully.");
  } catch (error) {
    console.log("Failed to refresh scores:", error);
    return res.status(500).send("Failed to refresh scores.");
  }
});

app.get("/benefit/:id", async (req, res) => {
  try {
    console.log("Fetching benefit with id:", req.params.id);
    const benefitData = await benefit.findById(req.params.id);
    if (!benefitData) {
      return res.status(404).send("Benefit not found.");
    }
    return res.json(benefitData);
  } catch (error) {
    console.log("Failed to get benefit:", error);
    return res.status(500).send("Failed to get benefit.");
  }
});

app.get("/benefit/:id/percentile", async (req, res) => {
  try {
    console.log("Fetching percentile for benefit with id:", req.params.id);
    const percentile = await calculatePercentile(req.params.id, req?.query ?? {});
    const specificPercentile75 = await calculateSpecificPercentile(
      req.params.id,
      75,
      req.query ?? {}
    );
    const specificPercentile90 = await calculateSpecificPercentile(
      req.params.id,
      90,
      req.query ?? {}

    );
    const specificPercentile99 = await calculateSpecificPercentile(
      req.params.id,
      90,
      req.query ?? {}

    );

    res.json({
      rawValues: percentile.actualComponentValue,
      currentPercentile: percentile.percentile,
      specificPercentile75,
      specificPercentile90,
      specificPercentile99,
    });
  } catch (error) {
    console.log("Failed to get benefit:", error);
    return res.status(500).send("Failed to get benefit.");
  }
});

app.get("/benefit/:id/percentile/:percentile", async (req, res) => {
  try {
    console.log("Fetching percentile for benefit with id:", req.params.id);
    const percentile = await calculateSpecificPercentile(
      req.params.id,
      Number(req.params.percentile)
    );
    res.json(percentile);
  } catch (error) {
    console.log("Failed to get benefit:", error);
    return res.status(500).send("Failed to get benefit.");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
