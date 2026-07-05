import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Compass, HelpCircle, MapPin, Landmark, ArrowRight, Layers, Map, List } from 'lucide-react';
import { Province } from '../types';

interface ChinaMapProps {
  provinces: Province[];
  onSelectProvince: (province: Province) => void;
}

// 华夏地理格子图 (Tile Cartogram) 位置布局定义
// 保持大体地缘相关度，拼成一张极具国潮风格的像素风/卡片风中国版图，不仅在移动端可点击率100%，而且极具创意美感。
const MAP_TILES: Array<{
  id: string;
  name: string;
  short: string;
  r: number; // grid row (0-indexed)
  c: number; // grid col (0-indexed)
  region: string;
  colorClass: string; // 国潮莫兰迪配色
}> = [
  // 东北地区 (Northeast) - 雾灰蓝
  { id: "黑龙江省", name: "黑龙江省", short: "黑", r: 0, c: 9, region: "东北地区", colorClass: "bg-slate-400/20 text-slate-800 dark:text-slate-200 border-slate-400/40 hover:bg-slate-400/40" },
  { id: "吉林省", name: "吉林省", short: "吉", r: 1, c: 9, region: "东北地区", colorClass: "bg-slate-400/20 text-slate-800 dark:text-slate-200 border-slate-400/40 hover:bg-slate-400/40" },
  { id: "辽宁省", name: "辽宁省", short: "辽", r: 2, c: 8, region: "东北地区", colorClass: "bg-slate-400/20 text-slate-800 dark:text-slate-200 border-slate-400/40 hover:bg-slate-400/40" },
  
  // 华北地区 (North) - 浅黛青
  { id: "内蒙古自治区", name: "内蒙古自治区", short: "蒙", r: 1, c: 4, region: "华北地区", colorClass: "bg-teal-700/10 text-teal-900 dark:text-teal-200 border-teal-700/30 hover:bg-teal-700/35" },
  { id: "河北省", name: "河北省", short: "冀", r: 2, c: 6, region: "华北地区", colorClass: "bg-teal-700/15 text-teal-900 dark:text-teal-200 border-teal-700/30 hover:bg-teal-700/35" },
  { id: "北京市", name: "北京市", short: "京", r: 2, c: 7, region: "华北地区", colorClass: "bg-teal-800/25 text-teal-950 dark:text-teal-100 border-teal-800/40 hover:bg-teal-800/45 font-bold shadow-sm" },
  { id: "天津市", name: "天津市", short: "津", r: 1, c: 7, region: "华北地区", colorClass: "bg-teal-700/15 text-teal-900 dark:text-teal-200 border-teal-700/30 hover:bg-teal-700/35" },
  { id: "山西省", name: "山西省", short: "晋", r: 2, c: 5, region: "华北地区", colorClass: "bg-teal-700/15 text-teal-900 dark:text-teal-200 border-teal-700/30 hover:bg-teal-700/35" },

  // 西北地区 (Northwest) - 沙赭黄
  { id: "新疆维吾尔自治区", name: "新疆维吾尔自治区", short: "新", r: 1, c: 1, region: "西北地区", colorClass: "bg-amber-600/15 text-amber-950 dark:text-amber-200 border-amber-600/30 hover:bg-amber-600/35" },
  { id: "甘肃省", name: "甘肃省", short: "甘", r: 2, c: 3, region: "西北地区", colorClass: "bg-amber-600/15 text-amber-950 dark:text-amber-200 border-amber-600/30 hover:bg-amber-600/35" },
  { id: "青海省", name: "青海省", short: "青", r: 3, c: 2, region: "西北地区", colorClass: "bg-amber-600/15 text-amber-950 dark:text-amber-200 border-amber-600/30 hover:bg-amber-600/35" },
  { id: "宁夏回族自治区", name: "宁夏回族自治区", short: "宁", r: 2, c: 4, region: "西北地区", colorClass: "bg-amber-600/15 text-amber-950 dark:text-amber-200 border-amber-600/30 hover:bg-amber-600/35" },
  { id: "陕西省", name: "陕西省", short: "陕", r: 3, c: 4, region: "西北地区", colorClass: "bg-amber-700/25 text-amber-950 dark:text-amber-200 border-amber-700/40 hover:bg-amber-700/45 font-bold shadow-sm" },

  // 西南地区 (Southwest) - 碧翠绿
  { id: "西藏自治区", name: "西藏自治区", short: "藏", r: 4, c: 1, region: "西南地区", colorClass: "bg-emerald-700/15 text-emerald-950 dark:text-emerald-200 border-emerald-700/30 hover:bg-emerald-700/35" },
  { id: "四川省", name: "四川省", short: "川", r: 4, c: 3, region: "西南地区", colorClass: "bg-emerald-800/25 text-emerald-950 dark:text-emerald-100 border-emerald-800/40 hover:bg-emerald-800/45 font-bold shadow-sm" },
  { id: "重庆市", name: "重庆市", short: "渝", r: 4, c: 4, region: "西南地区", colorClass: "bg-emerald-700/15 text-emerald-950 dark:text-emerald-200 border-emerald-700/30 hover:bg-emerald-700/35" },
  { id: "贵州省", name: "贵州省", short: "贵", r: 5, c: 4, region: "西南地区", colorClass: "bg-emerald-700/15 text-emerald-950 dark:text-emerald-200 border-emerald-700/30 hover:bg-emerald-700/35" },
  { id: "云南省", name: "云南省", short: "云", r: 6, c: 3, region: "西南地区", colorClass: "bg-emerald-700/20 text-emerald-950 dark:text-emerald-100 border-emerald-700/40 hover:bg-emerald-700/45" },

  // 华中地区 (Central) - 暖杏橘
  { id: "河南省", name: "河南省", short: "豫", r: 3, c: 5, region: "华中地区", colorClass: "bg-orange-600/15 text-orange-950 dark:text-orange-200 border-orange-600/30 hover:bg-orange-600/35" },
  { id: "湖北省", name: "湖北省", short: "鄂", r: 4, c: 5, region: "华中地区", colorClass: "bg-orange-700/25 text-orange-950 dark:text-orange-100 border-orange-700/40 hover:bg-orange-700/45 font-bold shadow-sm" },
  { id: "湖南省", name: "湖南省", short: "湘", r: 5, c: 5, region: "华中地区", colorClass: "bg-orange-600/15 text-orange-950 dark:text-orange-200 border-orange-600/30 hover:bg-orange-600/35" },

  // 华东地区 (East) - 山河翠 (Qingdai Green-ish)
  { id: "山东省", name: "山东省", short: "鲁", r: 3, c: 7, region: "华东地区", colorClass: "bg-emerald-800/15 text-emerald-950 dark:text-emerald-200 border-emerald-800/30 hover:bg-emerald-800/35" },
  { id: "安徽省", name: "安徽省", short: "皖", r: 4, c: 6, region: "华东地区", colorClass: "bg-emerald-800/15 text-emerald-950 dark:text-emerald-200 border-emerald-800/30 hover:bg-emerald-800/35" },
  { id: "江苏省", name: "江苏省", short: "苏", r: 3, c: 8, region: "华东地区", colorClass: "bg-emerald-900/25 text-emerald-950 dark:text-emerald-100 border-emerald-900/40 hover:bg-emerald-900/45 font-bold shadow-sm" },
  { id: "上海市", name: "上海市", short: "沪", r: 4, c: 8, region: "华东地区", colorClass: "bg-emerald-900/25 text-emerald-950 dark:text-emerald-100 border-emerald-900/40 hover:bg-emerald-900/45 font-bold shadow-sm" },
  { id: "江西省", name: "江西省", short: "赣", r: 5, c: 6, region: "华东地区", colorClass: "bg-emerald-800/15 text-emerald-950 dark:text-emerald-200 border-emerald-800/30 hover:bg-emerald-800/35" },
  { id: "浙江省", name: "浙江省", short: "浙", r: 4, c: 7, region: "华东地区", colorClass: "bg-emerald-900/25 text-emerald-950 dark:text-emerald-100 border-emerald-900/40 hover:bg-emerald-900/45 font-bold shadow-sm" },
  { id: "福建省", name: "福建省", short: "闽", r: 5, c: 7, region: "华东地区", colorClass: "bg-emerald-900/25 text-emerald-950 dark:text-emerald-100 border-emerald-900/40 hover:bg-emerald-900/45 font-bold shadow-sm" },
  { id: "台湾省", name: "台湾省", short: "台", r: 6, c: 8, region: "华东地区", colorClass: "bg-emerald-800/15 text-emerald-950 dark:text-emerald-200 border-emerald-800/30 hover:bg-emerald-800/35" },

  // 华南地区 (South) - 桃绯红
  { id: "广西壮族自治区", name: "广西壮族自治区", short: "桂", r: 6, c: 4, region: "华南地区", colorClass: "bg-rose-700/15 text-rose-950 dark:text-rose-200 border-rose-700/30 hover:bg-rose-700/35" },
  { id: "广东省", name: "广东省", short: "粤", r: 6, c: 5, region: "华南地区", colorClass: "bg-rose-800/25 text-rose-950 dark:text-rose-100 border-rose-800/40 hover:bg-rose-800/45 font-bold shadow-sm" },
  { id: "香港特别行政区", name: "港", short: "港", r: 6, c: 6, region: "华南地区", colorClass: "bg-rose-700/20 text-rose-950 dark:text-rose-100 border-rose-700/40 hover:bg-rose-700/45" },
  { id: "澳门特别行政区", name: "澳", short: "澳", r: 7, c: 5, region: "华南地区", colorClass: "bg-rose-700/20 text-rose-950 dark:text-rose-100 border-rose-700/40 hover:bg-rose-700/45" },
  { id: "海南省", name: "海南省", short: "琼", r: 7, c: 4, region: "华南地区", colorClass: "bg-rose-700/15 text-rose-950 dark:text-rose-200 border-rose-700/30 hover:bg-rose-700/35" }
];

