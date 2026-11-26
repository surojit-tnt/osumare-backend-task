import { json } from "body-parser";
import express from "express"


const tasks = [
    {
        id:1,
        title:"task one",
        content:"this is task one"
    }
]


const app = express();
app.use(express.json())

app.get("/",(req,res)=>{
    res.json({msg:"hello from server..."})
})

app.get('/task',(req,res)=>{
    res.status(200).json({tasks})
})

app.get('/task/:id',(req,res)=>{
    const {id} = req.params;
    const task = tasks.find((task)=>task.id === Number(id))

    if(!task){
        return res.status(404).json({msg:`no task with id ${id}`})
    }
    res.status(200).json({task})
})
 
app.post('/create-task',(req,res)=>{
    const {name,content} = req.body;

    

    if( !name && !content){
        return res.status(400).json({msg:"please provide all values"})
    }
    const id = tasks.length + 1;
    const task = {id,name,content}
    // clog(task.content)

    tasks.push(task)
    res.status(201).json({
        msg:"task created",
        task
    })
})






export default app