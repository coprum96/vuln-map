import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = join(__dirname, 'data');

async function loadJson(name) {
  const raw = await readFile(join(dataDir, name), 'utf8');
  return JSON.parse(raw);
}

export async function getRegions(_req, res) {
  const data = await loadJson('regions.json');
  res.json(data);
}

export async function getRegionById(req, res) {
  const data = await loadJson('regions.json');
  const region = data.find((r) => r.id === req.params.id);
  if (!region) {
    res.status(404).json({ error: 'Region not found' });
    return;
  }
  res.json(region);
}

export async function getClusters(_req, res) {
  const data = await loadJson('clusters.json');
  res.json(data);
}

export async function getRoi(_req, res) {
  const data = await loadJson('roi.json');
  res.json(data);
}

export async function getResearch(_req, res) {
  const data = await loadJson('research.json');
  res.json(data);
}

export async function getHealth(_req, res) {
  res.json({ status: 'ok', service: 'vulnmap-api' });
}
