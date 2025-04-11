const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors')
const app=express()
const router=require('./routes/router')
require('dotenv').config()

const PORT=process.env.PORT || 5000
const connectDb=require('./connectDb')
connectDb()

app.use(bodyParser.json())
// app.use(express.json());

app.use(cors({
  origin: "*"
}));




app.use('/', router)
app.get('/', (req, res)=>{
    res.send('server is serving')
})

app.listen(PORT, ()=>console.log(`access your website here: http://localhost:${PORT}`))
