const express = require("express")
const { MongoClient } = require('mongodb');
const router = express.Router()

const client = new MongoClient("mongodb+srv://Admin123456:Admin123456@cluster0.o4ssa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
router.get("/api/building_employees/", async(request, response)=> {
    try{
        await client.connect();

        const database = client.db('office_management');
        const employees = database.collection('employees');

        const post = await employees.find().toArray()

        response.send({
            data: post,
            active_employee: activeEmployeesCount})
    }catch(error){
        response.status(500).send(error)
    }
})

module.exports = router
