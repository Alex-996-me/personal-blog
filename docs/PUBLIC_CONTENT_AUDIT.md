# Public Content Audit

审计日期：2026-09-16。范围：47 篇 posts、28 条 moments、39 条 inspirations；逐篇阅读正文与元数据，并查看全部 Life 首图的联系表。判定是对当前成稿的编辑建议，不是替作者决定永久价值。本阶段仅改公开状态与精选字段，未改写正文、未合并、未删除内容。

## Public Philosophy

N=1 Lab 采用 Essays + Life 杠铃结构：一端是经生活与实践形成、编辑后愿意长期留下的判断与综合；另一端是照片、普通日子、吃饭和小故事。中间的学习笔记、碎片、临时信念和未成熟的想法留在私人系统。

> The blog is not where thinking happens. The blog is where selected results of thinking are published.

Life 不需要证明思想深度；没有配文的照片仍可以成立。同为海鲜饭并不等于重复。站点不需要展现作者思考的每个阶段，也不需要填满每个分类。

本地实施：KEEP Essays 才保留 published；其余原已公开文章暂设 archive，原 URL 仅呈现不含标题、正文或媒体引用的 noindex 提示。这样先停止公开，再由作者决定修订、合并或私人迁移。审计 action 与技术 status 是两个维度，DEMOTE_PRIVATE 不表示已移入 Obsidian。archive 也不是可公开浏览的历史正文库。

状态隐藏不等于保密：源文件仍在仓库，旧 Git 历史、外部缓存、既有订阅副本不会被回收；public 下的原媒体仍可经直接 URL 访问。本阶段不迁移、不删除这些资产，也不宣称它们已私有化。

## Essay Audit

动作定义：KEEP＝当前可公开；REFINE＝有中心想法，修订后再公开；MERGE＝进入更强的 canonical Essay；DEMOTE_PRIVATE＝有私人使用价值；ARCHIVE＝有历史价值但不代表当前站点；DELETE_CANDIDATE＝长期独特价值不足，仅提名。

yes/no 依次判断当前文章中是否有个人判断、2–3 年后是否仍有意义、是否区别于通用信息、是否足以代表作者。yes 不自动等于 KEEP；论证完整性、事实边界和文体也必须过关。健康、科学和政治类没有进行外部事实核查，表中的缺口不能视作已经验证。

