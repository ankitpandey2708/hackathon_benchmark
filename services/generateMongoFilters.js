let operators = ["limit", "page", "perpage", "skip","start"]


module.exports.generateMongoFilters = (args) => {
    let pipeline = [];
    pipeline.push({ $match: {} });
    if (!args.start) args.start = 0;
    if(args.perpage >=100) args.perpage = 50
    let obj = {};
    for (let key in args) {
        if (operators.indexOf(key) == -1) {
            obj[key] = args[key]
        }
    }
    pipeline[0]["$match"] = { ...obj }
    if (args.start >= 0) {
        if(args.page) args.page -= 1;
        if(args.page && !args.perpage) args.perpage = 10;
        if(args.page && args.perpage && !args.start) args.start = args.page * args.perpage;
        pipeline.push({ $skip: Number(args.start) })
    }
    console.log(args)
    if (args.limit >=0 || args.perpage>=0) {
        let limit = (args.limit || args.perpage) ? Number(args.limit || args.perpage):50 
        pipeline.push({ $limit: limit });
    }
    console.log("Pipeline used",pipeline)
    return pipeline
}

module.exports.generateMongoFiltersForCsvDownload = (args) => {
    let pipeline = [];
    pipeline.push({ $match: {} });
    if (!args.start) args.start = 0;
    // if(args.perpage >=100) args.perpage = 50
    // if(!args.perpage) args.perpage = 25
    let obj = {};
    for (let key in args) {
        if (operators.indexOf(key) == -1) {
            obj[key] = args[key]
        }
    }
    pipeline[0]["$match"] = { ...obj }
    if (args.start >= 0) {
        if(args.page) args.page -= 1;
        if(args.page && !args.perpage) args.perpage = 10;
        if(args.page && args.perpage && !args.start) args.start = args.page * args.perpage;
        pipeline.push({ $skip: Number(args.start) })
    }
    console.log(args)
    if (args.limit >=0 || args.perpage>=0) {
        let limit = (args.limit || args.perpage) ? Number(args.limit || args.perpage):50 
        pipeline.push({ $limit: limit });
    }
    console.log("Pipeline used",pipeline)
    return pipeline
}