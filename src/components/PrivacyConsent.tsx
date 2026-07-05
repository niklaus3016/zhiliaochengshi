import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, FileText, X } from 'lucide-react';

/* ========== 1. 隐私政策正文（知了城市/深圳丰佰瑞定制版） ========== */
export const PrivacyPolicyContent: React.FC = () => (
  <div className="max-w-none space-y-6 pb-8">
    <div className="text-center space-y-2 border-b border-border-warm dark:border-zinc-800 pb-6">
      <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 dark:bg-accent/20 rounded-2xl mb-2">
        <ShieldCheck className="w-6 h-6 text-primary dark:text-accent" />
      </div>
      <h1 className="font-serif font-bold text-2xl text-text-dark dark:text-accent-light tracking-tight">
        隐私政策
      </h1>
      <p className="text-xs text-text-muted dark:text-slate-500 font-sans">
        <strong className="font-medium text-text-dark dark:text-slate-300">生效日期</strong>：2026年07月06日
      </p>
    </div>

    <div className="bg-primary/5 dark:bg-accent/10 p-5 rounded-2xl border-l-4 border-primary dark:border-accent space-y-3">
      <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
        欢迎使用「<strong className="text-text-dark dark:text-slate-100 font-serif">知了城市</strong>」（以下简称"本应用"）。本应用由
        <strong className="text-primary dark:text-accent"> 深圳丰佰瑞网络科技有限公司 </strong>
        （以下简称"我们"）开发并运营。我们深知个人信息对您的重要性，将严格遵守《中华人民共和国个人信息保护法》等相关法律法规，保护您的个人信息安全。
      </p>
    </div>

    <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
      本隐私政策旨在说明我们如何收集、使用、存储和保护您在使用本应用过程中提供的个人信息，以及您对这些信息所享有的权利。请您在使用本应用前仔细阅读并充分理解本政策的全部内容，尤其是
      <strong className="text-text-dark dark:text-slate-200">加粗的条款</strong>。如您对本政策有任何疑问、意见或建议，可通过本政策末尾提供的联系方式与我们联系。
    </p>

    {/* 一 */}
    <section className="space-y-3">
      <h2 className="font-serif font-bold text-lg text-text-dark dark:text-accent-light border-b-2 border-primary/20 dark:border-accent/20 pb-2">
        一、我们收集的信息
      </h2>
      <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
        本应用为<strong>纯前端、无后端、完全本地化运行</strong>的行政区划科普工具，我们<strong>不在任何云端服务器上收集、上传、存储或共享您的个人身份信息</strong>。在您使用本应用的过程中，仅会在您的设备本地产生以下数据：
      </p>
      <ol className="list-decimal pl-6 space-y-3">
        <li className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          <strong className="text-text-dark dark:text-slate-200">足迹与收藏数据（本地存储）：</strong>
          您在使用本应用过程中主动产生的<strong>「知了足迹」收藏阁记录、行政区划游历历史（最多 20 条）、以及全域搜索历史</strong>。这些数据为核心体验内容，用于为您提供收藏回溯、游历回看和搜索建议，且<strong>仅直接保存在您当前设备浏览器的 localStorage 中</strong>，不会上传到任何外部服务器。
        </li>
        <li className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          <strong className="text-text-dark dark:text-slate-200">设备显示适配信息（临时内存，不持久化）：</strong>
          为了保障应用界面的响应式布局与字体缩放体验，我们会在内存中临时读取您的<strong>屏幕尺寸、浏览器视窗宽度</strong>，仅用于 CSS 适配，不会写入任何持久化存储，也不会收集 IMEI、Android ID、IDFA、MAC 地址、IP 地址等可识别个人身份的设备信息。
        </li>
      </ol>
    </section>

    {/* 二 */}
    <section className="space-y-3">
      <h2 className="font-serif font-bold text-lg text-text-dark dark:text-accent-light border-b-2 border-primary/20 dark:border-accent/20 pb-2">
        二、我们如何使用收集的信息
      </h2>
      <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
        我们仅会在以下<strong>合法、正当、必要且完全本地化</strong>的范围内使用上述信息：
      </p>
      <ol className="list-decimal pl-6 space-y-3">
        <li className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          <strong className="text-text-dark dark:text-slate-200">提供与维护核心服务：</strong>
          使用您的足迹与收藏数据实现收藏阁高亮、游历历史回显、搜索建议等核心功能；通过设备显示适配信息优化沙盘地图、区划名册与详情页在不同尺寸屏幕下的排版与可读性。
        </li>
        <li className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          <strong className="text-text-dark dark:text-slate-200">完全本地化的体验优化：</strong>
          所有数据分析、统计与个性化排序（如搜索历史匹配）均仅在您当前设备的浏览器内存中完成，<strong>不产生任何网络上报</strong>，亦不用于用户画像或第三方广告投放。
        </li>
      </ol>
    </section>

    {/* 三 */}
    <section className="space-y-3">
      <h2 className="font-serif font-bold text-lg text-text-dark dark:text-accent-light border-b-2 border-primary/20 dark:border-accent/20 pb-2">
        三、我们如何共享、转让和公开披露信息
      </h2>
      <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
        我们郑重承诺：<strong className="text-primary dark:text-accent">本应用无任何后端服务器、不集成任何第三方统计 / 广告 / 推送 SDK，不会在以下情形之外向任何第三方共享、转让或公开披露您的信息</strong>：
      </p>
      <ol className="list-decimal pl-6 space-y-3">
        <li className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          <strong className="text-text-dark dark:text-slate-200">法定情形：</strong>
          若未来根据法律法规的规定、行政或司法机关的强制性要求，我们可能会在其法定权限内向有关部门披露您存于本地的相关信息；届时我们将严格要求其对信息承担保密义务。
        </li>
        <li className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          <strong className="text-text-dark dark:text-slate-200">获得您的明确书面同意：</strong>
          在获得您的明确书面同意并确认传输范围与用途后，我们才会协助您向第三方共享本地存储的个人信息。
        </li>
      </ol>
    </section>

    {/* 四 */}
    <section className="space-y-3">
      <h2 className="font-serif font-bold text-lg text-text-dark dark:text-accent-light border-b-2 border-primary/20 dark:border-accent/20 pb-2">
        四、我们如何存储和保护信息
      </h2>
      <ol className="list-decimal pl-6 space-y-3">
        <li className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          <strong className="text-text-dark dark:text-slate-200">存储地点、介质与期限：</strong>
          您的足迹、收藏与搜索历史全部存储于<strong>您个人设备浏览器的 localStorage 中</strong>（存储介质完全归属您所有与控制），其地理位置为您当前设备所在的物理地点。我们会在实现本政策所述目的所必需的最短时间内保留这些信息；
          <strong>超出保留期限或您主动卸载本应用 / 清除浏览器缓存时，所有数据将随本地存储一同被物理删除</strong>，不留任何云端副本。
        </li>
        <li className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          <strong className="text-text-dark dark:text-slate-200">安全措施：</strong>
          由于所有数据均保存在您本地的浏览器沙箱中，其安全性由浏览器同源策略保障，并由您设备的操作系统与浏览器安全防护共同负责。建议您在公共设备上使用时，及时通过「选项设置 → 重置所有应用数据」一键清除所有个人痕迹。
        </li>
      </ol>
    </section>

    {/* 五 */}
    <section className="space-y-3">
      <h2 className="font-serif font-bold text-lg text-text-dark dark:text-accent-light border-b-2 border-primary/20 dark:border-accent/20 pb-2">
        五、您的权利
      </h2>
      <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
        根据相关法律法规，结合本应用完全本地化的产品特性，您对您的个人信息享有以下权利：
      </p>
      <ol className="list-decimal pl-6 space-y-3">
        <li className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          <strong className="text-text-dark dark:text-slate-200">访问与查阅权：</strong>
          您可以随时在底部导航「知了足迹」Tab 中查看和管理您全部的收藏阁记录与游历历史。
        </li>
        <li className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          <strong className="text-text-dark dark:text-slate-200">更正 / 删除权：</strong>
          您可以随时单条移除收藏、单条清除足迹；对于有异议的数据，您也可以直接删除对应条目后重新使用应用累积。
        </li>
        <li className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          <strong className="text-text-dark dark:text-slate-200">数据清空 / 撤回同意：</strong>
          您可以在「选项设置 → 重置所有应用数据」中一键彻底清除本应用保存在该设备上的收藏、浏览痕迹与搜索记录，此操作等同于撤回本隐私政策项下对信息处理的全部同意。
        </li>
        <li className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          <strong className="text-text-dark dark:text-slate-200">数据导出与可携带权：</strong>
          因所有数据均在本地，您可以通过浏览器 / WebView 开发者工具或系统级备份自行导出 localStorage 数据；我们不设置任何技术壁垒阻碍您的导出操作。
        </li>
      </ol>
    </section>

    {/* 六 */}
    <section className="space-y-3">
      <h2 className="font-serif font-bold text-lg text-text-dark dark:text-accent-light border-b-2 border-primary/20 dark:border-accent/20 pb-2">
        六、未成年人保护
      </h2>
      <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
        我们非常重视对未成年人个人信息的保护。如您是未满 14 周岁的未成年人，在使用本应用前，应在监护人的指导下仔细阅读本政策，并征得监护人的同意后再使用本应用。
        如监护人发现我们在未事先获得监护人可验证同意的情况下收集了未成年人的个人信息，请通过本政策底部邮箱与我们联系，我们将在核实后第一时间协助监护人彻底清除相关本地数据。
      </p>
    </section>

    {/* 七 */}
    <section className="space-y-3">
      <h2 className="font-serif font-bold text-lg text-text-dark dark:text-accent-light border-b-2 border-primary/20 dark:border-accent/20 pb-2">
        七、本政策的更新
      </h2>
      <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
        我们可能会根据法律法规的更新、业务的调整或技术的发展，适时对本隐私政策进行修订。修订后的政策将在本应用内「选项设置 → 完整隐私政策」的显著位置公示；对于重大变更，我们会在启动弹窗中再次向您提示并征求同意。如您继续使用本应用，即表示您同意接受修订后的政策。
      </p>
    </section>

    {/* 八 */}
    <section className="space-y-3">
      <h2 className="font-serif font-bold text-lg text-text-dark dark:text-accent-light border-b-2 border-primary/20 dark:border-accent/20 pb-2">
        八、联系我们
      </h2>
      <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
        如您对本隐私政策有任何疑问、意见或建议，或需要行使您的相关权利（访问、更正、删除、导出、撤回同意、投诉举报），请通过以下方式与我们联系：
      </p>
      <div className="bg-accent-light/60 dark:bg-zinc-800/60 p-4 rounded-2xl border border-border-warm dark:border-zinc-700 space-y-2">
        <p className="text-sm text-slate-700 dark:text-slate-300">
          <strong className="text-text-dark dark:text-slate-200 font-serif">运营主体：</strong>深圳丰佰瑞网络科技有限公司
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          <strong className="text-text-dark dark:text-slate-200 font-serif">电子邮箱：</strong>
          <a href="mailto:Jp112025@163.com" className="text-primary dark:text-accent hover:underline font-medium">
            Jp112025@163.com
          </a>
        </p>
        <p className="text-xs text-text-muted dark:text-slate-500 pt-1">
          一般情况下，我们将在收到您的请求后 15 个工作日内予以回复。
        </p>
      </div>
    </section>

    <div className="mt-6 pt-6 border-t border-border-warm dark:border-zinc-800 text-center space-y-2">
      <p className="text-sm text-slate-600 dark:text-slate-400 font-serif">
        感谢您使用「知了城市」！
      </p>
      <p className="text-xs text-text-muted dark:text-slate-500 leading-relaxed max-w-md mx-auto">
        我们致力于为您提供科学严谨、纯净离线的中国行政区划科普体验。
      </p>
      <p className="text-[11px] text-text-muted dark:text-slate-600 pt-2 tracking-wide">
        © 2026 深圳丰佰瑞网络科技有限公司 版权所有
      </p>
    </div>
  </div>
);

