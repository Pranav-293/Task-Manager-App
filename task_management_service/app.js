const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
const taskRouter = require("./routes/task_router");
const session = require("./middleware/session");


app.use(session);
app.use(taskRouter);
app.use(express.json());

app.listen(PORT, ()=>{
    console.log(`Task Management service is running on port ${PORT}`);
})