const express = require("express");
const app = express();
const port = process.env.PORT || 80;

app.listen(port, () => {
  console.log(`Listening Port : ${port}`);
});

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use(express.urlencoded({ extended: true }))
app.use("/public", express.static("public"));

app.get("/", (req, res) => {
    res.render("home", {
        error: false
    });
});

app.post("/result", (req, res) => {
    var question = req.body.question
    if(!question) {
        res.render("home", {
            error: true
        })
        return;
    }
    if(question.includes(" or ")) {
        var question = question.split(" or ")
        var results = question[Math.floor(Math.random() * question.length)];
        var answers = 'You should'
    } else {
        var answer = ['No, you shouldn\'t', 'Yes, you should']
        var result = answer[Math.floor(Math.random() * answer.length)]
    }
    res.render("result", {
        question: question,
        result: result,
        results: results,
        answers: answers,
    });
});

app.get('*', function(req, res){
    res.status(404).render('404', { url: req.url });
});