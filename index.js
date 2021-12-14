const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());


const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "mytestdb",
  password: "admin",
  port: 5432
});

// CREATE
app.post("/api/vote/new", (req, res) => {
    const {nom} = req.headers;
    const positif = 0;
    const negatif = 0
  
    pool.query(
      "INSERT INTO VOTE (NOM, POSITIF, NEGATIF) VALUES ($1, $2, $3)",
      [nom, positif, negatif],
      (error, results) => {
        if (error) {
          throw error;
        }
  
        res.sendStatus(201);
      }
    );
  });


// UPDATE
app.put("/api/vote/update", (req, res) => {
    const { id, nom, positif, negatif } = req.headers;
  
    pool.query(
      "UPDATE VOTE SET NOM = $1, POSITIF = $1, NEGATIF= $1 WHERE ID = $4",
      [nom, positif, negatif, id],
      (error, results) => {
        if (error) {
          throw error;
        }
  
        res.sendStatus(201);
      }
    );
  });

  // DELETE
  app.delete("/api/vote/delete", (req, res) => {
    const {id} = req.headers;
  
    pool.query(
      "DELETE FROM VOTE WHERE ID = $4",
      [id],
      (error, results) => {
        if (error) {
          throw error;
        }
  
        res.sendStatus(201);
      }
    );
  });

  // SEE ALL
  app.get("/api/vote/seeAll", (req, res) => {
    pool.query(
      "SELECT * FROM 'VOTE'",
      (error, results) => {
        if (error) {
          throw error;
        }
  
        res.status(200).json(results.rows);
      }
    );
  });

  // SEE ONE VOTE
  app.get("/api/vote/seeOne", (req, res) => {
    const {nom} = req.headers;

    pool.query(
      "SELECT * FROM 'VOTE' WHERE NOM = '$1'",
      [nom],
      (error, results) => {
        if (error) {
          throw error;
        }
  
        res.status(200).json(results.rows);
      }
    );
  });

app.listen(8080, () => {
  console.log(`Server is running.`);
});
