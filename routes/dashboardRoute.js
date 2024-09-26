const express = require('express');
const  {getAllProducts,createProduct,updateProduct,DeleteProduct,getProductDetails} = require('../controllers/dashboardController');
const {isAuthenticatedUser,authorizeRoles} = require('../middleware/auth');

const router = express.Router();

//read
router.route("/dashboards").get(isAuthenticatedUser,authorizeRoles("admin"),getAllProducts)
//create
router.route("/admin/dashboard/new").post(isAuthenticatedUser,authorizeRoles("admin"),createProduct)
//update
//delete
router.route("/admin/dashboards/:id").put(isAuthenticatedUser,authorizeRoles("admin"),updateProduct).delete(isAuthenticatedUser,authorizeRoles("admin"),
DeleteProduct)

router.route("/dashboards/:id").get(getProductDetails)









module.exports = router