const bandsAndWeights = require("../weights/weightsAndBand");
const calculateScore = (benefits, bandAndWeight = bandsAndWeights) => {
try{
    let score = 0;
    const component = {};
    for (let key in benefits) {
      const band = bandAndWeight.bands[key];
      const value = benefits[key];
      if (!band) {
        continue;
      }
      const weight = bandAndWeight.weights[key];
      for (let i = 0; i < band.length; i++) {
        if(key == "familyDefinition"){
            if(band[i].text?.toLowerCase() == value.toLowerCase()){
                component[key] = band[i].score * weight;
                score += component[key];
                break;
            }
        }else if (value >= band[i].low && value <= band[i].high) {
          component[key] = band[i].score * weight;
          score += component[key];
          break;
        }
      }
    }
    return { success: true, data: {score, component} };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
module.exports = calculateScore;