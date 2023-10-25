const express = require("express");
const cors = require("cors");
const Axios = require("axios");
const app = express();
const PORT = 9000;

app.use(cors());
app.use(express.json());

app.post("/compile", (req, res) => {
  // Receive the required data from the request
 // let code = req.body.code;
  let language = req.body.language;
  let input = req.body.input;

  if (language == "python") {
    language = "py";
  }

//   let data = {
//     code: code,
//     langauge: language,
//     input: input,
//   };
  const encodedParams = new URLSearchParams();
  encodedParams.append(
    "code",
    req.body.code
  );

  encodedParams.append("language", "java");
  console.log(encodedParams);

  let config = {
    method: "post",
    url: "https://codex7.p.rapidapi.com/",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "X-RapidAPI-Host": "codex7.p.rapidapi.com",
      "X-RapidAPI-Key": "fcc2d6c6b3msh404adbe533c36f5p148528jsn4a93557ee62f",
    },
    data: encodedParams,
  };

  // Call the code compilation API
  Axios(config)
    .then((response) => {
      res.send(response.data);
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