/* ========== 2. 用户服务协议正文（知了城市/深圳丰佰瑞定制版） ========== */
export const UserAgreementContent: React.FC = () => (
  <div className="max-w-none space-y-6 pb-8">
    <div className="text-center space-y-2 border-b border-border-warm dark:border-zinc-800 pb-6">
      <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 dark:bg-accent/20 rounded-2xl mb-2">
        <FileText className="w-6 h-6 text-primary dark:text-accent" />
      </div>
      <h1 className="font-serif font-bold text-2xl text-text-dark dark:text-accent-light tracking-tight">
        用户服务协议
      </h1>
      <p className="text-xs text-text-muted dark:text-slate-500 font-sans">
        <strong className="font-medium text-text-dark dark:text-slate-300">更新日期</strong>：2026年07月06日
      </p>
    </div>

    <section className="space-y-2">
      <h2 className="font-serif font-bold text-lg text-text-dark dark:text-accent-light">1. 协议的接受</h2>
      <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
        欢迎使用「<strong className="font-serif">知了城市</strong>」应用（以下简称「本应用」）。
      </p>
      <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
        本协议是您与<strong className="text-primary dark:text-accent">深圳丰佰瑞网络科技有限公司</strong>（以下简称「我们」）之间关于使用本应用的法律协议。
      </p>
      <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
        通过下载、安装或使用本应用，您表示已充分阅读、理解并同意接受本协议的全部条款和条件；如您不同意本协议的任何内容，请立即停止使用并卸载本应用。
      </p>
    </section>

    <section className="space-y-2">
      <h2 className="font-serif font-bold text-lg text-text-dark dark:text-accent-light">2. 服务内容</h2>
      <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
        本应用面向大众提供<strong>科学严谨、完全离线、无任何付费与广告</strong>的中国行政区划百科服务，具体包括：
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          中国 34 个省级、333 个地级、2800 多个县级行政区划的详尽百科与层级关系查阅
        </li>
        <li className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          极简国风沙盘地图可视化与 7 大地缘区域的省级名册浏览（网格 / 列表双模式）
        </li>
        <li className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          全域模糊搜索（支持名称、拼音、简称、别称匹配）
        </li>
        <li className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          「知了足迹」收藏阁与游历历史回溯
        </li>
        <li className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          随机探秘推荐、字号/主题个性化调整、缓存一键清理等辅助体验功能
        </li>
      </ul>
    </section>

    <section className="space-y-2">
      <h2 className="font-serif font-bold text-lg text-text-dark dark:text-accent-light">3. 用户义务</h2>
      <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
        作为本应用的用户，您同意：
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">遵守本协议的所有条款与现行适用法律法规</li>
        <li className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">不使用本应用进行任何非法活动，或传播违法违规、侵权、低俗、歧视、煽动性内容</li>
        <li className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">不通过逆向工程、破解、自动化脚本等方式干扰本应用的正常运行，或损害其离线数据完整性</li>
        <li className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">保护您的设备安全，设置必要的屏幕锁定与账号防护，防止未授权访问本地存储的收藏 / 足迹数据</li>
      </ul>
    </section>

    <section className="space-y-2">
      <h2 className="font-serif font-bold text-lg text-text-dark dark:text-accent-light">4. 知识产权</h2>
      <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
        本应用的所有内容，包括但不限于文字、地图可视化版式、界面设计、UI 组件、图标、图像、音频、视频、软件代码等，均受《中华人民共和国著作权法》《商标法》《专利法》及国际知识产权条约的保护，其相关知识产权归
        <strong className="text-primary dark:text-accent">深圳丰佰瑞网络科技有限公司</strong> 或原始权利人所有。
      </p>
      <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
        未经我们的书面许可，您不得复制、修改、分发、反编译、出租、出借或商业使用本应用的任何内容或衍生作品；个人非商业性的合理使用（如学习、研究、欣赏）不在此限。
      </p>
    </section>

    <section className="space-y-2">
      <h2 className="font-serif font-bold text-lg text-text-dark dark:text-accent-light">5. 免责声明</h2>
      <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
        本应用按「原样」与「可用」状态提供，在法律法规允许的最大范围内，不做任何形式的明示或默示保证。
      </p>
      <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">我们不保证：</p>
      <ul className="list-disc pl-6 space-y-2">
        <li className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">本应用将完全符合您的预期要求或特定使用目的</li>
        <li className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">本应用将无中断、及时、安全或绝对无错误地运行</li>
        <li className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">行政区划等百科数据 100% 无误（数据仅供科普参考，正式用途请以国家民政部最新公布为准）</li>
        <li className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">使用结果准确、完整或可靠，或相关缺陷一定会被修复</li>
      </ul>
      <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 pt-2">
        对因使用或无法使用本应用而产生的任何直接、间接、附随、特殊、惩罚性或后果性损害，在法律允许的最大范围内，我们不承担任何责任。
      </p>
    </section>

    <section className="space-y-2">
      <h2 className="font-serif font-bold text-lg text-text-dark dark:text-accent-light">6. 协议的终止</h2>
      <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
        您与我们均有权在任何时候，出于任何原因，终止或暂停本协议项下您对本应用的访问与使用：
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          <strong className="text-text-dark dark:text-slate-200">用户侧：</strong>您可通过停止使用、卸载本应用或清除浏览器缓存来终止本协议；清除缓存后，您本地所有收藏与足迹数据将一并永久删除。
        </li>
        <li className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          <strong className="text-text-dark dark:text-slate-200">运营方侧：</strong>若您违反本协议任何条款，或为遵守法律法规 / 司法 / 行政机关的强制性要求，我们有权不经通知立即终止或暂停您的使用权限。
        </li>
      </ul>
    </section>

    <section className="space-y-2">
      <h2 className="font-serif font-bold text-lg text-text-dark dark:text-accent-light">7. 适用法律与争议解决</h2>
      <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
        本协议的订立、执行、解释、变更、终止与争议解决均适用<strong>中华人民共和国法律</strong>（不含香港、澳门特别行政区及台湾地区法律）。
      </p>
      <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
        任何与本协议相关的争议，双方应秉持互利共赢原则，通过友好协商解决；<strong>协商不成的，任何一方均有权将争议提交至广东省深圳市有管辖权的人民法院</strong>诉讼解决。
      </p>
    </section>

    <section className="space-y-2">
      <h2 className="font-serif font-bold text-lg text-text-dark dark:text-accent-light">8. 协议的可分性与更新</h2>
      <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
        如本协议的任何条款被有管辖权的人民法院认定为无效或不可执行，其余条款的有效性与可执行性不受影响；被认定无效或不可执行的条款应在不违反法律强制性规定的前提下，以最接近实现缔约双方原始意图的方式予以解释或替代。
      </p>
      <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
        我们有权根据法律法规变化、产品功能迭代或运营需要，适时修订本协议；修订后的协议将在「选项设置 → 用户服务协议」显著位置公示，并标注更新日期；重大变更将通过启动弹窗重新征求您的同意。
      </p>
    </section>

    <div className="mt-6 pt-6 border-t border-border-warm dark:border-zinc-800 text-center space-y-1">
      <p className="text-xs text-text-muted dark:text-slate-500 tracking-wide">
        再次感谢您选择「知了城市」，愿与您一同探秘华夏山河。
      </p>
      <p className="text-[11px] text-text-muted dark:text-slate-600 pt-2 tracking-wide">
        © 2026 深圳丰佰瑞网络科技有限公司 版权所有
      </p>
    </div>
  </div>
);

