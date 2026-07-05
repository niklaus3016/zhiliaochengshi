import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Moon, Sun, Type, Trash2, Info, Check, ShieldCheck, Database, FileText } from 'lucide-react';
import { PrivacyPolicyContent, AgreementModal } from './PrivacyConsent';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  textSize: 'sm' | 'md' | 'lg';
  onChangeTextSize: (size: 'sm' | 'md' | 'lg') => void;
  onClearAllCache: () => void;
  isInline?: boolean;
}

export default function SettingsModal({
  isOpen,
  onClose,
  theme,
  onToggleTheme,
  textSize,
  onChangeTextSize,
  onClearAllCache,
  isInline = false
}: SettingsModalProps) {
  const [isPrivacyOpen, setIsPrivacyOpen] = React.useState(false);
  
  const handleClearCache = () => {
    if (window.confirm('您确定要清空全部应用数据吗？此操作将彻底删除您的浏览历史、收藏记录和搜索历史，且无法恢复。')) {
      onClearAllCache();
      alert('所有缓存已成功清空！');
      onClose();
    }
  };

  const content = (
    <div className={`${isInline ? 'w-full bg-white dark:bg-zinc-900 border border-border-warm dark:border-zinc-800 rounded-2xl flex flex-col min-h-[500px] md:min-h-[580px] overflow-hidden' : 'relative w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl border border-border-warm dark:border-zinc-800 shadow-2xl overflow-hidden flex flex-col'}`}>
      
      {/* 设置表单 */}
      <div className="p-5 space-y-6 overflow-y-auto max-h-[70vh]">
        
        {/* 产品 Brand & Logo 及产品介绍 */}
        <div className="flex flex-col items-center text-center pb-5 border-b border-border-warm dark:border-zinc-800">
          <motion.div 
            whileHover={{ rotate: 10, scale: 1.05 }}
            className="w-14 h-14 bg-primary dark:bg-accent rounded-2xl flex items-center justify-center text-white dark:text-zinc-950 shadow-md mb-3 flex-shrink-0"
          >
            <span className="text-white dark:text-zinc-950 font-serif text-2xl font-bold">知</span>
          </motion.div>
          
          <h2 className="font-serif font-bold text-lg text-text-dark dark:text-accent-light tracking-tight">
            知了城市
          </h2>

          <p className="mt-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-w-xs text-left font-sans bg-accent-light/10 dark:bg-zinc-800/20 p-4 rounded-xl border border-primary/5 dark:border-zinc-800/40">
            「知了城市」是一款面向大众、科学严谨的中国行政区划百科。本产品全面涵盖了中国 34 个省级、333 个地级、2800 多个县级行政区划的详尽地名、行政层级、地理区位与历史沿革。我们通过极简的人机交互，让您在指尖轻松探秘华夏大地的每一座城市。
          </p>
        </div>

        {/* 隐私政策 */}
        <div className="space-y-3 pt-2">
          <button
            onClick={() => setIsPrivacyOpen(true)}
            className="w-full py-3 bg-slate-50/50 dark:bg-zinc-800/20 hover:bg-slate-100/50 dark:hover:bg-zinc-800/40 border border-border-warm dark:border-zinc-800/80 text-sm text-slate-700 dark:text-slate-300 font-medium rounded-xl transition-all cursor-pointer flex items-center justify-center space-x-2"
          >
            <ShieldCheck className="w-4 h-4 text-primary dark:text-accent" />
            <span>查看完整隐私政策</span>
          </button>
        </div>

        {/* 存储清理 */}
        <div className="space-y-3">
          <label className="text-xs font-semibold text-text-muted uppercase tracking-wider block">
            缓存管理
          </label>
          <div className="flex items-center justify-between p-3 bg-rose-50/40 dark:bg-rose-950/5 rounded-xl border border-rose-100/40">
            <div>
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300 block">
                重置所有应用数据
              </span>
              <span className="text-[10px] text-text-muted block mt-0.5">
                清空收藏、浏览痕迹及搜索记录
              </span>
            </div>
            <button
              onClick={handleClearCache}
              className="p-2 bg-white dark:bg-zinc-800 hover:bg-rose-50 hover:text-rose-600 border border-border-warm dark:border-zinc-700 text-slate-500 rounded-xl transition-all cursor-pointer flex items-center justify-center"
              title="清空缓存"
            >
              <Trash2 className="w-4 h-4 text-rose-500" />
            </button>
          </div>
        </div>

      </div>

      {/* 隐私政策弹窗（与启动时同意弹窗的完整隐私政策内容完全一致） */}
      <AnimatePresence>
        {isPrivacyOpen && (
          <AgreementModal
            title="隐私政策"
            content={<PrivacyPolicyContent />}
            onClose={() => setIsPrivacyOpen(false)}
            theme={theme ?? 'dark'}
          />
        )}
      </AnimatePresence>

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

          {/* 设置卡片 */}
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
