import express from 'express';
import { sequelize } from './db/connection.js';
import { Transaction } from './db/models/transaction.js';
const app = express();
const port = 3000;

app.use(express.json())

app.post('/transactions', async (req, res) => {
  const body = req.body;
  const data = {
    ...body,
  }
  try {
    const response = await Transaction.create(data)
    res.json(response);
  } catch (error) {
    const err = error.message || error.data.message || 'error';
    res.status(500).send(err);
  }
});

app.get('/transactions', async (req, res) => {
  try {
    const response = await Transaction.findAll()
    res.json(response)
  } catch (error) {
    const err = error.message || error.data.message || 'error';
    res.status(500).send(err);
  }
});

app.get('/transactions/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const response = await Transaction.findByPk(id);
    if (!response) {
      res.status(404).send('id not found');
    } else {
      res.json(response);
    }
  } catch (error) {
    const err = error.message || error.data.message || 'error';
    res.status(500).send(err);
  }
});

app.put('/transactions/:id', async (req, res) => {
  const body = req.body;
  const id = req.params.id;
  try {
    const response = await Transaction.update(
      {
        ...body
      }, {
        where: {
          ID: id
        }
      }
    )
    if (response.length > 0 && !response[0]) {
      res.status(404).send('id not found');
    } else {
      res.json(response);
    }
  } catch (error) {
    const err = error.message || error.data.message || 'error';
    res.status(500).send(err);
  }
});

app.delete('/transactions/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const response = await Transaction.destroy({
      where: {
        ID: id
      }
    });
    if (!response) {// response is 0 when id is not found
      res.status(404).send('id not found');
    } else {
      res.json(response);
    }
  } catch (error) {
    const err = error.message || error.data.message || 'error';
    res.status(500).send(err);
  }
});

sequelize
  .authenticate()
  .then(() => {
    console.log(
      'Connection success');
    return sequelize.sync();
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server listen on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Connection fail', error);
  });
