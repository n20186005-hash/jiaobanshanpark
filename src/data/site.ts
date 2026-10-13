export type Attraction = {
  id: string;
  name: string;
  eyebrow: string;
  description: string;
  tip: string;
  duration: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  alt: string;
  position?: string;
};

export type RoutePlan = {
  id: string;
  title: string;
  duration: string;
  audience: string;
  summary: string;
  stops: string[];
  note: string;
};

export const attractions: Attraction[] = [
  {
    id: 'residence',
    name: '角板山行館',
    eyebrow: '歷史空間',
    description: '走進林蔭中的白色行館，從建築、舊照片與生活展示，認識角板山在北橫山區的歷史角色。',
    tip: '室內開放時間與戶外園區不同，建議先看行館再慢慢逛園區。',
    duration: '約 25 分鐘',
    image: 'jiaobanshan-park-resort-1',
    imageWidth: 960,
    imageHeight: 640,
    alt: '林蔭中的角板山行館白色建築',
    position: '50% 55%',
  },
  {
    id: 'plum',
    name: '梅園與山谷',
    eyebrow: '冬季風景',
    description: '冬季梅花沿著坡地展開，遠方可見大漢溪與層疊山谷，是園區最具季節感的散步畫面。',
    tip: '花況受氣溫與降雨影響，賞梅季假日建議提早抵達。',
    duration: '約 25 分鐘',
    image: 'jiaobanshan-park-plum-1',
    imageWidth: 960,
    imageHeight: 720,
    alt: '角板山梅花與大漢溪山谷景觀',
    position: '50% 48%',
  },
  {
    id: 'tunnel',
    name: '戰備隧道',
    eyebrow: '地下探索',
    description: '沿著山壁進入戰備隧道，感受冷戰時期留下的防護空間。林下入口與狹長通道很有辨識度。',
    tip: '內部較涼且可能潮濕，雨後請留意地面，怕密閉空間者可從入口折返。',
    duration: '約 15 分鐘',
    image: 'jiaobanshan-park-tunnel-entrance-1',
    imageWidth: 960,
    imageHeight: 720,
    alt: '角板山戰備隧道的林下入口',
    position: '50% 52%',
  },
  {
    id: 'pavilion',
    name: '思親亭',
    eyebrow: '觀景停留',
    description: '穿過林間步道抵達思親亭，在樹梢間眺望溪谷與對岸台地，理解行館為何選在這片山腰。',
    tip: '晴朗時視野最好；通往觀景區有坡度，帶長輩請放慢腳步。',
    duration: '約 15 分鐘',
    image: 'jiaobanshan-park-pavilion-1',
    imageWidth: 960,
    imageHeight: 720,
    alt: '角板山行館園區內的思親亭',
    position: '50% 46%',
  },
  {
    id: 'camphor',
    name: '樟腦收納所',
    eyebrow: '產業記憶',
    description: '木造空間保存角板山過去與樟腦產業的連結，讓旅程不只看山景，也看見山城形成的歷史脈絡。',
    tip: '建築內部是否開放可能依現場安排調整，外觀與周邊仍可順遊。',
    duration: '約 15 分鐘',
    image: 'jiaobanshan-park-camphor-1',
    imageWidth: 960,
    imageHeight: 720,
    alt: '角板山樟腦收納所的木造展示空間',
    position: '50% 50%',
  },
  {
    id: 'grounds',
    name: '雕塑與生態園區',
    eyebrow: '林間散步',
    description: '戶外雕塑、草地、老樹與生態池分散在園區各處，適合不趕時間地邊走邊找，四季都有不同質感。',
    tip: '作品不是集中式展覽，放慢速度，會比快速穿越更有收穫。',
    duration: '約 30 分鐘',
    image: 'jiaobanshan-park-grounds-1',
    imageWidth: 960,
    imageHeight: 720,
    alt: '角板山行館園區的山林步道與坡地景觀',
    position: '50% 40%',
  },
];

