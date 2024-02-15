import axios from 'axios'

export const commonAPI = async (httpRequest, url, reqBody, reqHeader) => {
    // Construct the request configuration object
    const reqConfig = {
        method: httpRequest, // HTTP method
        url, // URL for the HTTP request
        data: reqBody, // Request body
        headers: reqHeader ? reqHeader : { "Content-Type": "application/json" } // Request headers
    };

    try {
        // Send the HTTP request using axios and return the response
        const result = await axios(reqConfig);
        return result;
    } catch (error) {
        // Handle any errors and return the error object
        return error;
    }
};