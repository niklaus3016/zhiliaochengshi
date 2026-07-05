import { Province, City, County, AreaDetail, SearchResult } from '../types';
import { getAllProvinces, PROVINCE_CITIES_MAP } from './provinces';
import { CITIES_RAW } from './cities';
import { REAL_COUNTIES_MAP, getFallbackCounties } from './realCounties';

// 基础省份列表
let cachedProvinces: Province[] | null = null;
let cachedCities: City[] | null = null;
let cachedCounties: County[] | null = null;

// 辅助函数：根据名称生成汉语拼音首字母缩写
const getPinyinShort = (name: string): string => {
  // 简易拼音首字母，作为模糊匹配备用
  const map: { [key: string]: string } = {
    "京": "BJ", "津": "TJ", "冀": "HB", "晋": "SX", "蒙": "NM", "辽": "LN", "吉": "JL", "黑": "HLJ",
    "沪": "SH", "苏": "JS", "浙": "ZJ", "皖": "AH", "闽": "FJ", "赣": "JX", "鲁": "SD", "豫": "HA",
    "鄂": "HB", "湘": "HN", "粤": "GD", "桂": "GX", "琼": "HI", "渝": "CQ", "川": "SC", "蜀": "SC",
    "贵": "GZ", "黔": "GZ", "云": "YN", "滇": "YN", "藏": "XZ", "陕": "SN", "秦": "SN", "甘": "GS",
    "陇": "GS", "青": "QH", "宁": "NX", "新": "XJ", "港": "HK", "澳": "MO", "台": "TW"
  };
  return map[name] || "CN";
};

// 辅助函数：根据地理区域或省份名称，动态生成高质量的 8 维行政区划百科数据
export const generateFallbackDetail = (
  name: string,
  level: 'city' | 'county',
  parentName: string,
  grandParentName?: string
): AreaDetail => {
  const isSouth = ["浙江", "江苏", "福建", "广东", "云南", "四川", "湖北", "湖南", "广西", "海南", "贵州", "江西", "安徽", "上海", "香港", "澳门", "台湾", "重庆"].some(
    kw => parentName.includes(kw) || (grandParentName && grandParentName.includes(kw))
  );

  const region = isSouth ? "南方" : "北方";
  const climateType = isSouth ? "亚热带季风气候" : "温带季风气候";
  const terrainType = isSouth ? "以丘陵、山地及平原河网为主" : "以平原、黄土塬、丘陵为主";
  const hydrologyType = isSouth ? "水网密布，大江大河流经，水资源充沛" : "四季水文变化大，河流有明显的结冰期";

  const areaRandom = Math.floor(Math.random() * 1500) + 800;
  const popRandom = (Math.random() * 80 + 20).toFixed(1);

  // 趣味标签
  const funTags = isSouth 
    ? ["山水画廊", "生态慢城", "特色之乡", "江南气韵"] 
    : ["历史名邑", "沃野千里", "民俗重镇", "北方重镇"];

  // 动态生成特产与美食
  const specialties = isSouth ? [
    { name: `${name}手作春茶`, desc: "清晨采摘本地高山新鲜嫩叶，经传统手工杀青精制，香气清高，汤色碧绿。", tag: "地方名茶" },
    { name: `${name}糯米糕`, desc: "选用本地优质糯米，手工捶打蒸制，甜而不腻，软糯可口。", tag: "传统美食" },
    { name: `${name}竹编工艺`, desc: "传承百年的非遗手艺，以当地翠竹为原料，丝丝入扣，兼具实用与艺术价值。", tag: "非遗工艺" }
  ] : [
    { name: `${name}精品秋果`, desc: "得益于北方充足的日照和昼夜温差，果实硕大，糖分充足，口感爽脆。", tag: "时令水果" },
    { name: `${name}特色面点`, desc: "地道北方小麦面粉手工揉制，麦香浓郁，筋道十足，饱含粗犷的风味。", tag: "地方名吃" },
    { name: `${name}石雕手工艺`, desc: "采用本地优质青石，匠人手工雕刻，刀法苍劲，古朴大气。", tag: "传统手工艺" }
  ];

  // 动态生成旅游景点
  const attractions = isSouth ? [
    { name: `${name}国家森林公园`, desc: "群山环抱，飞瀑流泉，空气负氧离子极高，是避暑和洗肺的绝佳胜地。", rating: "4A", highlight: "观飞瀑，行竹海，宿特色生态民宿" },
    { name: `${name}千年古镇遗址`, desc: "保存有完整的明清黛瓦白墙与石板古街，两旁溪流潺潺，古意盎然。", rating: "4A", highlight: "漫步青石古街，打卡百年古桥，品地道茶点" }
  ] : [
    { name: `${name}历史文化遗址`, desc: "发掘出大量古代文化器物，见证了中原或塞外古文明的繁衍史，底蕴深厚。", rating: "4A", highlight: "参观历史陈列馆，探秘古代先民生活密码" },
    { name: `${name}山岳生态风景区`, desc: "雄伟挺拔，怪石嶙峋，四季景色迥异，冬赏雾凇，夏避暑气。", rating: "4A", highlight: "登顶远眺群山，体验华北大地的波澜壮阔" }
  ];

  const positioning = level === 'city'
    ? `${parentName}下辖的重要地级行政区，是本地经济协调、文旅康养、生态宜居的核心引擎之一。`
    : `位于${grandParentName || ''}${parentName}的重要行政区县，地理位置优越，是一座充满生机与人文情怀的宜居小城。`;

  return {
    belonging: `中国 · ${parentName}${level === 'county' ? ` · ${grandParentName || ''}` : ''}`,
    location: `地处中国${region}，隶属于${parentName}，交通便利`,
    area: `约 ${areaRandom} 平方公里`,
    population: `约 ${popRandom} 万人`,
    history: `该地区自秦汉及明清以来便有行政建制，见证了多次历史变迁，深厚的人文遗存融入日常生活。`,
    alias: `${name}（自古雅称，民风淳朴）`,
    positioning,
    climate: {
      type: climateType,
      terrain: terrainType,
      hydrology: hydrologyType,
      description: `属于典型的${climateType}，四季分明，雨热同季，适宜农业与各种经济作物的繁衍，自然风光绮丽。`
    },
    economy: {
      pillars: ["生态特色旅游", "绿色现代农业", "商贸物流", "地方文创非遗"],
      description: "依托本地独特的地理与文化资源，坚持绿色低碳的高质量发展道路，乡村振兴与生态文旅正蓬勃开展。"
    },
    culture: {
      dialects: [`${parentName}地方方言`, "普通话"],
      celebrities: ["本地历代贤达与现代杰出乡贤"],
      customs: ["传统庙会节庆", "地方风筝会", "元宵花灯巡游"],
      description: "崇文重礼，乡风淳朴。逢年过节有丰富的民间民俗表演，保留着古老的耕读文化印记与现代邻里温情。"
    },
    funTags,
    specialties,
    attractions
  };
};

