import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, FileText, X } from 'lucide-react';

const DOT_PAPER_BG: React.CSSProperties = {
  backgroundColor: '#131616',
  backgroundImage:
    'radial-gradient(circle at 1px 1px, rgba(212,163,115,0.08) 1px, transparent 0)',
  backgroundSize: '22px 22px',
};

/* ================ 1. 隐私政策正文 ================ */
export const PrivacyPolicyContent: React.FC = () => (
  <div
    className="max-w-none pb-8"
    style={{
      fontSize: 14,
      lineHeight: 1.75,
      color: '#CBD5E1',
      textAlign: 'justify',
    }}
  >
    {/* Hero 标题区 */}
    <div
      className="text-center mb-6 pb-6"
      style={{ borderBottom: '1px solid #27272A' }}
    >
      <div
        className="inline-flex items-center justify-center mb-2"
        style={{
          width: 48,
          height: 48,
          background: 'rgba(212,163,115,0.13)',
          borderRadius: 16,
        }}
      >
        <span style={{ fontSize: 24 }}>🔒</span>
      </div>
      <h1
        className="mb-2"
        style={{
          fontFamily: '"Noto Serif SC", "Songti SC", serif',
          fontWeight: 700,
          fontSize: 24,
          letterSpacing: '-0.2px',
          color: '#EADBC3',
          lineHeight: 1.3,
          textAlign: 'center',
        }}
      >
        隐私政策
      </h1>
      <div className="font-sans" style={{ marginTop: 8, fontSize: 12, color: '#A3998E' }}>
        <strong style={{ fontWeight: 500, color: '#E2E8F0' }}>生效日期</strong>
        ：2026年07月06日
      </div>
    </div>

    {/* 欢迎语高亮 Banner */}
    <div
      className="mb-6"
      style={{
        background: 'rgba(43,94,94,0.08)',
        padding: 20,
        borderLeft: '4px solid #2B5E5E',
        borderRadius: 16,
      }}
    >
      <p style={{ color: '#CBD5E1', margin: 0 }}>
        欢迎使用「
        <strong
          style={{
            fontFamily: '"Noto Serif SC", serif',
            color: '#E2E8F0',
            fontWeight: 600,
          }}
        >
          知了城市
        </strong>
        」（以下简称"本应用"）。本应用由
        <strong style={{ color: '#D4A373', fontWeight: 600 }}>
          {' '}深圳丰佰瑞网络科技有限公司{' '}
        </strong>
        （以下简称"我们"）开发并运营。我们深知个人信息对您的重要性，将严格遵守《中华人民共和国个人信息保护法》等相关法律法规，保护您的个人信息安全。
      </p>
    </div>

    {/* 引言段 */}
    <p className="mb-4" style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.75 }}>
      本隐私政策旨在说明我们如何收集、使用、存储和保护您在使用本应用过程中提供的个人信息，以及您对这些信息所享有的权利。请您在使用本应用前仔细阅读并充分理解本政策的全部内容，尤其是
      <strong style={{ color: '#E2E8F0', fontWeight: 600 }}>加粗的条款</strong>
      。如您对本政策有任何疑问、意见或建议，可通过本政策末尾提供的联系方式与我们联系。
    </p>

    {[
      {
        title: '一、我们收集的信息',
        children: (
          <>
            <p className="mb-4" style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.75 }}>
              本应用为
              <strong style={{ color: '#E2E8F0', fontWeight: 600 }}>
                纯前端、无后端、完全本地化运行
              </strong>
              的行政区划科普工具，我们
              <strong style={{ color: '#E2E8F0', fontWeight: 600 }}>
                不在任何云端服务器上收集、上传、存储或共享您的个人身份信息
              </strong>
              。在您使用本应用的过程中，仅会在您的设备本地产生以下数据：
            </p>
            <ol className="mb-0" style={{ paddingLeft: 24, margin: 0 }}>
              <li className="mb-3" style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.75 }}>
                <strong style={{ color: '#E2E8F0', fontWeight: 600 }}>
                  足迹与收藏数据（本地存储）：
                </strong>
                您在使用本应用过程中主动产生的
                <strong style={{ color: '#E2E8F0', fontWeight: 600 }}>
                  「知了足迹」收藏阁记录、行政区划游历历史（最多 20 条）、以及全域搜索历史
                </strong>
                。这些数据为核心体验内容，用于为您提供收藏回溯、游历回看和搜索建议，且
                <strong style={{ color: '#E2E8F0', fontWeight: 600 }}>
                  仅直接保存在您当前设备浏览器的 localStorage 中
                </strong>
                ，不会上传到任何外部服务器。
              </li>
              <li className="mb-0" style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.75 }}>
                <strong style={{ color: '#E2E8F0', fontWeight: 600 }}>
                  设备显示适配信息（临时内存，不持久化）：
                </strong>
                为了保障应用界面的响应式布局与字体缩放体验，我们会在内存中临时读取您的
                <strong style={{ color: '#E2E8F0', fontWeight: 600 }}>屏幕尺寸、浏览器视窗宽度</strong>
                ，仅用于 CSS 适配，不会写入任何持久化存储，也不会收集 IMEI、Android ID、IDFA、MAC 地址、IP 地址等可识别个人身份的设备信息。
              </li>
            </ol>
          </>
        ),
      },
      {
        title: '二、我们如何使用收集的信息',
        children: (
          <>
            <p className="mb-4" style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.75 }}>
              我们仅会在以下
              <strong style={{ color: '#E2E8F0', fontWeight: 600 }}>合法、正当、必要且完全本地化</strong>
              的范围内使用上述信息：
            </p>
            <ol style={{ paddingLeft: 24, margin: 0 }}>
              <li className="mb-3" style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.75 }}>
                <strong style={{ color: '#E2E8F0', fontWeight: 600 }}>提供与维护核心服务：</strong>
                使用您的足迹与收藏数据实现收藏阁高亮、游历历史回显、搜索建议等核心功能；通过设备显示适配信息优化沙盘地图、区划名册与详情页在不同尺寸屏幕下的排版与可读性。
              </li>
              <li className="mb-0" style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.75 }}>
                <strong style={{ color: '#E2E8F0', fontWeight: 600 }}>完全本地化的体验优化：</strong>
                所有数据分析、统计与个性化排序（如搜索历史匹配）均仅在您当前设备的浏览器内存中完成，
                <strong style={{ color: '#E2E8F0', fontWeight: 600 }}>不产生任何网络上报</strong>
                ，亦不用于用户画像或第三方广告投放。
              </li>
            </ol>
          </>
        ),
      },
      {
        title: '三、我们如何共享、转让和公开披露信息',
        children: (
          <>
            <p className="mb-4" style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.75 }}>
              我们郑重承诺：
              <strong style={{ color: '#D4A373', fontWeight: 600 }}>
                本应用无任何后端服务器、不集成任何第三方统计 / 广告 / 推送 SDK，不会在以下情形之外向任何第三方共享、转让或公开披露您的信息
              </strong>
              ：
            </p>
            <ol style={{ paddingLeft: 24, margin: 0 }}>
              <li className="mb-3" style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.75 }}>
                <strong style={{ color: '#E2E8F0', fontWeight: 600 }}>法定情形：</strong>
                若未来根据法律法规的规定、行政或司法机关的强制性要求，我们可能会在其法定权限内向有关部门披露您存于本地的相关信息；届时我们将严格要求其对信息承担保密义务。
              </li>
              <li className="mb-0" style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.75 }}>
                <strong style={{ color: '#E2E8F0', fontWeight: 600 }}>获得您的明确书面同意：</strong>
                在获得您的明确书面同意并确认传输范围与用途后，我们才会协助您向第三方共享本地存储的个人信息。
              </li>
            </ol>
          </>
        ),
      },
      {
        title: '四、我们如何存储和保护信息',
        children: (
          <ol style={{ paddingLeft: 24, margin: 0 }}>
            <li className="mb-3" style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.75 }}>
              <strong style={{ color: '#E2E8F0', fontWeight: 600 }}>存储地点、介质与期限：</strong>
              您的足迹、收藏与搜索历史全部存储于
              <strong style={{ color: '#E2E8F0', fontWeight: 600 }}>
                您个人设备浏览器的 localStorage 中
              </strong>
              （存储介质完全归属您所有与控制），其地理位置为您当前设备所在的物理地点。我们会在实现本政策所述目的所必需的最短时间内保留这些信息；
              <strong style={{ color: '#E2E8F0', fontWeight: 600 }}>
                超出保留期限或您主动卸载本应用 / 清除浏览器缓存时，所有数据将随本地存储一同被物理删除
              </strong>
              ，不留任何云端副本。
            </li>
            <li className="mb-0" style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.75 }}>
              <strong style={{ color: '#E2E8F0', fontWeight: 600 }}>安全措施：</strong>
              由于所有数据均保存在您本地的浏览器沙箱中，其安全性由浏览器同源策略保障，并由您设备的操作系统与浏览器安全防护共同负责。建议您在公共设备上使用时，及时通过「选项设置 → 重置所有应用数据」一键清除所有个人痕迹。
            </li>
          </ol>
        ),
      },
      {
        title: '五、您的权利',
        children: (
          <>
            <p className="mb-4" style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.75 }}>
              根据相关法律法规，结合本应用完全本地化的产品特性，您对您的个人信息享有以下权利：
            </p>
            <ol style={{ paddingLeft: 24, margin: 0 }}>
              <li className="mb-3" style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.75 }}>
                <strong style={{ color: '#E2E8F0', fontWeight: 600 }}>访问与查阅权：</strong>
                您可以随时在底部导航「知了足迹」Tab 中查看和管理您全部的收藏阁记录与游历历史。
              </li>
              <li className="mb-3" style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.75 }}>
                <strong style={{ color: '#E2E8F0', fontWeight: 600 }}>更正 / 删除权：</strong>
                您可以随时单条移除收藏、单条清除足迹；对于有异议的数据，您也可以直接删除对应条目后重新使用应用累积。
              </li>
              <li className="mb-3" style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.75 }}>
                <strong style={{ color: '#E2E8F0', fontWeight: 600 }}>数据清空 / 撤回同意：</strong>
                您可以在「选项设置 → 重置所有应用数据」中一键彻底清除本应用保存在该设备上的收藏、浏览痕迹与搜索记录，此操作等同于撤回本隐私政策项下对信息处理的全部同意。
              </li>
              <li className="mb-0" style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.75 }}>
                <strong style={{ color: '#E2E8F0', fontWeight: 600 }}>数据导出与可携带权：</strong>
                因所有数据均在本地，您可以通过浏览器 / WebView 开发者工具或系统级备份自行导出 localStorage 数据；我们不设置任何技术壁垒阻碍您的导出操作。
              </li>
            </ol>
          </>
        ),
      },
      {
        title: '六、未成年人保护',
        children: (
          <p style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.75 }}>
            我们非常重视对未成年人个人信息的保护。如您是未满 14 周岁的未成年人，在使用本应用前，应在监护人的指导下仔细阅读本政策，并征得监护人的同意后再使用本应用。
            如监护人发现我们在未事先获得监护人可验证同意的情况下收集了未成年人的个人信息，请通过本政策底部邮箱与我们联系，我们将在核实后第一时间协助监护人彻底清除相关本地数据。
          </p>
        ),
      },
      {
        title: '七、本政策的更新',
        children: (
          <p style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.75 }}>
            我们可能会根据法律法规的更新、业务的调整或技术的发展，适时对本隐私政策进行修订。修订后的政策将在本应用内「选项设置 → 完整隐私政策」的显著位置公示；对于重大变更，我们会在启动弹窗中再次向您提示并征求同意。如您继续使用本应用，即表示您同意接受修订后的政策。
          </p>
        ),
      },
      {
        title: '八、联系我们',
        children: (
          <>
            <p className="mb-4" style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.75 }}>
              如您对本隐私政策有任何疑问、意见或建议，或需要行使您的相关权利（访问、更正、删除、导出、撤回同意、投诉举报），请通过以下方式与我们联系：
            </p>
            <div
              style={{
                background: 'rgba(39,39,42,0.6)',
                padding: 16,
                borderRadius: 16,
                marginTop: 16,
                border: '1px solid #3F3F46',
              }}
            >
              <p className="mb-2" style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.75 }}>
                <strong
                  style={{
                    fontFamily: '"Noto Serif SC", serif',
                    color: '#E2E8F0',
                    fontWeight: 600,
                  }}
                >
                  运营主体：
                </strong>
                深圳丰佰瑞网络科技有限公司
              </p>
              <p className="mb-0" style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.75 }}>
                <strong
                  style={{
                    fontFamily: '"Noto Serif SC", serif',
                    color: '#E2E8F0',
                    fontWeight: 600,
                  }}
                >
                  电子邮箱：
                </strong>
                <a
                  href="mailto:Jp112025@163.com"
                  style={{
                    color: '#D4A373',
                    fontWeight: 500,
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => ((e.currentTarget.style.textDecoration = 'underline'))}
                  onMouseLeave={(e) => ((e.currentTarget.style.textDecoration = 'none'))}
                >
                  Jp112025@163.com
                </a>
              </p>
              <p style={{ fontSize: 12, color: '#A3998E', paddingTop: 4, marginBottom: 0 }}>
                一般情况下，我们将在收到您的请求后 15 个工作日内予以回复。
              </p>
            </div>
          </>
        ),
      },
    ].map((s) => (
      <section key={s.title} className="mb-6" style={{ marginTop: 28 }}>
        <h2
          style={{
            fontFamily: '"Noto Serif SC", "Songti SC", serif',
            fontWeight: 700,
            fontSize: 18,
            letterSpacing: '-0.1px',
            color: '#EADBC3',
            marginBottom: 12,
            paddingBottom: 8,
            borderBottom: '2px solid rgba(43,94,94,0.2)',
          }}
        >
          {s.title}
        </h2>
        {s.children}
      </section>
    ))}

    {/* Footer */}
    <div
      className="text-center"
      style={{
        marginTop: 48,
        paddingTop: 24,
        borderTop: '1px solid #27272A',
        maxWidth: 560,
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      <p
        style={{
          fontFamily: '"Noto Serif SC", serif',
          fontSize: 14,
          color: '#94A3B8',
          textAlign: 'center',
          marginBottom: 8,
          lineHeight: 1.6,
        }}
      >
        感谢您使用「知了城市」！
      </p>
      <p
        style={{
          fontSize: 12,
          color: '#A3998E',
          textAlign: 'center',
          marginBottom: 8,
          lineHeight: 1.6,
        }}
      >
        我们致力于为您提供科学严谨、纯净离线的中国行政区划科普体验。
      </p>
      <p
        style={{
          marginTop: 12,
          fontSize: 11,
          letterSpacing: '0.4px',
          color: '#71717A',
          textAlign: 'center',
          marginBottom: 0,
        }}
      >
        © 2026 深圳丰佰瑞网络科技有限公司 版权所有
      </p>
    </div>
  </div>
);

/* ================ 2. 用户服务协议正文 ================ */
export const UserAgreementContent: React.FC = () => {
  const H2 = (children: string) => (
    <h2
      style={{
        fontFamily: '"Noto Serif SC", "Songti SC", serif',
        fontWeight: 700,
        fontSize: 18,
        letterSpacing: '-0.1px',
        color: '#EADBC3',
        marginBottom: 12,
        paddingBottom: 8,
        borderBottom: '2px solid rgba(43,94,94,0.2)',
      }}
    >
      {children}
    </h2>
  );
  const P: React.FC<{ children: React.ReactNode; mb?: number }> = ({ children, mb = 16 }) => (
    <p style={{ marginBottom: mb, color: '#CBD5E1', fontSize: 14, lineHeight: 1.75 }}>{children}</p>
  );
  const Strong: React.FC<{ children: React.ReactNode; serif?: boolean; accent?: boolean }> = ({
    children,
    serif,
    accent,
  }) => (
    <strong
      style={{
        color: accent ? '#D4A373' : '#E2E8F0',
        fontWeight: 600,
        fontFamily: serif ? '"Noto Serif SC", serif' : undefined,
      }}
    >
      {children}
    </strong>
  );

  return (
    <div
      className="max-w-none pb-8"
      style={{
        fontSize: 14,
        lineHeight: 1.75,
        color: '#CBD5E1',
        textAlign: 'justify',
      }}
    >
      {/* Hero */}
      <div
        className="text-center mb-6 pb-6"
        style={{ borderBottom: '1px solid #27272A' }}
      >
        <div
          className="inline-flex items-center justify-center mb-2"
          style={{
            width: 48,
            height: 48,
            background: 'rgba(212,163,115,0.13)',
            borderRadius: 16,
          }}
        >
          <FileText size={24} style={{ color: '#D4A373' }} />
        </div>
        <h1
          className="mb-2"
          style={{
            fontFamily: '"Noto Serif SC", "Songti SC", serif',
            fontWeight: 700,
            fontSize: 24,
            letterSpacing: '-0.2px',
            color: '#EADBC3',
            lineHeight: 1.3,
            textAlign: 'center',
          }}
        >
          用户服务协议
        </h1>
        <div className="font-sans" style={{ marginTop: 8, fontSize: 12, color: '#A3998E' }}>
          <strong style={{ fontWeight: 500, color: '#E2E8F0' }}>更新日期</strong>
          ：2026年07月06日
        </div>
      </div>

      <section style={{ marginTop: 28 }}>
        {H2('1. 协议的接受')}
        <P>
          欢迎使用「<Strong serif>知了城市</Strong>」应用（以下简称「本应用」）。
        </P>
        <P>
          本协议是您与<Strong accent>深圳丰佰瑞网络科技有限公司</Strong>
          （以下简称「我们」）之间关于使用本应用的法律协议。
        </P>
        <P mb={0}>
          通过下载、安装或使用本应用，您表示已充分阅读、理解并同意接受本协议的全部条款和条件；如您不同意本协议的任何内容，请立即停止使用并卸载本应用。
        </P>
      </section>

      <section style={{ marginTop: 28 }}>
        {H2('2. 服务内容')}
        <P>
          本应用面向大众提供<Strong>科学严谨、完全离线、无任何付费与广告</Strong>
          的中国行政区划百科服务，具体包括：
        </P>
        <ul style={{ paddingLeft: 24, margin: 0 }}>
          {[
            '中国 34 个省级、333 个地级、2800 多个县级行政区划的详尽百科与层级关系查阅',
            '极简国风沙盘地图可视化与 7 大地缘区域的省级名册浏览（网格 / 列表双模式）',
            '全域模糊搜索（支持名称、拼音、简称、别称匹配）',
            '「知了足迹」收藏阁与游历历史回溯',
            '随机探秘推荐、字号/主题个性化调整、缓存一键清理等辅助体验功能',
          ].map((t, i) => (
            <li key={i} className="mb-3" style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.75 }}>
              {t}
            </li>
          ))}
        </ul>
      </section>

      <section style={{ marginTop: 28 }}>
        {H2('3. 用户义务')}
        <P>作为本应用的用户，您同意：</P>
        <ul style={{ paddingLeft: 24, margin: 0 }}>
          {[
            '遵守本协议的所有条款与现行适用法律法规',
            '不使用本应用进行任何非法活动，或传播违法违规、侵权、低俗、歧视、煽动性内容',
            '不通过逆向工程、破解、自动化脚本等方式干扰本应用的正常运行，或损害其离线数据完整性',
            '保护您的设备安全，设置必要的屏幕锁定与账号防护，防止未授权访问本地存储的收藏 / 足迹数据',
          ].map((t, i) => (
            <li key={i} className="mb-3" style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.75 }}>
              {t}
            </li>
          ))}
        </ul>
      </section>

      <section style={{ marginTop: 28 }}>
        {H2('4. 知识产权')}
        <P>
          本应用的所有内容，包括但不限于文字、地图可视化版式、界面设计、UI 组件、图标、图像、音频、视频、软件代码等，均受《中华人民共和国著作权法》《商标法》《专利法》及国际知识产权条约的保护，其相关知识产权归
          <Strong accent>深圳丰佰瑞网络科技有限公司</Strong> 或原始权利人所有。
        </P>
        <P mb={0}>
          未经我们的书面许可，您不得复制、修改、分发、反编译、出租、出借或商业使用本应用的任何内容或衍生作品；个人非商业性的合理使用（如学习、研究、欣赏）不在此限。
        </P>
      </section>

      <section style={{ marginTop: 28 }}>
        {H2('5. 免责声明')}
        <P>
          本应用按「原样」与「可用」状态提供，在法律法规允许的最大范围内，不做任何形式的明示或默示保证。
        </P>
        <P mb={0}>我们不保证：</P>
        <ul style={{ paddingLeft: 24, margin: 0 }}>
          {[
            '本应用将完全符合您的预期要求或特定使用目的',
            '本应用将无中断、及时、安全或绝对无错误地运行',
            '行政区划等百科数据 100% 无误（数据仅供科普参考，正式用途请以国家民政部最新公布为准）',
            '使用结果准确、完整或可靠，或相关缺陷一定会被修复',
          ].map((t, i) => (
            <li key={i} className="mb-3" style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.75 }}>
              {t}
            </li>
          ))}
        </ul>
        <P style={{ paddingTop: 8, marginBottom: 0 }}>
          对因使用或无法使用本应用而产生的任何直接、间接、附随、特殊、惩罚性或后果性损害，在法律允许的最大范围内，我们不承担任何责任。
        </P>
      </section>

      <section style={{ marginTop: 28 }}>
        {H2('6. 协议的终止')}
        <P>
          您与我们均有权在任何时候，出于任何原因，终止或暂停本协议项下您对本应用的访问与使用：
        </P>
        <ul style={{ paddingLeft: 24, margin: 0 }}>
          <li className="mb-3" style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.75 }}>
            <Strong>用户侧：</Strong>您可通过停止使用、卸载本应用或清除浏览器缓存来终止本协议；清除缓存后，您本地所有收藏与足迹数据将一并永久删除。
          </li>
          <li className="mb-0" style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.75 }}>
            <Strong>运营方侧：</Strong>若您违反本协议任何条款，或为遵守法律法规 / 司法 / 行政机关的强制性要求，我们有权不经通知立即终止或暂停您的使用权限。
          </li>
        </ul>
      </section>

      <section style={{ marginTop: 28 }}>
        {H2('7. 适用法律与争议解决')}
        <P>
          本协议的订立、执行、解释、变更、终止与争议解决均适用<Strong>中华人民共和国法律</Strong>
          （不含香港、澳门特别行政区及台湾地区法律）。
        </P>
        <P mb={0}>
          任何与本协议相关的争议，双方应秉持互利共赢原则，通过友好协商解决；
          <Strong>协商不成的，任何一方均有权将争议提交至广东省深圳市有管辖权的人民法院</Strong>诉讼解决。
        </P>
      </section>

      <section style={{ marginTop: 28 }}>
        {H2('8. 协议的可分性与更新')}
        <P>
          如本协议的任何条款被有管辖权的人民法院认定为无效或不可执行，其余条款的有效性与可执行性不受影响；被认定无效或不可执行的条款应在不违反法律强制性规定的前提下，以最接近实现缔约双方原始意图的方式予以解释或替代。
        </P>
        <P mb={0}>
          我们有权根据法律法规变化、产品功能迭代或运营需要，适时修订本协议；修订后的协议将在「选项设置 → 用户服务协议」显著位置公示，并标注更新日期；重大变更将通过启动弹窗重新征求您的同意。
        </P>
      </section>

      <div
        className="text-center"
        style={{
          marginTop: 48,
          paddingTop: 24,
          borderTop: '1px solid #27272A',
          maxWidth: 560,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        <p
          style={{
            fontSize: 12,
            color: '#A3998E',
            letterSpacing: 0.4,
            marginBottom: 8,
            textAlign: 'center',
          }}
        >
          再次感谢您选择「知了城市」，愿与您一同探秘华夏山河。
        </p>
        <p
          style={{
            marginTop: 12,
            fontSize: 11,
            letterSpacing: '0.4px',
            color: '#71717A',
            marginBottom: 0,
            textAlign: 'center',
          }}
        >
          © 2026 深圳丰佰瑞网络科技有限公司 版权所有
        </p>
      </div>
    </div>
  );
};

