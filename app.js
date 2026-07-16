// ============================================================
// QUOTES BACKEND
//
// Before you start:
//   1. Create a database named "quotes" in Postico or pgAdmin
//   2. Check your package.json and see what packages you need
//   3. Run: npm install sequelize pg pg-hstore
//   4. Complete db/index.js (database connection) first
//   5. Complete models/Quote.js (Quote model) second
//   6. Come back here last — this file depends on both
//
// To start the server: node app.js
// ============================================================
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const quoteDb = require('./db')
const Quote = require('./models/quote')

// ------------------------------------------------------------
// STEP 1 — Import your database connection and Quote model





// Importing Quote here registers it with the connection so
// db.sync() below knows to create the Quotes table.

// So now that we have the db, let's sync first before we start our api server
// Jump to the last line for STEP 2
// ------------------------------------------------------------


const app = express()
const PORT = 8080

app.use(express.json())  // lets the server read JSON from req.body
app.use(morgan('combined'))   // logs every incoming request
app.use(cors())          // allows the React frontend to call this server


// ============================================================
// ROUTES
// ============================================================

// ------------------------------------------------------------
// GET /api/quotes
//
// Return every quote from the database as an array.
// Hint: find the Sequelize method that fetches all rows from a table.
// ------------------------------------------------------------
app.get('/api/quotes', async (req, res, next) => {
  try {
    const allQuotes = await Quote.findAll({order: [['id', 'ASC']],})
    res.json(allQuotes)
  } catch (error) {
    next(error)
  }
})


// ------------------------------------------------------------
// POST /api/quotes
//
// Create a new quote using the data sent in the request body.
// Hint: what information do we want to accept in this route?
// Hint: how do we capture JSON information sent to the route?
//
// Hint: find the Sequelize method that inserts a new row and returns it.
// Send back status 201 and the new quote.
// ------------------------------------------------------------
app.post('/api/quotes', async (req, res, next) => {
  try {
    const newQuote = await Quote.create({
      text: req.body.text,
      author: req.body.author
    })
    res.status(201).json(newQuote)
  } catch (error) {
    next(error)
  }
})


// ------------------------------------------------------------
// DELETE /api/quotes/:id
//
// Find the quote by its id, then remove it.
//
// Steps:
//   1. Get the id for the quote you want to delete
//   2. Find the quote by primary key using a sequelize method
//   3. If nothing comes back, send 404
//   4. Call the instance method that deletes the row
//   5. Send 204 — no body needed on a successful delete
// ------------------------------------------------------------
app.delete('/api/quotes/:id', async (req, res, next) => {
  try {
    const quoteId = Number(req.params.id)
    const quote = await Quote.findByPk(quoteId)

    if (!quote) {
     res.status(404).json({error: "Quote not found!"})
    }

    await quote.destroy()

    res.sendStatus(204)

  } catch (error) {
    next(error)
  }
})


// ============================================================
// STRETCH ROUTES — come back to these after the three above work
// ============================================================

// GET /api/quotes/:id   — return a single quote by its id

app.get("/api/quotes/:id" , async (req, res, next) => {
  try {
    const quoteId = Number(req.params.id)
    const singleQuote = await Quote.findByPk(quoteId)

    if(!singleQuote) {
      res.status(404).json({error: "Quote not found!"})
    }

    res.json(singleQuote)
  } catch(error) {
    next(error)
  } 
})
// PATCH /api/quotes/:id — update a quote's text or author
app.patch("/api/quotes/:id", async(req, res, next) => {
  try {
    const quoteId = Number(req.params.id)
    const quote = await Quote.findByPk(quoteId)

    if (!quote) {
      res.status(404).json({error: "Quote not found!"})
    }

    await quote.update(req.body)

    res.status(200).json(quote)
  }catch(error){
    next(error)
  }
})

app.use((req, res, next) => {
  res.send('404 - You should not be here!')
})

// ============================================================
// ERROR HANDLER
//
// 4 parameters is how Express knows this is an error handler.
// Any route that calls next(error) lands here.
// ============================================================
app.use((error, req, res, next) => {
  console.error(error)
  res.sendStatus(500)
})


// ============================================================
// STEP 2 — Start the server
//
// db.sync() reads your models and creates any missing tables
// in PostgreSQL before the server starts accepting requests.
// Always await it before calling app.listen.
// ============================================================
async function startApp() {
  await quoteDb.authenticate()
  console.log("Database connected")
  
  await quoteDb.sync()

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  }
  // connect to your db here before the express server listens

startApp()