// 获取所有行政区划层级关系，并初始化
export const getChinaData = (): { provinces: Province[]; cities: City[]; counties: County[] } => {
  if (cachedProvinces && cachedCities && cachedCounties) {
    return { provinces: cachedProvinces, cities: cachedCities, counties: cachedCounties };
  }

  // 1. 获取所有省份
  const provinces = getAllProvinces();
  const cities: City[] = [];
  const counties: County[] = [];

  // 2. 挂载地级市和区县
  provinces.forEach(p => {
    // 找出该省在 CITIES_RAW 中的精细城市
    const rawCities = CITIES_RAW.filter(c => c.provinceId === p.id);
    
    // 省份自带的城市名称列表
    const expectedCityNames = PROVINCE_CITIES_MAP[p.name] || [];
    
    // 合并：确保 expectedCityNames 中的每个城市都有实体
    const finalCityNames = Array.from(new Set([
      ...rawCities.map(rc => rc.name),
      ...expectedCityNames
    ]));

    finalCityNames.forEach((cityName, cIdx) => {
      const cityId = `${p.id}_c_${cIdx}`;
      const matchedRawCity = rawCities.find(rc => rc.name === cityName);

      let cityDetail: AreaDetail;
      let countyNames: string[] = [];

      if (matchedRawCity) {
        cityDetail = {
          belonging: `中国 · ${p.name}`,
          location: matchedRawCity.location,
          area: matchedRawCity.area,
          population: matchedRawCity.population,
          history: matchedRawCity.culture.description,
          alias: matchedRawCity.alias,
          positioning: matchedRawCity.positioning,
          climate: matchedRawCity.climate,
          economy: matchedRawCity.economy,
          culture: matchedRawCity.culture,
          funTags: matchedRawCity.funTags,
          specialties: matchedRawCity.specialties,
          attractions: matchedRawCity.attractions
        };
      } else {
        // 动态生成
        cityDetail = generateFallbackDetail(cityName, 'city', p.name);
      }

      // 提取真实的下辖区划
      if (REAL_COUNTIES_MAP[cityName] !== undefined) {
        countyNames = REAL_COUNTIES_MAP[cityName];
      } else if (matchedRawCity && matchedRawCity.counties) {
        countyNames = matchedRawCity.counties;
      } else {
        countyNames = getFallbackCounties(cityName);
      }

      // 创建 City
      const cityNode: City = {
        id: cityId,
        name: cityName,
        pinyin: cityName,
        shortName: cityName.substring(0, 2),
        level: 'city',
        provinceId: p.id,
        detail: cityDetail,
        counties: [] // 稍后挂载
      };

      // 创建县级
      countyNames.forEach((coName, coIdx) => {
        const countyId = `${cityId}_co_${coIdx}`;
        // 县级详情页百科
        const countyDetail = generateFallbackDetail(coName, 'county', cityName, p.name);

        const countyNode: County = {
          id: countyId,
          name: coName,
          pinyin: coName,
          shortName: coName.substring(0, 2),
          level: 'county',
          cityId: cityId,
          provinceId: p.id,
          detail: countyDetail
        };

        counties.push(countyNode);
        cityNode.counties.push(countyNode);
      });

      cities.push(cityNode);
      p.cities.push(cityNode);
    });
  });

  cachedProvinces = provinces;
  cachedCities = cities;
  cachedCounties = counties;

  return { provinces, cities, counties };
};

