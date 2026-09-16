/**
 * 天氣 → 遊客可執行建議（純函式，供建置期、Worker 與前端共用）
 * 以角板山的「山地／溪谷」環境為主軸：步道濕滑、溪水暴漲、邊坡落石、山區道路能見度、觀景台與雲海。
 */

export interface AdviceInput {
  /** WMO 天氣代碼 */
  code: number;
  /** 中文天氣描述 */
  condition: string;
  tmax: number;
  tmin: number;
  /** 降雨機率 0–100 */
  rainProb: number;
  /** 日累積雨量 mm */
  precipSum: number;
  /** 最大風速 m/s */
  windMax: number;
  /** 最大陣風 m/s */
  windGust: number;
  /** 紫外線指數 */
  uv: number;
}

export interface WeatherAdvice {
  /** 風險提醒（有才顯示，置頂紅色） */
  risks: string[];
  /** 出行穿搭 */
  dress: string[];
  /** 遊玩安排 */
  plan: string[];
  /** 隨身物品 */
  gear: string[];
}

export function beaufortLevel(speed: number): number {
  const thresholds = [0.3, 1.6, 3.4, 5.5, 8.0, 10.8, 13.9, 17.2, 20.8, 24.5, 28.5, 32.7];
  for (let level = 0; level < thresholds.length; level += 1) {
    if (speed < thresholds[level]) return level;
  }
  return 12;
}

export function windText(level: number): string {
  if (level <= 2) return '微風';
  if (level <= 4) return '和風';
  if (level <= 6) return `風力 ${level} 級`;
  return `大風 ${level} 級`;
}

export function uvText(uv: number): string {
  if (uv >= 11) return '紫外線極強';
  if (uv >= 8) return '紫外線很強';
  if (uv >= 6) return '紫外線強';
  if (uv >= 5) return '紫外線偏強';
  if (uv >= 3) return '紫外線中等';
  return '紫外線弱';
}

export function humidityText(humidity: number): string {
  if (humidity >= 85) return '悶濕';
  if (humidity >= 70) return '偏濕潤';
  if (humidity >= 45) return '舒適';
  if (humidity >= 30) return '偏乾';
  return '乾燥';
}

function isRainy(condition: string): boolean {
  return condition.includes('雨');
}

function isSnowy(condition: string): boolean {
  return condition.includes('雪') || condition.includes('霧凇');
}

type RainLevel = 'thunder' | 'heavy' | 'moderate' | 'light' | 'drizzle' | 'chance' | 'none';

function rainLevel(input: AdviceInput): RainLevel {
  if (input.code >= 95) return 'thunder';
  if (input.precipSum >= 20 || input.code === 65 || input.code === 82 || input.code === 67) return 'heavy';
  if (input.precipSum >= 5 || input.code === 63 || input.code === 81) return 'moderate';
  if (isRainy(input.condition) || input.precipSum > 0) {
    // 毛毛雨等級：雨勢小，只提醒濕滑與備用雨具
    if (input.precipSum < 1 && input.code <= 57 && input.rainProb < 60) return 'drizzle';
    return 'light';
  }
  // 降雨機率不是肯定會下雨，只提醒準備
  if (input.rainProb >= 60) return 'chance';
  return 'none';
}

