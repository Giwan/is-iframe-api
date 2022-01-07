"use strict";
const internalHandler = require("../internalHandler");

const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
}

const handler = async (event) => {
    const { queryStringParameters, httpMethod } = event;

    if (/options/i.test(httpMethod)) {
        return {
            statusCode: 200,
            headers,
        }
    }

    try {

        const responseData = await internalHandler(queryStringParameters.url);
        
        return {
            statusCode: 200,
            body: JSON.stringify(responseData),
            headers

        }

    } catch (err) {
        return { statusCode: 500, body: err.toString() };
    }
};

exports.handler = handler;