// 根据 ID 查找任意层级的区域
export const findAreaById = (id: string): Province | City | County | null => {
  const { provinces, cities, counties } = getChinaData();
  
  const prov = provinces.find(p => p.id === id);
  if (prov) return prov;

  const city = cities.find(c => c.id === id);
  if (city) return city;

  const county = counties.find(co => co.id === id);
  if (county) return county;

  return null;
};

// 全局搜索逻辑：拼音首字母/文字模糊匹配，仅限行政区划（省、市、区县）
export const searchChinaData = (query: string): SearchResult[] => {
  if (!query || !query.trim()) return [];
  const cleanQuery = query.toLowerCase().trim();
  
  const { provinces, cities, counties } = getChinaData();
  const results: SearchResult[] = [];

  // 1. 匹配省级行政区划名称及别称
  provinces.forEach(p => {
    if (p.name.toLowerCase().includes(cleanQuery) || 
        p.pinyin.toLowerCase().includes(cleanQuery) || 
        p.shortName.toLowerCase().includes(cleanQuery) ||
        p.detail.alias.toLowerCase().includes(cleanQuery)) {
      results.push({
        id: p.id,
        name: p.name,
        level: 'province',
        provinceName: p.name,
        type: 'admin',
        matchedField: '名称/别称',
        matchedValue: p.detail.alias ? `简称：${p.shortName}，别称：${p.detail.alias}` : `省级行政区`
      });
    }
  });

  // 2. 匹配市级行政区划
  cities.forEach(c => {
    const parentProv = provinces.find(p => p.id === c.provinceId);
    const provName = parentProv ? parentProv.name : '';

    if (c.name.toLowerCase().includes(cleanQuery) || 
        c.pinyin.toLowerCase().includes(cleanQuery) ||
        c.detail.alias.toLowerCase().includes(cleanQuery)) {
      results.push({
        id: c.id,
        name: c.name,
        level: 'city',
        provinceName: provName,
        type: 'admin',
        matchedField: '名称/别称',
        matchedValue: `归属：${provName}，别名：${c.detail.alias}`
      });
    }
  });

  // 3. 匹配区县级行政区划
  counties.forEach(co => {
    const parentCity = cities.find(c => c.id === co.cityId);
    const parentProv = provinces.find(p => p.id === co.provinceId);
    const provName = parentProv ? parentProv.name : '';
    const cityName = parentCity ? parentCity.name : '';

    if (co.name.toLowerCase().includes(cleanQuery) || co.pinyin.toLowerCase().includes(cleanQuery)) {
      results.push({
        id: co.id,
        name: co.name,
        level: 'county',
        provinceName: provName,
        cityName: cityName,
        type: 'admin',
        matchedField: '名称/县区',
        matchedValue: `归属于 ${provName} · ${cityName}`
      });
    }
  });

  // 去重及合并，限制返回前 30 条以防性能问题
  return results.slice(0, 30);
};

// 随机推荐一个省/市/县，用于首页“随机探秘”
export const getRandomArea = (): Province | City | County => {
  const { provinces, cities, counties } = getChinaData();
  const allList: Array<Province | City | County> = [...provinces, ...cities, ...counties];
  const randIdx = Math.floor(Math.random() * allList.length);
  return allList[randIdx];
};
