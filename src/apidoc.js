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
 * @apiParam (Request body) {Number{Between -90 and 90, inclusive}} start_lat Ride start latitude.
 * @apiParam (Request body) {Number{Between -180 and 180, inclusive}} start_long Ride start longitude.
 * @apiParam (Request body) {Number{Between -90 and 90, inclusive}} end_lat Ride end latitude.
 * @apiParam (Request body) {Number{Between -180 and 180, inclusive}} end_long Ride end longitude.
 * @apiParam (Request body) {String} rider_name Rider's name.
 * @apiParam (Request body) {String} driver_name Driver's name.
 * @apiParam (Request body) {String} driver_vehicle Driver's vehicle.
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
 * @apiParam (Query string) {Number} [lastKey=0] Indicates where to begin listing. This is convenient for pagination: To get the next page of results use the last key of the current page.
 * @apiParam (Query string) {Number} [limit=10] Indicates total rides to return.
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
 * @apiParam (Path parameter) {Number} id Ride's unique ID.
 *
 * @apiUse SuccessListOfRide
 */