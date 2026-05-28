/**
 * Dream Neighborhood Environment Switcher
 * 
 * For dev / QA / internal testing use only.
 * 
 * Usage:
 *   Include this script as EARLY as possible in <head>, BEFORE any
 *   dreamneighborhood.com script tags:
 * 
 *     <script src="js/dn-env-switcher.js"></script>
 * 
 *   Then load your normal SDK or inline scripts as usual (they will be
 *   automatically rewritten based on the current selection).
 * 
 *   The switcher UI will appear in the top-right corner.
 */

(function () {
  'use strict';

  var STORAGE_KEY = 'dn-env';
  var DEFAULT_ENV = 'staging';

  // Supported environments
  var ENVS = {
    staging: {
      label: 'STAGING',
      hostname: 'staging.dreamneighborhood.com',
      color: '#0ea5e9',      // sky blue
      bg: 'rgba(14, 165, 233, 0.1)'
    },
    production: {
      label: 'PRODUCTION',
      hostname: 'app.dreamneighborhood.com',
      color: '#dc2626',      // strong red
      bg: 'rgba(220, 38, 38, 0.12)'
    }
  };

  function getCurrentEnv() {
    var saved = localStorage.getItem(STORAGE_KEY);
    return (saved === 'production' || saved === 'staging') ? saved : DEFAULT_ENV;
  }

  function setCurrentEnv(env) {
    if (env !== 'staging' && env !== 'production') env = DEFAULT_ENV;
    localStorage.setItem(STORAGE_KEY, env);
    return env;
  }

  function getTargetHostname() {
    return ENVS[getCurrentEnv()].hostname;
  }

  // Rewrite a single URL string to the current environment
  function rewriteUrl(url) {
    if (!url || typeof url !== 'string') return url;
    // Handle both staging and production domains
    return url
      .replace(/https?:\/\/(staging\.)?dreamneighborhood\.com/gi, 'https://' + getTargetHostname())
      .replace(/https?:\/\/app\.dreamneighborhood\.com/gi, 'https://' + getTargetHostname());
  }

  // Patch any <script> tags that are still in the DOM and haven't executed yet
  // (must be called synchronously before those script tags are parsed/executed)
  function patchScriptTags() {
    var scripts = document.getElementsByTagName('script');
    for (var i = 0; i < scripts.length; i++) {
      var s = scripts[i];
      var src = s.getAttribute('src');
      if (src && /dreamneighborhood\.com/i.test(src)) {
        var newSrc = rewriteUrl(src);
        if (newSrc !== src) {
          s.setAttribute('src', newSrc);
        }
      }
    }
  }

  // Patch any iframes (mainly widget embeds on property pages)
  function patchIframes() {
    var iframes = document.getElementsByTagName('iframe');
    for (var i = 0; i < iframes.length; i++) {
      var f = iframes[i];
      var src = f.getAttribute('src');
      if (src && /dreamneighborhood\.com/i.test(src)) {
        var newSrc = rewriteUrl(src);
        if (newSrc !== src) {
          f.setAttribute('src', newSrc);
        }
      }
    }
  }

  // Run early patching as soon as this script executes
  patchScriptTags();

  // Also patch again after DOM is ready (catches late-added scripts/iframes)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      patchScriptTags();
      patchIframes();
    });
  } else {
    patchIframes();
  }

  // Expose a small global API for advanced use / console debugging
  window.DN_ENV = {
    get: getCurrentEnv,
    set: function (env) {
      var previous = getCurrentEnv();
      var next = setCurrentEnv(env);
      if (next !== previous) {
        // Force a clean reload so all scripts pick up the new env
        location.reload();
      }
    },
    toggle: function () {
      var next = (getCurrentEnv() === 'staging') ? 'production' : 'staging';
      this.set(next);
    },
    currentHostname: function () {
      return getTargetHostname();
    },
    rewriteUrl: rewriteUrl
  };

  // ------------------------------------------------------------------
  // Floating UI (only created once)
  // ------------------------------------------------------------------
  function createUI() {
    // Avoid creating multiple times
    if (document.getElementById('dn-env-switcher')) return;

    var env = getCurrentEnv();
    var cfg = ENVS[env];

    // Container
    var container = document.createElement('div');
    container.id = 'dn-env-switcher';
    container.setAttribute('role', 'group');
    container.setAttribute('aria-label', 'Dream Neighborhood environment switcher');

    // Style the pill
    Object.assign(container.style, {
      position: 'fixed',
      top: '12px',
      right: '12px',
      zIndex: '2147483647',
      fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
      fontSize: '12px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '6px 10px',
      background: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '9999px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      cursor: 'pointer',
      userSelect: 'none',
      transition: 'all 0.2s ease'
    });

    // Label
    var label = document.createElement('span');
    label.textContent = 'DN';
    Object.assign(label.style, {
      fontWeight: '700',
      color: '#374151',
      paddingLeft: '2px'
    });

    // Current environment badge
    var badge = document.createElement('span');
    badge.id = 'dn-env-badge';
    badge.textContent = cfg.label;
    Object.assign(badge.style, {
      fontWeight: '700',
      fontSize: '11px',
      letterSpacing: '0.5px',
      padding: '2px 8px',
      borderRadius: '9999px',
      background: cfg.bg,
      color: cfg.color,
      border: '1px solid ' + cfg.color + '33'
    });

    // Toggle switch (visual only)
    var toggle = document.createElement('div');
    Object.assign(toggle.style, {
      width: '32px',
      height: '16px',
      background: (env === 'production') ? '#dc2626' : '#64748b',
      borderRadius: '9999px',
      position: 'relative',
      transition: 'background 0.2s ease'
    });

    var knob = document.createElement('div');
    Object.assign(knob.style, {
      position: 'absolute',
      top: '2px',
      left: (env === 'production') ? '16px' : '2px',
      width: '12px',
      height: '12px',
      background: 'white',
      borderRadius: '50%',
      boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
      transition: 'left 0.2s ease'
    });
    toggle.appendChild(knob);

    // Tooltip / title
    container.title = 'Click to switch Dream Neighborhood environment\nCurrent: ' + cfg.label;

    // Assemble
    container.appendChild(label);
    container.appendChild(badge);
    container.appendChild(toggle);

    // Click handler
    container.addEventListener('click', function (e) {
      e.preventDefault();
      var current = getCurrentEnv();
      var next = (current === 'staging') ? 'production' : 'staging';

      // Update localStorage
      setCurrentEnv(next);

      // Visual flash + reload
      container.style.transition = 'none';
      container.style.opacity = '0.3';
      setTimeout(function () {
        location.reload();
      }, 80);
    });

    // Keyboard support
    container.setAttribute('tabindex', '0');
    container.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        container.click();
      }
    });

    document.body.appendChild(container);

    // Optional: show a stronger warning banner when on PRODUCTION
    if (env === 'production') {
      var warning = document.createElement('div');
      warning.id = 'dn-prod-warning';
      warning.textContent = '⚠ PRODUCTION — Dream Neighborhood live endpoints';
      Object.assign(warning.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        zIndex: '2147483646',
        background: '#dc2626',
        color: 'white',
        fontSize: '11px',
        fontWeight: '600',
        textAlign: 'center',
        padding: '3px 8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
        pointerEvents: 'none'
      });
      document.body.appendChild(warning);

      // Push the switcher down a bit so it doesn't overlap the banner
      container.style.top = '28px';
    }
  }

  // Create the UI when the DOM is ready
  function initUI() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', createUI);
    } else {
      createUI();
    }
  }

  // Boot the UI
  initUI();

  // Also expose the rewriter for manual use from console if needed
  window.DN_ENV.patchNow = function () {
    patchScriptTags();
    patchIframes();
  };

  // Helpful console message for devs
  if (typeof console !== 'undefined' && console.log) {
    var current = getCurrentEnv();
    console.log('%c[DN Env] Dream Neighborhood environment: ' + current.toUpperCase() +
      ' (click the pill in the top-right to toggle)', 'color:#64748b');
  }
})();
