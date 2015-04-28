/**
 * Created by manland on 20/03/15.
 */

module.exports = {
    isProd: process.env.PROD !== undefined,
    port: process.env.PORT || 3000
};