export const routes: RoutePlan[] = [
  {
    id: 'easy',
    title: '輕鬆散步',
    duration: '60–90 分鐘',
    audience: '長輩・幼兒・初訪',
    summary: '把坡度與距離控制在較舒服的範圍，先看歷史空間，再到梅園與草地休息。',
    stops: ['旅遊資訊站', '樟腦收納所', '角板山行館', '梅園與生態池', '雕塑園區'],
    note: '不強求走入戰備隧道與較陡觀景段，體力有餘再加走思親亭。',
  },
  {
    id: 'classic',
    title: '經典完整',
    duration: '約 2 小時',
    audience: '第一次完整遊園',
    summary: '一次收進行館、隧道、觀景與梅園，是最能理解角板山層次的標準路線。',
    stops: ['旅遊資訊站', '戰備隧道', '角板山行館', '思親亭', '梅園', '生態池', '雕塑園區'],
    note: '建議先看室內與隧道，再把後半段留給戶外風景；冬季上午光線通常更柔和。',
  },
  {
    id: 'slow',
    title: '慢遊半日',
    duration: '約 3 小時',
    audience: '攝影・歷史・山城散策',
    summary: '從南側公園一路走到商圈，把園區脈絡、山谷視野與在地午餐串成半日旅行。',
    stops: ['角板山公園南側', '雕塑園區', '角板山行館', '思親亭', '梅園', '戰備隧道', '樟腦收納所', '角板山商圈'],
    note: '梅花季與連假要把找車位、排隊及用餐等候時間一起算進行程。',
  },
];

export const faqs = [
  {
    id: 'ticket',
    question: '角板山公園需要門票嗎？',
    answer: '園區與主要參觀空間常態為免費。若遇特別活動、施工或臨時管制，仍以現場公告為準。',
  },
  {
    id: 'same-place',
    question: '角板山公園和角板山行館是同一個地方嗎？',
    answer: '兩個名稱常被一起使用。角板山行館、梅園、戰備隧道、思親亭、樟腦收納所與雕塑園區都位於同一片核心遊憩範圍，導航入口可能略有不同。',
  },
  {
    id: 'duration',
    question: '完整走一圈要多久？',
    answer: '快速參觀約 60–90 分鐘；第一次來建議保留約 2 小時。想拍照、參加導覽或順遊商圈，安排 3 小時較從容。',
  },
  {
    id: 'plum-when',
    question: '梅花什麼時候最好看？',
    answer: '角板山以冬季賞梅聞名，但實際花況會受當年低溫、雨量與風勢影響。不要只看固定日期，出發前應再確認當年花況公告。',
  },
  {
    id: 'elderly',
    question: '園區適合長輩或推嬰兒車嗎？',
    answer: '行館、梅園、草地與部分主步道較容易行走，但通往思親亭、隧道及不同台地之間仍有坡度與階梯。建議採用頁面的「輕鬆散步」路線。',
  },
  {
    id: 'rain',
    question: '下雨天還適合去嗎？',
    answer: '行館與部分展示空間仍可參觀，但山區步道、石階與隧道入口雨後容易濕滑，山谷視野也可能受霧影響。豪雨、颱風或邊坡警戒時不建議前往。',
  },
  {
    id: 'parking',
    question: '有停車場嗎？',
    answer: '園區周邊常用的選擇包括仁愛收費停車場與上台地收費停車場。花季、連假與週末中午較容易滿位，建議上午提早抵達。更完整的停車位置、收費與梅花季交通管制說明，請見本站《停車場完整指南》（/parking/）。',
  },
  {
    id: 'transport',
    question: '可以搭大眾運輸前往嗎？',
    answer: '可從桃園或大溪方向轉乘往復興區的公車與觀光路線，在復興站或角板山公園周邊站點下車。班距與末班車可能調整，回程時間要先留意。',
  },
  {
    id: 'transport-car',
    question: '角板山公園怎麼去？開車路線怎麼走？',
    answer: '自行開車可走國道三號，於大溪交流道下，接台 7 線（北部橫貫公路 / 北橫）往復興區方向。導航建議直接輸入「角板山行館」或門牌「桃園市復興區澤仁里中正路 2 號」，山區彎道多，請預留車程與找車位的時間。',
  },
  {
    id: 'transport-bus',
    question: '角板山公園可以搭公車嗎？幾號公車到？',
    answer: '可從桃園或大溪轉乘往復興區的公車與觀光路線，在復興站或角板山公園周邊站點下車，再步行進入園區。山區班距較長、末班車早，出發前請先查好時刻並預留回程時間。',
  },
  {
    id: 'opening',
    question: '角板山公園開放時間是幾點到幾點？',
    answer: '戶外園區一般日間皆可散步；角板山行館、戰備隧道等室內展區有固定開放時段（常見約 08:00–17:00）。特殊節日、活動或施工可能調整，出發前以官方公告與現場告示為準。',
  },
  {
    id: 'plum-season',
    question: '角板山梅花季是幾月？什麼時候去最好？',
    answer: '角板山以冬季賞梅最具代表性，花期通常落在 12 月到翌年 1 月，實際盛開時間會受當年低溫與雨量影響。不要只記固定日期，出發前請再確認當年花況公告。',
  },
  {
    id: 'plum-best-time',
    question: '角板山公園賞梅最佳時間是上午還是下午？',
    answer: '晴朗日的上午光線柔和、人潮通常比午後與週末可控，較適合賞梅與拍照；梅花季與連假建議平日並提早抵達，停車與用餐都會輕鬆許多。',
  },
  {
    id: 'plum-cherry',
    question: '角板山公園有櫻花嗎？幾月開？',
    answer: '園區以冬季梅花最為知名，春季山櫻也會零星綻放，可一併留意；若以花景為主，冬季梅花仍是代表性季節，實際花期依當年氣候而定。',
  },
];

