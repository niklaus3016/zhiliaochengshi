import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, Map, List, Grid, Globe, Bookmark, 
  MapPin, Clock, Search, HelpCircle, Layers, ArrowRight, BookOpen, RefreshCw, ChevronRight,
  Heart, Settings
} from 'lucide-react';
import { Province, City, County } from './types';
import { getChinaData, findAreaById, getRandomArea } from './data/dataHelper';
import Header from './components/Header';
import ChinaMap from './components/ChinaMap';
import AreaDetailView from './components/AreaDetailView';
import SearchPanel from './components/SearchPanel';
import SettingsModal from './components/SettingsModal';
import FavoritesAndHistory from './components/FavoritesAndHistory';
import PrivacyConsentFlow from './components/PrivacyConsent';

export default function App() {
  // 数据初始化
  const { provinces, cities, counties } = getChinaData();

  // 状态变量
  const [activeArea, setActiveArea] = useState<Province | City | County | null>(null);
  const [currentTab, setCurrentTab] = useState<'home' | 'search' | 'favorites' | 'settings'>('home');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid'); // 省份列表浏览模式
  const [selectedRegion, setSelectedRegion] = useState<string>('全部'); // 区域筛选
  
  // 个性化设置状态
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [textSize, setTextSize] = useState<'sm' | 'md' | 'lg'>('sm');

  // 隐私协议与用户服务协议同意状态（启动时强制弹窗）
  const [showPrivacyConsent, setShowPrivacyConsent] = useState(false);

  // 存储状态
  const [favorites, setFavorites] = useState<string[]>([]);
  const [history, setHistory] = useState<string[]>([]);

  // 1. 初始化读取本地缓存
  useEffect(() => {
    const savedTheme = localStorage.getItem('zhiliaocity_theme') as 'light' | 'dark' | null;
    const initialTheme = savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : 'dark';
    setTheme(initialTheme);
    applyTheme(initialTheme);

    const savedTextSize = localStorage.getItem('zhiliaocity_text_size') as 'sm' | 'md' | 'lg' | null;
    const initialTextSize = savedTextSize === 'sm' || savedTextSize === 'md' || savedTextSize === 'lg' ? savedTextSize : 'sm';
    setTextSize(initialTextSize);

    // 收藏加载
    const savedFavorites = localStorage.getItem('zhiliaocity_favorites');
    if (savedFavorites) {
      try { setFavorites(JSON.parse(savedFavorites)); } catch (e) { setFavorites([]); }
    }

    // 历史痕迹加载
    const savedHistory = localStorage.getItem('zhiliaocity_history');
    if (savedHistory) {
      try { setHistory(JSON.parse(savedHistory)); } catch (e) { setHistory([]); }
    }

    // 隐私协议与用户服务协议同意校验：未同意则强制展示启动弹窗
    try {
      const savedPrivacy = localStorage.getItem('zhiliaocity_privacy_consent');
      if (!savedPrivacy || savedPrivacy !== 'true') {
        setShowPrivacyConsent(true);
      }
    } catch (e) {
      setShowPrivacyConsent(true);
    }
  }, []);

  // 2. 主题切换与应用
  const applyTheme = (currentTheme: 'light' | 'dark') => {
    const root = window.document.documentElement;
    if (currentTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  };

  const handleToggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    applyTheme(nextTheme);
    localStorage.setItem('zhiliaocity_theme', nextTheme);
  };

  const handleTextSizeChange = (size: 'sm' | 'md' | 'lg') => {
    setTextSize(size);
    localStorage.setItem('zhiliaocity_text_size', size);
  };

  // 3. 收藏管理
  const handleToggleFavorite = (id: string) => {
    let updated: string[];
    if (favorites.includes(id)) {
      updated = favorites.filter(favId => favId !== id);
    } else {
      updated = [id, ...favorites];
    }
    setFavorites(updated);
    localStorage.setItem('zhiliaocity_favorites', JSON.stringify(updated));
  };

  const handleRemoveFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = favorites.filter(favId => favId !== id);
    setFavorites(updated);
    localStorage.setItem('zhiliaocity_favorites', JSON.stringify(updated));
  };

  // 4. 游历历史管理
  const addToHistory = (id: string) => {
    const updated = [id, ...history.filter(hId => hId !== id)].slice(0, 20);
    setHistory(updated);
    localStorage.setItem('zhiliaocity_history', JSON.stringify(updated));
  };

  const handleRemoveHistoryItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = history.filter(hId => hId !== id);
    setHistory(updated);
    localStorage.setItem('zhiliaocity_history', JSON.stringify(updated));
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem('zhiliaocity_history');
  };

  // 5. 缓存重置
  const handleClearAllCache = () => {
    localStorage.removeItem('zhiliaocity_favorites');
    localStorage.removeItem('zhiliaocity_history');
    localStorage.removeItem('zhiliaocity_search_history');
    setFavorites([]);
    setHistory([]);
  };

  // 6. 隐私协议与用户服务协议的同意/拒绝处理
  const handlePrivacyAccept = () => {
    // 用户主动同意后，写入本地存储并关闭弹窗
    try {
      localStorage.setItem('zhiliaocity_privacy_consent', 'true');
      localStorage.setItem(
        'zhiliaocity_privacy_consent_time',
        new Date().toISOString()
      );
    } catch (e) {
      // 忽略 localStorage 写入失败（例如隐私模式），仅关闭弹窗即可
    }
    setShowPrivacyConsent(false);
  };

  const handlePrivacyDecline = () => {
    // 用户明确拒绝：保持弹窗显示，用户仍可随时改为同意
    // 仅写入一条拒绝时间用于后续统计/合规，不关闭主弹窗
    try {
      localStorage.setItem(
        'zhiliaocity_privacy_declined_time',
        new Date().toISOString()
      );
    } catch (e) {
      // 忽略
    }
  };

  // 6. 区域浏览切换与随机探秘
  const handleSelectArea = (areaNode: Province | City | County) => {
    setActiveArea(areaNode);
    addToHistory(areaNode.id);
  };

  const handleSelectAreaById = (id: string) => {
    const matched = findAreaById(id);
    if (matched) {
      handleSelectArea(matched);
    }
  };

  const handleBack = () => {
    if (!activeArea) return;
    if (activeArea.level === 'county') {
      const parentCityId = (activeArea as County).cityId;
      handleSelectAreaById(parentCityId);
    } else if (activeArea.level === 'city') {
      const parentProvinceId = (activeArea as City).provinceId;
      handleSelectAreaById(parentProvinceId);
    } else {
      setActiveArea(null);
    }
  };

  const handleRandomExplore = () => {
    const randomItem = getRandomArea();
    handleSelectArea(randomItem);
  };

  // 7. 地缘区域定义列表
  const geoRegions = ['全部', '华北地区', '东北地区', '华东地区', '华中地区', '华南地区', '西南地区', '西北地区'];

  // 根据选择的地理区域过滤省份
  const filteredProvinces = provinces.filter(p => {
    if (selectedRegion === '全部') return true;
    return p.detail.location.includes(selectedRegion) || 
           (p.name === '黑龙江省' || p.name === '吉林省' || p.name === '辽宁省') && selectedRegion === '东北地区' ||
           (p.name === '北京市' || p.name === '天津市' || p.name === '河北省' || p.name === '山西省' || p.name === '内蒙古自治区') && selectedRegion === '华北地区' ||
           (p.name === '上海市' || p.name === '江苏省' || p.name === '浙江省' || p.name === '安徽省' || p.name === '福建省' || p.name === '江西省' || p.name === '山东省' || p.name === '台湾省') && selectedRegion === '华东地区' ||
           (p.name === '河南省' || p.name === '湖北省' || p.name === '湖南省') && selectedRegion === '华中地区' ||
           (p.name === '广东省' || p.name === '广西壮族自治区' || p.name === '海南省' || p.name === '香港特别行政区' || p.name === '澳门特别行政区') && selectedRegion === '华南地区' ||
           (p.name === '重庆市' || p.name === '四川省' || p.name === '贵州省' || p.name === '云南省' || p.name === '西藏自治区') && selectedRegion === '西南地区' ||
           (p.name === '陕西省' || p.name === '甘肃省' || p.name === '青海省' || p.name === '宁夏回族自治区' || p.name === '新疆维吾尔自治区') && selectedRegion === '西北地区';
  });

  return (
    <div className={`min-h-screen font-sans flex flex-col transition-colors duration-300 pb-16 md:pb-0 ${
      theme === 'dark' ? 'bg-paper-dark text-slate-100' : 'bg-paper-light text-slate-800'
    } text-size-${textSize}`}>
      
      {/* 头部导航区域 */}
      <Header
        onOpenSearch={() => { setActiveArea(null); setCurrentTab('search'); }}
        onOpenSettings={() => { setActiveArea(null); setCurrentTab('settings'); }}
        onOpenFavorites={() => { setActiveArea(null); setCurrentTab('favorites'); }}
        onRandomExplore={() => { setActiveArea(null); handleRandomExplore(); }}
        favoriteCount={favorites.length}
      />

      {/* 主体核心区域 */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 space-y-8 ink-fade">
        
        <AnimatePresence mode="wait">
          {activeArea ? (
            // 1. 深度区划百科详情页面
            <div key={`detail-${activeArea.id}`}>
              <AreaDetailView
                area={activeArea}
                onBack={handleBack}
                onNavigateTo={handleSelectAreaById}
                isFavorited={favorites.includes(activeArea.id)}
                onToggleFavorite={() => handleToggleFavorite(activeArea.id)}
              />
            </div>
          ) : (
            <div key={currentTab}>
              {currentTab === 'home' && (
                <motion.div 
                  key="home-dashboard"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-8"
                >
              
              {/* 核心图表：全国极简地图可视化 */}
              <ChinaMap 
                provinces={provinces}
                onSelectProvince={handleSelectArea}
              />

              {/* 省级行政区名册名册列表 */}
              <div id="province_list_section" className="space-y-4 pt-4">
                
                {/* 过滤栏与模式切换 */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border-warm pb-4">
                  <div className="space-y-1">
                    <h3 className="font-serif font-bold text-xl text-primary dark:text-accent-light flex items-center gap-1.5">
                      <Layers className="w-5 h-5 text-accent" />
                      省级行政区名册 (34)
                    </h3>
                    <p className="text-xs text-text-muted dark:text-slate-500">
                      含23个省、4个直辖市、5个自治区、2个特别行政区，支持多维度过滤
                    </p>
                  </div>

                  {/* 视图模式切换 */}
                  <div className="flex items-center gap-2 self-stretch sm:self-auto justify-between">
                    {/* 地理区域选择下拉筛选 */}
                    <select
                      value={selectedRegion}
                      onChange={(e) => setSelectedRegion(e.target.value)}
                      className="bg-white dark:bg-zinc-800 border border-border-warm dark:border-zinc-700 px-3 py-1.5 rounded-xl text-xs font-serif text-slate-600 dark:text-slate-300 outline-none"
                    >
                      {geoRegions.map(reg => (
                        <option key={reg} value={reg}>{reg}</option>
                      ))}
                    </select>

                    <div className="flex bg-accent-light/40 dark:bg-zinc-800 p-1 rounded-xl border border-border-warm">
                      <button
                        onClick={() => setViewMode('grid')}
                        className={`p-1.5 rounded-lg cursor-pointer transition-all ${
                          viewMode === 'grid' 
                            ? 'bg-white dark:bg-zinc-700 text-primary dark:text-accent font-bold shadow-xs' 
                            : 'text-slate-400 hover:text-slate-600'
                        }`}
                        title="网格卡片视图"
                      >
                        <Grid className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setViewMode('list')}
                        className={`p-1.5 rounded-lg cursor-pointer transition-all ${
                          viewMode === 'list' 
                            ? 'bg-white dark:bg-zinc-700 text-primary dark:text-accent font-bold shadow-xs' 
                            : 'text-slate-400 hover:text-slate-600'
                        }`}
                        title="列表明细视图"
                      >
                        <List className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* 省份名册卡片展示 */}
                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {filteredProvinces.map((prov, index) => {
                      const region = prov.detail.location.split('，')[0] || '华夏';
                      return (
                        <motion.div
                          id={`province_card_${prov.shortName}`}
                          key={prov.id}
                          onClick={() => handleSelectArea(prov)}
                          whileHover={{ y: -4, scale: 1.02 }}
                          className="bg-white dark:bg-zinc-900 border border-border-warm dark:border-zinc-800 rounded-2xl p-4 cursor-pointer transition-all card-shadow hover:shadow-md flex flex-col justify-between group relative overflow-hidden h-[156px]"
                        >
                          {/* 省份大水印简称 */}
                          <div className="absolute right-2 bottom-0 text-slate-100 dark:text-zinc-800/10 font-serif font-bold text-5xl select-none pointer-events-none group-hover:scale-110 transition-transform">
                            {prov.shortName}
                          </div>

                          <div className="relative z-10 space-y-1.5">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] text-accent font-mono block tracking-wider uppercase font-bold">
                                {prov.pinyin.split(' ')[0]}
                              </span>
                              <span className="text-[9px] bg-accent-light dark:bg-zinc-800 px-1.5 py-0.5 rounded text-text-muted font-sans">
                                {region}
                              </span>
                            </div>

                            <h4 className="font-serif font-bold text-base text-text-dark dark:text-slate-100 group-hover:text-primary transition-colors flex items-baseline gap-1">
                              {prov.name}
                              <span className="text-[11px] font-sans text-text-muted dark:text-slate-500 font-normal">
                                (省会：{prov.capital.replace("市", "")})
                              </span>
                            </h4>

                            <p className="text-[11px] text-text-muted dark:text-slate-500 line-clamp-2 leading-relaxed">
                              {prov.detail.positioning}
                            </p>
                          </div>

                          <div className="relative z-10 pt-2 border-t border-border-warm dark:border-zinc-800/80 flex justify-between items-center text-[9px] text-text-muted">
                            <span>辖 {prov.cities.length} 个地级市</span>
                            <span className="text-primary dark:text-accent font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                              探秘 <ArrowRight className="w-3 h-3" />
                            </span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                ) : (
                  // 2. 列表明细视图
                  <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-border-warm dark:border-zinc-800/80 overflow-hidden card-shadow">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-accent-light/40 dark:bg-zinc-950/40 text-text-muted border-b border-border-warm text-xs font-serif">
                            <th className="p-3.5">省级行政区</th>
                            <th className="p-3.5">省会</th>
                            <th className="p-3.5">简称/别称</th>
                            <th className="p-3.5">人口/面积规模</th>
                            <th className="p-3.5">地缘区位</th>
                            <th className="p-3.5 text-right">探索</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border-warm/40 dark:divide-zinc-800 text-xs md:text-sm">
                          {filteredProvinces.map((prov) => (
                            <tr 
                              key={prov.id}
                              onClick={() => handleSelectArea(prov)}
                              className="hover:bg-accent-light/30 dark:hover:bg-zinc-800/40 cursor-pointer transition-colors"
                            >
                              <td className="p-3.5 font-serif font-bold text-text-dark dark:text-accent-light">
                                {prov.name}
                              </td>
                              <td className="p-3.5 text-slate-600 dark:text-slate-300">
                                {prov.capital}
                              </td>
                              <td className="p-3.5 text-text-muted dark:text-slate-400 font-serif">
                                {prov.shortName} / {prov.detail.alias || '--'}
                              </td>
                              <td className="p-3.5 text-text-muted dark:text-slate-400">
                                {prov.detail.population} / {prov.detail.area}
                              </td>
                              <td className="p-3.5 text-text-muted">
                                {prov.detail.location.split('，')[0]}
                              </td>
                              <td className="p-3.5 text-right text-primary dark:text-accent font-bold">
                                <span className="inline-flex items-center gap-1">
                                  查看百科 <ChevronRight className="w-3.5 h-3.5" />
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

              </div>

            </motion.div>
          )}

          {currentTab === 'search' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <SearchPanel
                isOpen={true}
                isInline={true}
                onClose={() => setCurrentTab('home')}
                onSelectResult={handleSelectAreaById}
              />
            </motion.div>
          )}

          {currentTab === 'favorites' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <FavoritesAndHistory
                isOpen={true}
                isInline={true}
                onClose={() => setCurrentTab('home')}
                favorites={favorites}
                history={history}
                onSelectArea={handleSelectAreaById}
                onRemoveFavorite={handleRemoveFavorite}
                onRemoveHistoryItem={handleRemoveHistoryItem}
                onClearHistory={handleClearHistory}
              />
            </motion.div>
          )}

          {currentTab === 'settings' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <SettingsModal
                isOpen={true}
                isInline={true}
                onClose={() => setCurrentTab('home')}
                theme={theme}
                onToggleTheme={handleToggleTheme}
                textSize={textSize}
                onChangeTextSize={handleTextSizeChange}
                onClearAllCache={handleClearAllCache}
              />
            </motion.div>
          )}
        </div>
      )}
    </AnimatePresence>

      </main>

      {/* 移动端底部固底导航菜单 */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border-t border-border-warm dark:border-zinc-800 md:hidden flex items-center justify-around h-16 pb-safe shadow-[0_-4px_12px_rgba(0,0,0,0.03)] dark:shadow-[0_-4px_12px_rgba(0,0,0,0.2)]">
        {/* 山河首页 */}
        <button
          onClick={() => {
            setActiveArea(null);
            setCurrentTab('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex flex-col items-center justify-center flex-1 h-full py-1 cursor-pointer transition-all"
        >
          <Globe className={`w-5 h-5 mb-0.5 transition-colors ${currentTab === 'home' && !activeArea ? 'text-primary dark:text-accent font-bold' : 'text-text-muted dark:text-slate-400'}`} />
          <span className={`text-[10px] tracking-tight ${currentTab === 'home' && !activeArea ? 'text-primary dark:text-accent font-bold' : 'text-text-muted dark:text-slate-400'}`}>
            山河首页
          </span>
        </button>

        {/* 全域搜索 */}
        <button
          onClick={() => {
            setActiveArea(null);
            setCurrentTab('search');
          }}
          className="flex flex-col items-center justify-center flex-1 h-full py-1 cursor-pointer transition-all"
        >
          <Search className={`w-5 h-5 mb-0.5 transition-colors ${currentTab === 'search' ? 'text-primary dark:text-accent font-bold' : 'text-text-muted dark:text-slate-400'}`} />
          <span className={`text-[10px] tracking-tight ${currentTab === 'search' ? 'text-primary dark:text-accent font-bold' : 'text-text-muted dark:text-slate-400'}`}>
            全域搜索
          </span>
        </button>

        {/* 随机探秘 - 居中核心大按键 */}
        <button
          onClick={() => {
            setActiveArea(null);
            handleRandomExplore();
          }}
          className="flex flex-col items-center justify-center flex-1 h-full py-1 cursor-pointer transition-all group relative"
        >
          <div className="w-10 h-10 bg-primary dark:bg-accent rounded-full flex items-center justify-center shadow-md -mt-5 border-4 border-white dark:border-zinc-900 group-active:scale-95 transition-all">
            <RefreshCw className="w-4 h-4 text-white dark:text-zinc-950 group-hover:rotate-180 transition-transform duration-500" />
          </div>
          <span className="text-[10px] text-text-muted dark:text-slate-400 tracking-tight mt-1">
            随机探秘
          </span>
        </button>

        {/* 我的收藏 */}
        <button
          onClick={() => {
            setActiveArea(null);
            setCurrentTab('favorites');
          }}
          className="flex flex-col items-center justify-center flex-1 h-full py-1 cursor-pointer transition-all relative"
        >
          <Heart className={`w-5 h-5 mb-0.5 transition-colors ${currentTab === 'favorites' ? 'text-primary dark:text-accent font-bold' : 'text-text-muted dark:text-slate-400'}`} />
          {favorites.length > 0 && (
            <span className="absolute top-1 right-5 bg-rose-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full scale-90 leading-none">
              {favorites.length}
            </span>
          )}
          <span className={`text-[10px] tracking-tight ${currentTab === 'favorites' ? 'text-primary dark:text-accent font-bold' : 'text-text-muted dark:text-slate-400'}`}>
            知了足迹
          </span>
        </button>

        {/* 系统设置 */}
        <button
          onClick={() => {
            setActiveArea(null);
            setCurrentTab('settings');
          }}
          className="flex flex-col items-center justify-center flex-1 h-full py-1 cursor-pointer transition-all"
        >
          <Settings className={`w-5 h-5 mb-0.5 transition-colors ${currentTab === 'settings' ? 'text-primary dark:text-accent font-bold' : 'text-text-muted dark:text-slate-400'}`} />
          <span className={`text-[10px] tracking-tight ${currentTab === 'settings' ? 'text-primary dark:text-accent font-bold' : 'text-text-muted dark:text-slate-400'}`}>
            选项设置
          </span>
        </button>
      </div>

      {/* 启动时强制用户协议与隐私政策同意弹窗（localStorage 已同意则不展示） */}
      {showPrivacyConsent && (
        <PrivacyConsentFlow
          onAccept={handlePrivacyAccept}
          onDecline={handlePrivacyDecline}
          theme={theme}
        />
      )}

    </div>
  );
}
