import CognitoExpress from "cognito-express";

const cognitoExpress = new CognitoExpress({
  region: process.env.COGNITO_REGION,
  cognitoUserPoolId: process.env.COGNITO_USER_POOL_ID,
  tokenUse: "id", //Possible Values: access | id
  // tokenExpiration: 3600000,
});

export default function authMiddleware(req, res, next) {
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  let accessTokenFromClient = req.headers.authorization;
  if (!accessTokenFromClient)
    return res.status(401).send("Access Token missing from header");

  cognitoExpress.validate(
    accessTokenFromClient.replace("Bearer ", ""),
    function (err, response) {
      if (err) {
        console.error(err);
        return res.status(401).send(err);
      } else {
        req.session = { user: response };
        next();
      }
    }
  );
}
