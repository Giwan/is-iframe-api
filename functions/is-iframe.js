const fetch = require("node-fetch"); 
const { prefixHTTPS } = require("../api/helper");
const internalHandler = require("../internalHandler");

const handler = async (event, context) => {
    const { queryStringParameters } = event;

    try {

        const responseData = await internalHandler(queryStringParameters.url);
        
        return {
            statusCode: 200,
            body: JSON.stringify(responseData)
        }

    } catch (err) {
        return { statusCode: 500, body: err.toString() };
    }
};

exports.handler = handler;