/**
 * 單一景點實體綁定資料（Entity binding）
 * 對應 SEO 實體變數：景點全稱 / 簡稱 / 城市 / 州省 / 國家 / 郵遞區號 / 經緯度 / 地圖連結 / 周邊地標 / 官方旅遊局
 */
export const entity = {
  domain: 'JiaobanshanPark.com',
  domainUrl: 'https://JiaobanshanPark.com/',
  fullName: '角板山公園',
  fullNameEn: 'Jiaobanshan Park',
  shortName: '角板山',
  shortNameEn: 'Jiaobanshan Park',
  city: '復興區',
  cityEn: 'Fuxing District',
  stateProvince: '桃園市',
  stateProvinceEn: 'Taoyuan City',
  country: '臺灣',
  countryEn: 'Taiwan',
  countryCode: 'TW',
  postalCode: '336',
  /** 角板山公園（公園本體）入口地址：澤仁里中正路 2 號 */
  streetAddress: '澤仁里中正路 2 號',
  /** 角板山行館園區常用導航地址，與公園本體入口不同 */
  streetAddressAlt: '澤仁里中正路 133-1 號（行館園區常用導航地址）',
  latitude: 24.813974,
  longitude: 121.3506816,
  plusCode: 'R972+H7 澤仁里 台灣桃園市復興區',
  telephone: '+886-3-382-1678',
  telephoneDisplay: '03-382-1678',
  category: '公園',
  /** 開放時間、收費與交通措施的資料最後核實月份 */
  dataVerifiedLabel: '2026 年 10 月',
  reviewSyncLabel: '2026 年 10 月',
  mapsShareUrl: 'https://maps.app.goo.gl/E2YQjRpKqN1rAn9s9',
  mapsEmbedSrc:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3621.4589439776278!2d121.35068159999999!3d24.813973999999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346816d3af3e62af%3A0x335e093bbe8d7088!2z6KeS5p2_5bGx5YWs5Zut!5e0!3m2!1szh-CN!2stw!4v1785324111448!5m2!1szh-CN!2stw',
  /** 角板山公園（公園本體）一鍵導航連結 */
  parkMapUrl:
    'https://www.google.com/maps/dir/?api=1&destination=24.813974%2C121.3506816&destination_place_id=ChIJr2I-r9MWaDQRiHCNvgk5XjM',
  /** 角板山行館園區一鍵導航連結（與公園本體入口位置不同） */
  residenceMapUrl:
    'https://www.google.com/maps/dir/?api=1&destination=%E8%A7%92%E6%9D%BF%E5%B1%B1%E8%A1%8C%E9%A4%A8%E6%A1%AF%E5%9C%92%E5%8D%80%E6%BE%A4%E4%BB%81%E9%87%8C%E4%B8%AD%E6%AD%A3%E8%B7%AF%20133-1%E8%99%9F',
  nearbyLandmark1: '角板山行館（Jiaobanshan Resort）',
  nearbyLandmark2: '大漢溪與溪口台地（Dahan River / Xikou Terrace）',
  govtTourismUrl: 'https://travel.tycg.gov.tw/',
  govtTourismName: '桃園觀光導覽網（桃園市政府觀光旅遊局）',
};

