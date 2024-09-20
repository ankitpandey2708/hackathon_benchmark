const benefit = require("../database/schema/benefit");
const { ObjectId } = require('mongodb');
const calculatePercentile = async (id, query = {}) => {
    try {
        const actualComponentValue = {};
        const getBenefitById = await benefit.findById(new ObjectId(id));
        if(!getBenefitById) {
            return { success: false, error: "Benefit not found." };
        }
        let filters = require("./generateMongoFilters").generateMongoFilters(query);
        const allBenefits = await benefit.aggregate(filters);
        console.log("calculate percentile length fetched ", allBenefits.length)
        let percentile = {};
        for(let component in getBenefitById.component){
            actualComponentValue[component] = getBenefitById[component];
            const calculatedPercentile = componentWisePercentile(allBenefits, component, getBenefitById.component[component]);
            percentile[component] = calculatedPercentile;
        }
        return {percentile, actualComponentValue:{...actualComponentValue, name: getBenefitById.customer}};
    } catch (error) {
        return { success: false, error: error.message };
    }
}

const componentWisePercentile = (allBenefits, component, currentComponentValue) => {
    const componentWiseData = allBenefits.map(benefit => {return {_id: benefit._id, component: benefit.component[component]}});
    const sortedData = componentWiseData.sort((a, b) => component.a - component.b);
    let rank = sortedData.findIndex(benefit => benefit[component] >= currentComponentValue) + 1;
    if (rank === 0) {
        return 100;
    }
    let percentileValue = (rank / sortedData.length) * 100;
    return percentileValue;
}

const calculateSpecificPercentile = async (id, percentileValue, query = {}) => {
    try {
        const getBenefitById = await benefit.findById(new ObjectId(id));
        if(!getBenefitById) {
            return { success: false, error: "Benefit not found." };
        }
        let filters = require("./generateMongoFilters").generateMongoFilters(query);
        const allBenefits = await benefit.aggregate(filters);
        console.log("calculateSpecificPercentile length fetched ", allBenefits.length)

        let percentile = {};
        for(let component in getBenefitById.component){
            const calculatedPercentile = findSpecificPercentile(allBenefits, component, percentileValue);
            percentile[component] = calculatedPercentile;
        }
        return percentile;
    } catch (error) {
        return { success: false, error: error.message };
    }
}

function findSpecificPercentile(allBenefits, component, p) {
    // Sort the array in ascending order based on the values
    let sortedArr = allBenefits.sort((a, b) => a[component] - b[component]);
    
    // Calculate the index for the p-th percentile
    let index = Math.ceil((p / 100) * sortedArr.length) - 1;
    
    return sortedArr[index][component];
}


module.exports= {
    calculatePercentile,
    calculateSpecificPercentile
}