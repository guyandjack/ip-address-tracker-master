const app = require("./app");
const dotenv = require("dotenv");
const http = require("http");
const path = require("path");
dotenv.config({ path: path.join(__dirname, ".env") });

const server = http.createServer(app);


const normalizePort = (value) => {
    const port = parseInt(value, 10);

    //use for pie UNIX
    if (isNaN(port)) {
        return value
    }

    if (port >= 0) {
        return port
    }
    return false
}

console.log("port brut: ", process.env.PORT);
const normalizedPort = normalizePort(process.env.PORT);
console.log("port normalisé: ", normalizedPort);


server.listen(normalizedPort);



/*********************handlerrors*********************
 *
 * start**************/

//fonction qui gère les erreurs de connexion au serveur
 const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const address = server.address();
  const bind =
    typeof address === "string" ? "pipe " + address : "port: " + normalizedPort;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges.");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use.");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

server.on("error", errorHandler); 

//aider à diagnostiquer des problèmes en affichant le port d'écoute.
server.on("listening", () => {
  const address = server.address();
    const bind = typeof address === "string" ? "pipe " + address : "port " + normalizedPort;
    
  console.log("Listening on " + bind);
});

// intercepte les promesses non gérées
process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED REJECTION!  Shutting down... promesse non gérée");
  console.error(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

// intercepte les exceptions non gérées
process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION!  Shutting down... exception non gérée");
  console.error(err.name, err.message);
  server.close(() => {
      process.exit(1);
  });
});

/*********************handlerrors*********************
 *
 * end**************/
