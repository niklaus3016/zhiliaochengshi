export interface GeoCoord {
  lng: number;
  lat: number;
}

export interface DetailDimension {
  title: string;
  content: string;
  items?: Array<{
    name: string;
    desc: string;
    image?: string;
    tag?: string;
  }>;
}

export interface AreaDetail {
  // 基础概况
  belonging: string;       // 行政归属
  location: string;        // 地理位置
  area: string;            // 总面积
  population: string;      // 常住人口
  history: string;         // 历史沿革
  alias: string;           // 别称美誉
  positioning: string;     // 城市定位 / 简介
  
  // 气候地理
  climate: {
    type: string;          // 气候类型
    terrain: string;       // 地形地貌
    hydrology: string;     // 水文资源
    description: string;   // 气候与地理描述
  };

  // 经济特色
  economy: {
    pillars: string[];     // 支柱产业
    description: string;   // 经济特色描述
  };

  // 人文民俗
  culture: {
    dialects: string[];    // 方言特色
    celebrities: string[]; // 历史名人
    customs: string[];     // 传统习俗
    description: string;   // 人文特色描述
  };

  // 趣味标签
  funTags: string[];       // 趣味标签

  // 特色特产
  specialties: Array<{
    name: string;
    desc: string;
    tag?: string;          // 例如 "特色美食", "手工艺品", "土特产"
  }>;

  // 旅游景点
  attractions: Array<{
    name: string;
    desc: string;
    rating?: string;       // 例如 "5A", "4A", "网红打卡"
    highlight?: string;    // 游玩亮点
  }>;
}

export interface BaseArea {
  id: string;
  name: string;
  pinyin: string;
  shortName: string;       // 简称 (例如 "京", "浙")
  capital?: string;        // 省会 (仅省级)
  level: 'province' | 'city' | 'county';
  detail: AreaDetail;
}

export interface Province extends BaseArea {
  level: 'province';
  capital: string;
  cities: City[];
}

export interface City extends BaseArea {
  level: 'city';
  provinceId: string;
  counties: County[];
}

export interface County extends BaseArea {
  level: 'county';
  cityId: string;
  provinceId: string;
}

export interface SearchResult {
  id: string;
  name: string;
  level: 'province' | 'city' | 'county';
  provinceName: string;
  cityName?: string;
  type: 'admin' | 'specialty' | 'attraction';
  matchedField: string;    // 匹配到的字段
  matchedValue: string;    // 匹配到的内容描述
}
