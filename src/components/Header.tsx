import React from 'react';
import { motion } from 'motion/react';
import { Compass, Search, Heart, Settings, RefreshCw, Layers } from 'lucide-react';

interface HeaderProps {
  onOpenSearch: () => void;
  onOpenSettings: () => void;
  onOpenFavorites: () => void;
  onRandomExplore: () => void;
  favoriteCount: number;
}

export default function Header({
  onOpenSearch,
  onOpenSettings,
  onOpenFavorites,
  onRandomExplore,
  favoriteCount
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border-b border-border-warm dark:border-zinc-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        
        {/* LOGO 区域 */}
        <div className="flex items-center gap-2 cursor-pointer flex-shrink-0" onClick={() => window.location.reload()}>
          <motion.div 
            whileHover={{ rotate: 15, scale: 1.05 }}
            className="w-9 h-9 sm:w-10 sm:h-10 bg-primary dark:bg-accent rounded-xl flex items-center justify-center text-white dark:text-zinc-950 shadow-sm flex-shrink-0"
          >
            <span className="text-white dark:text-zinc-950 font-serif text-base sm:text-lg font-bold">知</span>
          </motion.div>
          <div className="flex flex-col justify-center">
            <h1 className="font-serif font-bold text-xs sm:text-xs text-text-dark dark:text-accent-light tracking-tight leading-none">
              知了城市
            </h1>
            <span className="text-[8px] text-text-muted dark:text-slate-500 font-sans hidden sm:block mt-1 tracking-wider uppercase">
              Administrative Geography Encyclopedia · v1.0.0
            </span>
          </div>
        </div>

        {/* 搜索框与按钮快捷操作 */}
        <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
          
          {/* 搜索快捷触发 */}
          <button 
            id="global_search_button"
            onClick={onOpenSearch}
            className="flex items-center justify-center sm:justify-start gap-2 bg-accent-light/60 dark:bg-zinc-800 hover:bg-accent-light dark:hover:bg-zinc-700/50 p-2 sm:px-3 sm:py-2 rounded-xl border border-border-warm dark:border-zinc-700/40 text-text-muted dark:text-slate-400 text-xs transition-all w-9 h-9 sm:w-32 md:w-56 text-left cursor-pointer group flex-shrink-0"
          >
            <Search className="w-4 h-4 sm:w-3.5 sm:h-3.5 text-text-muted dark:text-slate-400 group-hover:text-primary transition-colors" />
            <span className="truncate hidden sm:inline">搜索省、市、特产或景点...</span>
          </button>

          {/* 随机探秘按钮 - 趣味涨知识 */}
          <motion.button
            id="random_explore_button"
            onClick={onRandomExplore}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden sm:flex w-9 h-9 md:w-auto md:px-3 bg-primary hover:bg-primary-dark dark:bg-accent dark:hover:bg-accent/90 text-white dark:text-zinc-950 rounded-xl items-center justify-center shadow-sm hover:shadow transition-all relative overflow-hidden group cursor-pointer flex-shrink-0"
            title="随机探秘"
          >
            <RefreshCw className="w-4 h-4 text-white dark:text-zinc-950 group-hover:rotate-180 transition-transform duration-500" />
            <span className="hidden md:inline text-xs font-medium ml-1.5 font-serif pr-0.5">随机探秘</span>
          </motion.button>

          {/* 我的收藏 */}
          <motion.button
            id="favorites_toggle_button"
            onClick={onOpenFavorites}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden sm:flex w-9 h-9 md:w-auto md:px-3 bg-accent-light/40 dark:bg-zinc-800 border border-border-warm dark:border-zinc-700 hover:bg-accent-light dark:hover:bg-zinc-700 text-text-dark dark:text-slate-300 rounded-xl items-center justify-center relative cursor-pointer flex-shrink-0"
            title="我的收藏"
          >
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500/10" />
            {favoriteCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[8px] font-bold px-1 py-0.5 rounded-full scale-90">
                {favoriteCount}
              </span>
            )}
            <span className="hidden md:inline text-xs font-medium ml-1.5 font-serif pr-0.5">收藏阁</span>
          </motion.button>

          {/* 设置按键 */}
          <motion.button
            id="settings_toggle_button"
            onClick={onOpenSettings}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden sm:flex w-9 h-9 bg-accent-light/40 dark:bg-zinc-800 border border-border-warm dark:border-zinc-700 hover:bg-accent-light dark:hover:bg-zinc-700 text-text-dark dark:text-slate-300 rounded-xl items-center justify-center cursor-pointer flex-shrink-0"
            title="系统设置"
          >
            <Settings className="w-4 h-4 text-text-muted" />
          </motion.button>

        </div>

      </div>
    </header>
  );
}