const REGION_ORDER = [
  "华东地区",
  "华北地区",
  "华中地区",
  "华南地区",
  "东北地区",
  "西北地区",
  "西南地区"
];

export default function ChinaMap({ provinces, onSelectProvince }: ChinaMapProps) {
  const [hoveredTile, setHoveredTile] = useState<typeof MAP_TILES[0] | null>(null);
  const [mapViewMode, setMapViewMode] = useState<'map' | 'list'>(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 640) {
      return 'list';
    }
    return 'map';
  });

  // 渲染 8 行 11 列的极简网格版图
  const gridRows = 8;
  const gridCols = 11;

  const handleTileClick = (tile: typeof MAP_TILES[0]) => {
    // 匹配真实省份数据
    const matched = provinces.find(p => p.name === tile.name || p.name.startsWith(tile.name) || tile.name.startsWith(p.name));
    if (matched) {
      onSelectProvince(matched);
    }
  };

  return (
    <div id="china_map_section" className="bg-white/80 dark:bg-zinc-900/80 rounded-2xl p-4 md:p-6 border border-border-warm dark:border-zinc-800 card-shadow flex flex-col items-center">
      
      {/* 顶部标题栏 */}
      <div className="w-full mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <h2 id="map_title" className="font-serif font-bold text-xl text-text-dark dark:text-accent flex items-center gap-2">
          <Layers className="w-5 h-5 text-accent" />
          国风极简 · 华夏山河版图
        </h2>
        
        {/* 视图切换按钮 */}
        <div className="flex bg-accent-light/40 dark:bg-zinc-800 p-1 rounded-xl border border-border-warm dark:border-zinc-700/60 self-stretch sm:self-auto justify-between sm:justify-start">
          <button
            onClick={() => setMapViewMode('map')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg cursor-pointer text-xs font-serif transition-all ${
              mapViewMode === 'map' 
                ? 'bg-white dark:bg-zinc-700 text-primary dark:text-accent font-bold shadow-xs' 
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            <Map className="w-3.5 h-3.5" />
            沙盘版图
          </button>
          <button
            onClick={() => setMapViewMode('list')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg cursor-pointer text-xs font-serif transition-all ${
              mapViewMode === 'list' 
                ? 'bg-white dark:bg-zinc-700 text-primary dark:text-accent font-bold shadow-xs' 
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            <List className="w-3.5 h-3.5" />
            分区名录
          </button>
        </div>
      </div>

      {/* 交互式中国版图 / 分区名录 - 全宽自适应 */}
      <div className="w-full flex flex-col justify-center items-center bg-bg-light/40 dark:bg-zinc-950/20 rounded-xl p-4 border border-dashed border-primary/10 relative mt-2">
        
        {mapViewMode === 'map' ? (
          <div className="w-full overflow-x-auto scrollbar-none flex justify-center py-2">
            {/* 格子容器 */}
            <div className="min-w-[620px] w-full grid grid-cols-11 gap-2.5 max-w-4xl p-2 select-none">
              {Array.from({ length: gridRows }).map((_, rIndex) => (
                <React.Fragment key={`row-${rIndex}`}>
                  {Array.from({ length: gridCols }).map((_, cIndex) => {
                    // 寻找该位置是否有省份
                    const tile = MAP_TILES.find(t => t.r === rIndex && t.c === cIndex);

                    if (!tile) {
                      // 空白网格装饰
                      return (
                        <div 
                          key={`empty-${rIndex}-${cIndex}`} 
                          className="aspect-square rounded-md border border-slate-100/30 dark:border-zinc-900/20 flex items-center justify-center text-[9px] text-slate-300 dark:text-zinc-800"
                        >
                          ·
                        </div>
                      );
                    }

                    const isHovered = hoveredTile?.id === tile.id;

                    return (
                      <motion.button
                        id={`map_tile_${tile.short}`}
                        key={tile.id}
                        onClick={() => handleTileClick(tile)}
                        onMouseEnter={() => setHoveredTile(tile)}
                        onMouseLeave={() => setHoveredTile(null)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`aspect-square rounded-xl border flex flex-col items-center justify-center cursor-pointer transition-all p-1 relative text-center group ${tile.colorClass} ${
                          isHovered ? 'ring-2 ring-accent ring-offset-2 dark:ring-offset-zinc-900 shadow-md' : ''
                        }`}
                      >
                        {/* 简称 */}
                        <span className="text-sm font-serif font-bold tracking-tight block">
                          {tile.short}
                        </span>
                        
                        {/* 拼音或省份部分简称 */}
                        <span className="text-[9px] scale-90 text-slate-500 dark:text-slate-400 font-sans block opacity-80 mt-0.5 truncate max-w-full">
                          {tile.name.replace("特别行政区", "").replace("自治区", "").replace("省", "").replace("市", "")}
                        </span>

                        {/* 鼠标悬停水墨呼吸晕光装饰 */}
                        <div className="absolute inset-0 bg-accent/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                      </motion.button>
                    );
                  })}
                </React.Fragment>
              ))}
            </div>
          </div>
        ) : (
          /* 分区名录：全部直接在界面全部显示，完全自适应且不产生横向滑动 */
          <div className="w-full space-y-4 py-2 pb-6">
            {REGION_ORDER.map(regionName => {
              const tilesInRegion = MAP_TILES.filter(t => t.region === regionName);
              return (
                <div key={regionName} className="space-y-1.5">
                  <h4 className="text-xs font-serif font-bold text-accent dark:text-accent-light flex items-center gap-1.5 px-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    {regionName}
                  </h4>
                  <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                    {tilesInRegion.map(tile => {
                      const isHovered = hoveredTile?.id === tile.id;
                      return (
                        <motion.button
                          key={tile.id}
                          onClick={() => handleTileClick(tile)}
                          onMouseEnter={() => setHoveredTile(tile)}
                          onMouseLeave={() => setHoveredTile(null)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`rounded-xl border flex flex-col items-center justify-center cursor-pointer transition-all py-1.5 px-1 relative text-center group ${tile.colorClass} ${
                            isHovered ? 'ring-2 ring-accent ring-offset-2 dark:ring-offset-zinc-900 shadow-md' : ''
                          }`}
                        >
                          <span className="text-sm font-serif font-bold tracking-tight block">
                            {tile.short}
                          </span>
                          <span className="text-[10px] scale-90 text-slate-500 dark:text-slate-400 font-sans block opacity-80 mt-0.5 truncate max-w-full">
                            {tile.name.replace("特别行政区", "").replace("自治区", "").replace("省", "").replace("市", "")}
                          </span>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 右下角极简装饰 */}
        <div className="absolute bottom-3 right-4 flex items-center gap-2 text-[10px] text-slate-400 font-serif">
          <span>知了城市</span>
        </div>
      </div>

    </div>
  );
}