/* ========== 3. 通用协议/政策详情弹窗 ========== */
interface AgreementModalProps {
  onClose: () => void;
  title: string;
  content: React.ReactNode;
  theme: 'light' | 'dark';
}
export const AgreementModal: React.FC<AgreementModalProps> = ({ onClose, title, content, theme }) => (
  <div className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
    <motion.div
      initial={{ scale: 0.95, opacity: 0, y: 10 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.95, opacity: 0, y: 10 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className={`rounded-2xl w-full max-w-3xl h-[86vh] overflow-hidden shadow-2xl border border-border-warm ${
        theme === 'dark'
          ? 'bg-zinc-900 dark:bg-zinc-900 border-zinc-800 text-slate-100'
          : 'bg-white border-black/5 text-slate-800'
      } flex flex-col`}
    >
      <div className={`flex items-center justify-between px-5 py-4 border-b shrink-0 ${
        theme === 'dark' ? 'border-zinc-800 bg-zinc-900' : 'border-black/5 bg-white'
      }`}>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
            theme === 'dark' ? 'bg-accent/15 text-accent' : 'bg-primary/10 text-primary'
          }`}>
            {title.includes('隐私')
              ? <ShieldCheck size={22} />
              : <FileText size={22} />}
          </div>
          <h2 className="font-serif font-bold text-lg text-text-dark dark:text-accent-light">
            {title}
          </h2>
        </div>
        <button
          onClick={onClose}
          className={`w-9 h-9 rounded-full flex items-center justify-center active:scale-90 transition-transform ${
            theme === 'dark'
              ? 'bg-zinc-800 text-slate-400 hover:bg-zinc-700'
              : 'bg-slate-100 text-text-muted hover:bg-slate-200'
          }`}
          aria-label="关闭"
        >
          <X size={20} />
        </button>
      </div>
      <div className={`flex-1 overflow-y-auto p-5 sm:p-6 ${
        theme === 'dark' ? 'bg-zinc-950/30' : 'bg-accent-light/40'
      }`}>
        {content}
      </div>
    </motion.div>
  </div>
);

/* ========== 4. 启动时隐私同意流程（主弹窗 + 拒绝二次确认 + 内嵌详情弹窗） ========== */
export interface PrivacyConsentFlowProps {
  onAccept: () => void;
  onDecline?: () => void;
  theme: 'light' | 'dark';
}
export const PrivacyConsentFlow: React.FC<PrivacyConsentFlowProps> = ({ onAccept, onDecline, theme }) => {
  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const [showAgreement, setShowAgreement] = useState<null | 'user' | 'privacy'>(null);

  const handleDeclineCancel = () => setShowDeclineModal(false);
  const handleDeclineConfirm = () => {
    setShowDeclineModal(false);
    onDecline?.();
  };

  const isDark = theme === 'dark';

  return (
    <AnimatePresence>
      {/* 4.1 主同意弹窗 */}
      <div key="privacy-consent-root" className="fixed inset-0 z-[60]">
        {/* 背景遮罩 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-md"
        />

        <div className="absolute inset-0 flex items-center justify-center p-4">
          <motion.div
            key="privacy-consent-card"
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className={`w-full max-w-sm shadow-2xl max-h-[82vh] overflow-y-auto rounded-2xl border ${
              isDark
                ? 'bg-zinc-900 border-zinc-800 text-slate-100'
                : 'bg-white border-black/5 text-slate-800'
            }`}
          >
            <div className="p-6 space-y-6">
              <div className="flex flex-col items-center text-center space-y-2 pt-2">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-md mb-2 ${
                  isDark ? 'bg-accent text-zinc-950' : 'bg-primary text-white'
                }`}>
                  <span className="font-serif text-2xl font-bold">知</span>
                </div>
                <h3 className="font-serif font-bold text-xl text-text-dark dark:text-accent-light">
                  用户协议与隐私政策
                </h3>
                <p className="text-[11px] text-text-muted dark:text-slate-500 tracking-wide">
                  请您在使用「知了城市」前仔细阅读
                </p>
              </div>

              <div className="space-y-3">
                <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-200' : 'text-[#1D1D1F]'}`}>
                  （1）《<strong>隐私政策</strong>》中关于<strong>足迹与收藏数据的本地存储方式</strong>、以及<strong>设备显示适配信息（临时内存）</strong>处理说明。
                </p>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-200' : 'text-[#1D1D1F]'}`}>
                  （2）《<strong>隐私政策</strong>》中<strong>无云端收集 / 无第三方 SDK / 无广告</strong>的运营承诺与共享、转让、公开披露规则说明。
                </p>
              </div>

              <div className={`p-4 rounded-xl border ${
                isDark
                  ? 'bg-zinc-800/40 border-zinc-800 text-slate-300'
                  : 'bg-slate-50 border-gray-100 text-[#424245]'
              } space-y-2`}>
                <p className={`text-[11px] font-medium uppercase tracking-wider ${isDark ? 'text-slate-500' : 'text-[#86868B]'}`}>
                  用户协议和隐私政策说明：
                </p>
                <p className="text-sm leading-relaxed">
                  阅读完整的
                  <span
                    onClick={() => setShowAgreement('user')}
                    className={`mx-1 cursor-pointer font-medium hover:underline ${
                      isDark ? 'text-accent' : 'text-primary'
                    }`}
                  >
                    《用户服务协议》
                  </span>
                  和
                  <span
                    onClick={() => setShowAgreement('privacy')}
                    className={`mx-1 cursor-pointer font-medium hover:underline ${
                      isDark ? 'text-accent' : 'text-primary'
                    }`}
                  >
                    《隐私政策》
                  </span>
                  了解详细内容。
                </p>
              </div>
            </div>

            <div className={`flex border-t ${isDark ? 'border-zinc-800' : 'border-gray-200'}`}>
              <button
                onClick={() => setShowDeclineModal(true)}
                className={`flex-1 py-4 text-base font-medium rounded-bl-2xl transition-colors ${
                  isDark
                    ? 'text-slate-300 border-r border-zinc-800 hover:bg-zinc-800/50'
                    : 'text-[#1D1D1F] border-r border-gray-200 hover:bg-gray-50'
                }`}
              >
                不同意
              </button>
              <button
                onClick={onAccept}
                className={`flex-1 py-4 text-base font-medium rounded-br-2xl transition-colors text-white ${
                  isDark
                    ? 'bg-accent hover:bg-opacity-90 text-zinc-950'
                    : 'bg-primary hover:bg-primary-dark'
                }`}
              >
                同意并继续
              </button>
            </div>
          </motion.div>
        </div>

        {/* 4.2 拒绝二次确认弹窗 */}
        <AnimatePresence>
          {showDeclineModal && (
            <div className="absolute inset-0 z-10 flex items-center justify-center p-4">
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className={`w-full max-w-md overflow-hidden shadow-2xl border rounded-2xl flex flex-col ${
                  isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-black/5'
                }`}
              >
                <div className="p-6 space-y-3">
                  <h2 className={`font-serif font-bold text-xl ${isDark ? 'text-accent-light' : 'text-[#1D1D1F]'}`}>
                    确认拒绝
                  </h2>
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
                    您确定要拒绝《用户服务协议》与《隐私政策》吗？<br />
                    <strong className={isDark ? 'text-slate-200' : 'text-slate-700'}>拒绝后将无法进入并使用「知了城市」的全部服务</strong>，您可随时再次打开本弹窗选择同意。
                  </p>
                </div>
                <div className={`flex border-t ${isDark ? 'border-zinc-800' : 'border-black/5'}`}>
                  <button
                    onClick={handleDeclineCancel}
                    className={`flex-1 py-4 text-center font-medium transition-colors ${
                      isDark ? 'text-slate-400 hover:bg-zinc-800/50' : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    取消
                  </button>
                  <div className={`w-px ${isDark ? 'bg-zinc-800' : 'bg-black/5'}`} />
                  <button
                    onClick={handleDeclineConfirm}
                    className={`flex-1 py-4 text-center font-medium transition-colors ${
                      isDark ? 'text-accent hover:bg-zinc-800/50' : 'text-primary hover:bg-gray-50'
                    }`}
                  >
                    确定拒绝
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* 4.3 协议/政策详情弹窗 */}
        <AnimatePresence>
          {showAgreement === 'user' && (
            <AgreementModal
              title="用户服务协议"
              content={<UserAgreementContent />}
              onClose={() => setShowAgreement(null)}
              theme={theme}
            />
          )}
          {showAgreement === 'privacy' && (
            <AgreementModal
              title="隐私政策"
              content={<PrivacyPolicyContent />}
              onClose={() => setShowAgreement(null)}
              theme={theme}
            />
          )}
        </AnimatePresence>
      </div>
    </AnimatePresence>
  );
};

export default PrivacyConsentFlow;