| filename | title | date | category | 一句话 thesis | 个人判断 | 2–3 年耐久 | 区别于通用信息 | 代表作者 | action | 依据 / 下一步 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 2026-08-28-discipline-freedom.md | 2026/8/28-自律如何通向自由：让行动先于动机 | 2026-08-28 | 自学 | 自律通过让行动先于动机来保护长期自由。 | yes | yes | yes | yes | ARCHIVE | 主体是 Durov 访谈和语言练习；保留与父母冲突后主动沟通的个人段落，未来可单独写生活故事。 |
| 2026-08-30-ketones-insulin-muscle.md | 2026/8/30-酮体、胰岛素和肌肉维持：真相并不像你想的那样 | 2026-08-30 | 自学 | 理解低碳与肌肉维持需要区分合成、保存及不同代谢路径。 | no | yes | no | no | DEMOTE_PRIVATE | 以 Bikman 讲座和词汇练习为主；购物延迟的个人反思与主题分离，暂不作为独立 Essay。 |
| 2026-09-01-creatine-energy-brain-metabolism.md | 2026/9/1-肌酸不只是增肌补剂：从ATP到大脑与代谢 | 2026-09-01 | 自学 | 肌酸应按快速能量缓冲系统理解，不同用途的证据强度不同。 | no | yes | no | no | DEMOTE_PRIVATE | 主要为讲座摘要、发音练习和自我鼓励反思，尚无作者独立的证据综合。 |
| 2026-09-02-exercise-beyond-the-scale.md | 2026/9/2-别只盯着体重秤：Exercise Beyond the Scale | 2026-09-02 | 自学 | 体重不能独自代表训练进步，应同时观察力量、恢复与生活能力。 | yes | yes | yes | yes | ARCHIVE | 自己的跑步和壶铃体验值得保留，但完整听写、纠错和朗读流程属于学习历史，不代表成熟 Essay。 |
| about-sugar.md | 关于糖——心得体会 | 2026-05-19 | 健康 | 我的睡眠与训练反馈促使我放弃严格生酮，重新安排碳水。 | yes | yes | yes | yes | MERGE | 保留凌晨心悸、回调饮食的转折；与饮食实验合并。删去无充分出处的淀粉、激素及食物优劣泛化。 |
| attention-control.md | 注意力被收割的时代，怎么重新拿回控制权 | 2026-05-23 | 体悟 | 主动选择信息并恢复低刺激生活，才能把注意力交还给自己的生活。 | yes | yes | yes | yes | KEEP | 有读不完纸书的自省、母亲递奶糖的记忆、具体行为改变，论点完整；后续可补电击研究原始出处，但不依赖该例支撑核心判断。 |
| banana-pre-workout.md | 一根香蕉引发的思考：为什么要把香蕉放在训练前15分钟吃？ | 2026-05-26 | 训练 | 低碳训练者应以实际训练反馈调整碳水，而非迷信固定进食窗口。 | yes | yes | yes | yes | MERGE | 图书馆吃香蕉是具体起点；并入饮食回调经历。去掉 AI 最完美窗口与现金存款类比对生理机制的过度推导。 |
| bench-press.md | 卧推 | 2026-06-20 | 训练 | 卧推视频先留作回看，握距和发力复盘仍待补充。 | no | no | no | no | DEMOTE_PRIVATE | 明确是占位页，不是完成的论证；保留训练视频和未完成提示。 |
| blind-reading-is-self-harm.md | 盲目阅读是隐性自残，真学习要靠主动加工 | 2026-07-04 | 体悟 | 阅读只有转化成主动理解与自我设计的练习才可能内化。 | no | yes | no | no | MERGE | 主要复述 Why books don’t work；并入阅读实践，保留主动学习问题，去掉自残式标题和全称断言。 |
| book_reading.md | 关于读书 | 2026-06-15 | 体悟 | 读书的价值在于能否改变行动，而非数量、榜单或摘抄。 | yes | yes | yes | yes | MERGE | 有明确偏好和踩坑，但大量规则重复且过度泛化；保留不再照搬书单的经历，合并成阅读如何进入行动。 |
| cli_learning.md | CLI学习笔记 | 2026-08-26 | 工具 | 用 CLI、Git、Prompt 和 Skill 组织自己的开发学习流程。 | no | no | yes | no | DEMOTE_PRIVATE | 命令速查和持续学习日志有私人用途，尚未形成工具使用的成熟判断。 |
| conventional-deadlift.md | 传统硬拉 | 2026-06-20 | 训练 | 传统硬拉视频先保留，起拉与锁定的复盘尚未完成。 | no | no | no | no | DEMOTE_PRIVATE | 明确占位页，保留本地视频，不公开未写完的训练笔记。 |
| diet-experiment.md | 饮食框架 | 2026-04-20 | 健康 | 我的饮食方案应根据睡眠、训练和体检反馈持续修正。 | yes | yes | yes | yes | REFINE | 有独特体检序列和具体实践，值得重写；目前食谱、机制、风险解释和观测混杂，缺少清楚结论。ApoB 等记录保留；脑能量、反营养素及风险指标论断需逐项核证。 |
| from-scarcity-to-slack.md | 从稀缺到余闲：不把自己塞满的智慧 | 2026-06-29 | 体悟 | 余闲是抵御稀缺与短视的缓冲，应把重要行动提前纳入生活。 | yes | yes | yes | yes | KEEP | 对《稀缺》的持续综合形成明确个人选择：交付边界、预先安排和最多三项任务；有完整起承转合。神经与自控力解释仍宜进一步注明来源边界。 |
| front-squat.md | 壶铃前蹲 | 2026-06-28 | 训练 | 双壶铃前蹲要稳定前架位并让髋肩同步起身。 | no | yes | no | no | DEMOTE_PRIVATE | 动作 cue、步骤和视频收藏，适合个人训练资料，不是 Essay。 |
| game-theory-periphery.md | 博弈论：边缘地带的崛起 | 2026-06-08 | 体悟 | 资源受限的边缘群体可能借助凝聚力、开放与试错获得优势。 | no | no | no | no | DELETE_CANDIDATE | 简短视频摘记且存在以色列属于二战战败国的明显事实错误；留存文件等待作者决定，不以当前形态恢复公开。 |
| governance.md | 统治的底牌 | 2026-07-28 | 体悟 | 统治依赖制胜联盟、组织服从和共同叙事，不能只用暴力解释。 | yes | yes | yes | no | REFINE | 综合结构完整，但缺少与 Olson、选择人理论、Arendt、Scott 等具体出处的对应；历史与制度概括需要边界。补证与作者自身判断后再公开。 |
| high-pull.md | 高翻 | 2026-06-28 | 训练 | 壶铃高翻应以髋驱动、贴身轨迹和稳定前架接铃。 | no | yes | no | no | DEMOTE_PRIVATE | 实际讲 Clean，高翻与 High Pull 名称需核对；动作资料私人保留。 |
| kettlebell-action-dictionary.md | 壶铃动作字典 | 2026-08-30 | 训练 | 按前置能力而非动作炫目程度组织壶铃进阶。 | yes | yes | no | no | DEMOTE_PRIVATE | 有整理价值，但主体是百科式操作手册，缺少作者反复实践后的结论；不因篇幅大就占据 Essays。 |
| kettlebell-military-press.md | 军推 | 2026-06-20 | 训练 | 壶铃军推需要稳定底座、肩胛上回旋与受控下放。 | no | yes | no | no | DEMOTE_PRIVATE | 训练现场 cue 和视频资料；保留私人使用。 |
| mental-models-and-judgment.md | 关于多元心智模型：跨领域学习，判断就更准？ | 2026-07-14 | 体悟 | 模型只有在具体情境中改变行动并接受反馈，才真正成为判断力。 | yes | yes | yes | yes | KEEP | 被骗五千元构成独特且有代价的经历，贯穿理论、风险边界和行动转化；最能代表实践优先的作者立场。 |
| microwave-eggs.md | 如何用微波炉烹饪鸡蛋？ | 2026-06-07 | 健康 | 几天调试微波炉鸡蛋让我体会到烹饪依赖实践中的默会知识。 | yes | yes | yes | yes | ARCHIVE | 有生活温度，但当前是逐日实验过程而非成熟 Essay；未来可选最终照片与小故事进入 Life，先核对容器和食物安全表述，不自动迁移。 |
| personal-text-filter-prompt.md | 我的个人文本筛选提示词 | 2026-07-06 | 工具 | 把信息筛选前置，减少无效阅读对注意力的稀释。 | yes | yes | yes | yes | MERGE | 完整 prompt 是工具资料；保留选择标准的权衡，合入注意力文章，删去大段重复偏好和可复制模板。 |
| public-speaking-techniques.md | 当中说话的技巧 | 2026-06-30 | 体悟 | 表达应以自己的语言、有根据且有边界地说清楚。 | no | yes | no | no | DEMOTE_PRIVATE | 16 条提醒没有作者场景、失败或验证记录；作为私人复习卡。 |
| punching_diary_8_11.md | 拳击训练日记（1）：动力链，摆拳转体和移动 | 2026-08-11 | 训练 | 拳击发力要从脚、髋到拳形成连续动力链。 | no | yes | yes | no | MERGE | 贡献手臂抢先发力和教练纠错的起点；合并成学会身体协调的阶段复盘，删重复课后作业。 |
| punching_diary_8_13.md | 拳击训练日记（2）：网球步伐、驱动与制动、重心控制 | 2026-08-13 | 训练 | 拳击中驱动与制动必须配合，力量才能稳定传递。 | no | yes | yes | no | MERGE | 贡献拧毛巾的体验、网球步伐和制动理解；教练意见应标注适用阶段。 |
| punching_diary_8_16.md | 拳击训练日记（3）：投掷转髋、后手回防与下肢神经连接 | 2026-08-16 | 训练 | 知道转髋不等于能自动转髋，需要在任务中建立动作连接。 | no | yes | yes | no | MERGE | 贡献药球到空击的迁移、后手预拉问题和训练录像；与前后课形成变化线索。 |
| punching_diary_8_18.md | 拳击训练日记（4）：轻盈步伐、重心居中与水流式发力 | 2026-08-18 | 训练 | 沙袋的响声与位移不能代替对协调、重心和击打质量的判断。 | yes | yes | yes | yes | MERGE | 贡献推沙袋的错误反馈和站架宽度问题；需要补后续改善结果，不能把四节课拼成手册即算 Essay。 |
| relationship-career-cognition.md | 两性经济学、择业和内卷、认知红利 | 2026-07-25 | 世界 | 婚恋与职业选择可从代价、门槛和稀缺性理解。 | no | no | no | no | DEMOTE_PRIVATE | 不同主题的短视频摘记与截图拼接；彩礼和认知红利的概括缺少论证。 |
| sfg-hardstyle-01-foundations-and-kettlebell-basics.md | SFG / HARDSTYLE 个人训练手册 I｜基础原则与壶铃基础 | 2026-08-10 | 训练 | 日常力量训练应作为可恢复的高质量练习，而非反复测试极限。 | yes | yes | no | no | MERGE | 贡献 Practice / Feat / Lift 区分；留作训练哲学的来源，不保留整套教学章节。 |
| sfg-hardstyle-02-kettlebell-progressions-and-barbell.md | SFG / HARDSTYLE 个人训练手册 II｜壶铃进阶与杠铃补充 | 2026-08-29 | 训练 | 训练工具与进阶方式应服务任务，一次只增加一个主要变量。 | yes | yes | no | no | MERGE | 贡献壶铃、杠铃的任务分工；去掉动作教程、模板和重叠图示。 |
| sfg-hardstyle-03-periodization-and-bodyweight.md | SFG / HARDSTYLE 个人训练手册 III｜周期化与相对力量 | 2026-08-29 | 训练 | 训练安排应保护主项恢复预算，并用记录支持周期调整。 | yes | yes | yes | yes | MERGE | 拳击优先和一次改一个变量有整合价值；保留实际执行证据的缺口，删自重进阶大全。 |
| sfg-hardstyle-04-applied-strength-systems.md | SFG / HARDSTYLE 个人训练手册 IV｜应用训练系统 | 2026-08-29 | 训练 | 条件变化时用最小可持续剂量保住服务生活的身体能力。 | yes | yes | no | no | MERGE | 贡献装备受限与恢复的边界；多套协议未见作者实测，不能自动升级为经验结论。 |
| sfg-level-1-six-movements.md | SFG 一级六大动作 | 2026-06-20 | 训练 | SFG 一级六动作视频作为后续拆解的总览。 | no | no | no | no | DEMOTE_PRIVATE | 总览占位页，无作者论证；私人保存。 |
| snatch.md | 抓举 | 2026-06-28 | 训练 | 抓举应由髋启动、肘引导，并在贴身轨迹中穿手接铃。 | no | yes | no | no | DEMOTE_PRIVATE | 动作口诀和教学资料，不是完成的个人实验总结。 |
| something-bigger-than-me.md | 寻找 something bigger than me | 2026-04-05 | 体悟 | 比即时得失更大的长期方向能帮助我穿过没有答案的阶段。 | yes | yes | no | yes | DEMOTE_PRIVATE | 作者明确仍未找到那个方向，是正在加工的问题；保留私人探索。 |
| sophomore-confusion.md | 大二阶段的迷茫 | 2026-04-28 | 日志 | 把迷茫拆成投入记录、能量观察和有限试错，才能看清冲突。 | yes | yes | yes | yes | ARCHIVE | 真实阶段性自述但很短，尚未形成经反复验证的判断；可由作者以后选择作为大学生活故事。 |
| squat.md | 深蹲 | 2026-06-20 | 训练 | 深蹲视频供回看，站距、深度与节奏的训练体会待补。 | no | no | no | no | DEMOTE_PRIVATE | 占位页，不因已有 URL 就继续作为 Essay。 |
| standing-strict-press.md | 站姿推举（实力推） | 2026-06-20 | 训练 | 站姿推举视频供回看，路径与身体稳定的复盘待补。 | no | no | no | no | DEMOTE_PRIVATE | 占位页，源视频保留。 |
| supplements.md | 补给指南 | 2026-05-12 | 健康 | 补剂应回应明确缺口，而不是用消费代替饮食与训练。 | yes | yes | no | yes | REFINE | 个人剂量记录有价值，但把补充建议外推到大众且缺少证据分级；需要重写选择与放弃的过程，核查剂量和适用人群。 |
| swing.md | 摆荡 | 2026-06-28 | 训练 | 摆荡的基础是髋铰链、呼吸节奏和全身张力。 | no | yes | no | no | DEMOTE_PRIVATE | 动作速查与视频集合，留在私人训练资料。 |
| tacit-knowledge.md | 为什么读了那么多方法论、看了那么多书，你还是在原地踏步？ | 2026-07-05 | 体悟 | 学习高手的情境识别与决策过程，比记住其结论更能形成能力。 | yes | yes | yes | yes | REFINE | 脑电、编程和壶铃例子有作者特色；开头仍是阅读任务说明，PRD/RPD 命名需核查，第二人称讲课腔应回到自身经验。 |
| training-philosophy.md | 分享训练哲学 | 2026-06-19 | 训练 | 训练应提高生活能力并保持可持续，而非追求疲劳、块头和人设。 | yes | yes | yes | yes | REFINE | 转变有个人意义，但乳酸、酸痛、力竭和固定器械的论断过强；先纠正机制并补自己的长期执行结果。 |
| turkish-get-up.md | 土耳其起立 | 2026-06-20 | 训练 | 土耳其起立应按节点建立控制，而非追求速度或重量。 | no | yes | no | no | DEMOTE_PRIVATE | 分段动作指南与视频；私人保留。 |
| why-eat-organs.md | 为什么吃内脏 | 2026-05-31 | 健康 | 少量动物内脏可以成为我重视营养密度的饮食选择。 | yes | yes | no | no | MERGE | 保留新加坡猪腰汤与个人选择；整合进饮食反思，核对营养及剂量，去掉扔掉补剂等无边界建议。 |
| why-i-like-kettlebells.md | 我为什么喜欢壶铃训练 | 2026-04-13 | 训练 | 壶铃让我在力量、控制和专注之间找到愿意反复练习的形式。 | yes | yes | yes | yes | MERGE | 很短但有个人偏好，适合成为训练哲学的生活切口，不独立占一个 Essay。 |
| why-i-want-a-blog.md | 为什么我想建一个个人博客 | 2026-05-05 | 日志 | 我曾希望用博客容纳阶段迷茫、摘记和持续表达。 | yes | yes | yes | yes | ARCHIVE | 有建站历史价值，但其公开思考过程的定位与本阶段决定冲突；保留为历史文本。 |