export function buildAdvice(input: AdviceInput): WeatherAdvice {
  const risks: string[] = [];
  const dress: string[] = [];
  const plan: string[] = [];
  const gear: string[] = [];

  const rain = rainLevel(input);
  const windLevel = beaufortLevel(input.windMax);
  const gustLevel = beaufortLevel(input.windGust);
  // 以持續風為主、陣風只在明顯偏強時才提醒，避免與卡片上的「風力」標示互相矛盾
  const strongGust = gustLevel >= Math.max(7, windLevel + 2);
  const diff = input.tmax - input.tmin;
  const fog = input.code === 45 || input.code === 48;
  const snow = isSnowy(input.condition);
  const severe = rain === 'thunder' || rain === 'heavy' || windLevel >= 7 || gustLevel >= 8 || fog;

  // 1. 降水（風險優先）
  if (rain === 'thunder') {
    risks.push('有雷雨，請不要待在觀景台、稜線、大樹下或溪谷邊，盡快到建築物內躲避。');
    plan.push('雷雨時不建議登山與溪谷行程，改看行館、樟腦收納所、戰備隧道等室內空間。');
    dress.push('穿防滑好走的鞋，雷雨後石階與木棧道會很快變滑。');
    gear.push('雨衣（風大時比長柄傘安全）');
  } else if (rain === 'heavy') {
    risks.push('降雨較強，避免前往溪谷、低窪地與邊坡下方，留意山區道路積水與落石。');
    plan.push('不建議安排長程步道與溪邊行程，以室內展示與園區近景為主。');
    dress.push('以防水、防滑的穿著為主，山區步道遇雨容易濕滑。');
    gear.push('雨衣，不建議長柄傘');
  } else if (rain === 'moderate') {
    plan.push('會下雨，戶外行程被打斷的機率高，先備好室內替代行程。');
    dress.push('建議穿防水、防滑好走的鞋，石階與木棧道遇雨會滑。');
    gear.push('雨衣或摺疊傘');
  } else if (rain === 'light') {
    plan.push('有小雨，山區步道、石階與隧道入口會濕滑，放慢腳步、少走陡坡。');
    dress.push('穿防滑好走的鞋，避免光滑鞋底。');
    gear.push('摺疊傘或輕便雨衣');
  } else if (rain === 'drizzle') {
    plan.push('有零星小雨，雨勢不大，但山區石階與木棧道遇水會滑，腳步放慢即可。');
    gear.push('可備一把輕便傘');
  } else if (rain === 'chance') {
    plan.push('降雨機率偏高（不代表一定會下），行程保留彈性，午後尤須留意。');
    gear.push('摺疊傘');
  }

  if (input.precipSum >= 50) {
    risks.push('累積雨量大，溪水可能暴漲，請遠離溪床、河岸與低窪地，切勿戲水。');
    plan.push('取消戲水與溪邊行程，改走園區主步道與室內空間。');
  }

  // 2. 風力
  if (windLevel >= 7 || gustLevel >= 8) {
    risks.push('大風，請遠離邊坡、施工圍籬與高大樹木，觀景台與步道上注意站穩。');
    plan.push('風大時觀景台體感更冷、也更危險，建議縮短停留時間。');
    dress.push('穿貼合、不易被風掀的衣物，帽子要能固定。');
  } else if (windLevel >= 5 && !severe) {
    plan.push('風偏大，觀景台與開闊處會更冷，帽子與輕的物品請抓好。');
    dress.push('加一件防風外套，山區迎風處體感會低個幾度。');
  } else if (strongGust && !severe) {
    plan.push(`陣風可達 ${windText(gustLevel)}，觀景台與步道上請抓好帽子與輕的物品。`);
  }

  // 3. 高溫與紫外線
  if (input.tmax >= 32) {
    dress.push('氣溫偏高，穿輕薄、透氣、排汗的衣物。');
    plan.push('盡量避開正午時段，把戶外路程縮短、多找樹蔭休息。');
    gear.push('防曬乳', '遮陽帽', '充足飲用水');
  } else if (input.tmax >= 28 && !severe) {
    plan.push('白天偏熱，記得補充水分，步道沿途找樹蔭休息。');
    gear.push('飲用水');
  }

  if (input.uv >= 5) {
    dress.push(input.uv >= 8 ? '紫外線很強，建議長袖薄外套或袖套遮陽。' : '紫外線偏強，注意防曬。');
    gear.push('防曬乳', '墨鏡', '遮陽帽');
  }

  // 4. 低溫與溫差
  if (input.tmax <= 10) {
    dress.push('氣溫偏低，做好保暖，採多層次穿法。');
    gear.push('厚外套、圍巾或毛帽');
  } else if (diff > 8) {
    dress.push(`日夜溫差約 ${diff}℃，採洋蔥式穿法，方便隨時增減。`);
  }

  if (input.tmin <= 10 && input.tmin > 3) {
    dress.push('清晨與傍晚偏涼，帶一件好收納的外套。');
  }
  if (input.tmin <= 3) {
    dress.push('清晨低溫，山區步道可能結霜或濕滑，手套與保暖層別省。');
    if (snow || input.code === 48) {
      risks.push('低溫有霜雪，步道與路面可能結冰，請放慢腳步、避免奔跑。');
      gear.push('防滑鞋');
    }
  }

  if (snow) {
    plan.push('低溫有雨雪，以室內與近距離行程為主，留意階梯與坡道。');
  }

  // 5. 能見度（山區霧）
  if (fog) {
    risks.push('能見度差，北橫（台 7 線）山區道路請開大燈、減速慢行。');
    plan.push('不適合遠眺山谷與拍攝大景，可改看園區近景與建築細節。');
  }

  // 6. 好天氣與山景加碼（有風險時不顯示，避免訊息打架）
  if (!severe) {
    if (input.code === 0) {
      plan.push('天氣晴朗，最適合戶外散步、觀景與拍照。');
    } else if (input.code === 1) {
      plan.push('晴到多雲，很適合戶外散步、觀景與拍照。');
    } else if (input.code === 2) {
      plan.push('多雲、光線柔和，很適合拍照，也適合慢慢逛園區。');
    } else if (input.code === 3) {
      plan.push('陰天沒有曝曬，適合長時間在戶外散步。');
    }

    if (input.precipSum >= 1 && input.precipSum <= 15 && diff >= 7 && input.code <= 2) {
      plan.push('雨後轉晴、日夜溫差大，清晨山谷有機會出現雲海，早起值得。');
    }
    if (input.tmin <= 12 && input.tmax - input.tmin >= 6 && input.code <= 2) {
      plan.push('清晨水氣足，思親亭一帶較有機會看到山谷雲霧層次。');
    }
  }

  // 7. 有風險時，安全永遠是最優先的一條
  if (risks.length > 0) {
    plan.unshift('以安全為優先，彈性調整或延後行程，出發前再看一次最新預報。');
  }

  // 8. 兜底，避免建議區空白
  if (dress.length === 0) {
    dress.push(
      rain === 'none' || rain === 'chance'
        ? '天氣舒適，輕便好走的衣物與鞋子即可。'
        : '以防水、防滑的穿著為主，山區步道遇雨容易濕滑。',
    );
  }
  if (plan.length === 0) {
    plan.push('天氣穩定，照原訂行程走即可，記得補充水分。');
  }

  return {
    risks: unique(risks),
    dress: unique(dress),
    plan: unique(plan),
    gear: unique(gear),
  };
}

function unique(list: string[]): string[] {
  return Array.from(new Set(list.filter(Boolean)));
}
