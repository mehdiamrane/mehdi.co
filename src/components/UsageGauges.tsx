/** @jsxImportSource hono/jsx */
import type { FC } from "hono/jsx";
import { Icon } from "./Icons";

export const UsageGauges: FC = () => {
  return (
    <>
      <header class="mb-12">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-semibold tracking-tight mb-2">Usage</h1>
            <p class="text-[var(--color-muted)]">Consumption across AI services</p>
          </div>
          <button id="refresh-btn" class="inline-flex items-center gap-2 px-4 py-2 text-sm border border-[var(--color-border)] rounded-full hover:border-[var(--color-accent)] transition-colors cursor-pointer">
            <Icon name="arrows-clockwise" size={14} />
            Refresh
          </button>
        </div>
        <p id="updated-at" class="text-xs text-[var(--color-muted)] mt-3"></p>
      </header>

      <div id="gauges" class="space-y-4">
        {['claude','openAi','cursor','zai','openCodeGo','deepSeek','openRouter','kiro'].map(name => (
          <div class="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-5 animate-pulse">
            <div class="h-4 w-24 bg-[var(--color-border)] rounded mb-3"></div>
            <div class="h-2 w-full bg-[var(--color-border)] rounded"></div>
          </div>
        ))}
      </div>

      <script
        dangerouslySetInnerHTML={{
          __html: `
(function(){
  const gaugeLabels = {
    openRouter: 'OpenRouter', deepSeek: 'DeepSeek', zai: 'Z.AI',
    claude: 'Claude', openAi: 'OpenAI Codex',
    kiro: 'Kiro', openCodeGo: 'OpenCode Go', cursor: 'Cursor',
  };

  const fmtNum = (n) => typeof n !== 'number' ? '?' : (n >= 1_000_000 ? (n/1_000_000).toFixed(1)+'M' : n >= 1_000 ? (n/1_000).toFixed(1)+'K' : n.toLocaleString());
  const fmtCost = (n) => typeof n !== 'number' ? '$?' : '$'+n.toFixed(2);

  function bar(pct, color, label) {
    return '<div class="flex items-center gap-3 mb-1.5"><span class="text-[11px] text-[var(--color-muted)] w-16 flex-shrink-0">'+label+'</span><div class="flex-1 h-1.5 bg-[var(--color-border)] rounded-full overflow-hidden"><div class="h-full '+color+' rounded-full transition-all duration-500" style="width:'+Math.min(pct,100)+'%" role="progressbar" aria-valuenow="'+Math.round(pct)+'" aria-valuemin="0" aria-valuemax="100" aria-label="'+label+'"></div></div><span class="text-[11px] text-[var(--color-muted)] tabular-nums w-10 text-right">'+Math.round(pct)+'%</span></div>';
  }

  function renderGauge(name, svc) {
    try {
    const label = gaugeLabels[name] || name;

    if (svc.status === 'not_configured') {
      return '<div class="rounded-2xl border border-dashed border-[var(--color-border)] bg-[var(--color-bg)] p-5"><div class="flex items-center justify-between"><h3 class="font-semibold text-sm text-[var(--color-muted)]">'+label+'</h3><span class="text-[11px] text-[var(--color-muted)] italic">not set up</span></div><p class="text-xs text-[var(--color-muted)] mt-1">'+(svc.error||'')+'</p></div>';
    }

    if (svc.status === 'error') {
      return '<div class="rounded-2xl border border-red-500/30 bg-red-500/5 p-5"><div class="flex items-center justify-between"><h3 class="font-semibold text-sm">'+label+'</h3><span class="text-xs text-red-500">⚠ fetch error</span></div><p class="text-xs text-[var(--color-muted)] mt-1">'+(svc.error||'Unknown error')+'</p></div>';
    }

    var html = '<div class="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-5">';

    // Z.AI — has tokensPct
    if (svc.tokensPct !== undefined) {
      var planLabel = svc.plan ? svc.plan.charAt(0).toUpperCase() + svc.plan.slice(1) : 'Coding';
      var title = label + ' ' + planLabel;
      var resetTime = svc.sessionResets ? new Date(svc.sessionResets).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'}) : '?';
      var resetUTC = svc.sessionResets ? new Date(svc.sessionResets).toISOString().slice(11,16)+'Z' : '?';
      var mcpColor = svc.sessionPct > 90 ? 'bg-red-500' : svc.sessionPct > 70 ? 'bg-yellow-500' : 'bg-green-500';
      var codingColor = svc.tokensPct > 90 ? 'bg-red-500' : svc.tokensPct > 70 ? 'bg-yellow-500' : 'bg-green-500';

      html += '<div class="flex items-center justify-between mb-3"><h3 class="font-semibold text-sm">'+title+'</h3><span class="text-[11px] text-[var(--color-muted)]" title="UTC: '+resetUTC+'">Resets '+resetTime+'</span></div>';
      html += bar(svc.tokensPct, codingColor, 'Coding wk.');
      html += bar(svc.sessionPct, mcpColor, 'MCP mo.');
      if (svc.sessionModels && svc.sessionModels.length) {
        var models = svc.sessionModels.map(function(m){ return m.modelCode+':'+m.usage+'%'; }).join(' · ');
        html += '<p class="text-[11px] text-[var(--color-muted)] mt-2">'+models+'</p>';
      }
    }
    // Claude — has weeklyPct
    else if (svc.weeklyPct !== undefined) {
      var planLabel = svc.plan ? svc.plan.charAt(0).toUpperCase() + svc.plan.slice(1) : 'Pro';
      var title = label + ' ' + planLabel;
      var resetLocal = svc.sessionResets ? new Date(svc.sessionResets) : null;
      var resetTime = resetLocal ? resetLocal.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'}) : '?';
      var resetUTC = resetLocal ? resetLocal.toISOString().slice(11,16)+'Z' : '?';
      var sessionColor = svc.sessionPct > 90 ? 'bg-red-500' : svc.sessionPct > 70 ? 'bg-yellow-500' : 'bg-green-500';
      var weeklyColor = svc.weeklyPct > 90 ? 'bg-red-500' : svc.weeklyPct > 70 ? 'bg-yellow-500' : 'bg-green-500';

      html += '<div class="flex items-center justify-between mb-3"><h3 class="font-semibold text-sm">'+title+'</h3><span class="text-[11px] text-[var(--color-muted)]" title="UTC: '+resetUTC+'">Resets '+resetTime+'</span></div>';
      html += bar(svc.sessionPct, sessionColor, 'Session');
      html += bar(svc.weeklyPct, weeklyColor, 'Weekly');
      html += '<p class="text-[11px] text-[var(--color-muted)] mt-2" title="Extra usage credits beyond plan limits">Overage '+(svc.overageCredits||0)+'/'+(svc.overageLimit||0)+' credits</p>';
    }
    // OpenRouter
    else if (svc.limit !== undefined) {
      var hasLimit = svc.limit !== null && svc.limit > 0;
      var pct = hasLimit ? (svc.used / svc.limit) * 100 : (svc.used > 0 ? 100 : 0);
      var color = hasLimit ? (pct > 90 ? 'bg-red-500' : pct > 70 ? 'bg-yellow-500' : 'bg-green-500') : 'bg-[var(--color-muted)]';
      var limitText = svc.limit === null ? 'no limit' : fmtCost(svc.limit);
      var balance = svc.totalCredits ? (svc.totalCredits - (svc.totalUsage || 0)).toFixed(2) : null;

      html += '<div class="flex items-center justify-between mb-1"><h3 class="font-semibold text-sm">'+label+'</h3><span class="text-xs text-[var(--color-muted)] tabular-nums">'+fmtCost(svc.used)+' / '+limitText+'</span></div>';
      html += hasLimit ? bar(pct, color, '') : '<div class="mb-2"></div>';
      html += '<p class="text-[11px] text-[var(--color-muted)] mt-1">Day '+fmtCost(svc.daily)+' · Week '+fmtCost(svc.weekly)+' · Month '+fmtCost(svc.monthly)+'</p>';
      if (balance) {
        html += '<p class="text-[11px] text-[var(--color-muted)]">Credits: '+fmtCost(svc.totalCredits)+' total · '+fmtCost(parseFloat(balance))+' remaining</p>';
      }
    }
    // DeepSeek
    else if (svc.totalBalance !== undefined) {
      html += '<div class="flex items-center justify-between mb-1"><h3 class="font-semibold text-sm">'+label+'</h3><span class="text-xs text-[var(--color-muted)] tabular-nums">'+fmtCost(svc.totalBalance)+'</span></div><div class="mb-2"></div><p class="text-[11px] text-[var(--color-muted)]">Granted '+fmtCost(svc.grantedBalance)+' · Topped '+fmtCost(svc.toppedUpBalance)+'</p>';
    }
    // OpenAI
    else if (svc.totalUsage !== undefined) {
      html += '<div class="flex items-center justify-between mb-1"><h3 class="font-semibold text-sm">'+label+'</h3><span class="text-xs text-[var(--color-muted)] tabular-nums">'+fmtCost(svc.totalUsage)+'</span></div><div class="mb-2"></div><p class="text-[11px] text-[var(--color-muted)]">Day '+fmtCost(svc.daily)+' · '+(svc.period||'')+'</p>';
    }
    // Kiro
    else if (svc.creditsUsed !== undefined) {
      var pct = svc.planCap > 0 ? (svc.creditsUsed / svc.planCap) * 100 : 0;
      var color = pct > 90 ? 'bg-red-500' : pct > 70 ? 'bg-yellow-500' : 'bg-green-500';
      html += '<div class="flex items-center justify-between mb-1"><h3 class="font-semibold text-sm">'+label+'</h3><span class="text-xs text-[var(--color-muted)] tabular-nums">'+fmtNum(svc.creditsUsed)+' / '+fmtNum(svc.planCap)+' credits</span></div>';
      html += bar(pct, color, '');
      html += '<p class="text-[11px] text-[var(--color-muted)] mt-1">Overages '+svc.overages+' · Est. '+fmtCost(svc.estimatedCost)+'</p>';
    } else {
      html += '<p class="text-sm text-[var(--color-muted)]">No data</p>';
    }

    html += '</div>';
    return html;
    } catch(e) {
      return '<div class="rounded-2xl border border-red-500/30 bg-red-500/5 p-5"><div class="flex items-center justify-between"><h3 class="font-semibold text-sm">'+(gaugeLabels[name]||name)+'</h3><span class="text-xs text-red-500">⚠ render error</span></div><p class="text-xs text-[var(--color-muted)] mt-1">'+e.message+'</p></div>';
    }
  }

  var order = ['claude','openAi','cursor','zai','openCodeGo','deepSeek','openRouter','kiro'];

  async function fetchUsage() {
    var container = document.getElementById('gauges');
    var updatedEl = document.getElementById('updated-at');
    var btn = document.getElementById('refresh-btn');
    if (!container || !btn) return;
    btn.setAttribute('disabled', 'true');
    btn.classList.add('refreshing');

    try {
      var res = await fetch('/api/usage');
      var data = await res.json();
      if (data.updated && updatedEl) updatedEl.textContent = 'Last updated: ' + new Date(data.updated).toLocaleString();

      var services = data.services || {};
      var entries = order.filter(function(k){ return k in services; }).map(function(k){ return [k, services[k]]; });
      var extra = Object.entries(services).filter(function(e){ return !order.includes(e[0]); });
      entries = entries.concat(extra);

      container.innerHTML = entries.length
        ? entries.map(function(e){ return renderGauge(e[0], e[1]); }).join('')
        : '<p class="text-[var(--color-muted)]">No data yet.</p>';
    } catch(e) {
      container.innerHTML = '<p class="text-red-500">Failed to fetch: ' + e.message + '</p>';
    } finally {
      btn.removeAttribute('disabled');
      btn.classList.remove('refreshing');
    }
  }

  var refreshBtn = document.getElementById('refresh-btn');
  if (refreshBtn) {
    refreshBtn.addEventListener('click', async function() {
      var btn = refreshBtn;
      btn.setAttribute('disabled', 'true');
      try { await fetch('/api/refresh', { method: 'POST' }); } catch(e) {}
      await fetchUsage();
    });
  }

  fetchUsage();
})();
`,
        }}
      />
    </>
  );
};
