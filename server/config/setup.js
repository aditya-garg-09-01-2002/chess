require('dotenv').config()

const appConfig={
    Port:process.env.PORT||9000,
}

module.exports=appConfig