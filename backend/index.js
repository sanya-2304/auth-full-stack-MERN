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
const allowedOrigins = [
  'https://auth-full-stack-mern.vercel.app',
  'https://auth-full-stack-mern-k29hoa9qq-sanya-2304s-projects.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use('/', router)
app.get('/', (req, res)=>{
    res.send('server is serving')
})

app.listen(PORT, ()=>console.log(`access your website here: http://localhost:${PORT}`))
