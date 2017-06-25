# MMM-DHT-Sensor

This a module for the [MagicMirror](https://github.com/MichMich/MagicMirror).

This module gets data form DHT11, DHT22 and AM2302 sensors.


![](MMM-DHT-Sensor.png)

## bcm2835
This module uses [node-dht-sensor](https://github.com/momenso/node-dht-sensor) to get the sensor data, and this module depends on [bcm2835](http://www.airspayce.com/mikem/bcm2835/) to do so, therefore you need to install it in your Pi in order to use this module.

```bash
cd ~
wget http://www.airspayce.com/mikem/bcm2835/bcm2835-1.52.tar.gz
tar zxvf bcm2835-1.52.tar.gz
cd bcm2835-1.52
./configure
make
sudo make check
sudo make install
```

## Installation
```bash
git clone https://github.com/ryck/MMM-DHT-Sensor.git
cd MMM-DHT-Sensor
npm install
```
## Config
The entry in `config.js` can include the following options:

|Option|Description|
|---|---|
|`sensorPin`|**Required** This is the GPIO pin the sensor is connected to<br><br>**Type:** `integer`<br>|
|`sensorType`|**Required** This is the the sensor type. It should work for DHT11, DHT22 and AM2302 sensors<br><br>**Type:** `integer`<br> **Possible values:** `11`  for DHT11 or `22` for DHT22 / AM2302
| `scale`           | The scale to display the temparature <br><br>**Type:** `string`<br>**Possible values:** `C` or `F` <br> **Default value:**  `C`|
|`updateInterval `|How often the sendor data is updated.<br><br>**Type:** `integer`<br>**Default value:** `1 hour`|
| `initialLoadDelay`           | The initial delay before loading. If you have multiple modules that use the same API key, you might want to delay one of the requests. (Milliseconds) <br><br>**Type:** `integer`<br>**Possible values:** `1000` - `5000` <br> **Default value:**  `0`|
| `animationSpeed`             | Speed of the update animation. (Milliseconds) <br><br>**Type:** `integer`<br>**Possible values:**`0` - `5000` <br> **Default value:** `1000` (1 second)|
| `debug`             | Show debug information. <br><br>  **Possible values:** `true` or `false`  <br> **Default value:** `false`|


Here is an example of an entry in `config.js`

```
{
	module: "MMM-DHT-Sensor",
	position: "top_right",
	header: "Upstairs",
	config: {
		sensorPin: 2,
		sensorType: 22,	
		updateInterval: 60 * 60 * 1000,
		initialLoadDelay: 0,
		animationSpeed: 1000,
		scale: "C",
		debug: false
	}
},
```

## Dependencies
- [bcm2835](http://www.airspayce.com/mikem/bcm2835/)
- [node-dht-sensor](https://github.com/momenso/node-dht-sensor) (installed via `npm install`)



## Thanks To...
- [Cato Antonsen](https://github.com/prasanthsasikumar) for the [MMM-Temperature-Humidity](https://github.com/prasanthsasikumar/MMM-Temperature-Humidity) module, which I used as reference. 
- [Nick Wootton](https://github.com/MichMich) for the [MMM-UKLiveBusStopInfo](https://github.com/nwootton/MMM-UKLiveBusStopInfo) module, which I used as reference.
- [Nigel Daniels](https://github.com/nigel-daniels/) for the [MMM-Tube-Status](https://github.com/nigel-daniels/MMM-Tube-Status) module, which I used as reference.
- [Michael Teeuw](https://github.com/MichMich) for the [MagicMirror2](https://github.com/MichMich/MagicMirror/) framework that made this module possible.