import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, History, MapPin, Gift, Tent, CornerDownRight, Landmark } from 'lucide-react';
import { SearchResult } from '../types';
import { searchChinaData } from '../data/dataHelper';

interface SearchPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectResult: (id: string) => void;
  isInline?: boolean;
}

export default function SearchPanel({ isOpen, onClose, onSelectResult, isInline = false }: SearchPanelProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'admin' | 'specialty' | 'attraction'>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  // 加载搜索历史
  useEffect(() => {
    const saved = localStorage.getItem('zhiliaocity_search_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        setHistory([]);
      }
    }
  }, [isOpen, isInline]);

  // 输入变化触发搜索
  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }
    const searchRes = searchChinaData(query);
    setResults(searchRes);
  }, [query]);

  // 聚焦输入
  useEffect(() => {
    if (isOpen || isInline) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setQuery('');
    }
  }, [isOpen, isInline]);

  // 添加历史记录
  const saveSearchHistory = (term: string) => {
    if (!term || !term.trim()) return;
    const cleanTerm = term.trim();
    const updated = [cleanTerm, ...history.filter(h => h !== cleanTerm)].slice(0, 10);
    setHistory(updated);
    localStorage.setItem('zhiliaocity_search_history', JSON.stringify(updated));
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem('zhiliaocity_search_history');
  };

  const handleDeleteHistoryItem = (term: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = history.filter(h => h !== term);
    setHistory(updated);
    localStorage.setItem('zhiliaocity_search_history', JSON.stringify(updated));
  };

  const handleResultClick = (res: SearchResult) => {
    saveSearchHistory(res.name);
    onSelectResult(res.id);
    onClose();
  };

  const handleHistoryItemClick = (term: string) => {
    setQuery(term);
  };

  // 过滤过滤分类
  const filteredResults = results.filter(res => {
    if (activeTab === 'all') return true;
    return res.type === activeTab;
  });

  const content = (
    <div className={`${isInline ? 'w-full bg-white dark:bg-zinc-900 border border-border-warm dark:border-zinc-800 rounded-2xl flex flex-col min-h-[500px] md:min-h-[580px] overflow-hidden' : 'relative w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-2xl border border-border-warm dark:border-zinc-800 shadow-2xl flex flex-col max-h-[90vh] sm:max-h-[85vh] overflow-hidden'}`}>
      
      {/* 搜索框顶部 */}
      <div className="p-4 border-b border-border-warm dark:border-zinc-800 flex items-center gap-3">
        <Search className="w-5 h-5 text-primary dark:text-accent" />
        <input
          ref={inputRef}
          type="text"
          placeholder="探索中国省份、城市、区县..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 bg-transparent border-0 outline-none text-slate-800 dark:text-slate-100 text-sm md:text-base placeholder-slate-400 focus:ring-0"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-400 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        <button
          onClick={onClose}
          className="text-xs font-medium text-slate-400 hover:text-primary dark:hover:text-accent cursor-pointer"
        >
          {isInline ? '返回主页' : '取消'}
        </button>
      </div>

      {/* 主内容展示区 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        
        {/* 没有查询时：展示搜索历史 */}
        {!query.trim() && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400 dark:text-zinc-500 px-1">
              <span className="flex items-center gap-1">
                <History className="w-3.5 h-3.5" />
                最近搜索历史
              </span>
              {history.length > 0 && (
                <button
                  onClick={handleClearHistory}
                  className="hover:text-rose-500 cursor-pointer transition-colors"
                >
                  清空历史
                </button>
              )}
            </div>
            
            {history.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {history.map((term, index) => (
                  <div
                    key={`hist-${index}`}
                    onClick={() => handleHistoryItemClick(term)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-accent-light/40 hover:bg-accent-light/80 dark:bg-zinc-800/80 dark:hover:bg-zinc-700/50 rounded-xl text-xs text-text-dark dark:text-slate-300 border border-border-warm dark:border-zinc-700/30 cursor-pointer group transition-all"
                  >
                    <span>{term}</span>
                    <X
                      onClick={(e) => handleDeleteHistoryItem(term, e)}
                      className="w-3 h-3 text-slate-400 hover:text-rose-500 opacity-60 group-hover:opacity-100 transition-colors"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-slate-400 dark:text-zinc-600 text-xs">
                没有搜索记录。试试搜索“浙江”、“温州市”、“玄武区”
              </div>
            )}

            {/* 快捷推荐科普点 */}
            <div className="pt-4 border-t border-border-warm dark:border-zinc-800/40">
              <span className="text-xs text-text-muted dark:text-zinc-500 block mb-2 px-1">
                大家都在探索的热门城市：
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs text-text-dark dark:text-slate-300">
                {[
                  { name: "成都市", desc: "天府之国 · 蜀风雅韵" },
                  { name: "杭州市", desc: "人间天堂 · 江南水乡" },
                  { name: "西安市", desc: "十三朝古都 · 华夏源脉" },
                  { name: "温州市", desc: "东南山水甲天下 · 瓯越名城" }
                ].map((rec, rIdx) => (
                  <div
                    key={rIdx}
                    onClick={() => handleHistoryItemClick(rec.name)}
                    className="p-2.5 bg-accent-light/30 hover:bg-accent-light/60 dark:bg-zinc-800/40 dark:hover:bg-zinc-700/30 rounded-xl border border-border-warm dark:border-zinc-700/30 cursor-pointer transition-all"
                  >
                    <div className="font-serif font-semibold text-text-dark dark:text-accent-light">{rec.name}</div>
                    <div className="text-[10px] text-text-muted dark:text-slate-500 mt-0.5">{rec.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 有查询：展示过滤后结果 */}
        {query.trim() && (
          <div className="space-y-2">
            {filteredResults.length > 0 ? (
              filteredResults.map((res, index) => {
                return (
                  <div
                    key={`res-${index}`}
                    onClick={() => handleResultClick(res)}
                    className="p-3 bg-white hover:bg-primary/5 dark:bg-zinc-900 dark:hover:bg-zinc-800/40 border border-slate-100 dark:border-zinc-800/60 rounded-xl cursor-pointer transition-all flex items-start gap-3 group"
                  >
                    {/* 类别图标：仅行政区划/城市 */}
                    <div className="p-2 rounded-xl border flex-shrink-0 bg-teal-500/10 text-teal-600 border-teal-500/20">
                      <MapPin className="w-4 h-4" />
                    </div>

                    {/* 详细匹配信息 */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-serif font-bold text-slate-800 dark:text-slate-100 text-sm md:text-base">
                          {res.name}
                        </span>
                        
                        {/* 拼音或简称标识 */}
                        <span className="text-[10px] bg-slate-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-slate-400">
                          {res.level === 'province' && '省级'}
                          {res.level === 'city' && '市级'}
                          {res.level === 'county' && '区县'}
                        </span>

                        {/* 匹配字段高亮 */}
                        <span className="text-[10px] text-accent font-medium ml-auto">
                          {res.matchedField}
                        </span>
                      </div>

                      {/* 所属行政上级面包屑 */}
                      <div className="text-[11px] text-slate-400 dark:text-slate-500 flex items-center gap-1 mt-1">
                        <span>中国</span>
                        <CornerDownRight className="w-2.5 h-2.5 flex-shrink-0" />
                        <span>{res.provinceName}</span>
                        {res.cityName && (
                          <>
                            <CornerDownRight className="w-2.5 h-2.5 flex-shrink-0" />
                            <span>{res.cityName}</span>
                          </>
                        )}
                      </div>

                      {/* 匹配描述字段 */}
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                        {res.matchedValue}
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-12 text-slate-400 dark:text-zinc-600 text-sm">
                没有找到匹配行政区或特产、景点的记录
              </div>
            )}
          </div>
        )}

      </div>

      {/* 底部功能条，指示按回车搜索 */}
      <div className="p-3 bg-accent-light/40 dark:bg-zinc-950/40 border-t border-border-warm dark:border-zinc-800 flex justify-between text-[10px] text-text-muted dark:text-slate-500">
        <span>共收录：34省级 · 333地级市 · 2800+县区数据</span>
        <span>高效智能检索 · 极速响应</span>
      </div>

    </div>
  );

  if (isInline) {
    return content;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex items-start justify-center p-2 sm:p-4">
          
          {/* 半透明毛玻璃暗色背景 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* 搜索主卡片 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="relative w-full max-w-2xl z-10 flex flex-col max-h-[90vh] sm:max-h-[85vh] mt-2 sm:mt-10 md:mt-16 overflow-hidden"
          >
            {content}
          </motion.div>

        </div>
      )}
    </AnimatePresence>
  );
}
