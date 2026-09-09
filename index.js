import { XMLParser } from 'fast-xml-parser';

const IBKR_BASE = 'https://ndcdyn.interactivebrokers.com/AccountManagement/FlexWebService';
const USER_AGENT = 'HappyPortfolio/2.0 (IBKR Flex dashboard)';
const xmlParser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '',
  parseAttributeValue: false,
  trimValues: true,
});

const PAGE_HTML = "<!doctype html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"utf-8\" />\n<meta name=\"viewport\" content=\"width=device-width,initial-scale=1,viewport-fit=cover\" />\n<meta name=\"theme-color\" content=\"#07101f\" />\n<title>Happy Portfolio</title>\n<style>\n:root{--bg:#050b15;--panel:#0b1524;--panel2:#0f1c30;--text:#f4f7fb;--muted:#8fa0b7;--green:#42dda0;--red:#ff6f7e;--blue:#69aaff;--line:#1c2a40;--gold:#efc467}\n*{box-sizing:border-box}body{margin:0;min-height:100vh;background:radial-gradient(circle at 86% -8%,#193b6a 0,#07101f 34%,#050a13 70%);color:var(--text);font-family:Inter,\"PingFang SC\",\"Microsoft YaHei\",system-ui,sans-serif}.app{max-width:780px;margin:auto;padding:18px 14px 100px}.top{display:flex;justify-content:space-between;align-items:center;margin:4px 2px 18px}.brand{font-size:23px;font-weight:850;letter-spacing:-.3px}.sub,.muted{font-size:12px;color:var(--muted)}.sync{display:flex;align-items:center;gap:7px;padding:8px 10px;border:1px solid #24415f;background:#0b1728;border-radius:999px;font-size:11px;color:#cfe0f4}.dot{width:8px;height:8px;border-radius:50%;background:var(--green);box-shadow:0 0 12px #42dda099}.dot.demo{background:var(--gold);box-shadow:none}.hero{padding:20px;border-radius:24px;background:linear-gradient(145deg,#0f1d31,#091321);border:1px solid #1c2b42;box-shadow:0 20px 70px #0006}.eyebrow{font-size:12px;color:var(--muted)}.navv{font-size:40px;line-height:1;font-weight:860;letter-spacing:-1.5px;margin:10px 0 9px}.heroRow{display:flex;align-items:center;gap:8px;flex-wrap:wrap}.gain{color:var(--green)!important}.loss{color:var(--red)!important}.pill{font-size:11px;padding:6px 9px;border-radius:999px;background:#11243a;color:#d1e1f4}.pill.good{background:#0c2d27;color:#99f0cc}.pill.bad{background:#33181f;color:#ffabb3}.grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-top:12px}.card{padding:15px;border-radius:18px;background:linear-gradient(180deg,#0e192a,#0a1422);border:1px solid var(--line)}.label{font-size:11px;color:var(--muted)}.value{font-size:20px;font-weight:770;margin-top:6px}.delta{font-size:11px;color:#9eafc3;margin-top:5px}.section{margin-top:20px}.sectionTitle{display:flex;justify-content:space-between;align-items:flex-end;margin:0 2px 10px}.sectionTitle h2{font-size:17px;margin:0}.chartCard{padding:14px;background:var(--panel);border:1px solid var(--line);border-radius:20px;overflow:hidden}.chartWrap{height:220px;position:relative}.chartWrap svg{width:100%;height:100%;overflow:visible}.axis{stroke:#22324a;stroke-width:1}.line{fill:none;stroke:var(--blue);stroke-width:3}.area{fill:url(#grad)}.pt{fill:#07101f;stroke:var(--blue);stroke-width:3}.tip{position:absolute;background:#08111e;border:1px solid #2c4968;border-radius:9px;padding:7px 9px;font-size:11px;display:none;transform:translate(-50%,-110%);pointer-events:none;z-index:4}.range{display:flex;gap:5px}.range button{border:0;border-radius:999px;background:#122036;color:#889bb3;padding:6px 9px;font-size:10px}.range button.active{background:#1a3658;color:#e5f0ff}.alloc{display:grid;grid-template-columns:135px 1fr;gap:18px;align-items:center}.donut{width:130px;height:130px;border-radius:50%;display:grid;place-items:center;position:relative;background:conic-gradient(var(--green) 0 50%,var(--blue) 50% 100%)}.donut:after{content:\"\";position:absolute;width:84px;height:84px;border-radius:50%;background:var(--panel)}.donutText{position:relative;z-index:2;text-align:center}.donutText b{display:block;font-size:19px}.legend{display:grid;gap:11px}.leg{display:flex;justify-content:space-between;font-size:12px}.sw{display:inline-block;width:9px;height:9px;border-radius:50%;margin-right:7px}.hold{display:grid;gap:10px}.holding{padding:16px;border:1px solid var(--line);border-radius:20px;background:linear-gradient(145deg,#0f1b2d,#0a1422)}.row{display:flex;justify-content:space-between;align-items:center;gap:10px}.ticker{font-size:22px;font-weight:850}.name{font-size:11px;color:var(--muted);margin-top:2px}.price{text-align:right}.bigp{font-size:18px;font-weight:760}.miniGrid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:14px}.mini{padding:10px;border-radius:12px;background:#08121f;border:1px solid #18263a}.mini .value{font-size:13px}.trade{margin-top:10px;padding:10px 12px;border-radius:12px;background:#172513;border:1px solid #304b26;color:#d4efc5;font-size:11px;line-height:1.5}.empty{padding:28px;text-align:center;color:var(--muted);border:1px dashed #2b3c55;border-radius:16px}table{width:100%;border-collapse:collapse;font-size:11px}th,td{padding:11px 8px;border-bottom:1px solid var(--line);text-align:right;white-space:nowrap}th:first-child,td:first-child{text-align:left}th{color:#8fa0b7;font-weight:600}tr:last-child td{border-bottom:0}.scroll{overflow:auto;border:1px solid var(--line);border-radius:16px;background:var(--panel)}.weekHero{display:flex;justify-content:space-between;align-items:flex-end;padding:16px;border:1px solid #21413b;border-radius:18px;background:linear-gradient(135deg,#0d2a27,#0b1524);margin-bottom:10px}.weekHero .w{font-size:30px;font-weight:850}.foot{font-size:10px;color:#6f8299;line-height:1.55;text-align:center;margin:18px 3px}.tabs{position:fixed;z-index:10;left:50%;transform:translateX(-50%);bottom:12px;width:min(740px,calc(100% - 20px));display:grid;grid-template-columns:repeat(4,1fr);padding:6px;border:1px solid #22324a;border-radius:18px;background:#0a1422e8;backdrop-filter:blur(18px);box-shadow:0 14px 42px #0008}.tab{border:0;background:transparent;color:#7d90a9;padding:10px 4px;border-radius:13px;font-size:11px}.tab.active{background:#15263d;color:#fff}.page{display:none}.page.active{display:block}.warning{padding:12px 13px;border-radius:13px;background:#30250f;border:1px solid #59461e;color:#f5d98e;font-size:11px;line-height:1.55;margin-bottom:12px}.skeleton{animation:pulse 1.2s infinite alternate;color:transparent!important;background:#15243a;border-radius:8px}@keyframes pulse{from{opacity:.5}to{opacity:1}}@media(min-width:640px){.grid{grid-template-columns:repeat(4,1fr)}.hold{grid-template-columns:repeat(2,1fr)}}\n</style>\n</head>\n<body>\n<div class=\"app\">\n  <div class=\"top\"><div><div class=\"brand\">Happy Portfolio</div><div class=\"sub\">IBKR 私人收益仪表盘</div></div><div class=\"sync\"><span id=\"syncDot\" class=\"dot demo\"></span><span id=\"syncText\">正在读取</span></div></div>\n  <div id=\"banner\"></div>\n  <main id=\"today\" class=\"page active\">\n    <section class=\"hero\"><div class=\"eyebrow\">账户净资产 · USD</div><div id=\"nav\" class=\"navv skeleton\">$00,000.00</div><div class=\"heroRow\"><span id=\"dayPnl\" class=\"gain\">—</span><span id=\"dayRet\" class=\"pill\">—</span><span id=\"method\" class=\"pill\">—</span></div><div id=\"updated\" class=\"sub\" style=\"margin-top:12px\">—</div></section>\n    <div class=\"grid\">\n      <div class=\"card\"><div class=\"label\">现金</div><div id=\"cash\" class=\"value\">—</div><div id=\"cashWeight\" class=\"delta\">—</div></div>\n      <div class=\"card\"><div class=\"label\">股票市值</div><div id=\"stockValue\" class=\"value\">—</div><div id=\"stockWeight\" class=\"delta\">—</div></div>\n      <div class=\"card\"><div class=\"label\">本月收益</div><div id=\"mtd\" class=\"value\">—</div><div class=\"delta\">按已存档 NAV 计算</div></div>\n      <div class=\"card\"><div class=\"label\">持仓数量</div><div id=\"positionCount\" class=\"value\">—</div><div class=\"delta\">当前证券标的</div></div>\n    </div>\n    <section class=\"section\"><div class=\"sectionTitle\"><h2>净值走势</h2><div class=\"range\"><button data-days=\"7\" class=\"active\">1周</button><button data-days=\"30\">1月</button><button data-days=\"365\">全部</button></div></div><div class=\"chartCard\"><div id=\"navChart\" class=\"chartWrap\"><div id=\"tip\" class=\"tip\"></div></div></div></section>\n    <section class=\"section\"><div class=\"sectionTitle\"><h2>资产结构</h2><span id=\"allocHint\" class=\"muted\"></span></div><div class=\"chartCard alloc\"><div id=\"donut\" class=\"donut\"><div class=\"donutText\"><span class=\"muted\">现金</span><b id=\"donutCash\">—</b></div></div><div class=\"legend\"><div class=\"leg\"><span><i class=\"sw\" style=\"background:var(--green)\"></i>现金</span><b id=\"legCash\">—</b></div><div class=\"leg\"><span><i class=\"sw\" style=\"background:var(--blue)\"></i>股票</span><b id=\"legStock\">—</b></div><div id=\"lastTrade\" class=\"muted\">—</div></div></div></section>\n    <div id=\"footSource\" class=\"foot\"></div>\n  </main>\n\n  <main id=\"holdings\" class=\"page\"><div class=\"sectionTitle\"><h2>当前持仓</h2><span id=\"holdingCount\" class=\"muted\"></span></div><div id=\"holdingsList\" class=\"hold\"></div><section class=\"section\"><div class=\"sectionTitle\"><h2>最近交易</h2><span class=\"muted\">30 天</span></div><div id=\"tradesTable\" class=\"scroll\"></div></section></main>\n\n  <main id=\"returns\" class=\"page\"><div class=\"sectionTitle\"><h2>每日收益</h2><span class=\"muted\">逐日留档</span></div><div id=\"returnsTable\" class=\"scroll\"></div><div class=\"foot\">若日报显示“净值变化”，代表 IBKR Flex 未直接返回该日 Daily P&amp;L，系统使用相邻 NAV 计算并明确标注口径。</div></main>\n\n  <main id=\"weekly\" class=\"page\"><div id=\"weekHero\" class=\"weekHero\"></div><div id=\"weekCards\" class=\"grid\" style=\"margin-bottom:12px\"></div><div id=\"weekTable\" class=\"scroll\"></div></main>\n</div>\n<nav class=\"tabs\"><button class=\"tab active\" data-page=\"today\">今日</button><button class=\"tab\" data-page=\"holdings\">持仓</button><button class=\"tab\" data-page=\"returns\">收益</button><button class=\"tab\" data-page=\"weekly\">周报</button></nav>\n<script>\nconst fallback={\n  ready:true,meta:{syncedAt:'2026-09-09T00:39:00+08:00',source:'内置演示快照',pnlMethod:'nav_change',latestDate:'2026-09-08'},\n  account:{date:'2026-09-08',nav:73746.54737,dailyPnl:3416.02272,dailyReturn:.04857098,cash:54273.1511,cashWeight:.73594,stockValue:19468.47,stockWeight:.26406,mtdReturn:.1357939},\n  positions:[{symbol:'AEHR',description:'AEHR Test Systems',quantity:150,price:92.69000245,marketValue:13903.5004,costBasis:81.35240533,unrealizedPnl:1700.6396,unrealizedReturn:.13936,dailyPnl:964.5004,dailyReturn:.07454},{symbol:'BE',description:'Bloom Energy Corp-A',quantity:20,price:279.82998655,marketValue:5596.5997,costBasis:215.195586,unrealizedPnl:1292.688,dailyPnl:2483.1608,dailyReturn:.0982,unrealizedReturn:.30035}],\n  history:[{date:'2026-08-31',nav:64929.52,dailyPnl:-441.15,dailyReturn:-.006748,method:'nav_change'},{date:'2026-09-01',nav:65664.46,dailyPnl:734.94,dailyReturn:.011319,method:'nav_change'},{date:'2026-09-02',nav:66031.42,dailyPnl:366.96,dailyReturn:.005588,method:'nav_change'},{date:'2026-09-03',nav:67098.02,dailyPnl:1066.61,dailyReturn:.016153,method:'nav_change'},{date:'2026-09-04',nav:70330.52,dailyPnl:3232.50,dailyReturn:.048176,method:'nav_change'},{date:'2026-09-07',nav:70330.52,dailyPnl:0,dailyReturn:0,method:'nav_change'},{date:'2026-09-08',nav:73746.55,dailyPnl:3416.02,dailyReturn:.048571,method:'nav_change'}],\n  trades:[{date:'2026-09-08',time:'14:59:21Z',symbol:'BE',side:'SELL',quantity:71,price:277.18,realizedPnl:4400.11},{date:'2026-09-08',time:'14:59:21Z',symbol:'BE',side:'SELL',quantity:9,price:277.18,realizedPnl:557.80},{date:'2026-09-03',time:'09:04:20Z',symbol:'AEHR',side:'BUY',quantity:120,price:81.35,realizedPnl:0},{date:'2026-09-03',time:'09:04:20Z',symbol:'AEHR',side:'BUY',quantity:30,price:81.35,realizedPnl:0}]\n};\nlet DATA=fallback, chartDays=7;\nconst $=id=>document.getElementById(id), money=v=>v==null?'—':`${v<0?'-':''}$${Math.abs(v).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})}`, signed=v=>v==null?'—':`${v>=0?'+':'-'}$${Math.abs(v).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})}`, pct=v=>v==null?'—':`${v>=0?'+':''}${(v*100).toFixed(2)}%`, cls=v=>v>0?'gain':v<0?'loss':'';\nconst dshort=s=>{const d=new Date(s+'T12:00:00Z');return `${d.getUTCMonth()+1}/${d.getUTCDate()}`};\nasync function load(){try{const r=await fetch('/api/dashboard?days=365',{cache:'no-store'});if(!r.ok)throw new Error();const j=await r.json();if(!j.ready)throw new Error(j.message);DATA=j;$('syncDot').classList.remove('demo');$('syncText').textContent='自动同步';$('banner').innerHTML='';}catch(e){DATA=fallback;$('syncText').textContent='演示数据';$('banner').innerHTML='<div class=\"warning\">当前展示的是已内置的 IBKR 快照。部署后配置 Flex Token 与 Query ID，页面会每天自动更新。</div>';}render();}\nfunction render(){const a=DATA.account,m=DATA.meta;$('nav').classList.remove('skeleton');$('nav').textContent=money(a.nav);$('dayPnl').className=cls(a.dailyPnl);$('dayPnl').textContent=signed(a.dailyPnl);$('dayRet').className='pill '+(a.dailyReturn>=0?'good':'bad');$('dayRet').textContent=pct(a.dailyReturn)+' 当日';$('method').textContent=m.pnlMethod==='ibkr_change_in_nav'?'IBKR TWR':'NAV 变化';$('updated').textContent=`数据日期 ${a.date} · 同步 ${new Date(m.syncedAt).toLocaleString('zh-CN')}`;$('cash').textContent=money(a.cash);$('cashWeight').textContent=`现金仓位 ${pct(a.cashWeight).replace('+','')}`;$('stockValue').textContent=money(a.stockValue);$('stockWeight').textContent=`证券仓位 ${pct(a.stockWeight).replace('+','')}`;$('mtd').textContent=pct(a.mtdReturn);$('mtd').className='value '+cls(a.mtdReturn);$('positionCount').textContent=DATA.positions.length;$('donutCash').textContent=pct(a.cashWeight).replace('+','');$('donut').style.background=`conic-gradient(var(--green) 0 ${(a.cashWeight||0)*100}%,var(--blue) ${(a.cashWeight||0)*100}% 100%)`;$('legCash').textContent=money(a.cash);$('legStock').textContent=money(a.stockValue);$('allocHint').textContent=a.cashWeight>.6?'现金弹药充足':'仓位较高';const lt=DATA.trades[0];$('lastTrade').textContent=lt?`最近交易：${dshort(lt.date)} ${lt.side==='SELL'?'卖出':'买入'} ${lt.symbol} ${lt.quantity} 股 @ $${Number(lt.price).toFixed(2)}`:'近期无交易';$('footSource').textContent=`数据源：${m.source} · ${m.pnlMethod==='nav_change'?'账户收益额为 NAV 变化口径':'账户收益来自 IBKR Change in NAV / TWR'}`;renderHoldings();renderTrades();renderReturns();renderWeek();drawChart();}\nfunction renderHoldings(){$('holdingCount').textContent=`${DATA.positions.length} 个标的`;if(!DATA.positions.length){$('holdingsList').innerHTML='<div class=\"empty\">当前没有证券持仓</div>';return}$('holdingsList').innerHTML=DATA.positions.map(p=>`<div class=\"holding\"><div class=\"row\"><div><div class=\"ticker\">${p.symbol}</div><div class=\"name\">${p.description||''}</div></div><div class=\"price\"><div class=\"bigp\">${money(p.price)}</div><div class=\"${cls(p.dailyPnl)}\">${signed(p.dailyPnl)} · ${pct(p.dailyReturn)}</div></div></div><div class=\"miniGrid\"><div class=\"mini\"><div class=\"label\">股数</div><div class=\"value\">${Number(p.quantity).toLocaleString()}</div></div><div class=\"mini\"><div class=\"label\">市值</div><div class=\"value\">${money(p.marketValue)}</div></div><div class=\"mini\"><div class=\"label\">成本</div><div class=\"value\">${money(p.costBasis)}</div></div><div class=\"mini\"><div class=\"label\">浮盈</div><div class=\"value ${cls(p.unrealizedPnl)}\">${signed(p.unrealizedPnl)}</div></div><div class=\"mini\"><div class=\"label\">浮盈率</div><div class=\"value ${cls(p.unrealizedReturn)}\">${pct(p.unrealizedReturn)}</div></div><div class=\"mini\"><div class=\"label\">今日贡献</div><div class=\"value ${cls(p.dailyPnl)}\">${signed(p.dailyPnl)}</div></div></div></div>`).join('')}\nfunction renderTrades(){if(!DATA.trades.length){$('tradesTable').innerHTML='<div class=\"empty\">近期无交易</div>';return}$('tradesTable').innerHTML=`<table><thead><tr><th>日期</th><th>标的</th><th>方向</th><th>股数</th><th>价格</th><th>已实现</th></tr></thead><tbody>${DATA.trades.map(t=>`<tr><td>${dshort(t.date)}</td><td>${t.symbol}</td><td class=\"${t.side==='SELL'?'gain':''}\">${t.side}</td><td>${Number(t.quantity).toLocaleString()}</td><td>${money(t.price)}</td><td class=\"${cls(t.realizedPnl)}\">${signed(t.realizedPnl)}</td></tr>`).join('')}</tbody></table>`}\nfunction renderReturns(){const rows=[...DATA.history].reverse();$('returnsTable').innerHTML=`<table><thead><tr><th>日期</th><th>净值</th><th>收益额</th><th>收益率</th><th>口径</th></tr></thead><tbody>${rows.map(r=>`<tr><td>${dshort(r.date)}</td><td>${money(r.nav)}</td><td class=\"${cls(r.dailyPnl)}\">${signed(r.dailyPnl)}</td><td class=\"${cls(r.dailyReturn)}\">${pct(r.dailyReturn)}</td><td>${r.method==='ibkr_change_in_nav'?'IBKR':'NAV变化'}</td></tr>`).join('')}</tbody></table>`}\nfunction mondayOf(dateStr){const d=new Date(dateStr+'T12:00:00Z'),day=d.getUTCDay()||7;d.setUTCDate(d.getUTCDate()-day+1);return d.toISOString().slice(0,10)}\nfunction renderWeek(){const latest=DATA.account.date,start=mondayOf(latest),rows=DATA.history.filter(x=>x.date>=start&&x.date<=latest),total=rows.reduce((a,x)=>a+(x.dailyPnl||0),0),base=rows.length&&rows[0].dailyPnl!=null?rows[0].nav-(rows[0].dailyPnl||0):null,ret=base?rows.at(-1).nav/base-1:null,best=[...rows].sort((a,b)=>(b.dailyPnl||0)-(a.dailyPnl||0))[0],worst=[...rows].sort((a,b)=>(a.dailyPnl||0)-(b.dailyPnl||0))[0];$('weekHero').innerHTML=`<div><div class=\"muted\">本周 · ${dshort(start)}–${dshort(latest)}</div><div class=\"w ${cls(total)}\">${signed(total)}</div></div><div style=\"text-align:right\"><div class=\"${cls(ret)}\" style=\"font-size:22px;font-weight:800\">${pct(ret)}</div><div class=\"muted\">周收益率</div></div>`;$('weekCards').innerHTML=`<div class=\"card\"><div class=\"label\">最大盈利日</div><div class=\"value\">${best?dshort(best.date):'—'}</div><div class=\"delta ${best?cls(best.dailyPnl):''}\">${best?signed(best.dailyPnl):'—'}</div></div><div class=\"card\"><div class=\"label\">最弱交易日</div><div class=\"value\">${worst?dshort(worst.date):'—'}</div><div class=\"delta ${worst?cls(worst.dailyPnl):''}\">${worst?signed(worst.dailyPnl):'—'}</div></div><div class=\"card\"><div class=\"label\">现金仓位</div><div class=\"value\">${pct(DATA.account.cashWeight).replace('+','')}</div><div class=\"delta\">${money(DATA.account.cash)}</div></div><div class=\"card\"><div class=\"label\">当前持仓</div><div class=\"value\">${DATA.positions.length}</div><div class=\"delta\">证券标的</div></div>`;$('weekTable').innerHTML=`<table><thead><tr><th>日期</th><th>净值</th><th>收益额</th><th>收益率</th></tr></thead><tbody>${rows.map(r=>`<tr><td>${dshort(r.date)}</td><td>${money(r.nav)}</td><td class=\"${cls(r.dailyPnl)}\">${signed(r.dailyPnl)}</td><td class=\"${cls(r.dailyReturn)}\">${pct(r.dailyReturn)}</td></tr>`).join('')}</tbody></table>`}\nfunction drawChart(){const el=$('navChart');el.querySelector('svg')?.remove();const all=DATA.history,series=chartDays>=365?all:all.slice(-chartDays);if(series.length<2)return;const w=700,h=210,p=28,vals=series.map(x=>x.nav),min=Math.min(...vals)*.995,max=Math.max(...vals)*1.005,x=i=>p+i*(w-2*p)/(series.length-1),y=v=>h-p-(v-min)/(max-min)*(h-2*p),pts=series.map((o,i)=>[x(i),y(o.nav)]),line=pts.map((q,i)=>(i?'L':'M')+q[0].toFixed(1)+','+q[1].toFixed(1)).join(' '),area=line+` L ${x(series.length-1)},${h-p} L ${x(0)},${h-p} Z`;let grid='';for(let i=0;i<4;i++){const gy=p+i*(h-2*p)/3;grid+=`<line class=\"axis\" x1=\"${p}\" y1=\"${gy}\" x2=\"${w-p}\" y2=\"${gy}\"/>`}let labels='';series.forEach((o,i)=>{const show=series.length<=10||i===0||i===series.length-1||i%Math.ceil(series.length/6)===0;labels+=`${show?`<text x=\"${x(i)}\" y=\"${h-5}\" text-anchor=\"middle\" fill=\"#8092aa\" font-size=\"10\">${dshort(o.date)}</text>`:''}<circle class=\"pt\" data-i=\"${i}\" cx=\"${x(i)}\" cy=\"${y(o.nav)}\" r=\"4.5\"/>`});el.insertAdjacentHTML('afterbegin',`<svg viewBox=\"0 0 ${w} ${h}\" preserveAspectRatio=\"none\"><defs><linearGradient id=\"grad\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop offset=\"0\" stop-color=\"#69aaff\" stop-opacity=\".28\"/><stop offset=\"1\" stop-color=\"#69aaff\" stop-opacity=\"0\"/></linearGradient></defs>${grid}<path class=\"area\" d=\"${area}\"/><path class=\"line\" d=\"${line}\"/>${labels}</svg>`);const tip=$('tip');el.querySelectorAll('.pt').forEach(c=>c.addEventListener('click',()=>{const i=+c.dataset.i,o=series[i];tip.innerHTML=`${dshort(o.date)}<br><b>${money(o.nav)}</b><br><span class=\"${cls(o.dailyPnl)}\">${signed(o.dailyPnl)}</span>`;tip.style.left=(c.cx.baseVal.value/w*100)+'%';tip.style.top=(c.cy.baseVal.value/h*100)+'%';tip.style.display='block'}))}\ndocument.querySelectorAll('.tab').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));b.classList.add('active');document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));$(b.dataset.page).classList.add('active');window.scrollTo({top:0,behavior:'smooth'})}));document.querySelectorAll('.range button').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.range button').forEach(x=>x.classList.remove('active'));b.classList.add('active');chartDays=+b.dataset.days;drawChart()}));load();\n</script>\n</body></html>\n";

