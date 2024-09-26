const Dashboard = require('../models/dashboardModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError')
const ApiFeatures = require('../utils/apifeature')



//Create product--admin

const createProduct = catchAsyncError(
    async (req,res,next)=>{

        req.body.user = req.user.id;

        const product = await Dashboard.create(req.body);

        res.status(201).json(
            {
                success:true,
                product
            })

    }
)

//get all product;

const getAllProducts = catchAsyncError(
    async(req,res)=>{

        const resultPerPage = 5;
        const productCount = await Dashboard.countDocuments();

        //search
        const apifeatures = new ApiFeatures(Dashboard.find(),req.query).search().filter().pagination(resultPerPage);
        const products = await apifeatures.query;
        
         res.status(200).json(
             {
                 success:true,
                 products,
                 productCount

             })
     }
)

//get product details

const getProductDetails= catchAsyncError(
    async(req,res,next)=>{

        const product = await Dashboard.findById(req.params.id);
    
        if(!product){
    
            return next(new ErrorHandler("Product not found",404));
        }
    
        await product.deleteOne();
    
        res.status(200).json({
            success:true,
            product,
        })
    }
)

// update product --admin

const updateProduct = catchAsyncError(
    async(req,res,next)=>{

        let product = await Dashboard.findById(req.params.id);
    
        if(!product){
    
            return next(new ErrorHandler("Product not found",404));
        }
    
    
        product = await Dashboard.findByIdAndUpdate(req.params.id,req.body,{
    
            new:true,
            runValidators:true,
            useFindAndModify:false
        });
    
        res.status(200).json({
            success:true,
            product
        })
    
    }
)

//Delete product

const DeleteProduct = catchAsyncError(
    async(req,res,next)=>{

        const product = await Dashboard.findById(req.params.id);
    
        if(!product){
    
            return next(new ErrorHandler("Product not found",404));
        }
    
    
        await product.deleteOne();
    
        res.status(200).json({
            success:true,
            message:"product delete successfully"
        })
    
    
    }
)
  


module.exports = {getAllProducts,createProduct,updateProduct,DeleteProduct,getProductDetails};



