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
    image: 'hero-resort',
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
    image: 'plum-view',
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
    image: 'tunnel-entrance',
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
    image: 'pavilion',
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
    image: 'camphor-house',
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
    image: 'park-grounds',
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
    question: '角板山公園需要門票嗎？',
    answer: '園區與主要參觀空間常態為免費。若遇特別活動、施工或臨時管制，仍以現場公告為準。',
  },
  {
    question: '角板山公園和角板山行館是同一個地方嗎？',
    answer: '兩個名稱常被一起使用。角板山行館、梅園、戰備隧道、思親亭、樟腦收納所與雕塑園區都位於同一片核心遊憩範圍，導航入口可能略有不同。',
  },
  {
    question: '完整走一圈要多久？',
    answer: '快速參觀約 60–90 分鐘；第一次來建議保留約 2 小時。想拍照、參加導覽或順遊商圈，安排 3 小時較從容。',
  },
  {
    question: '梅花什麼時候最好看？',
    answer: '角板山以冬季賞梅聞名，但實際花況會受當年低溫、雨量與風勢影響。不要只看固定日期，出發前應再確認當年花況公告。',
  },
  {
    question: '園區適合長輩或推嬰兒車嗎？',
    answer: '行館、梅園、草地與部分主步道較容易行走，但通往思親亭、隧道及不同台地之間仍有坡度與階梯。建議採用頁面的「輕鬆散步」路線。',
  },
  {
    question: '下雨天還適合去嗎？',
    answer: '行館與部分展示空間仍可參觀，但山區步道、石階與隧道入口雨後容易濕滑，山谷視野也可能受霧影響。豪雨、颱風或邊坡警戒時不建議前往。',
  },
  {
    question: '有停車場嗎？',
    answer: '園區周邊常用的選擇包括仁愛收費停車場與上台地收費停車場。花季、連假與週末中午較容易滿位，建議上午提早抵達。',
  },
  {
    question: '可以搭大眾運輸前往嗎？',
    answer: '可從桃園或大溪方向轉乘往復興區的公車與觀光路線，在復興站或角板山公園周邊站點下車。班距與末班車可能調整，回程時間要先留意。',
  },
];

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