const SCHEMA_SQL = "CREATE TABLE IF NOT EXISTS snapshots (\n  report_date TEXT PRIMARY KEY,\n  nav REAL NOT NULL,\n  cash REAL,\n  stock_value REAL,\n  daily_pnl REAL,\n  daily_return REAL,\n  pnl_method TEXT NOT NULL DEFAULT 'nav_change',\n  twr REAL,\n  realized_pnl REAL,\n  unrealized_pnl REAL,\n  synced_at TEXT NOT NULL,\n  source TEXT NOT NULL DEFAULT 'IBKR Flex'\n);\n\nCREATE TABLE IF NOT EXISTS positions (\n  report_date TEXT NOT NULL,\n  symbol TEXT NOT NULL,\n  description TEXT,\n  quantity REAL,\n  mark_price REAL,\n  market_value REAL,\n  cost_basis REAL,\n  unrealized_pnl REAL,\n  daily_pnl REAL,\n  daily_return REAL,\n  PRIMARY KEY (report_date, symbol)\n);\n\nCREATE TABLE IF NOT EXISTS trades (\n  trade_id TEXT PRIMARY KEY,\n  trade_date TEXT,\n  trade_time TEXT,\n  symbol TEXT,\n  side TEXT,\n  quantity REAL,\n  price REAL,\n  commission REAL,\n  realized_pnl REAL,\n  description TEXT\n);\n\nCREATE INDEX IF NOT EXISTS idx_positions_report_date ON positions(report_date);\nCREATE INDEX IF NOT EXISTS idx_trades_trade_date ON trades(trade_date);";

