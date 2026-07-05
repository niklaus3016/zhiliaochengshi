import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, History, Trash2, MapPin, ChevronRight, CornerDownRight } from 'lucide-react';
import { findAreaById } from '../data/dataHelper';
import { Province, City, County } from '../types';

interface FavoritesAndHistoryProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: string[];
  history: string[];
  onSelectArea: (id: string) => void;
  onRemoveFavorite: (id: string, e: React.MouseEvent) => void;
  onRemoveHistoryItem: (id: string, e: React.MouseEvent) => void;
  onClearHistory: () => void;
  isInline?: boolean;
}

export default function FavoritesAndHistory({
  isOpen,
  onClose,
  favorites,
  history,
  onSelectArea,
  onRemoveFavorite,
  onRemoveHistoryItem,
  onClearHistory,
  isInline = false
}: FavoritesAndHistoryProps) {
  
  // 查找并转换收藏对象列表
  const favoriteItems = favorites
    .map(id => findAreaById(id))
    .filter((item): item is Province | City | County => item !== null);

  // 查找并转换历史痕迹对象列表
  const historyItems = history
    .map(id => findAreaById(id))
    .filter((item): item is Province | City | County => item !== null);

  const handleItemClick = (id: string) => {
    onSelectArea(id);
    onClose();
  };

  const content = (
    <div className={`${isInline ? 'w-full bg-white dark:bg-zinc-900 border border-border-warm dark:border-zinc-800 rounded-2xl flex flex-col min-h-[500px] md:min-h-[580px] overflow-hidden' : 'relative w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl border border-border-warm dark:border-zinc-800 shadow-2xl flex flex-col max-h-[80vh] overflow-hidden z-10'}`}>
            
            {/* 对话框头部 */}
            <div className="p-4 border-b border-border-warm dark:border-zinc-800 flex justify-between items-center bg-accent-light/40 dark:bg-zinc-950/20">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-500 animate-pulse" />
                <h3 className="font-serif font-bold text-base text-text-dark dark:text-accent-light">
                  知了足迹 · 收藏与历史
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-400 cursor-pointer"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* 内容滚动区 */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              
              {/* 1. 收藏阁部分 */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                    我的收藏阁 ({favoriteItems.length})
                  </span>
                </div>

                {favoriteItems.length > 0 ? (
                  <div className="space-y-2">
                    {favoriteItems.map((item, index) => {
                      return (
                        <div
                          key={`fav-${item.id}-${index}`}
                          onClick={() => handleItemClick(item.id)}
                          className="p-3 bg-accent-light/30 hover:bg-accent-light/60 dark:bg-zinc-850 dark:hover:bg-zinc-800 border border-border-warm dark:border-zinc-800 rounded-xl cursor-pointer transition-all flex items-start justify-between group"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="font-serif font-bold text-slate-800 dark:text-slate-100 text-xs md:text-sm">
                                {item.name}
                              </span>
                              <span className="text-[9px] bg-primary/10 text-primary dark:bg-accent/10 dark:text-accent px-1 py-0.5 rounded scale-90">
                                {item.level === 'province' && '省级'}
                                {item.level === 'city' && '市级'}
                                {item.level === 'county' && '区县'}
                              </span>
                            </div>
                            
                            {/* 面包屑相对位置 */}
                            <div className="text-[10px] text-slate-400 dark:text-slate-500 flex items-center gap-1 mt-1 truncate">
                              <span>中国</span>
                              <CornerDownRight className="w-2 h-2" />
                              <span>{item.detail.belonging.split(' · ').slice(1).join(' · ')}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 self-center ml-2">
                            <button
                              onClick={(e) => onRemoveFavorite(item.id, e)}
                              className="p-1 rounded-full hover:bg-rose-50 text-rose-500 opacity-60 hover:opacity-100 transition-colors cursor-pointer"
                              title="取消收藏"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                            <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-primary transition-transform group-hover:translate-x-0.5" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-6 bg-accent-light/20 dark:bg-zinc-950/10 rounded-xl border border-dashed border-border-warm text-text-muted dark:text-zinc-600 text-xs">
                    暂无收藏记录。点击详情页顶部的爱心，即可收藏您感兴趣的地区。
                  </div>
                )}
              </div>

              {/* 2. 浏览历史足迹部分 */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  <span className="flex items-center gap-1">
                    <History className="w-3.5 h-3.5" />
                    最近游历足迹 ({historyItems.length}/20)
                  </span>
                  {historyItems.length > 0 && (
                    <button
                      onClick={onClearHistory}
                      className="text-[10px] text-rose-500 hover:underline cursor-pointer flex items-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" />
                      清空足迹
                    </button>
                  )}
                </div>

                {historyItems.length > 0 ? (
                  <div className="space-y-2">
                    {historyItems.map((item, index) => {
                      return (
                        <div
                          key={`hist-${item.id}-${index}`}
                          onClick={() => handleItemClick(item.id)}
                          className="p-3 bg-accent-light/20 hover:bg-accent-light/50 dark:bg-zinc-850/40 dark:hover:bg-zinc-850 border border-border-warm dark:border-zinc-800 rounded-xl cursor-pointer transition-all flex items-center justify-between group"
                        >
                          <div className="flex-1 min-w-0 flex items-center gap-2">
                            <MapPin className="w-3.5 h-3.5 text-primary/40 dark:text-accent/40" />
                            <div className="truncate">
                              <span className="font-serif font-bold text-slate-800 dark:text-slate-100 text-xs md:text-sm">
                                {item.name}
                              </span>
                              <span className="text-[9px] text-slate-400 block truncate mt-0.5">
                                {item.detail.belonging}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 ml-2">
                            <button
                              onClick={(e) => onRemoveHistoryItem(item.id, e)}
                              className="p-1 rounded-full hover:bg-rose-50 text-rose-500 opacity-60 hover:opacity-100 transition-colors cursor-pointer"
                              title="删除历史记录"
                            >
                              <Trash2 className="w-3.5 h-3.5 text-slate-400 hover:text-rose-500" />
                            </button>
                            <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-primary transition-all" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8 bg-accent-light/20 dark:bg-zinc-950/10 rounded-xl border border-dashed border-border-warm text-text-muted dark:text-zinc-600 text-xs">
                    暂无游历足迹。在省市县区划百科页进行查阅，将自动留存历史。
                  </div>
                )}
              </div>

            </div>

    </div>
  );

  if (isInline) {
    return content;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-2 sm:p-4">
          
          {/* 背景遮罩 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* 居中对话框面板 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="relative w-full max-w-md z-10 flex flex-col"
          >
            {content}
          </motion.div>

        </div>
      )}
    </AnimatePresence>
  );
}
