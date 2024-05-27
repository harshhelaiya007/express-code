// const express = require("express");
// const zod = require("zod");

// const app = express();

// app.use(express.json());   //This identify it's own that 

// const userMiddlewares = (req, res, next) => {
//     const credentials = {
//         username: req.headers.username,
//         password: req.headers.password
//     };
//     if (credentials.username != "Harsh" && credentials.password != "pass") {
//         res.status(400).json({
//             error: "User not found!"
//         })
//     }
//     next();
// }

// const schemaZod = zod.array(zod.number());

// const kidneysMiddlewares = (req, res, next) => {

//     const kidney = {
//         kidneyId: req.query.kidneyId
//     }

//     const response = schema.safeParse(kidney.kidneyId);

//     if (kidney.kidneyId != 1 || kidney.kidneyId != 2) {
//         res.status(400).json(
//             {
//                 error: "Please Go see Doctor for you fucked up kidneys"
//             }
//         )
//     }
//     next();
// }

// app.get("/health-checkup", userMiddlewares, function (req, res) {

//     const kidneyId = req.body.kidneyId;

//     const response = schemaZod.safeParse(kidneyId);

//     // res.status(200).json({
//     //     response
//     // })
//     res.send(response)

// })

// app.post("/health-checkup1", function (req, res) {

//     const kidney = req.body.kidneys;
//     const kidneyLength = kidney.length;

//     res.send("Your Kindey length is " + kidneyLength);
// })

// // global catches

// app.use(function(error, req, res, next) {
//     res.status(400).json({
//         error: "Something went wrong"
//     })
// })

// app.listen(3000)


// const express = require("express");
// const zod = require("zod");

// const app = express();

// // Middleware for all the routes that's why we use app.use
// app.use(express.json());

// const mySchema = zod.string();

// app.post("/zod-validation", function(req, res) {

//     response = mySchema.parse(req.body.Id);
//     console.log(response);
//     if(response.error) {
//         res.status(400).send(response.error)
//         return;
//     }

//     res.status(200).send('Successful Zod Validation');
// })

// app.use(function(err, req, res, next) {
    
//     res.status(503).send("Looking for something!! Here it is : ERROR")

// })

// app.listen(3000);

const express = require("express");
const jwt = require("jsonwebtoken");
const jwtPassword = "123456";

const app = express();

app.use(express.json());

const ALL_USERS = [
  {
    username: "harkirat@gmail.com",
    password: "123",
    name: "harkirat singh",
  },
  {
    username: "raman@gmail.com",
    password: "123321",
    name: "Raman singh",
  },
  {
    username: "priya@gmail.com",
    password: "123321",
    name: "Priya kumari",
  },
];

function userExists(username, password) {
  // write logic to return true or false if this user exists
  // in ALL_USERS array
  let userExistBool = false;
  ALL_USERS.forEach(function(user) {
      if(user.username == username && user.password == password ) {
          userExistBool = true;
    }   
  })
  return userExistBool;
  
}

app.post("/signin", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  console.log(userExists(username, password));

  if (!userExists(username, password)) {
    return res.status(403).json({
      msg: "User doesnt exist in our in memory db",
    });
  }

  var token = jwt.sign({ username: username }, jwtPassword);
  return res.json({
    token,
  });
});

app.get("/users", function (req, res) {
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, jwtPassword);
    const username = decoded.username;
    res.send(username)
    // return a list of users other than this username
  } catch (err) {
    return res.status(403).json({
      msg: "Invalid token",
    });
  }
});

app.listen(3000, function() {
    console.log('3000 port is running');
})