计数：KEEP 3 / REFINE 5 / MERGE 15 / DEMOTE_PRIVATE 18 / ARCHIVE 5 / DELETE_CANDIDATE 1。

## Life Audit

动作定义：KEEP / REFINE_PRESENTATION / ARCHIVE / DELETE_CANDIDATE。只判断人的存在、记忆、照片表现与冗余；REFINE_PRESENTATION 可以继续公开，不要求添写人生教训。没有推断照片中人物、拍摄日期或原文未提供的经历。集中在同一天的日期保持原值，不能视为已核对的旅行日期。

| filename | title | date | action | 依据 |
| --- | --- | --- | --- | --- |
| aoshen-fish-market.md | 澳深鱼市 | 2026-07-25 | KEEP | 大学记忆与反复想念的海鲜饭，图片和个人吃法共同构成记忆。 |
| benbenlao-hotpot.md | 犇犇捞牛肉火锅 | 2026-07-28 | KEEP | 营口牛肉火锅的照片和不到百元吃四盘肉的愉快感受足够成立。 |
| cambridge-aromi-pizza.md | 剑桥-AROMI 披萨店 | 2026-08-02 | KEEP | 剑桥披萨旅行照片有明确地点与食物细节，不要求额外感悟。 |
| chuo-city-sashimi-rice.md | 驻地市场-Chuo City 的刺身饭 | 2026-08-02 | KEEP | 东京市场的刺身饭留下一餐的形状与色彩；地点标题日后可核对，不虚构行程。 |
| duizhao.md | 对照料理 | 2026-08-11 | KEEP | 欢迎牌、师傅介绍与竹荚鱼的口感，是可辨认的一次用餐经历。 |
| ginza-bills-eggs.md | 三文鱼菠菜牛油果班尼蛋-银座 bills | 2026-08-02 | KEEP | 银座早餐的明亮画面，与海鲜饭记录有明确差别。 |
| ginza-street-ramen.md | 银座-街头拉面 | 2026-08-02 | KEEP | 两碗拉面和小菜是一顿具体的街头用餐，不需要提升为观点。 |
| ginza-tongue-set.md | 银座-牛舌定食 | 2026-08-02 | REFINE_PRESENTATION | 牛舌定食值得保留；首图方向横转，后续调整展示方向，不补写故事。 |
| jiugedong.md | 九割丼 | 2026-08-23 | KEEP | 肥美鱼腩与中规中矩寿司的轻松评价，保留个人口味。 |
| laoju-lamb-noodles.md | 佬居羊肉面-白切羊肉+羊杂拼盘 | 2026-08-02 | KEEP | 白切羊肉和羊杂有独立食物主题，不与日料记录重复。 |
| leicester-steak.md | 英国莱斯特-牛排 | 2026-08-02 | KEEP | 莱斯特的一盘牛排，地点和照片足以保留留学日常。 |
| lianshenghe-yellow-croaker.md | 大黄鱼（涟生荷） | 2026-08-02 | DELETE_CANDIDATE | 只有标题和地点，图片、正文、描述均为空；先收起，待确认是否有遗失照片。 |
| little-red-hood-sandwich.md | 小红帽三明治 | 2026-08-02 | KEEP | 郑州三明治照片有鲜明层次与餐桌背景。 |
| london-breakfast.md | 伦敦英式早餐 | 2026-08-02 | KEEP | 英式早餐照片保留伦敦旅行的普通一餐。 |
| manlai-sukiyaki.md | 满来寿喜烧 | 2026-08-02 | KEEP | 寿喜烧的生肉拼盘与配菜画面区别于日料丼饭。 |
| maoshe.md | 山猫舍-海鲜丼 | 2026-08-15 | KEEP | 88 元琉球丼、鰤鱼与海苔的描述有具体个人体验。 |
| ningyocho-imahan.md | 人形町今半 | 2026-08-02 | REFINE_PRESENTATION | 五张照片是一组用餐记忆；当前首图仅蔬菜，后续选更能代表整餐的封面。 |
| ofuna-fukufuku.md | 大船日料-鱼福 | 2026-08-02 | KEEP | 寿司拼盘和四张照片保留大船日料的一餐，不强加深刻性。 |
| ohashi.md | お箸 | 2026-07-25 | KEEP | 大卷、鱼腩和吃法偏好具体，与其他店的评价可区分。 |
| sushi-yundan.md | 鮨云丹散寿司 | 2026-08-02 | KEEP | 单张散寿司照片仍可独立作为生活记忆。 |
| tianxi-seafood-rice.md | 天喜海鲜饭 | 2026-07-25 | KEEP | 觉得口味割裂、可能不再去的真实反馈，有别于统一推荐口吻。 |
| wagas-shanghai.md | WAGAS | 2026-08-02 | KEEP | 沙拉与三张日常餐食照片带来不同于海鲜饭的视觉内容。 |
| wuji-lamb-soup.md | 吴记羊汤 | 2026-07-28 | KEEP | 羊汤与羊排的具体口味偏好，让家乡用餐有个人温度。 |
| xujia-duck.md | 徐家鸭子 | 2026-07-28 | KEEP | 对鸭皮和鸭肉不同的感受具体且诚实，不必改成美食推荐。 |
| yixin-restaurant.md | 一心料理 | 2026-08-02 | KEEP | 郑州料理的五张照片记录另一顿饭，不因同为日料就判断冗余。 |
| yixing.md | 一幸 | 2026-07-28 | KEEP | 与お箸的口味比较和自己捏手握的细节，区分了相似题材。 |
| yoshinoya-tokyo.md | 东京-吉野家 | 2026-08-02 | KEEP | 普通连锁店的牛肉饭也属于东京生活，无须昂贵或特别。 |
| zhihe.md | 炙和烧肉-午市海鲜饭 | 2026-08-12 | KEEP | 和姐姐共进午餐这一句已经带来人际关系与生活温度。 |

