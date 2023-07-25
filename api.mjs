import { BlueToken, BlueCredentials } from './models/BlueToken.mjs';
import pkg from 'aws-api-gateway-client';
const { newClient } = pkg.default;
const AWS_REGION = 'eu-west-1';
//const AWS_SERVICE = "execute-api"
const BASE_HEADERS = {
    'User-Agent': 'BlueConnect/3.2.1',
    'Accept-Language': 'en-DK;q=1.0, da-DK;q=0.9',
    Accept: '**'
};
const BASE_URL = 'https://api.riiotlabs.com/prod/';

export class BlueriiotAPI {
    token;
    user;

    constructor(email, password) {
        this.email = email;
        this.password = password;
        this.token = '';
    }

    getToken = async () => {
        const config = { invokeUrl: BASE_URL };
        const apigClient = newClient(config);
        const pathParams = {};
        const pathTemplate = 'user/login';
        const method = 'POST';
        const additionalParams = {
            headers: BASE_HEADERS
        };
        const body = {
            email: this.email,
            password: this.password
        };
        //login
        try {
            const { data } = await apigClient.invokeApi(
                pathParams,
                pathTemplate,
                method,
                additionalParams,
                body
            );
            const { credentials } = data;
            const blueCred = new BlueCredentials(credentials);
            this.token = new BlueToken(data.identity_id, data.token, blueCred);
        } catch (error) {
            this.token = '';
            throw new Error(error.response.data.errorMessage);
        }
    };

    getData = async (pathParams, pathTemplate, queryParams) => {
        await this.authenticate();
        var cred = this.token.credentials;

        const apigClient = newClient({
            invokeUrl: BASE_URL,
            region: AWS_REGION,
            accessKey: cred.access_key,
            secretKey: cred.secret_key,
            sessionToken: cred.session_token
        });

        const { data } = await apigClient.invokeApi(
            pathParams,
            pathTemplate,
            'GET',
            {
                headers: BASE_HEADERS,
                queryParams: queryParams
            },
            {}
        );
        return data;
    };

    authenticate = async () => {
        if (this.token === '') {
            await this.getToken();
        } else {
            // Check if expired and refresh if needed
            const now = new Date().toISOString();
            if (this.token.credentials.expiration < now) {
                await this.getToken();
            }
        }
    };

    getUser = async () => {
        var pathParams = {};
        var pathTemplate = 'user/';
        return await this.getData(pathParams, pathTemplate, '');
    };

    getBlueDevice = async (blue_device_serial) => {
        var pathParams = {
            blue_device_serial: blue_device_serial
        };
        var pathTemplate = 'blue/{blue_device_serial}/';
        return await this.getData(pathParams, pathTemplate, '');
    };

    getSwimmingPools = async () => {
        var pathParams = {};
        var pathTemplate = 'swimming_pool/';
        return await this.getData(pathParams, pathTemplate, '');
    };

    getSwimmingPool = async (swimming_pool_id) => {
        var pathParams = {
            swimming_pool_id: swimming_pool_id
        };
        var pathTemplate = 'swimming_pool/{swimming_pool_id}/';
        return await this.getData(pathParams, pathTemplate, '');
    };
    /**
     * DEPECREATED
     * @param {String} swimming_pool_id
     * @returns {Object}
     */
    getSwimmingPoolStatus = async (swimming_pool_id) => {
        var pathParams = {
            swimming_pool_id: swimming_pool_id
        };
        var pathTemplate = 'swimming_pool/{swimming_pool_id}/status/';
        return await this.getData(pathParams, pathTemplate, '');
    };

    getSwimmingPoolBlueDevices = async (swimming_pool_id) => {
        var pathParams = {
            swimming_pool_id: swimming_pool_id
        };
        var pathTemplate = 'swimming_pool/{swimming_pool_id}/blue/';
        return await this.getData(pathParams, pathTemplate, '');
    };

    getSwimmingPoolFeed = async (swimming_pool_id, language) => {
        var pathParams = {
            swimming_pool_id: swimming_pool_id
        };
        var queryParams = {
            lang: language
        };
        var pathTemplate = 'swimming_pool/{swimming_pool_id}/feed';
        return await this.getData(pathParams, pathTemplate, queryParams);
    };

    getLastMeasurements = async (swimming_pool_id, blue_device_serial) => {
        var pathParams = {
            swimming_pool_id: swimming_pool_id,
            blue_device_serial: blue_device_serial
        };
        var queryParams = {
            mode: 'blue_and_strip'
        };
        var pathTemplate =
            'swimming_pool/{swimming_pool_id}/blue/{blue_device_serial}/lastMeasurements';
        return await this.getData(pathParams, pathTemplate, queryParams);
    };

    getGuidance = async (swimming_pool_id, language) => {
        var pathParams = {
            swimming_pool_id: swimming_pool_id
        };
        var queryParams = {
            lang: language,
            mode: 'interactive_v03'
        };
        var pathTemplate = 'swimming_pool/{swimming_pool_id}/guidance';
        return await this.getData(pathParams, pathTemplate, queryParams);
    };

    getGuidanceHistory = async (swimming_pool_id, language) => {
        var pathParams = {
            swimming_pool_id: swimming_pool_id
        };
        var queryParams = {
            lang: language
        };
        var pathTemplate = 'swimming_pool/{swimming_pool_id}/guidance/history';
        return await this.getData(pathParams, pathTemplate, queryParams);
    };

    getChemistry = async (swimming_pool_id) => {
        var pathParams = {
            swimming_pool_id: swimming_pool_id
        };
        var queryParams = {};
        var pathTemplate = 'swimming_pool/{swimming_pool_id}/chemistry';
        return await this.getData(pathParams, pathTemplate, queryParams);
    };

    getWeather = async (swimming_pool_id, language) => {
        var pathParams = {
            swimming_pool_id: swimming_pool_id
        };
        var queryParams = {
            lang: language
        };
        var pathTemplate = 'swimming_pool/{swimming_pool_id}/weather';
        return await this.getData(pathParams, pathTemplate, queryParams);
        //console.log(userData);
    };

    getBlueDeviceCompatibility = async (blue_device_serial) => {
        var pathParams = {
            blue_device_serial: blue_device_serial
        };
        var pathTemplate = 'blue/{blue_device_serial}/compatibility';
        return await this.getData(pathParams, pathTemplate, '');
    };
}

/**
EndPoints 

get_user user/
get_blue_device blue/{blue_device_serial}/
get_swimming_pools swimming_pool/
get_swimming_pool swimming_pool/{swimming_pool_id}/
get_swimming_pool_status swimming_pool/{swimming_pool_id}/status/
get_swimming_pool_blue_devices swimming_pool/{swimming_pool_id}/blue/
get_swimming_pool_feed swimming_pool/{swimming_pool_id}/feed?lang={language}
get_last_measurements swimming_pool/{swimming_pool_id}/blue/{blue_device_serial}/lastMeasurements?mode=blue_and_strip

New 2021-06-12
swimming_pool/{swimming_pool_id}/guidance?lang={language}&mode=interactive_v03
swimming_pool/{swimming_pool_id}/guidance/history?lang={language}
swimming_pool/{swimming_pool_id}/chemistry
swimming_pool/{swimming_pool_id}/weather?lang={language}
blue/{blue_device_serial}/compatibility

 
Maybe Comming
blue/{blue_device_serial}/releaseLastUnprocessedEvent
swimming_pool?deleted=true/false
swimming_pool/{swimming_pool_id}/status/{task_id}
swimming_pool/{swimming_pool_id}/weather/forecast?startDate={startDate}&lang={language}

*/
