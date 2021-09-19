const publicRoutes = require('./public/index');
const adminRoutes = require('./admin/index');


module.exports = (app) => {
    console.info("Setting up routes...");

    publicRoutes(app);
    adminRoutes(app);

    console.info("Routes setup.")
}
