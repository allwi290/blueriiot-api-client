import 'dotenv/config';
import { BlueriiotAPI } from './api.mjs';
const logger = {
    log: (message) => {
        console.log(JSON.stringify(message, null, 1));
    },
    debug: (message) => {
        console.debug(message);
    }
};
var api = new BlueriiotAPI(process.env.EMAIL, process.env.PASSWORD);
api.init()
    .then(async () => {
        logger.debug(await api.isAuthenticated());
        //api.getUser().then(function(data){logger.log(data);});
        //api.getBlueDevice(process.env.BLUEID).then(function(data){logger.log(data);});
        //api.getSwimmingPools().then(function(data){logger.log(data);});
        //api.getSwimmingPool(process.env.POOLID).then(function(data){logger.log(data);});
        // DEPECREATED api.getSwimmingPoolStatus(process.env.POOLID).then(function(data){logger.log(data);});
        //api.getSwimmingPoolBlueDevices(process.env.POOLID).then(function(data){logger.log(data);});
        //api.getSwimmingPoolFeed(process.env.POOLID, "en").then(function(data){logger.log(data);});
        //api.getLastMeasurements(process.env.POOLID,process.env.BLUEID).then(function(data){logger.log(data);})
        //api.getGuidance(process.env.POOLID, "en").then(function(data){logger.log(data);});
        //api.getGuidanceHistory(process.env.POOLID, "en").then(function(data){logger.log(data);});
        //api.getChemistry(process.env.POOLID).then(function(data){logger.log(data);});
        //api.getWeather(process.env.POOLID, "en").then(function(data){logger.log(data);});
        //api.getBlueDeviceCompatibility(process.env.BLUEID).then(function(data){logger.log(data);});
    })
    .catch(function (error) {
        logger.log('We have issues signing in: ' + error);
    });
