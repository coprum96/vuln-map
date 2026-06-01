import type { ClusterId, RegionId, Recommendation } from '../types';

const BY_CLUSTER: Record<ClusterId, Recommendation[]> = {
  0: [
    {
      id: 'c0-1',
      title: 'Деэскалация предупреждений',
      body: 'Персонализировать частоту push/SMS-алертов для снижения warning fatigue.',
      priority: 'high',
    },
    {
      id: 'c0-2',
      title: 'Поведенческий nudge при переводе',
      body: 'Пауза 30 сек. и контрольный вопрос при операциях >10 тыс. ₽.',
      priority: 'medium',
    },
  ],
  1: [
    {
      id: 'c1-1',
      title: 'Линия доверия для 65+',
      body: 'Выделенный канал банка с верификацией «звонка из банка».',
      priority: 'high',
    },
    {
      id: 'c1-2',
      title: 'Восстановление доверия к МВД',
      body: 'Success stories и прозрачная обратная связь по обращениям.',
      priority: 'high',
    },
  ],
  2: [
    {
      id: 'c2-1',
      title: 'Контроль инвестиционных схем',
      body: 'Скоринг подозрительных брокерских реквизитов и лимиты на новые контрагенты.',
      priority: 'high',
    },
    {
      id: 'c2-2',
      title: 'Калибровка уверенности',
      body: 'Микрообучение после отказа от предупреждения о мошенничестве.',
      priority: 'medium',
    },
  ],
};

const BY_REGION: Partial<Record<RegionId, Recommendation[]>> = {
  krd: [
    {
      id: 'krd-1',
      title: 'Южный пилот SMS-подтверждения',
      body: 'Обязательное SMS-подтверждение переводов >10 тыс. ₽ в критическом регионе.',
      priority: 'high',
    },
  ],
  msk: [
    {
      id: 'msk-1',
      title: 'Мониторинг инвестиционного фрода',
      body: 'Усиленный AML-скоринг для P2P и брокерских переводов в столице.',
      priority: 'high',
    },
  ],
  pri: [
    {
      id: 'pri-1',
      title: 'Контроль трансграничных переводов',
      body: 'Усиленная верификация операций с контрагентами Дальнего Востока и СНГ.',
      priority: 'high',
    },
  ],
  vgg: [
    {
      id: 'vgg-1',
      title: 'Волжский коридор SMS-верификации',
      body: 'Обязательное подтверждение переводов свыше 5 тыс. ₽ для южных волжских регионов.',
      priority: 'high',
    },
  ],
  kal: [
    {
      id: 'kal-1',
      title: 'Профилактика трансграничного онлайн-фрода',
      body: 'Информирование о рисках международных платежей и поддельных маркетплейсах.',
      priority: 'medium',
    },
  ],
  che: [
    {
      id: 'che-1',
      title: 'Промышленный сегмент: звонки «из банка»',
      body: 'Таргетированные предупреждения для зарплатных клиентов Уральского ФО.',
      priority: 'high',
    },
  ],
  irk: [
    {
      id: 'irk-1',
      title: 'Закрепление снижения уязвимости',
      body: 'Сохранить действующие программы цифровой грамотности в Сибирском ФО.',
      priority: 'medium',
    },
  ],
};

export function getRecommendations(
  regionId: RegionId,
  dominantCluster: ClusterId,
): Recommendation[] {
  const regional = BY_REGION[regionId] ?? [];
  const clusterRecs = BY_CLUSTER[dominantCluster];
  const seen = new Set<string>();
  const merged: Recommendation[] = [];
  for (const r of [...regional, ...clusterRecs]) {
    if (!seen.has(r.id)) {
      seen.add(r.id);
      merged.push(r);
    }
  }
  return merged.slice(0, 4);
}
