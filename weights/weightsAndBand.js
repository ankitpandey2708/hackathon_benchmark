const bands = {
  copay: [
    {
      low: 0,
      high: 0.999,
      score: 100,
    },
    {
      low: 1,
      high: 10,
      score: 50,
    },
    {
      low: 11,
      high: Infinity,
      score: 0,
    },
  ],
  corporateFloater: [
    {
      low: 0,
      high: 3000000,
      score: 0,
    },
    {
      low: 3000001,
      high: 5000000,
      score: 50,
    },
    {
      low: 5000001,
      high: Infinity,
      score: 100,
    },
  ],
  familyDefinition: [
    {
      text: "escp",
      score: 100,
    },
    {
      text: "esc",
      score: 50,
    },
    {
      text: "e",
      score: 0,
    },
  ],
  sumInsured: [
    {
      low: 0,
      high: 300000,
      score: 0,
    },
    {
      low: 300001,
      high: 600000,
      score: 50,
    },
    {
      low: 600001,
      high: Infinity,
      score: 100,
    },
  ],
  roomRentNormal: [
    {
      low: 0,
      high: 3,
      score: 0,
    },
    {
      low: 1,
      high: 10,
      score: 50,
    },
    {
      low: 11,
      high: Infinity,
      score: 0,
    },
  ],
  roomRentICU: [
    {
      low: 0,
      high: 3,
      score: 0,
    },
    {
      low: 1,
      high: 10,
      score: 50,
    },
    {
      low: 11,
      high: Infinity,
      score: 0,
    },
  ],
  maternityNormal: [
    {
      low: 0,
      high: 50000,
      score: 0,
    },
    {
      low: 50001,
      high: 75000,
      score: 50,
    },
    {
      low: 75001,
      high: Infinity,
      score: 100,
    },
  ],
  maternityCSection: [
    {
        low: 0,
        high: 50000,
        score: 0,
      },
      {
        low: 50001,
        high: 75000,
        score: 50,
      },
      {
        low: 75001,
        high: Infinity,
        score: 100,
      },
  ],
  lasik: [
    {
      low: 0,
      high: 4,
      score: 0,
    },
    {
      low: 5,
      high: 6,
      score: 50,
    },
    {
      low: 7,
      high: Infinity,
      score: 100,
    },
  ],
};

const weights = {
    copay: 0.1,
    corporateFloater: 0.1,
    familyDefinition: 0.1,
    sumInsured: 0.2,
    roomRentNormal: 0.1,
    roomRentICU: 0.1,
    maternityNormal: 0.1,
    maternityCSection: 0.1,
    lasik: 0.1,
};

module.exports = {
  bands,
  weights,
};