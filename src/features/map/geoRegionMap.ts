import type { RegionId } from '../../types';

/** GeoJSON `properties.name` (RU) → pilot region id */
export const GEO_NAME_TO_REGION_ID: Record<string, RegionId> = {
  'Санкт-Петербург': 'spb',
  Москва: 'msk',
  'Новосибирская область': 'nvs',
  'Свердловская область': 'svr',
  Татарстан: 'tat',
  'Краснодарский край': 'krd',
  'Нижегородская область': 'niz',
  'Ростовская область': 'ros',
  'Волгоградская область': 'vgg',
  'Ставропольский край': 'sta',
  'Самарская область': 'sam',
  Башкортостан: 'bas',
  'Республика Башкортостан': 'bas',
  'Челябинская область': 'che',
  'Пермский край': 'per',
  'Красноярский край': 'kya',
  'Иркутская область': 'irk',
  'Приморский край': 'pri',
  'Хабаровский край': 'kha',
  'Калининградская область': 'kal',
  'Воронежская область': 'vrn',
};

const LATIN_ALIASES: Record<string, RegionId> = {
  'Saint Petersburg': 'spb',
  Moscow: 'msk',
  'Novosibirsk Oblast': 'nvs',
  'Sverdlovsk Oblast': 'svr',
  'Republic of Tatarstan': 'tat',
  'Krasnodar Krai': 'krd',
  'Nizhny Novgorod Oblast': 'niz',
  'Rostov Oblast': 'ros',
  'Volgograd Oblast': 'vgg',
  'Stavropol Krai': 'sta',
  'Samara Oblast': 'sam',
  'Republic of Bashkortostan': 'bas',
  'Chelyabinsk Oblast': 'che',
  'Perm Krai': 'per',
  'Krasnoyarsk Krai': 'kya',
  'Irkutsk Oblast': 'irk',
  'Primorsky Krai': 'pri',
  'Khabarovsk Krai': 'kha',
  'Kaliningrad Oblast': 'kal',
  'Voronezh Oblast': 'vrn',
};

export function getPilotIdFromGeoProperties(
  properties: Record<string, unknown> | null,
): RegionId | null {
  if (!properties) return null;
  const name = String(properties.name ?? '');
  if (GEO_NAME_TO_REGION_ID[name]) return GEO_NAME_TO_REGION_ID[name];
  const latin = String(properties.name_latin ?? '');
  if (LATIN_ALIASES[latin]) return LATIN_ALIASES[latin];
  return null;
}

export const PILOT_GEO_NAMES = new Set(Object.keys(GEO_NAME_TO_REGION_ID));