async function ensureSchema(env) {
  if (!env.DB) throw new Error('D1 数据库尚未绑定到 Worker');
  await env.DB.exec(SCHEMA_SQL);
}

const json = (body, status = 200, headers = {}) => new Response(JSON.stringify(body, null, 2), {
  status,
  headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', ...headers },
});

const arr = (x) => x == null ? [] : Array.isArray(x) ? x : [x];
const num = (v) => {
  if (v == null || v === '') return null;
  const n = Number(String(v).replace(/,/g, '').replace(/%/g, ''));
  return Number.isFinite(n) ? n : null;
};
const n0 = (v) => num(v) ?? 0;
const normDate = (v) => {
  if (!v) return null;
  const s = String(v).trim();
  const m = s.match(/^(\d{4})[-/]?(\d{2})[-/]?(\d{2})/);
  return m ? `${m[1]}-${m[2]}-${m[3]}` : s.slice(0, 10);
};
const normalizeTwr = (v) => {
  if (v == null || v === '') return null;
  const raw = String(v);
  const n = num(raw);
  if (n == null) return null;
  if (raw.includes('%')) return n / 100;
  return Math.abs(n) > 1 ? n / 100 : n;
};
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function textFrom(obj, key) {
  const v = obj?.[key];
  if (v == null) return null;
  if (typeof v === 'object' && '#text' in v) return String(v['#text']);
  return String(v);
}

