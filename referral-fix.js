// ── REFERRAL HANDLER FOR beginforever.in ──────────────────────────────
// Add this script to beginforever.in index.html just before </body>
// It does two things:
// 1. Reads ?ref=XXXX from the URL and redirects to beginforever.app with the same ref
// 2. Fixes the "Get My Referral Link" popup button to open beginforever.app instead of website

(function() {
  // 1. Handle incoming ?ref= param — redirect to app
  var params = new URLSearchParams(window.location.search);
  var ref = params.get('ref');
  if (ref) {
    // Store ref in localStorage so the app can pick it up
    try { localStorage.setItem('bf_ref', ref); } catch(e) {}
    // Redirect to app with ref param
    window.location.replace('https://beginforever.app?ref=' + encodeURIComponent(ref));
    return; // Stop here, page is redirecting
  }

  // 2. Fix "Get My Referral Link" button in popup
  // Wait for DOM to be ready
  function fixReferralButton() {
    // Find all buttons/links that say "Get My Referral Link" or similar
    document.querySelectorAll('a, button').forEach(function(el) {
      var txt = (el.textContent || el.innerText || '').trim().toLowerCase();
      if (txt.includes('get my referral') || txt.includes('referral link') || txt.includes('get referral')) {
        el.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          // Open app registration — they will get their referral link inside the app
          window.open('https://beginforever.app', '_blank');
        });
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fixReferralButton);
  } else {
    fixReferralButton();
  }
})();
