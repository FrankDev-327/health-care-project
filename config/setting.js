require('dotenv').config();

module.exports = {
    dialect: process.env.DATABASE_DIALECT,
    user_dababase: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database_name: process.env.DATABASE_NAME,
    number_port:process.env.PORT,
    host_address: process.env.DATABASE_HOST,
    
    //to be used for production environtment.
    dialect_prod: process.env.DATABASE_DIALECT_PROD,
    user_dababase_prod: process.env.DATABASE_USERNAME_PROD,
    password_prod: process.env.DATABASE_PASSWORD_PROD,
    database_name_prod: process.env.DATABASE_NAME,
    number_port_prod:process.env.PORT_PROD,
    host_address_prod: process.env.DATABASE_HOST_PROD,

    //helper function.
    assign_env: function(type_env) {
        if(type_env == 'developer') {
            return process.env.PORT;
        } 
        if(type_env == 'production') {
            return process.env.PORT_PROD;
        }
    }
}