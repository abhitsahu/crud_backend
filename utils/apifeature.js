class ApiFeatures {

    constructor(query,queryStr){
        this.query = query; //Product.find()
        this.queryStr = queryStr; //params filter
    }

    search(){
        const keyword = this.queryStr.keyword? {
            name:{
                $regex:this.queryStr.keyword,
                $options:"i", //case insensitive
            }
        }:{};

        this.query = this.query.find({...keyword});
        return this;
    }

    filter(){

        const quertCopy = {...this.queryStr}

        //Removing some field from category

            const removeFields = ["keyword","page","limit"];

            removeFields.forEach(key=>delete quertCopy[key]);


        //Filter for price and rating

            let queryStr = JSON.stringify(quertCopy);
            queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g,key => `$${key}`)

            this.query = this.query.find(JSON.parse(queryStr));
            return this;
    }

    pagination(resultPerPage){

        const currentPage = Number(this.queryStr.page) || 1;  //queryStr api mein jo search karte hai usska value dega 

        const skip = resultPerPage * (currentPage -1);

        this.query = this.query.limit(resultPerPage).skip(skip); //query find product hai

        return this;

    }
};

module.exports = ApiFeatures