async function ibkrRequest(env, days = 1) {
  if (!env.IBKR_FLEX_TOKEN || !env.IBKR_FLEX_QUERY_ID) {
    throw new Error('IBKR_FLEX_TOKEN / IBKR_FLEX_QUERY_ID 尚未配置');
  }
  const send = new URL(`${IBKR_BASE}/SendRequest`);
  send.searchParams.set('t', env.IBKR_FLEX_TOKEN);
  send.searchParams.set('q', env.IBKR_FLEX_QUERY_ID);
  send.searchParams.set('v', '3');
  send.searchParams.set('p', String(Math.min(Math.max(Number(days) || 1, 1), 365)));
  const r1 = await fetch(send, { headers: { 'User-Agent': USER_AGENT } });
  const sendText = await r1.text();
  if (!r1.ok) throw new Error(`IBKR SendRequest HTTP ${r1.status}`);
  const sendXml = xmlParser.parse(sendText);
  const resp = sendXml?.FlexStatementResponse || sendXml?.FlexQueryResponse || sendXml;
  const status = textFrom(resp, 'Status');
  const ref = textFrom(resp, 'ReferenceCode');
  if (String(status).toLowerCase() !== 'success' || !ref) {
    const err = textFrom(resp, 'ErrorMessage') || textFrom(resp, 'Message') || 'Flex report generation failed';
    throw new Error(err);
  }

  const get = new URL(`${IBKR_BASE}/GetStatement`);
  get.searchParams.set('t', env.IBKR_FLEX_TOKEN);
  get.searchParams.set('q', ref);
  get.searchParams.set('v', '3');
  for (let attempt = 0; attempt < 7; attempt++) {
    if (attempt) await sleep(1000 + attempt * 300);
    const r2 = await fetch(get, { headers: { 'User-Agent': USER_AGENT } });
    const body = await r2.text();
    if (!r2.ok) throw new Error(`IBKR GetStatement HTTP ${r2.status}`);
    if (body.includes('<FlexQueryResponse') || body.includes('<FlexStatements')) return body;
    const parsed = xmlParser.parse(body);
    const e = parsed?.FlexStatementResponse || parsed;
    const msg = textFrom(e, 'ErrorMessage') || textFrom(e, 'Message') || '';
    const code = textFrom(e, 'ErrorCode') || '';
    if (!/progress|generat|please try again|1019/i.test(`${msg} ${code}`)) {
      throw new Error(msg || 'IBKR statement retrieval failed');
    }
  }
  throw new Error('IBKR report 生成超时，请稍后重试');
}