计数：KEEP 25 / REFINE_PRESENTATION 2 / ARCHIVE 0 / DELETE_CANDIDATE 1。

## Inspirations Audit

动作定义：PRIVATE_KEEP / PROMOTE_TO_ESSAY / MOVE_TO_LIFE / ARCHIVE / DELETE_CANDIDATE。39 条都属于极短命题、提醒或暂时判断，没有一条已有足够独立材料直接晋升；也没有一条提供足够具体的生活场景，不能因 theme 为生活就自动迁移。全部先设 archive 并退出公开集合；PRIVATE_KEEP 是未来导出到私人系统的建议。

| filename | title | date | action | 依据 |
| --- | --- | --- | --- | --- |
| 01-about-brain.md | 大脑 | 2026-07-23 | PRIVATE_KEEP | 预测机器是机制速记，尚无自己的例子或论证。 |
| 02-about-knowledge.md | 知识结构 | 2026-07-23 | PRIVATE_KEEP | 知识网络结构的短语，保留作阅读提示。 |
| 03-about-doing.md | 高效学习 | 2026-07-23 | PRIVATE_KEEP | 输出倒逼输入是工作提示，尚无实践结果。 |
| 04-about-fate.md | 工作 | 2026-07-23 | PRIVATE_KEEP | 外包与可逆试错可作为判断文章的私人素材。 |
| 05-about-information.md | 复利 | 2026-07-23 | DELETE_CANDIDATE | 复利可以改变一切过于泛化，没有独特材料。 |
| 06-about-social.md | 伟大 | 2026-07-23 | PRIVATE_KEEP | 贪心算法与偶得的类比仍待定义。 |
| 07-about-ability.md | 聪愚 | 2026-07-23 | PRIVATE_KEEP | 贪小便宜的提醒可回接被骗经历，不单独公开。 |
| 08-about-life.md | 信息源 | 2026-07-23 | PRIVATE_KEEP | 信息源多样性是一条筛选提醒。 |
| 09-about-self.md | 做决策 | 2026-07-23 | PRIVATE_KEEP | 慢反应与低价值外包属于决策清单。 |
| 10-about-cognition.md | 信息价值 | 2026-07-23 | PRIVATE_KEEP | 行动检验信念的判断已在心智模型文章展开，避免重复。 |
| 11-full-rank.md | 余闲和满秩 | 2026-07-23 | PRIVATE_KEEP | 余闲与满秩的数学类比有潜力但未展开，不能直接晋升。 |
| 12-about-interest-and-evil.md | 善恶的本质 | 2026-07-23 | PRIVATE_KEEP | 价值与事实区分是概念卡。 |
| 13-low-status-signal.md | 低地位信号 | 2026-07-23 | PRIVATE_KEEP | 低地位信号是无语境的概括，需要反例和边界。 |
| 14-delayed-speaking.md | 延迟发言 | 2026-07-23 | PRIVATE_KEEP | 延迟发言与地位的关系只有结论，没有证据。 |
| 15-social-network.md | 社交网络 | 2026-07-23 | PRIVATE_KEEP | 弱连接与差异化属于社会网络阅读提示。 |
| 16-metacognition.md | 元认知 | 2026-07-23 | PRIVATE_KEEP | 元认知调方向的比喻可辅助学习反思。 |
| 17-viewpoints-and-cognition.md | 观点和认知 | 2026-07-23 | PRIVATE_KEEP | 好观点的条件是个人审稿提醒。 |
| 18-happiness-essence.md | 幸福的实质 | 2026-07-23 | PRIVATE_KEEP | 幸福不可量化是未展开的立场。 |
| 19-happiness-practice.md | 怎样幸福 | 2026-07-23 | PRIVATE_KEEP | 避免痛苦与创造意义仍需具体生活语境。 |
| 20-self-identity.md | 自我认同 | 2026-07-23 | PRIVATE_KEEP | 自我认同的来源是概念总结。 |
| 21-life-meaning.md | 人生意义 | 2026-07-23 | PRIVATE_KEEP | 意义是动词可作为私人写作种子。 |
| 22.about_freedom.md | 无意义 | 2026-07-31 | PRIVATE_KEEP | 绝对意义与自由的关系仍是哲学片段。 |
| 23_power_of_power.md | 权力 | 2026-07-31 | PRIVATE_KEEP | 权力高于一切的断言缺少制度边界，不作为公共结论。 |
| 24.manage_time.md | 管理时间 | 2026-08-12 | PRIVATE_KEEP | 主动留时间已在余闲文章展开。 |
| 25-help_others.md | 画板策略 | 2026-08-12 | PRIVATE_KEEP | 画板策略需要实际帮助他人的经历再判断。 |
| 26-barbell_theory.md | 杠铃原则 | 2026-08-12 | PRIVATE_KEEP | 全部投入或拒绝不能覆盖所有决策，先保留私人思考。 |
| 27-time_block.md | 时间块 | 2026-08-12 | PRIVATE_KEEP | 完整时间块是工作偏好，不应绝对化碎片时间的价值。 |
| 28. AI_risk.md | AI困局 | 2026-08-14 | ARCHIVE | AI 必然推动进步的阶段信念缺少论证，保存为旧观点。 |
| 29.cheap_item.md | 便宜货 | 2026-08-14 | PRIVATE_KEEP | 便宜货的隐性成本需要一次具体购买经历。 |
| 30_tuition_fees.md | 交学费 | 2026-08-16 | PRIVATE_KEEP | 时间和金钱成本的比较需情境，保留提醒。 |
| 31_counter_fragile.md | 抗风险 | 2026-08-16 | PRIVATE_KEEP | 抗风险与安全感是概念连接，尚无故事。 |
| 32_ask_self.md | 做事前五问 | 2026-08-21 | PRIVATE_KEEP | 五问可留作个人决策检查，不必变成公共内容类型。 |
| 33_make_request.md | 提要求 | 2026-08-24 | PRIVATE_KEEP | 提要求三条件是未经边界检验的个人规则。 |
| 34_postpone_decision.md | 延迟决策 | 2026-08-24 | PRIVATE_KEEP | 慢半拍与被坑有关，可成为心智模型文章的补充素材。 |
| 35_teach_oneself.md | 自学的本质 | 2026-08-24 | ARCHIVE | 学不会就去死是阶段性自我施压，不代表成熟的学习判断。 |
| 36_foucs.md | 专注的本质 | 2026-08-24 | PRIVATE_KEEP | 每天三小时的门槛来自私人要求，不宜推广为一般结论。 |
| 37_study.md | 学习：起步 | 2026-08-24 | PRIVATE_KEEP | 痛苦才是真学习的二分仍需现实校准。 |
| 38_exercise.md | 刻意练习 | 2026-08-24 | DELETE_CANDIDATE | 只强调重复数量，缺少反馈与作者经验，和现有学习文章重复。 |
| 39_failure_mode.md | 失败模式 | 2026-08-26 | PRIVATE_KEEP | 失败模式可作为复盘视角，但成功没有模式的断言需收窄。 |