/**
 * Google 地圖評分與評價。
 * 只提供給頁面上視覺展示使用，不寫入任何 JSON-LD 結構化資料。
 */
export const googleReview = {
  rating: 4.3,
  ratingCount: 13230,
  ratingScale: 5,
  syncLabel: '2026 年 10 月',
  sourceUrl: entity.mapsShareUrl,
  /** 按下連結旁的來源小字 */
  summaryLine: '評分與評價數同步自 Google 地圖（Google Maps）使用者評價 · 2026 年 10 月 · 點擊查看 Google 地圖全部評價 ↗',
  /** 評價區塊的完整版權聲明 */
  sourceNote: '同步自 Google 地圖使用者評價，同步時間 2026 年 10 月；版權歸原作者與 Google 地圖所有',
  /** 由本站依 Google 地圖公開評價歸納的重點，非逐則原文引用 */
  highlights: [
    {
      title: '山谷視野與梅園季節',
      detail: '最常被提到的畫面是冬日梅花與大漢溪山谷的遠景，非花季則以林蔭與視野取勝。',
    },
    {
      title: '散步動線舒服',
      detail: '園區規模不大、動線清楚，多數旅客認為半日到一日之間的停留最剛好。',
    },
    {
      title: '常態免費參觀',
      detail: '免門票是許多人願意順遊的主因，特別適合作為北橫公路沿線的休息點。',
    },
    {
      title: '停車與人潮',
      detail: '梅花季與連假容易一位難求，上午抵達通常明顯比中午輕鬆。',
    },
    {
      title: '天候影響很大',
      detail: '山區起霧、雨後步道濕滑都可能影響體驗，出發前看天氣是普遍建議。',
    },
  ],
};

export const visitorServices = [
  {
    icon: 'toilet',
    title: '洗手間',
    type: '公共廁所',
    body: '園區設有公共廁所，多集中於旅遊資訊站與行館周邊；山區廁所可能較為簡易，熱門時段需排隊，建議先在上山前使用。',
  },
  {
    icon: 'car',
    title: '停車',
    type: '收費停車場',
    body: '周邊以收費停車場為主（如仁愛、上台地等），花季、連假與週末中午極易滿位；建議上午抵達，並預留找車位的時間。',
  },
  {
    icon: 'utensils',
    title: '餐飲',
    type: '輕食・小吃・正餐',
    body: '園區內以飲料與輕食為主；正餐與小吃多集中在復興區角板山商圈與北橫沿線，可依預算與口味自由選擇，本站不代為推薦特定店家。',
  },
  {
    icon: 'bed',
    title: '住宿',
    type: '民宿・旅館・露營',
    body: '復興區與北橫沿線有民宿、旅館與露營等多種型態，可依行程長短與預算挑選；山區住宿數量有限，連假建議提早安排。',
  },
  {
    icon: 'cart',
    title: '商超補給',
    type: '便利商店・生鮮超市',
    body: '復興區市區與主要路線上有便利商店與超市，可補給飲水、零食與簡易用品；山區路段間距較長，建議出發前備足水量。',
  },
  {
    icon: 'fuel',
    title: '加油與充電',
    type: '加油站・充電樁',
    body: '北橫公路沿線設有加油站；電動車充電樁多集中在市區與主要停車場，山區覆蓋較稀疏，出發前請確認電量與樁位狀態。',
  },
] as const;