function selectSummaryOpenPositions(rows) {
  const bySymbol = new Map();
  for (const r of rows) {
    if (!r?.symbol || (r.assetCategory && r.assetCategory !== 'STK')) continue;
    const sym = String(r.symbol);
    if (!bySymbol.has(sym)) bySymbol.set(sym, []);
    bySymbol.get(sym).push(r);
  }
  const out = [];
  for (const [symbol, group] of bySymbol) {
    const summaries = group.filter((x) => /summary/i.test(String(x.levelOfDetail || '')));
    const chosen = summaries.length ? summaries : group;
    const quantity = chosen.reduce((a, x) => a + n0(x.position), 0);
    const marketValue = chosen.reduce((a, x) => a + n0(x.positionValue), 0);
    const costMoney = chosen.reduce((a, x) => a + n0(x.costBasisMoney), 0);
    const unreal = chosen.reduce((a, x) => a + n0(x.fifoPnlUnrealized), 0);
    const mark = chosen.map((x) => num(x.markPrice)).find((x) => x != null) ?? (quantity ? marketValue / quantity : null);
    const costBasis = chosen.map((x) => num(x.costBasisPrice)).find((x) => x != null) ?? (quantity ? Math.abs(costMoney / quantity) : null);
    out.push({ symbol, description: chosen[0]?.description || symbol, quantity, markPrice: mark, marketValue, costBasis, unrealizedPnl: unreal });
  }
  return out;
}

