/**
 * @apiDefine SuccessListOfRide
 * @apiSuccess {Object[]} - List of rides.
 * @apiSuccess {Number} -.rideID Ride's unique ID.
 * @apiSuccess {Number} -.startLat Ride start latitude.
 * @apiSuccess {Number} -.startLong Ride start longitude.
 * @apiSuccess {Number} -.endLat Ride end latitude.
 * @apiSuccess {Number} -.endLong Ride end longitude.
 * @apiSuccess {String} -.riderName Rider's name.
 * @apiSuccess {String} -.driverName Driver's name.
 * @apiSuccess {String} -.driverVehicle Driver's vehicle.
 * @apiSuccess {String} -.created Timestamp of ride created date time.
 */

/**
 * @api {get} /health Health check
 * @apiVersion 1.0.0
 * @apiName HealthCheck
 * @apiGroup Ride
 *
 * @apiSuccess {String} - Return 'Healthy'.
 */

/**
 * @api {post} /rides Post rides
 * @apiVersion 1.0.0
 * @apiName PostRide
 * @apiGroup Ride
 * @apiDescription Create a new ride. This endpoint return list of ride where ID is the created ride ID.
 *
 * @apiParam {Number{Between -90 and 90, inclusive}} start_lat Ride start latitude.
 * @apiParam {Number{Between -180 and 180, inclusive}} start_long Ride start longitude.
 * @apiParam {Number{Between -90 and 90, inclusive}} end_lat Ride end latitude.
 * @apiParam {Number{Between -180 and 180, inclusive}} end_long Ride end longitude.
 * @apiParam {String} rider_name Rider's name.
 * @apiParam {String} driver_name Driver's name.
 * @apiParam {String} driver_vehicle Driver's vehicle.
 * 
 * @apiUse SuccessListOfRide
 */

/**
 * @api {get} /rides List rides
 * @apiVersion 1.0.0
 * @apiName ListRides
 * @apiGroup Ride
 * @apiDescription List all rides. This endpoint return list of all rides.
 * 
 * @apiUse SuccessListOfRide
 */

/**
 * @api {get} /rides/:id List rides by ride ID
 * @apiVersion 1.0.0
 * @apiName ListRidesById
 * @apiGroup Ride
 * @apiDescription List rides by ride ID. This endpoint return list of ride where ID is the provided ride ID.
 *
 * @apiParam {Number} id Ride's unique ID.
 *
 * @apiUse SuccessListOfRide
 */