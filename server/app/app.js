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

app.get('/tasks',(req,res)=>{
    res.status(200).json({tasks})
})

app.get('/tasks/:id',(req,res)=>{
    const {id} = req.params;
    const task = tasks.find((task)=>task.id === Number(id))

    if(!task){
        return res.status(404).json({msg:`no task with id ${id}`})
    }
    res.status(200).json({task})
})
 
app.post('/create-task',(req,res)=>{
    const {title,content} = req.body;

    if( !title || !content){
        return res.status(400).json({msg:"please provide all values"})
    }

    const id = tasks.length + 1;
    const task = {id,title,content}
    // clog(task.content)

    tasks.push(task)
    res.status(201).json({
        msg:"task created",
        task
    })
})

app.put('/tasks/:id',(req,res)=>{
    const idp = req.params
    const {title,content} = req.body

    if( !title || !content){
        return res.status(400).json({msg:"please provide all values"})
    }

    const task =tasks.find(i=> i.id==idp.id)
    // console.log(task.content)

    if(idp.id == task.id)
    {
        task.title = title
        task.content = content 
    }

    return res.status(202).json({
        message:"updated",
        task        
    })
})

app.delete('/tasks/:id',(req,res)=>{
    const {id} = req.params;
    const task = tasks.find((task)=>task.id === Number(id))

    if(!task){
        return res.status(404).json({msg:`no task with id ${id}`})
    }   

    const index = tasks.indexOf(task)
    tasks.splice(index,1)   

    res.status(200).json({msg:`task with id ${id} deleted`})
})






export default app