function parseFlex(xml) {
  const doc = xmlParser.parse(xml);
  const root = doc?.FlexQueryResponse || doc;
  const statements = arr(root?.FlexStatements?.FlexStatement || root?.FlexStatement);
  const snapshots = new Map();
  const positionMtm = new Map();
  let latestPositions = [];
  const trades = [];
  const directDailyByDate = new Map();

  for (const st of statements) {
    const equities = arr(st?.EquitySummaryInBase?.EquitySummaryByReportDateInBase);
    for (const e of equities) {
      const date = normDate(e.reportDate);
      const nav = num(e.total);
      if (!date || nav == null) continue;
      const cash = num(e.cash);
      const stock = num(e.stock) ?? (cash != null ? nav - cash : null);
      snapshots.set(date, { reportDate: date, nav, cash, stockValue: stock });
    }

    const mtmRows = arr(st?.MTMPerformanceSummaryInBase?.MTMPerformanceSummaryUnderlying);
    for (const m of mtmRows) {
      if (!m?.symbol || (m.assetCategory && m.assetCategory !== 'STK')) continue;
      const date = normDate(m.reportDate);
      if (!date) continue;
      const key = `${date}|${m.symbol}`;
      const prev = positionMtm.get(key) || {
        reportDate: date, symbol: String(m.symbol), description: m.description || String(m.symbol),
        quantity: 0, closePrice: null, dailyPnl: 0, prevMarketValue: 0,
      };
      prev.quantity += n0(m.closeQuantity);
      if (num(m.closePrice) != null) prev.closePrice = num(m.closePrice);
      prev.dailyPnl += n0(m.totalWithAccruals ?? m.total);
      prev.prevMarketValue += Math.abs(n0(m.prevCloseQuantity) * n0(m.prevClosePrice));
      positionMtm.set(key, prev);
    }

    const opens = arr(st?.OpenPositions?.OpenPosition);
    if (opens.length) latestPositions = selectSummaryOpenPositions(opens);

    const trs = arr(st?.Trades?.Trade).filter((t) => !t.levelOfDetail || /execution/i.test(String(t.levelOfDetail)));
    for (const t of trs) {
      const id = t.tradeID || t.ibExecID || t.transactionID || `${t.tradeDate}-${t.symbol}-${t.tradeTime}-${t.quantity}-${t.tradePrice}`;
      trades.push({
        tradeId: String(id), tradeDate: normDate(t.tradeDate || t.reportDate), tradeTime: t.tradeTime || t.dateTime || null,
        symbol: t.symbol || '', side: t.buySell || '', quantity: Math.abs(n0(t.quantity)), price: num(t.tradePrice),
        commission: Math.abs(n0(t.ibCommission)), realizedPnl: num(t.fifoPnlRealized), description: t.description || t.symbol || '',
      });
    }

    const cin = st?.ChangeInNAV;
    if (cin) {
      const fromDate = normDate(cin.fromDate || st.fromDate);
      const toDate = normDate(cin.toDate || st.toDate);
      if (fromDate && toDate && fromDate === toDate) {
        const start = num(cin.startingValue), end = num(cin.endingValue);
        const externalFlow = n0(cin.depositsWithdrawals) + n0(cin.assetTransfers);
        const pnl = start != null && end != null ? end - start - externalFlow : null;
        directDailyByDate.set(toDate, { dailyPnl: pnl, twr: normalizeTwr(cin.twr), method: 'ibkr_change_in_nav', externalFlow });
      }
    }
  }

  const dates = [...snapshots.keys()].sort();
  dates.forEach((date, i) => {
    const s = snapshots.get(date);
    const direct = directDailyByDate.get(date);
    const prev = i > 0 ? snapshots.get(dates[i - 1]) : null;
    if (direct?.dailyPnl != null) {
      s.dailyPnl = direct.dailyPnl;
      s.dailyReturn = direct.twr ?? (prev?.nav ? direct.dailyPnl / prev.nav : null);
      s.pnlMethod = direct.method;
      s.twr = direct.twr;
    } else if (prev?.nav != null) {
      s.dailyPnl = s.nav - prev.nav;
      s.dailyReturn = prev.nav ? (s.nav - prev.nav) / prev.nav : null;
      s.pnlMethod = 'nav_change';
      s.twr = null;
    } else {
      s.dailyPnl = null; s.dailyReturn = null; s.pnlMethod = 'unknown'; s.twr = null;
    }
  });

  const mtmByDate = new Map();
  for (const m of positionMtm.values()) {
    const ret = m.prevMarketValue > 0 ? m.dailyPnl / m.prevMarketValue : null;
    const row = { ...m, marketValue: m.closePrice != null ? m.quantity * m.closePrice : null, dailyReturn: ret };
    if (!mtmByDate.has(m.reportDate)) mtmByDate.set(m.reportDate, []);
    mtmByDate.get(m.reportDate).push(row);
  }

  return { snapshots: dates.map((d) => snapshots.get(d)), mtmByDate, latestPositions, trades };
}