export const seasonalStrategy = [
  {
    season: '春',
    weather: '氣溫回升、午後易有地形雨，山區霧氣漸增。',
    waterTrail: '融雪與春雨使溪流水量上升，步道濕潤處增多，木棧道與石階需留意。',
    wildlife: '新綠萌芽，鳥類與昆蟲活動變活躍，是觀察林相更新的好時機。',
    advice: '花季後人潮稍緩，適合把重點放在行館、雕塑與林間散步；午後帶傘備用。',
  },
  {
    season: '夏',
    weather: '炎熱但樹蔭舒適，午後雷陣雨頻繁，山區氣溫低於市區。',
    waterTrail: '溪流水量大、水質較濁，切勿戲水；雨後步道易濕滑，隧道入口尤須小心。',
    wildlife: '蝶類、蛙類與蜜蜂活躍，蜂蟲叮咬風險上升，留意防護。',
    advice: '早出早回避開午後雷雨；可搭配復興區季節水果與商圈短停。',
  },
  {
    season: '秋',
    weather: '氣溫轉涼、降雨減少，能見度通常較好。',
    waterTrail: '溪流趨於平穩，步道乾爽，最適合走完整路線。',
    wildlife: '昆蟲活動減少，林色轉深，視野與光影層次豐富。',
    advice: '沒有花季喧鬧，更能留意園林、老樹與戶外作品，安排完整兩小時很從容。',
  },
  {
    season: '冬',
    weather: '低溫、乾冷，晴朗時山谷視野最佳，寒流來襲需保暖。',
    waterTrail: '水質較清、水量平穩；低温晨間步道可能有結霜或結露。',
    wildlife: '梅花展放吸引大量遊客，也是觀察山櫻與候鳥的季節。',
    wildlifeNote: '梅花為本園最具代表性的季節景觀，實際花況受氣溫與降雨影響。',
    advice: '最具代表性的季節，但人潮最多；建議平日上午抵達，並預留停車與用餐等候。',
  },
];

export const audienceRoutes = [
  {
    id: 'family',
    audience: '親子家庭',
    icon: 'child',
    pace: '慢節奏・多停留',
    duration: '約 2–3 小時',
    summary: '以孩子有興趣的隧道、草地與水景為主，不趕路、多休息，把學習放進風景裡。',
    stops: ['旅遊資訊站（先看地圖與廁所）', '樟腦收納所（講山城故事）', '雕塑與生態園區（草地奔跑）', '梅園與生態池（看水與花）', '角板山行館（建築與老照片）'],
    note: '推車以主步道為主；遇階梯或坡度大的觀景段可改走輕鬆路線，不必硬走完整圈。',
  },
  {
    id: 'photo',
    audience: '攝影自然',
    icon: 'camera',
    pace: '等光線・重構圖',
    duration: '約 3 小時',
    summary: '跟著光線走：清晨與上午適合梅園與山谷，午後林蔭與建築，黃昏可回看溪谷層次。',
    stops: ['思親亭（眺望大漢溪與溪口台地）', '梅園與山谷（季節花況）', '戰備隧道（明暗對比）', '角板山行館（建築細節）', '雕塑園區（線條與草地）'],
    note: '冬季上午光線柔和、人潮可控；雨後雲霧與反光也是難得的畫面，但請注意器材與腳下安全。',
  },
  {
    id: 'easy-access',
    audience: '低體力・無障礙',
    icon: 'accessibility',
    pace: '平緩・可折返',
    duration: '約 1–1.5 小時',
    summary: '優先選擇坡度小、階梯少的動線，累了隨時折返，把體力留給最想看的幾個點。',
    stops: ['旅遊資訊站（詢問輪椅借用）', '無障礙廁所與主步道', '角板山行館周邊平緩區', '梅園近入口段（少爬坡）'],
    note: '園區設有無障礙廁所，但觀景段、隧道與不同台地間仍有坡度；長輩與輪椅族建議由旅遊資訊站確認當日適走路線。',
  },
] as const;

