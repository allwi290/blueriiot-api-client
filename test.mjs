/* eslint-disable no-undef */
import 'dotenv/config';
import { BlueriiotAPI } from './api.mjs';
import { logger } from './logger.mjs';
const api = new BlueriiotAPI(process.env.EMAIL, process.env.PASSWORD);
try {
    await api.authenticate();
    logger.debug('Authentication success!');
} catch (error) {
    logger.error(`Authentication failed! ${error.message}`);
}
//logger.log(await api.getUser());
logger.log(await api.getBlueDevice(process.env.BLUEID));
//logger.log(await api.getSwimmingPools());
logger.log(await api.getSwimmingPool(process.env.POOLID));
// DEPECREATED logger.log(await api.getSwimmingPoolStatus(process.env.POOLID));
//logger.log(await api.getSwimmingPoolBlueDevices(process.env.POOLID));
//logger.log(await api.getSwimmingPoolFeed(process.env.POOLID, 'en'));
logger.log(await api.getLastMeasurements(process.env.POOLID, process.env.BLUEID));
//logger.log(await api.getGuidance(process.env.POOLID, 'en'));
//logger.log(await api.getGuidanceHistory(process.env.POOLID, 'en'));
//logger.log(await api.getChemistry(process.env.POOLID));
//logger.log(await api.getWeather(process.env.POOLID, 'se'));
//logger.log(await api.getBlueDeviceCompatibility(process.env.BLUEID));