async function persistFlex(env, parsed) {
  const now = new Date().toISOString();
  const statements = [];
  for (const s of parsed.snapshots) {
    statements.push(env.DB.prepare(`
      INSERT INTO snapshots(report_date,nav,cash,stock_value,daily_pnl,daily_return,pnl_method,twr,synced_at,source)
      VALUES(?,?,?,?,?,?,?,?,?,?)
      ON CONFLICT(report_date) DO UPDATE SET nav=excluded.nav,cash=excluded.cash,stock_value=excluded.stock_value,
      daily_pnl=excluded.daily_pnl,daily_return=excluded.daily_return,pnl_method=excluded.pnl_method,twr=excluded.twr,
      synced_at=excluded.synced_at,source=excluded.source
    `).bind(s.reportDate, s.nav, s.cash, s.stockValue, s.dailyPnl, s.dailyReturn, s.pnlMethod, s.twr, now, 'IBKR Flex'));
    for (const p of parsed.mtmByDate.get(s.reportDate) || []) {
      statements.push(env.DB.prepare(`
        INSERT INTO positions(report_date,symbol,description,quantity,mark_price,market_value,daily_pnl,daily_return)
        VALUES(?,?,?,?,?,?,?,?)
        ON CONFLICT(report_date,symbol) DO UPDATE SET description=excluded.description,quantity=excluded.quantity,mark_price=excluded.mark_price,
        market_value=excluded.market_value,daily_pnl=excluded.daily_pnl,daily_return=excluded.daily_return
      `).bind(s.reportDate, p.symbol, p.description, p.quantity, p.closePrice, p.marketValue, p.dailyPnl, p.dailyReturn));
    }
  }

  const latestDate = parsed.snapshots.at(-1)?.reportDate;
  if (latestDate && parsed.latestPositions.length) {
    for (const p of parsed.latestPositions) {
      const mtm = (parsed.mtmByDate.get(latestDate) || []).find((x) => x.symbol === p.symbol);
      statements.push(env.DB.prepare(`
        INSERT INTO positions(report_date,symbol,description,quantity,mark_price,market_value,cost_basis,unrealized_pnl,daily_pnl,daily_return)
        VALUES(?,?,?,?,?,?,?,?,?,?)
        ON CONFLICT(report_date,symbol) DO UPDATE SET description=excluded.description,quantity=excluded.quantity,mark_price=excluded.mark_price,
        market_value=excluded.market_value,cost_basis=excluded.cost_basis,unrealized_pnl=excluded.unrealized_pnl,
        daily_pnl=COALESCE(excluded.daily_pnl,positions.daily_pnl),daily_return=COALESCE(excluded.daily_return,positions.daily_return)
      `).bind(latestDate, p.symbol, p.description, p.quantity, p.markPrice, p.marketValue, p.costBasis, p.unrealizedPnl, mtm?.dailyPnl ?? null, mtm?.dailyReturn ?? null));
    }
  }

  for (const t of parsed.trades) {
    statements.push(env.DB.prepare(`
      INSERT INTO trades(trade_id,trade_date,trade_time,symbol,side,quantity,price,commission,realized_pnl,description)
      VALUES(?,?,?,?,?,?,?,?,?,?)
      ON CONFLICT(trade_id) DO NOTHING
    `).bind(t.tradeId,t.tradeDate,t.tradeTime,t.symbol,t.side,t.quantity,t.price,t.commission,t.realizedPnl,t.description));
  }
  if (statements.length) {
    for (let i = 0; i < statements.length; i += 80) await env.DB.batch(statements.slice(i, i + 80));
  }
  return { snapshots: parsed.snapshots.length, positions: parsed.latestPositions.length, trades: parsed.trades.length, latestDate };
}

