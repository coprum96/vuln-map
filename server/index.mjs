import express from 'express';
import cors from 'cors';
import {
  getRegions,
  getRegionById,
  getClusters,
  getRoi,
  getResearch,
  getHealth,
} from './handlers.mjs';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get('/api/health', getHealth);
app.get('/api/regions', getRegions);
app.get('/api/regions/:id', getRegionById);
app.get('/api/clusters', getClusters);
app.get('/api/roi', getRoi);
app.get('/api/research', getResearch);

app.listen(PORT, () => {
  console.log(`VulnMap API listening on http://localhost:${PORT}`);
});