/* ================ 3. 通用协议/政策详情弹窗 ================ */
interface AgreementModalProps {
  onClose: () => void;
  title: string;
  content: React.ReactNode;
  theme: 'light' | 'dark';
}
export const AgreementModal: React.FC<AgreementModalProps> = ({ onClose, title, content }) => {
  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center"
      style={{
        backgroundColor: 'rgba(0,0,0,0.55)',
      }}
    >
      <motion.div
        initial={{ scale: 0.96, opacity: 0, y: 10 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.96, opacity: 0, y: 10 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-3xl h-[85vh] overflow-hidden shadow-2xl flex flex-col"
        style={{
          borderRadius: 20,
          background: '#18181B',
          border: '1px solid #27272A',
        }}
      >
        <div
          className="flex items-center justify-between px-5 py-4 shrink-0"
          style={{
            borderBottom: '1px solid #27272A',
            background: '#18181B',
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center shrink-0"
              style={{
                width: 40,
                height: 40,
                borderRadius: 16,
                background: '#2B5E5E',
              }}
            >
              {title.includes('隐私') ? (
                <ShieldCheck size={22} style={{ color: '#FFFFFF' }} />
              ) : (
                <FileText size={22} style={{ color: '#FFFFFF' }} />
              )}
            </div>
            <h2
              style={{
                fontFamily: '"Noto Serif SC", "Songti SC", serif',
                fontWeight: 700,
                fontSize: 18,
                letterSpacing: '-0.1px',
                color: '#EADBC3',
                margin: 0,
              }}
            >
              {title}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="关闭"
            className="flex items-center justify-center shrink-0 active:scale-90 transition-transform"
            style={{
              width: 36,
              height: 36,
              borderRadius: 999,
              background: '#27272A',
              color: '#CBD5E1',
              border: 'none',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget.style.background = '#3F3F46'))
            }
            onMouseLeave={(e) =>
              ((e.currentTarget.style.background = '#27272A'))
            }
          >
            <X size={20} />
          </button>
        </div>

        <div
          className="flex-1 overflow-y-auto"
          style={{
            ...DOT_PAPER_BG,
            padding: '48px 40px',
          }}
        >
          {content}
        </div>
      </motion.div>
    </div>
  );
};

/* ================ 4. 启动时隐私同意流程 ================ */
export interface PrivacyConsentFlowProps {
  onAccept: () => void;
  onDecline?: () => void;
  theme: 'light' | 'dark';
}
export const PrivacyConsentFlow: React.FC<PrivacyConsentFlowProps> = ({
  onAccept,
  onDecline,
}) => {
  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const [showAgreement, setShowAgreement] = useState<null | 'user' | 'privacy'>(null);

  const handleDeclineCancel = () => setShowDeclineModal(false);
  const handleDeclineConfirm = () => {
    setShowDeclineModal(false);
    onDecline?.();
  };

  return (
    <AnimatePresence>
      <div key="privacy-consent-root" className="fixed inset-0 z-[60]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 backdrop-blur-md"
          style={{
            backgroundColor: 'rgba(0,0,0,0.62)',
          }}
        />

        <div className="absolute inset-0 flex items-center justify-center p-4">
          <motion.div
            key="privacy-consent-card"
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-sm max-h-[82vh] overflow-y-auto shadow-2xl border backdrop-blur-md flex flex-col"
            style={{
              borderRadius: 28,
              background: '#18181B',
              borderColor: '#27272A',
              color: '#CBD5E1',
            }}
          >
            <div className="p-6 space-y-6">
              <div className="flex flex-col items-center text-center space-y-2 pt-2">
                <div
                  className="flex items-center justify-center mb-2 shadow-md"
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 16,
                    background: '#D4A373',
                    color: '#0F0F0F',
                  }}
                >
                  <span
                    style={{
                      fontFamily: '"Noto Serif SC", serif',
                      fontWeight: 700,
                      fontSize: 24,
                    }}
                  >
                    知
                  </span>
                </div>
                <h3
                  style={{
                    fontFamily: '"Noto Serif SC", serif',
                    fontWeight: 700,
                    fontSize: 20,
                    color: '#EADBC3',
                    margin: 0,
                    textAlign: 'center',
                  }}
                >
                  用户协议与隐私政策
                </h3>
                <p style={{ fontSize: 11, color: '#A3998E', letterSpacing: 0.4, margin: 0 }}>
                  请您在使用「知了城市」前仔细阅读
                </p>
              </div>

              <div className="space-y-3">
                <p style={{ fontSize: 14, lineHeight: 1.75, color: '#CBD5E1', margin: 0 }}>
                  （1）《<strong style={{ color: '#E2E8F0', fontWeight: 600 }}>隐私政策</strong>》中关于
                  <strong style={{ color: '#E2E8F0', fontWeight: 600 }}>足迹与收藏数据的本地存储方式</strong>
                  、以及
                  <strong style={{ color: '#E2E8F0', fontWeight: 600 }}>设备显示适配信息（临时内存）</strong>
                  处理说明。
                </p>
                <p style={{ fontSize: 14, lineHeight: 1.75, color: '#CBD5E1', margin: 0 }}>
                  （2）《<strong style={{ color: '#E2E8F0', fontWeight: 600 }}>隐私政策</strong>》中
                  <strong style={{ color: '#E2E8F0', fontWeight: 600 }}>无云端收集 / 无第三方 SDK / 无广告</strong>
                  的运营承诺与共享、转让、公开披露规则说明。
                </p>
              </div>

              <div
                className="space-y-2"
                style={{
                  padding: 16,
                  borderRadius: 12,
                  background: '#27272A',
                  border: '1px solid #27272A',
                  color: '#CBD5E1',
                }}
              >
                <p
                  style={{
                    fontSize: 11,
                    fontWeight: 500,
                    letterSpacing: 1,
                    textTransform: 'uppercase',
                    color: '#A3998E',
                    margin: 0,
                  }}
                >
                  用户协议和隐私政策说明：
                </p>
                <p style={{ fontSize: 14, lineHeight: 1.75, margin: 0 }}>
                  阅读完整的
                  <span
                    onClick={() => setShowAgreement('user')}
                    style={{
                      margin: '0 4px',
                      cursor: 'pointer',
                      fontWeight: 500,
                      color: '#D4A373',
                    }}
                    onMouseEnter={(e) => ((e.currentTarget.style.textDecoration = 'underline'))}
                    onMouseLeave={(e) => ((e.currentTarget.style.textDecoration = 'none'))}
                  >
                    《用户服务协议》
                  </span>
                  和
                  <span
                    onClick={() => setShowAgreement('privacy')}
                    style={{
                      margin: '0 4px',
                      cursor: 'pointer',
                      fontWeight: 500,
                      color: '#D4A373',
                    }}
                    onMouseEnter={(e) => ((e.currentTarget.style.textDecoration = 'underline'))}
                    onMouseLeave={(e) => ((e.currentTarget.style.textDecoration = 'none'))}
                  >
                    《隐私政策》
                  </span>
                  了解详细内容。
                </p>
              </div>
            </div>

            <div className="flex" style={{ borderTop: '1px solid #27272A' }}>
              <button
                onClick={() => setShowDeclineModal(true)}
                className="flex-1 py-4 text-base font-medium transition-colors"
                style={{
                  color: '#CBD5E1',
                  background: '#18181B',
                  border: 'none',
                  borderRight: '1px solid #27272A',
                  cursor: 'pointer',
                  borderRadius: '0 0 0 28px',
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget.style.background = 'rgba(63,63,70,0.4)'))
                }
                onMouseLeave={(e) => ((e.currentTarget.style.background = '#18181B'))}
              >
                不同意
              </button>
              <button
                onClick={onAccept}
                className="flex-1 py-4 text-base font-medium transition-colors"
                style={{
                  background: '#2B5E5E',
                  color: '#FFFFFF',
                  border: 'none',
                  cursor: 'pointer',
                  borderRadius: '0 0 28px 0',
                }}
                onMouseEnter={(e) => ((e.currentTarget.style.background = '#234D4D'))}
                onMouseLeave={(e) => ((e.currentTarget.style.background = '#2B5E5E'))}
              >
                同意并继续
              </button>
            </div>
          </motion.div>
        </div>

        {/* 4.2 拒绝二次确认 */}
        <AnimatePresence>
          {showDeclineModal && (
            <div className="absolute inset-0 z-10 flex items-center justify-center p-4">
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-md overflow-hidden shadow-2xl flex flex-col"
                style={{
                  borderRadius: 28,
                  background: '#18181B',
                  border: '1px solid #27272A',
                  color: '#CBD5E1',
                }}
              >
                <div className="p-6 space-y-3">
                  <h2
                    style={{
                      fontFamily: '"Noto Serif SC", serif',
                      fontWeight: 700,
                      fontSize: 20,
                      margin: 0,
                      color: '#EADBC3',
                    }}
                  >
                    确认拒绝
                  </h2>
                  <p style={{ fontSize: 14, lineHeight: 1.75, color: '#94A3B8', margin: 0 }}>
                    您确定要拒绝《用户服务协议》与《隐私政策》吗？
                    <br />
                    <strong style={{ color: '#E2E8F0', fontWeight: 600 }}>
                      拒绝后将无法进入并使用「知了城市」的全部服务
                    </strong>
                    ，您可随时再次打开本弹窗选择同意。
                  </p>
                </div>
                <div className="flex" style={{ borderTop: '1px solid #27272A' }}>
                  <button
                    onClick={handleDeclineCancel}
                    className="flex-1 py-4 text-center font-medium transition-colors"
                    style={{
                      color: '#CBD5E1',
                      background: '#18181B',
                      border: 'none',
                      borderRight: '1px solid #27272A',
                      cursor: 'pointer',
                      borderRadius: '0 0 0 28px',
                    }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget.style.background = 'rgba(63,63,70,0.4)'))
                    }
                    onMouseLeave={(e) => ((e.currentTarget.style.background = '#18181B'))}
                  >
                    取消
                  </button>
                  <button
                    onClick={handleDeclineConfirm}
                    className="flex-1 py-4 text-center font-medium transition-colors"
                    style={{
                      color: '#D4A373',
                      background: '#18181B',
                      border: 'none',
                      cursor: 'pointer',
                      borderRadius: '0 0 28px 0',
                    }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget.style.background = 'rgba(63,63,70,0.4)'))
                    }
                    onMouseLeave={(e) => ((e.currentTarget.style.background = '#18181B'))}
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
              theme="dark"
            />
          )}
          {showAgreement === 'privacy' && (
            <AgreementModal
              title="隐私政策"
              content={<PrivacyPolicyContent />}
              onClose={() => setShowAgreement(null)}
              theme="dark"
            />
          )}
        </AnimatePresence>
      </div>
    </AnimatePresence>
  );
};

export default PrivacyConsentFlow;