async function sync(env, days = 1) {
  await ensureSchema(env);
  const xml = await ibkrRequest(env, days);
  const parsed = parseFlex(xml);
  if (!parsed.snapshots.length) throw new Error('Flex Query 中没有找到 Equity Summary in Base 数据');
  return persistFlex(env, parsed);
}

async function dashboard(env, days = 60) {
  await ensureSchema(env);
  const lim = Math.min(Math.max(Number(days) || 60, 7), 365);
  const latest = await env.DB.prepare('SELECT * FROM snapshots ORDER BY report_date DESC LIMIT 1').first();
  if (!latest) return { ready: false, message: '数据库暂无快照，请先运行 seed 或 sync。' };
  const positions = (await env.DB.prepare('SELECT * FROM positions WHERE report_date=? ORDER BY market_value DESC').bind(latest.report_date).all()).results || [];
  const historyDesc = (await env.DB.prepare('SELECT * FROM snapshots ORDER BY report_date DESC LIMIT ?').bind(lim).all()).results || [];
  const history = historyDesc.reverse();
  const trades = (await env.DB.prepare('SELECT * FROM trades WHERE trade_date >= date(?,\'-30 day\') ORDER BY trade_date DESC, trade_time DESC LIMIT 100').bind(latest.report_date).all()).results || [];
  const prev = history.length > 1 ? history[history.length - 2] : null;
  const cashWeight = latest.nav ? (latest.cash || 0) / latest.nav : null;
  const stockWeight = latest.nav ? (latest.stock_value || 0) / latest.nav : null;
  const mtdStart = history.find((x) => String(x.report_date).slice(0,7) === String(latest.report_date).slice(0,7));
  const mtdReturn = mtdStart && mtdStart.report_date !== latest.report_date
    ? latest.nav / (prevMonthBase(history, latest.report_date) ?? mtdStart.nav) - 1
    : latest.daily_return;
  return {
    ready: true,
    meta: { syncedAt: latest.synced_at, source: latest.source, pnlMethod: latest.pnl_method, latestDate: latest.report_date },
    account: {
      date: latest.report_date, nav: latest.nav, dailyPnl: latest.daily_pnl, dailyReturn: latest.daily_return,
      cash: latest.cash, cashWeight, stockValue: latest.stock_value, stockWeight,
      realizedPnl: latest.realized_pnl, unrealizedPnl: latest.unrealized_pnl, twr: latest.twr, mtdReturn,
      prevNav: prev?.nav ?? null,
    },
    positions: positions.map((p) => ({
      symbol:p.symbol, description:p.description, quantity:p.quantity, price:p.mark_price, marketValue:p.market_value,
      costBasis:p.cost_basis, unrealizedPnl:p.unrealized_pnl, dailyPnl:p.daily_pnl, dailyReturn:p.daily_return,
      unrealizedReturn:p.cost_basis && p.quantity ? p.unrealized_pnl / Math.abs(p.cost_basis * p.quantity) : null,
    })),
    history: history.map((x) => ({date:x.report_date, nav:x.nav, dailyPnl:x.daily_pnl, dailyReturn:x.daily_return, cash:x.cash, stockValue:x.stock_value, method:x.pnl_method})),
    trades: trades.map((t) => ({date:t.trade_date,time:t.trade_time,symbol:t.symbol,side:t.side,quantity:t.quantity,price:t.price,commission:t.commission,realizedPnl:t.realized_pnl,description:t.description})),
  };
}

function prevMonthBase(history, latestDate) {
  const month = String(latestDate).slice(0, 7);
  const firstIndex = history.findIndex((x) => String(x.report_date).slice(0,7) === month);
  if (firstIndex > 0) return history[firstIndex - 1].nav;
  return null;
}

function authorized(request, env) {
  const auth = request.headers.get('authorization') || '';
  return env.SYNC_SECRET && auth === `Bearer ${env.SYNC_SECRET}`;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    try {
      if (url.pathname === '/api/health') return json({ ok: true, now: new Date().toISOString() });
      if (url.pathname === '/api/dashboard') return json(await dashboard(env, url.searchParams.get('days') || 60));
      if (url.pathname === '/api/sync' && request.method === 'POST') {
        if (!authorized(request, env)) return json({ error: 'Unauthorized' }, 401);
        return json({ ok: true, ...(await sync(env, Number(url.searchParams.get('days') || 1))) });
      }
      if (url.pathname === '/api/backfill' && request.method === 'POST') {
        if (!authorized(request, env)) return json({ error: 'Unauthorized' }, 401);
        const days = Math.min(Math.max(Number(url.searchParams.get('days') || 30), 1), 365);
        return json({ ok: true, ...(await sync(env, days)), days });
      }
      if (request.method === 'GET' && (url.pathname === '/' || url.pathname === '/index.html')) {
        return new Response(PAGE_HTML, { headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-cache' } });
      }
      return new Response('Not Found', { status: 404 });
    } catch (e) {
      console.error(e);
      return json({ error: e?.message || String(e) }, 500);
    }
  },

  async scheduled(_controller, env, ctx) {
    ctx.waitUntil(sync(env, 1).catch((e) => console.error('scheduled sync failed', e)));
  },
};