export const visitorResponsibility = [
  {
    icon: 'leaf',
    title: '不採摘、不餵食',
    body: '園區花木、果實與野生動物都屬於這片山林。請只用眼睛與相機記錄，不採摘、不餵食，讓生態維持原樣。',
  },
  {
    icon: 'recycle',
    title: '垃圾不落地',
    body: '山區清運不易，請將垃圾與資源物帶下山。飲料杯、餐盒與衛生紙都請自行攜回，減少對環境的負擔。',
  },
  {
    icon: 'shield',
    title: '尊重原住民族傳統領域',
    body: '角板山一帶為泰雅族（Atayal）傳統領域。請以尊重的態度認識在地文化，拍攝人物或儀式前務必先徵得同意。',
  },
  {
    icon: 'footprints',
    title: '山區安全自律',
    body: '留意天候、蜂蟲與落石；雨後石階、木棧道與隧道入口濕滑。豪雨、颱風或邊坡警戒時，不勉強上山。',
  },
  {
    icon: 'compass',
    title: '把知識帶回家',
    body: '行館、樟腦收納所與戰備隧道都是認識北橫山城的入口。放慢腳步讀解說牌，比快速穿越更有收穫。',
  },
  {
    icon: 'info',
    title: '用火與拍攝禮儀',
    body: '園區多為禁煙與防火範圍，請勿任意用火。拍攝時不阻礙動線、不破壞植被，讓所有人都能安心散步。',
  },
] as const;

export const sources = [
  {
    label: '官方旅遊資訊',
    org: entity.govtTourismName,
    note: '開放時間、活動與交通管制等異動，以桃園市政府觀光旅遊局公告為準。',
    url: entity.govtTourismUrl,
    external: true,
  },
  {
    label: '位置與地圖',
    org: 'Google 地圖（角板山公園）',
    note: `座標 ${entity.latitude}, ${entity.longitude}；Plus Code ${entity.plusCode}。`,
    url: entity.mapsShareUrl,
    external: true,
  },
  {
    label: '評價',
    org: 'Google 地圖使用者評價',
    note: `同步時間 ${googleReview.syncLabel}。${googleReview.sourceNote}`,
    url: googleReview.sourceUrl,
    external: true,
  },
  {
    label: '實景照片',
    org: 'Wikimedia Commons',
    note: '依 CC BY-SA / CC BY 授權使用並標示作者，圖片產權及版權均歸原攝影者所有。',
    url: 'https://commons.wikimedia.org/',
    external: true,
  },
] as const;

export const photoCredits = [
  {
    label: '角板山行館',
    author: 'Taiwankengo',
    license: 'CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:2021_Jiaobanshan_Resort_i.jpg',
  },
  {
    label: '梅園與山谷',
    author: '阿道',
    license: 'CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:View_from_the_Jiaobanshan_Resort-01.2025-02-01.jpg',
  },
  {
    label: '園區山林',
    author: '阿道',
    license: 'CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:%E8%A7%92%E6%9D%BF%E5%B1%B1%E8%A1%8C%E9%A4%A8%E5%9C%92%E5%8D%80_01._20250201.jpg',
  },
  {
    label: '思親亭',
    author: '阿道',
    license: 'CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:%E8%A7%92%E6%9D%BF%E5%B1%B1%E8%A1%8C%E9%A4%A8%E6%80%9D%E8%A6%AA%E4%BA%AD_20250201.jpg',
  },
  {
    label: '園區入口',
    author: 'Outlookxp',
    license: 'CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:%E8%A7%92%E6%9D%BF%E5%B1%B1%E8%B3%93%E9%A4%A8%E5%85%A5%E5%8F%A3.jpg',
  },
  {
    label: '戰備隧道入口',
    author: 'Outlookxp',
    license: 'CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:%E8%A7%92%E6%9D%BF%E5%B1%B1%E8%B3%93%E9%A4%A8%E6%88%B0%E5%82%99%E9%9A%A7%E9%81%93%E5%85%A5%E5%8F%A3.jpg',
  },
  {
    label: '戰備隧道',
    author: 'lienyuan lee',
    license: 'CC BY 3.0',
    source: 'https://commons.wikimedia.org/wiki/File:%E8%A7%92%E6%9D%BF%E5%B1%B1%E6%88%B0%E5%82%99%E9%9A%A7%E9%81%93_Jiaobanshan_Readiness_Tunnel_-_panoramio.jpg',
  },
  {
    label: '樟腦收納所',
    author: 'Foxy Who (^∀^)/',
    license: 'CC BY-SA 3.0',
    source: 'https://commons.wikimedia.org/wiki/File:%E8%A7%92%E6%9D%BF%E5%B1%B1%E6%A8%9F%E8%85%A6%E6%94%B6%E7%B4%8D%E6%89%80_(%E6%97%A5%E5%BC%8F%E5%BB%BA%E7%AF%89)_-_panoramio.jpg',
  },
] as const;
