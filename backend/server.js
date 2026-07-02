const express = require('express');
const cors = require('cors');
const holdingsData = require('./data/holdings.json');
const capitalGainsData = require('./data/capitalGains.json');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const withLatency = (res, payload, ms = 600) => {
  setTimeout(() => res.json(payload), ms);
};

const holdingsWithIds = holdingsData.map((holding, index) => ({
  id: `${holding.coin}-${index}`,
  ...holding,
}));

app.get('/', (req, res) => {
  res.json({
    message: 'KoinX Tax Loss Harvesting mock API',
    endpoints: ['/api/holdings', '/api/capital-gains'],
  });
});

app.get('/api/holdings', (req, res) => {
  withLatency(res, holdingsWithIds);
});

app.get('/api/capital-gains', (req, res) => {
  withLatency(res, capitalGainsData);
});

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.listen(PORT, () => {
  console.log(`KoinX mock API server running on http://localhost:${PORT}`);
});
