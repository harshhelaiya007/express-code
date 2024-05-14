const express = require("express");
const zod = require("zod");

const app = express();

app.use(express.json());   //This identify it's own that 

const userMiddlewares = (req, res, next) => {
    const credentials = {
        username: req.headers.username,
        password: req.headers.password
    };
    if (credentials.username != "Harsh" && credentials.password != "pass") {
        res.status(400).json({
            error: "User not found!"
        })
    }
    next();
}

const schemaZod = zod.array(zod.number());

const kidneysMiddlewares = (req, res, next) => {

    const kidney = {
        kidneyId: req.query.kidneyId
    }

    const response = schema.safeParse(kidney.kidneyId);

    if (kidney.kidneyId != 1 || kidney.kidneyId != 2) {
        res.status(400).json(
            {
                error: "Please Go see Doctor for you fucked up kidneys"
            }
        )
    }
    next();
}

app.get("/health-checkup", userMiddlewares, function (req, res) {

    const kidneyId = req.body.kidneyId;

    const response = schemaZod.safeParse(kidneyId);

    // res.status(200).json({
    //     response
    // })
    res.send(response)

})

app.post("/health-checkup1", function (req, res) {

    const kidney = req.body.kidneys;
    const kidneyLength = kidney.length;

    res.send("Your Kindey length is " + kidneyLength);
})

// global catches

app.use(function(error, req, res, next) {
    res.status(400).json({
        error: "Something went wrong"
    })
})

app.listen(3000)