计数：PRIVATE_KEEP 35 / PROMOTE_TO_ESSAY 0 / MOVE_TO_LIFE 0 / ARCHIVE 2 / DELETE_CANDIDATE 2。

依赖审计与退出决策：

- schema 保留 inspirations 与 relatedNotes，以便保存源数据、校验历史关系；其缺省状态为 draft。
- 首页不再导入 KineticIdeaStage，也不加载 Inspirations；轮播组件源代码暂留，不进入首页 bundle。
- 主导航及模块配置移除灵感；/daily/ 和已归档详情 URL 只留下通用 noindex 迁移提示，没有原文列表或跳转回原文的入口。
- getAllInspirations 永远返回空公共集合，即使误填 published 也不能恢复第三种公共内容。晋升必须进入 posts 或 moments 并经过作者复核。
- 全文搜索 JSON、页面内搜索数据、全局搜索弹窗、Pagefind 均只包含 published Essays + Life。
- 文章详情的关联推荐移除灵感候选；文章、分类、系列和 Life 相邻导航统一使用经过状态过滤的 loader。
- RSS 原本只含 posts；继续只播报 published Essays，不加入 Life 或 Inspirations。

## Merge Candidates

以下是从正文推导的候选，不是本阶段已合并的内容。canonical 标题均为工作概念，需作者定方向后再起草。

