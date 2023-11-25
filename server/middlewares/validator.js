const validator=(schema)=>(req, res, next)=>{
    const schemaresponse = schema.validate(req.body)
    if (schemaresponse.error) {
        console.log(schemaresponse.error.message)
        res.status(400)
        throw new Error(schemaresponse.error.message)
      }
    next()  
}

export default validator