module.exports = function(parsedPolicy,customerName,industry,isForBenchmarking = false){
    const transformedData = {
        customer: customerName,
        industry: industry,
        employeeSize: parsedPolicy.coverage?.sumInsuredConfig?.noOfEmployee,
        city: parsedPolicy.city,
        hasGradedSumInsured: parsedPolicy.hasGradedSumInsured,
        copay: parsedPolicy.coverage?.copay,
        corporateFloater: parsedPolicy.coverage?.sumInsuredConfig?.corporateFloater,
        inceptionPremium: parsedPolicy?.premiumDetails?.inceptionPremium,
        familyDefinition: parsedPolicy?.coverage?.type,
        sumInsured: parsedPolicy?.coverage?.sumInsuredConfig?.value,
        roomRentNormal:parsedPolicy?.coverage?.roomRentNormal,
        roomRentICU:parsedPolicy?.coverage?.RoomRentICU,
        maternityNormal: parsedPolicy?.coverage?.maternity?.active ? parsedPolicy?.coverage?.maternity?.limit?.normal : 0,
        maternityCSection: parsedPolicy?.coverage?.maternity?.active ? parsedPolicy?.coverage?.maternity?.limit?.caesarean : 0,
        lasik:parsedPolicy?.coverage?.lasikSurgery?.active ? parsedPolicy?.coverage?.lasikSurgery?.minCorrectionIndex : 0,
        isForBenchmarking:isForBenchmarking,
        policyNumber: parsedPolicy?.details?.policyNumber,
        // allowedKidsCount: parsedPolicy.allowedDependentsCount?.kid ?? 0,
        // allowedParentsCount : parsedPolicy.allowedDependentsCount?.parent ?? 0,
        // allowedSpouseCount : parsedPolicy.allowedDependentsCount?.spouse ?? 0,
        // specialConditionCount: parsedPolicy.specialConditionCount ?? 0,

    }
    return transformedData;
    
}

