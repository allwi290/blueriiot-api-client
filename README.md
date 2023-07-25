# blueriiot-api-client
This is an unofficial node js wrapper for the Blueriiot API

## Usage
Example to fetch all pools

```javascript
import 'dotenv/config';
import { BlueriiotAPI } from './api.mjs';
import { logger } from './logger.mjs';
const api = new BlueriiotAPI(process.env.EMAIL, process.env.PASSWORD);
api.authenticate()
    .then(async () => {
        logger.debug('Authentication success!');
    })
    .catch((error) => {
        logger.error(`Authentication failed! ${error.message}`);
    });
//logger.log(await api.getUser());
//logger.log(await api.getBlueDevice(process.env.BLUEID));
//logger.log(await api.getSwimmingPools());
//logger.log(await api.getSwimmingPool(process.env.POOLID));
// DEPECREATED logger.log(await api.getSwimmingPoolStatus(process.env.POOLID));
//logger.log(await api.getSwimmingPoolBlueDevices(process.env.POOLID));
//logger.log(await api.getSwimmingPoolFeed(process.env.POOLID, 'en'));
//logger.log(await api.getLastMeasurements(process.env.POOLID, process.env.BLUEID));
//logger.log(await api.getGuidance(process.env.POOLID, 'en'));
//logger.log(await api.getGuidanceHistory(process.env.POOLID, 'en'));
//logger.log(await api.getChemistry(process.env.POOLID));
//logger.log(await api.getWeather(process.env.POOLID, 'se'));
//logger.log(await api.getBlueDeviceCompatibility(process.env.BLUEID));
```

## End Points
```javascript
getUser()
getBlueDevice(<blue_device_serial>)
getSwimmingPools()
getSwimmingPool(<swimming_pool_id>)
// DEPECREATED getSwimmingPoolStatus(<swimming_pool_id>)
getSwimmingPoolBlueDevices(<swimming_pool_id>)
getSwimmingPoolFeed(<swimming_pool_id>,<language>)
getLastMeasurements(<swimming_pool_id>,<blue_device_serial>)
getGuidance(<swimming_pool_id>,<language>)
getGuidanceHistory(<swimming_pool_id>,<language>)
getChemistry(<swimming_pool_id>)
getWeather(<swimming_pool_id>,<language>)
getBlueDeviceCompatibility(<blue_device_serial>)
```

## Test
For test you can look in the test.js file. To use it either mod the code or add a .env file.
.env should then include at least email and password. Poolid/blueid can be added when you have it.

```javascript
EMAIL= ""
PASSWORD=""
POOLID=""
BLUEID=""
```