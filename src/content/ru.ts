import type { ClusterId, RegionId, RiskLevel, ScenarioId, TrendDirection } from '../types';

export const ru = {
  app: {
    title: 'Сова',
    subtitle: 'Надзорная аналитика | ФинТехЛаб СПбГУ',
    logo: 'ФТЛ',
    study: 'Исследование 2024–2025 | 15 000 респондентов',
    exportReport: 'Экспорт отчёта',
  },
  header: {
    productName: 'Сова',
    descriptor: 'Надзорная аналитика уязвимости',
    markAria: 'Сова — надзорная аналитика',
    metaSuptech: 'SupTech',
    metaPilot: 'Пилот 2024–2025',
    metaObservation: 'Пилотное наблюдение',
  },
  regions: {
    spb: 'Санкт-Петербург',
    msk: 'Москва',
    nvs: 'Новосибирск',
    svr: 'Екатеринбург',
    tat: 'Казань',
    krd: 'Краснодар',
    niz: 'Нижний Новгород',
    ros: 'Ростов-на-Дону',
    vgg: 'Волгоградская область',
    sta: 'Ставропольский край',
    sam: 'Самарская область',
    bas: 'Республика Башкортостан',
    che: 'Челябинская область',
    per: 'Пермский край',
    kya: 'Красноярский край',
    irk: 'Иркутская область',
    pri: 'Приморский край',
    kha: 'Хабаровский край',
    kal: 'Калининградская область',
    vrn: 'Воронежская область',
  } satisfies Record<RegionId, string>,
  riskLevel: {
    low: 'Низкий',
    medium: 'Средний',
    high: 'Высокий',
    critical: 'Критический',
  } satisfies Record<RiskLevel, string>,
  trend: {
    improving: 'Снижение',
    worsening: 'Рост',
    stable: 'Стабильно',
  } satisfies Record<TrendDirection, string>,
  cluster: {
    0: 'Высокий риск',
    1: 'Пожилые уязвимые',
    2: 'Самоуверенные',
  } satisfies Record<ClusterId, string>,
  scenarios: {
    bank_call: 'Звонок из банка',
    sms_phishing: 'SMS-фишинг',
    invest_fraud: 'Инвестфрод',
    pseudo_gos: 'Псевдо-госуслуги',
    resort_fraud: 'Курортный фрод',
    online_fraud: 'Онлайн-мошенничество',
  } satisfies Record<ScenarioId, string>,
  filters: {
    title: 'Фильтры',
    risk: 'Уровень риска',
    cluster: 'Группа риска',
    trend: 'Динамика',
    all: 'Все',
  },
  metrics: {
    nationalIndex: 'Средний индекс уязвимости',
    criticalRegions: 'Регионов критического уровня',
    worseningRegions: 'Регионов с ростом риска',
    annualExposure: 'Совокупная экспозиция',
    annualRegionalLosses: 'Годовые потери регионов',
    indexUnit: 'баллов',
    regionsUnit: 'рег.',
    blnUnit: 'млрд ₽',
  },
  map: {
    title: 'Карта уязвимости',
    index: 'Индекс',
    legend: 'Уровень риска',
  },
  mapScreen: {
    title: 'Карта уязвимости населения к социальной инженерии',
    subtitle:
      '20 субъектов РФ в пилотном наблюдении: индекс уязвимости и уровень риска (2024–2025).',
    mapHint:
      'Наведение — сводка; выбор субъекта пилота — карточка региона.',
    filters: {
      period: 'Отчётный период',
      period2025: '2025',
      period2024: '2024',
      riskLevel: 'Уровень риска',
    },
    legend: {
      title: 'Легенда карты',
      pilotSection: 'Пилотные регионы — уровень риска',
      outsideSection: 'Вне пилота',
      outsideNote:
        'Серый цвет — субъект не входит в пилот; индекс и детализация недоступны.',
      low: 'Низкий',
      medium: 'Средний',
      high: 'Высокий',
      critical: 'Критический',
      noData: 'Нет данных',
    },
    tooltip: {
      index: 'Индекс',
      risk: 'Риск',
      trend: 'Динамика',
      summaryClick: 'Выбор субъекта — карточка региона',
      outsideTitle: 'Вне пилота',
      hintNoData:
        'Показатели по субъекту не формируются. Выберите субъект пилотного наблюдения на карте.',
    },
    sidebar: {
      title: 'Карточка субъекта пилота',
      subtitle: 'Сводка для целей надзорного анализа',
      close: 'Закрыть карточку',
    },
    empty: {
      filterTitle: 'Нет субъектов по заданным критериям',
      filterBody:
        'Измените период или уровень риска либо сбросьте параметры отбора.',
      filterAction: 'Сбросить параметры',
      loadErrorTitle: 'Картографические данные недоступны',
      loadErrorBody:
        'Повторите загрузку страницы. Источник: локальный каталог геоданных.',
      loadErrorAction: 'Обновить страницу',
      loading: 'Загрузка картографического слоя…',
    },
    selectionHint: 'Выбранный субъект',
    summary: {
      pilots: 'субъектов пилота',
      highCritical: 'повышенный / критический риск',
      priority: 'Первоочередной контроль',
    },
    quickActions: {
      label: 'Переход',
      openMsk: 'Москва',
      openSpb: 'Санкт-Петербург',
      showCritical: 'Критический уровень',
    },
  },
  panel: {
    sections: {
      summary: 'Ключевой вывод',
      responsePriority: 'Приоритет реагирования',
      vulnerabilitySigns: 'Признаки повышенной уязвимости',
      impactScenarios: 'Сценарии социальной инженерии',
      factors: 'Факторы уязвимости',
      trend: 'Динамика показателя',
      action: 'Приоритетная мера',
      details: 'Расширенная детализация',
      links: 'Дополнительные сведения',
    },
    summary: {
      critical:
        'Критический уровень риска. Преобладает группа населения «{cluster}».',
      high: 'Повышенный уровень риска. Доминирует группа «{cluster}».',
      medium: 'Умеренный уровень риска. Профиль «{cluster}».',
      low: 'Относительно низкий уровень в пилоте. Профиль «{cluster}».',
    },
    responsePriority: {
      critical:
        'Первоочередной надзор: усиленный мониторинг и координация с кредитными организациями.',
      high: 'Повышенный надзор: регулярный контроль показателей и сценариев воздействия.',
      medium: 'Стандартный надзор: выборочный контроль и профилактика.',
      low: 'Базовый надзор: точечные превентивные меры.',
    },
    signs: {
      dominantGroup: 'Преобладает группа «{cluster}» ({share}% в модели).',
      factor: 'Выявлен фактор: {factor}.',
      largeLossShare: 'Доля потерь свыше 50 тыс. ₽: {pct}%.',
      worseningTrend: 'Зафиксирован рост индекса относительно 2024 года.',
    },
    insights: {
      vsPilotHigher:
        'Индекс {score} баллов — выше среднего по пилоту ({avg} баллов).',
      vsPilotLower:
        'Индекс {score} баллов — ниже среднего по пилоту ({avg} баллов).',
      exposureHigh:
        'Годовая экспозиция {mln} млн ₽ превышает медиану пилота ({median} млн ₽).',
    },
    drivers: {
      dominantCluster: 'Группа населения',
      indexDynamic: 'Динамика индекса',
      topScenario: 'Сценарий (1)',
      secondScenario: 'Сценарий (2)',
      exposure: 'Финансовая экспозиция',
      largeLoss: 'Крупные потери',
    },
    contribution: {
      increases: '+',
      decreases: '−',
      neutral: '·',
    },
    actionPriority: {
      high: 'Высокий приоритет',
      medium: 'Средний приоритет',
    },
    trend: {
      year2024: '2024',
      year2025: '2025',
      points: 'баллов',
      flat:
        'Существенного изменения индекса не выявлено. Сохранить действующий контур надзора.',
      improved:
        'Снижение на {delta} п.п. Рекомендуется закрепить принятые меры.',
      worsened:
        'Рост на {delta} п.п. Рекомендуется усилить превентивные меры.',
      stable:
        'Изменение в пределах {delta} п.п. Контур надзора без корректировки.',
    },
    action: {
      nextStep: 'Приоритетная мера',
    },
    links: {
      helper: 'Переход к разделам расширенной детализации.',
      finance: 'Финансовые показатели',
      scenarios: 'Сценарии',
      recommendations: 'Меры воздействия',
      export: 'Выгрузить записку (.txt)',
    },
    empty: {
      noInsights: 'Дополнительные уточнения не требуются.',
      noAction: 'Приоритетная мера уточняется по результатам детализации.',
      noDrivers: 'Выраженные факторы не выделены.',
      noSigns: 'Признаки уточняются по расширенной детализации.',
      noScenarios: 'Сценарии не классифицированы в текущем срезе.',
    },
    export: {
      title: 'КРАТКАЯ НАДЗОРНАЯ ЗАПИСКА',
      subtitle: 'Сова · пилотное наблюдение',
      region: 'СУБЪЕКТ',
      riskLevel: 'УРОВЕНЬ РИСКА',
      conclusion: 'КЛЮЧЕВОЙ ВЫВОД',
      signs: 'ПРИЗНАКИ ПОВЫШЕННОЙ УЯЗВИМОСТИ',
      scenarios: 'СЦЕНАРИИ ВОЗДЕЙСТВИЯ',
      factors: 'ФАКТОРЫ УЯЗВИМОСТИ',
      dynamics: 'ДИНАМИКА',
      responsePriority: 'ПРИОРИТЕТ РЕАГИРОВАНИЯ',
      measure: 'ПРИОРИТЕТНАЯ МЕРА',
      details: 'ДОПОЛНИТЕЛЬНЫЕ СВЕДЕНИЯ',
    },
  },
  drilldown: {
    selectRegion: 'Выберите субъект на карте',
    index: 'Индекс уязвимости',
    vs2024: 'к уровню 2024 г.',
    clusters: 'Структура групп риска населения',
    scenarios: 'Сценарии социальной инженерии',
    finance: 'Финансовая экспозиция',
    avgLoss: 'Средний ущерб',
    largeLoss: 'Потери >50 тыс. ₽',
    annual: 'Годовой объём',
    nudges: 'Меры профилактики и реагирования',
    ranking: 'Рейтинг регионов',
    region: 'Регион',
    score: 'Индекс',
    dynamic: 'Δ 2024→2025',
    riskFactors: 'Факторы и драйверы риска',
    dominantCluster: 'Доминирующая группа',
    topScenarios: 'Ключевые сценарии',
  },
  roi: {
    title: 'Модель эффекта вмешательств',
    bau: 'Без вмешательств',
    partial: 'Частичное внедрение',
    full: 'Полное внедрение',
    investment: 'Инвестиции',
    roi: 'ROI',
    sensitivity: 'Чувствительность',
    mln: 'млн ₽',
    savings: 'Экономия',
  },
  research: {
    respondents: '15 000 респондентов',
    features: '85 признаков',
    silhouette: 'Silhouette',
    anova: 'ANOVA F',
  },
} as const;

export function regionName(id: RegionId): string {
  return ru.regions[id];
}

export function riskLabel(level: RiskLevel): string {
  return ru.riskLevel[level];
}

export function clusterLabel(id: ClusterId): string {
  return ru.cluster[id];
}

export function scenarioLabel(id: ScenarioId): string {
  return ru.scenarios[id];
}

export function trendLabel(trend: TrendDirection): string {
  return ru.trend[trend];
}
