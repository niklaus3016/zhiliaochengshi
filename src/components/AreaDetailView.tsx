import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, Heart, BookOpen, Layers, Gift, Tent, 
  MapPin, CloudSun, Briefcase, Landmark, Tag, ChevronRight, Home 
} from 'lucide-react';
import { Province, City, County, AreaDetail } from '../types';

interface AreaDetailViewProps {
  area: Province | City | County;
  onBack: () => void;
  onNavigateTo: (id: string) => void;
  isFavorited: boolean;
  onToggleFavorite: () => void;
}

export default function AreaDetailView({
  area,
  onBack,
  onNavigateTo,
  isFavorited,
  onToggleFavorite
}: AreaDetailViewProps) {
  const detail: AreaDetail = area.detail;

  // 下级行政区域定义
  const getSubdivisions = () => {
    if (area.level === 'province') {
      return (area as Province).cities || [];
    } else if (area.level === 'city') {
      return (area as City).counties || [];
    }
    return [];
  };

  const subdivisions = getSubdivisions();

  // 选项卡：移除基础概况和特色特产
  const [activeTab, setActiveTab] = useState<'subdivisions' | 'attractions' | 'culture' | 'geography' | 'economy' | 'tags'>(() => {
    return subdivisions.length > 0 ? 'subdivisions' : 'attractions';
  });

  // 根据当前层级，计算上级面包屑关系
  const getBreadcrumbs = () => {
    const crumbs = [];
    crumbs.push({ name: '舆地图志', id: 'home' });

    if (area.level === 'province') {
      crumbs.push({ name: area.name, id: area.id });
    } else if (area.level === 'city') {
      const city = area as City;
      crumbs.push({ name: detail.belonging.split(' · ')[1] || '省级', id: city.provinceId });
      crumbs.push({ name: city.name, id: city.id });
    } else if (area.level === 'county') {
      const county = area as County;
      crumbs.push({ name: detail.belonging.split(' · ')[1] || '省级', id: county.provinceId });
      crumbs.push({ name: detail.belonging.split(' · ')[2] || '市级', id: county.cityId });
      crumbs.push({ name: county.name, id: county.id });
    }
    return crumbs;
  };

  const crumbs = getBreadcrumbs();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="w-full space-y-6"
    >
      
      {/* 顶部面包屑与快捷返回 */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white/60 dark:bg-zinc-900/60 p-3.5 rounded-2xl border border-border-warm dark:border-zinc-800">
        <div className="flex items-center gap-1.5 flex-wrap text-xs text-text-muted dark:text-slate-400">
          <button 
            onClick={onBack}
            className="flex items-center gap-1 hover:text-text-dark dark:hover:text-accent font-medium text-text-dark dark:text-accent mr-2 cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            返回
          </button>

          {crumbs.map((crumb, idx) => (
            <React.Fragment key={crumb.id}>
              {idx > 0 && <ChevronRight className="w-3 h-3 text-slate-300" />}
              <button
                onClick={() => {
                  if (crumb.id === 'home') {
                    onBack();
                  } else if (crumb.id !== area.id) {
                    onNavigateTo(crumb.id);
                  }
                }}
                className={`cursor-pointer transition-colors ${
                  idx === crumbs.length - 1 
                    ? 'font-bold text-primary dark:text-accent-light' 
                    : 'hover:text-primary dark:hover:text-accent'
                }`}
              >
                {crumb.id === 'home' ? (
                  <span className="flex items-center gap-1"><Home className="w-3 h-3" /> 首页</span>
                ) : crumb.name}
              </button>
            </React.Fragment>
          ))}
        </div>

        {/* 收藏与级别标识 */}
        <div className="flex items-center gap-2 self-end md:self-auto">
          <span className="bg-primary/10 dark:bg-accent/10 text-primary dark:text-accent px-2.5 py-1 rounded-lg text-xs font-semibold">
            {area.level === 'province' && '省级行政区'}
            {area.level === 'city' && '地级行政区'}
            {area.level === 'county' && '县级行政区'}
          </span>
          
          <button
            id="detail_favorite_button"
            onClick={onToggleFavorite}
            className={`p-2 rounded-xl flex items-center justify-center border transition-all cursor-pointer ${
              isFavorited
                ? 'bg-rose-50 border-rose-200 text-rose-500 hover:bg-rose-100 dark:bg-rose-950/20 dark:border-rose-900'
                : 'bg-white border-slate-200 text-slate-400 hover:bg-slate-50 hover:text-rose-500 dark:bg-zinc-800 dark:border-zinc-700'
            }`}
            title={isFavorited ? '取消收藏' : '加入收藏阁'}
          >
            <Heart className={`w-4.5 h-4.5 ${isFavorited ? 'fill-rose-500' : ''}`} />
          </button>
        </div>
      </div>

      {/* 核心 Banner 展示：国潮极简风 */}
      <div className="relative bg-primary text-white dark:bg-zinc-900/90 dark:border dark:border-zinc-800 rounded-3xl overflow-hidden p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-md">
        
        {/* 背景国画水墨晕染概念装饰 */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/80 to-primary/40 dark:from-zinc-950/40 dark:to-zinc-900/20 mix-blend-multiply pointer-events-none" />
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none font-serif text-8xl md:text-9xl font-bold p-4 text-accent select-none select-none">
          {area.shortName}
        </div>

        {/* 左侧：省市县名称、别称、一句话概括 */}
        <div className="relative z-10 max-w-xl space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-widest text-accent font-mono block font-bold">
              {area.pinyin}
            </span>
          </div>

          <h1 className="font-serif font-extrabold text-2xl sm:text-3xl md:text-4xl text-accent-light tracking-wide flex flex-wrap items-baseline gap-1.5 md:gap-3">
            {area.name}
            {detail.alias && (
              <span className="font-sans text-xs sm:text-sm md:text-base font-normal text-slate-300 dark:text-slate-400 whitespace-nowrap">
                别称：{detail.alias}
              </span>
            )}
          </h1>

          <p className="text-sm text-slate-200 dark:text-slate-300 leading-relaxed font-sans font-light">
            {detail.positioning}
          </p>
        </div>


      </div>

      {/* 八大百科板块布局导航 - 桌面端横向, 移动端滚动 */}
      <div className="flex border-b border-border-warm dark:border-zinc-800 overflow-x-auto gap-2 pb-px scrollbar-thin scrollbar-thumb-accent/20">
        {[
          { id: 'subdivisions', label: '下辖区划', icon: Layers, hidden: subdivisions.length === 0 },
          { id: 'attractions', label: '旅游景点', icon: Tent },
          { id: 'culture', label: '人文民俗', icon: Landmark },
          { id: 'geography', label: '气候地理', icon: CloudSun },
          { id: 'economy', label: '经济特色', icon: Briefcase },
          { id: 'tags', label: '趣味标签', icon: Tag }
        ].map(tab => {
          if (tab.hidden) return null;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-1.5 px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'border-text-dark text-text-dark dark:border-accent dark:text-accent font-bold'
                  : 'border-transparent text-text-muted hover:text-text-dark dark:text-slate-400 dark:hover:text-accent hover:border-slate-300'
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 百科卡片渲染区域 */}
      <div className="min-h-[300px]">
        {activeTab === 'subdivisions' && subdivisions.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-primary/5 dark:border-zinc-800 card-shadow">
              
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-serif font-bold text-lg text-primary dark:text-accent-light flex items-center gap-2">
                  <Layers className="w-5 h-5 text-accent" />
                  下辖区划列表
                </h3>
                <span className="text-xs text-slate-400">
                  共计 {subdivisions.length} 个行政单位
                </span>
              </div>

              {/* 区划网格卡片列表 */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {subdivisions.map(sub => {
                  const isClickable = area.level === 'province';
                  if (isClickable) {
                    return (
                      <motion.button
                        key={sub.id}
                        onClick={() => onNavigateTo(sub.id)}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        className="p-3 bg-bg-light hover:bg-primary/5 dark:bg-zinc-800/50 dark:hover:bg-zinc-800 rounded-xl text-left border border-primary/5 dark:border-zinc-700/50 transition-all cursor-pointer group flex justify-between items-center"
                      >
                        <div>
                          <div className="font-serif font-bold text-sm text-slate-800 dark:text-slate-100 group-hover:text-primary dark:group-hover:text-accent transition-colors">
                            {sub.name}
                          </div>
                          <div className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">
                            简称 {sub.shortName}
                          </div>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-primary dark:group-hover:text-accent transition-all group-hover:translate-x-0.5" />
                      </motion.button>
                    );
                  } else {
                    return (
                      <div
                        key={sub.id}
                        className="p-3 bg-bg-light dark:bg-zinc-800/50 rounded-xl text-left border border-primary/5 dark:border-zinc-700/50 flex justify-between items-center"
                      >
                        <div>
                          <div className="font-serif font-bold text-sm text-slate-800 dark:text-slate-100">
                            {sub.name}
                          </div>
                          <div className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">
                            简称 {sub.shortName}
                          </div>
                        </div>
                      </div>
                    );
                  }
                })}
              </div>

            </div>
          </motion.div>
        )}

        {activeTab === 'attractions' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {detail.attractions.map((attr, aIdx) => {
                return (
                  <div 
                    key={aIdx}
                    className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-primary/5 dark:border-zinc-800 card-shadow flex flex-col justify-between hover:shadow-lg transition-all"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-[10px] bg-emerald-500/10 text-emerald-600 px-2.5 py-0.5 rounded-full font-bold">
                          {attr.rating || '4A景区'}
                        </span>
                        <Tent className="w-4 h-4 text-emerald-600/60" />
                      </div>
                      
                      <h4 className="font-serif font-bold text-base text-primary dark:text-accent-light mb-2">
                        {attr.name}
                      </h4>
                      
                      <p className="text-xs text-slate-500 dark:text-slate-300 leading-relaxed">
                        {attr.desc}
                      </p>
                    </div>

                    {attr.highlight && (
                      <div className="bg-bg-light/80 dark:bg-zinc-950/40 p-2.5 rounded-xl border border-primary/5 mt-4">
                        <span className="text-[10px] text-accent font-serif font-bold block uppercase tracking-wide">
                          游玩亮点：
                        </span>
                        <span className="text-xs text-slate-600 dark:text-slate-300 mt-1 block leading-relaxed">
                          {attr.highlight}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {activeTab === 'culture' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-primary/5 dark:border-zinc-800 card-shadow">
              <h3 className="font-serif font-bold text-lg text-primary dark:text-accent-light mb-3 flex items-center gap-2">
                <Landmark className="w-5 h-5 text-accent" />
                地方文化特征与精髓
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                {detail.culture.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* 方言 */}
              <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-primary/5 dark:border-zinc-800 card-shadow">
                <span className="text-[10px] text-accent font-serif block tracking-wider uppercase mb-2">
                  方言声腔
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {detail.culture.dialects.map((dia, dIdx) => (
                    <span key={dIdx} className="bg-bg-light dark:bg-zinc-800 px-2 py-1 rounded text-xs text-slate-600 dark:text-slate-300 font-medium">
                      {dia}
                    </span>
                  ))}
                </div>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-3">
                  承载着厚重地域历史和市民烟火味的声腔系统，折射着族群迁徙的金色烙印。
                </p>
              </div>

              {/* 历史名人 */}
              <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-primary/5 dark:border-zinc-800 card-shadow">
                <span className="text-[10px] text-accent font-serif block tracking-wider uppercase mb-2">
                  历史名人
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {detail.culture.celebrities.map((cel, cIdx) => (
                    <span key={cIdx} className="bg-bg-light dark:bg-zinc-800 px-2 py-1 rounded text-xs text-slate-600 dark:text-slate-300 font-medium">
                      {cel}
                    </span>
                  ))}
                </div>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-3">
                  人杰地灵，历代名人贤达在此成长、著书立说或治理一方，功在当代。
                </p>
              </div>

              {/* 传统习俗 */}
              <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-primary/5 dark:border-zinc-800 card-shadow">
                <span className="text-[10px] text-accent font-serif block tracking-wider uppercase mb-2">
                  传统民俗习惯
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {detail.culture.customs.map((cus, cuIdx) => (
                    <span key={cuIdx} className="bg-bg-light dark:bg-zinc-800 px-2 py-1 rounded text-xs text-slate-600 dark:text-slate-300 font-medium">
                      {cus}
                    </span>
                  ))}
                </div>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-3">
                  传承千年的民风习俗，逢年过节锣鼓喧天、游神行香，饱含浓浓乡愁与祝愿。
                </p>
              </div>
            </div>

          </motion.div>
        )}

        {activeTab === 'geography' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-primary/5 dark:border-zinc-800 card-shadow">
              <h3 className="font-serif font-bold text-lg text-primary dark:text-accent-light mb-3 flex items-center gap-2">
                <CloudSun className="w-5 h-5 text-accent" />
                自然地理环境概览
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                {detail.climate.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-zinc-900 rounded-2xl p-4 border border-primary/5 dark:border-zinc-800 card-shadow text-center">
                <span className="text-[10px] text-slate-400 block tracking-wider uppercase">气候特征</span>
                <span className="font-serif font-bold text-base text-primary dark:text-accent mt-1.5 block">
                  {detail.climate.type}
                </span>
              </div>
              <div className="bg-white dark:bg-zinc-900 rounded-2xl p-4 border border-primary/5 dark:border-zinc-800 card-shadow text-center">
                <span className="text-[10px] text-slate-400 block tracking-wider uppercase">地形地貌</span>
                <span className="font-serif font-bold text-base text-primary dark:text-accent mt-1.5 block truncate">
                  {detail.climate.terrain.split('，')[0]}
                </span>
              </div>
              <div className="bg-white dark:bg-zinc-900 rounded-2xl p-4 border border-primary/5 dark:border-zinc-800 card-shadow text-center">
                <span className="text-[10px] text-slate-400 block tracking-wider uppercase">境内水系</span>
                <span className="font-serif font-bold text-base text-primary dark:text-accent mt-1.5 block truncate">
                  {detail.climate.hydrology.split('，')[0]}
                </span>
              </div>
            </div>

          </motion.div>
        )}

        {activeTab === 'economy' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-primary/5 dark:border-zinc-800 card-shadow">
              <h3 className="font-serif font-bold text-lg text-primary dark:text-accent-light mb-3 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-accent" />
                经济实力与主导产业
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                {detail.economy.description}
              </p>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-primary/5 dark:border-zinc-800 card-shadow">
              <span className="text-xs text-slate-400 block uppercase tracking-wider mb-3">
                地方核心支柱产业名片：
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                {detail.economy.pillars.map((pil, pIdx) => (
                  <div key={pIdx} className="bg-primary/5 dark:bg-zinc-800 p-3 rounded-xl border border-primary/5">
                    <span className="text-xs font-serif font-semibold text-primary dark:text-accent-light block">
                      {pil}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>
        )}

        {activeTab === 'tags' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-primary/5 dark:border-zinc-800 card-shadow text-center space-y-4">
              <h3 className="font-serif font-bold text-lg text-primary dark:text-accent-light flex items-center justify-center gap-2">
                <Tag className="w-5 h-5 text-accent" />
                地域趣味印象标签
              </h3>
              
              <p className="text-xs text-slate-400">
                用最凝练、最有网感和地方情怀的几个趣味标签，带你一秒读懂这方热土的精髓。
              </p>

              <div className="flex flex-wrap gap-3 justify-center pt-2">
                {detail.funTags.map((tag, tIdx) => (
                  <span 
                    key={tIdx} 
                    className="px-4 py-2 bg-accent/10 border border-accent/20 text-accent font-serif font-bold text-sm rounded-full shadow-sm hover:scale-105 transition-transform"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>

    </motion.div>
  );
}