### 1. 把注意力交还给生活

- Canonical Essay concept：以 attention-control.md 为现有主文，补充如何做信息选择而不让筛选本身吞噬时间。
- Source articles / 各自贡献：attention-control.md 提供读不进长文的自省、奶糖记忆和行为改变；personal-text-filter-prompt.md 提供过滤规则与现实偏好的代价。
- Core thesis：注意力管理的目的在于保住可自主选择的生活。
- What should be removed：完整 prompt、重复黑白名单、未经验证的脑机制简化和别人应如何生活的泛化。
- What should survive：独特记忆、实践后的变化、偏好会错以及如何修正偏好的边界。

### 2. 阅读怎样变成自己的能力

- Canonical Essay concept：从关于读书的规则清单收敛到一次读后真正改变行动的经历。
- Source articles / 各自贡献：book_reading.md 提供照搬书单的旧习惯与当前取舍；blind-reading-is-self-harm.md 提供主动学习的问题；tacit-knowledge.md 提供高手判断与情境库；mental-models-and-judgment.md 提供行动与反馈的检验标准（已公开主文，可只引用而不吞并）。
- Core thesis：输入只有进入具体场景、行动和反馈，才成为能力。
- What should be removed：泛化阅读禁令、复述原作者的大段规则、与心智模型主文重复的结尾。
- What should survive：阅读行为前后差别、向学长/教练学习的具体过程、作者自己愿意承担的取舍。

### 3. 我为什么从严格生酮退回来

- Canonical Essay concept：以 diet-experiment.md 的长期记录为底稿，形成有观测边界的个人饮食反思。
- Source articles / 各自贡献：diet-experiment.md 提供体检趋势与食谱变化；about-sugar.md 提供夜间惊醒与补回碳水的转折；banana-pre-workout.md 提供训练场景和对 AI 时间建议的疑问；why-eat-organs.md 提供食物选择与猪腰汤经历；supplements.md 提供消费和补充的取舍（先独立修订，再判断是否只摘用一段）。
- Core thesis：饮食标签不能替代身体反馈，更不能替代对异常指标的认真解释。
- What should be removed：无边界的营养建议、把相关当因果、未经出处支持的激素解释及食物恐惧、精确却未经验证的时间窗口。
- What should survive：原始转录数据及日期缺失说明、选择改变的顺序、成本与不确定性。未经专业依据，不把个人回调解释成医学结论。

### 4. 力量应该服务哪一种生活

- Canonical Essay concept：以 training-philosophy.md 的个人转变为主，不制作训练百科。
- Source articles / 各自贡献：training-philosophy.md 提供从器械与疲劳崇拜到可持续练习的转变；why-i-like-kettlebells.md 提供具体器械偏好；sfg-hardstyle-01 提供练习与测试区分；02 提供工具分工；03 提供拳击优先的恢复预算；04 提供受限条件下的最低剂量思路。
- Core thesis：训练应支持自己想过的生活，主项与恢复决定工具及剂量。
- What should be removed：六动作大全、固定协议堆叠、重复示意图、对固定器械与乳酸的绝对判断。
- What should survive：自己的取舍、实际周安排、哪些调整真的有效；缺少的长期结果必须由作者提供，不能从教程推断。

### 5. 从用手打拳到让身体协同

- Canonical Essay concept：四节拳击课可以作为一篇阶段复盘的证据，不直接拼接成四篇公开日志。
- Source articles / 各自贡献：punching_diary_8_11.md 是动力链起点；8_13 是驱动与制动；8_16 是药球迁移与动作自动化；8_18 是站架与推沙袋的错误反馈。
- Core thesis：理解口令不等于掌握动作，教练的反馈帮助我识别真正该练的环节。
- What should be removed：逐节重复的作业、下一节提问列表、面向所有人的练法建议。
- What should survive：具体错误、教练如何识别、当时录像与后续改变；目前还缺可验证的阶段结论，未来再写。

未强行成立的 cluster：CLI/AI 目前只有操作笔记与短命题；自律/自主主要是英语访谈摘要；治理与婚恋摘记没有足够共同论证。不因关键词相似就设计新 Essay。

## Public Essays Proposed

本地已按本次授权应用的公开集合，仅 3 篇：

- 关于多元心智模型：跨领域学习，判断就更准？（mental-models-and-judgment.md）
- 注意力被收割的时代，怎么重新拿回控制权（attention-control.md）
- 从稀缺到余闲：不把自己塞满的智慧（from-scarcity-to-slack.md）

REFINE 不意味着边修边公开；修订并经作者审阅后才将 status 改回 published。MERGE 不等于源文章继续公开。归档文件不会出现在分类、系列、搜索或 RSS 中。

## Homepage Essays Proposed

以上三篇按相同顺序展示，使用既有 featuredHome: true + featuredRank: 1/2/3，featured 同时供文章页推荐。选择理由依次是：最具体的失败与判断转变、对信息与生活的主动取舍、可长期使用的余闲综合。没有按新近日期补位。

## Public Life Proposed

除 lianshenghe-yellow-croaker.md 外，27 条均保持公开，包括 2 条 REFINE_PRESENTATION。内部 collection 与 URL 继续使用 moments；读者只见生活、记录和照片。

首页目前取公开记录中最近的 3 条：jiugedong.md、maoshe.md、zhihe.md。它们有口味细节，也有和姐姐吃饭的记忆；不增加画廊、标签体系或强制精选字段。未来可根据真实生活素材增加题材宽度，不为填版面编造校园或旅行故事。

## Pending Destructive Decisions

- 本阶段未删除任何内容或媒体，也未移动私人素材；未 commit、未 push、未部署。
- DELETE_CANDIDATE 共 4 个源文件：posts/game-theory-periphery.md、moments/lianshenghe-yellow-croaker.md、inspirations/05-about-information.md、inspirations/38_exercise.md。永久删除必须由作者明确同意；先检查空生活记录能否找回照片，保留 Git 历史并决定旧 URL 的长期处理。
- PRIVATE_KEEP / DEMOTE_PRIVATE 的导出目的地与仓库源文件后续保留方式待作者决定；本阶段只停止站点展示，不把公共仓库称为私人空间。
- 重写、合并、迁入 Life、恢复公开以及未来发布都保留作者决定；没有自动晋升短片段。
- 旧 URL 本阶段使用 200 + noindex 的通用提示，不返回原文，不提供公共 archive 目录。长期是否改为 301、410 或删除提示页待确定；搜索引擎去索引与外部缓存无法即时保证。
