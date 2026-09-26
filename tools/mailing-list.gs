/**
 * just jokes: mailing list -> Google Sheet
 * Paste this into the sheet's Extensions > Apps Script, then Deploy > New deployment > Web app.
 * The website posts signups here; each new email becomes one row. The sheet itself stays private.
 */
const SHEET_NAME = 'signups';
const NOTIFY_EMAIL = ''; // optional: put an address here to get an email for every new signup

function doPost(e) {
  const p = (e && e.parameter) || {};
  if (p._honey) return json({ ok: true }); // spam bot trap: pretend it worked, save nothing

  const email = String(p.email || '').trim().toLowerCase();
  const wa = String(p.whatsapp || '').trim();
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ ok: false, error: 'bad email' });
  if (wa && !/^[0-9 +\-()]{8,20}$/.test(wa)) return json({ ok: false, error: 'bad whatsapp' });

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    if (sh.getLastRow() === 0) sh.appendRow(['signed up', 'email', 'whatsapp', 'source']);
    const last = sh.getLastRow();
    const existing = last > 1 ? sh.getRange(2, 2, last - 1, 1).getValues().flat().map(String) : [];
    if (existing.indexOf(email) === -1 && existing.indexOf("'" + email) === -1) {
      sh.appendRow([new Date(), safe(email), safe(wa), safe(String(p.source || 'website').trim().slice(0, 60))]);
      if (NOTIFY_EMAIL) MailApp.sendEmail(NOTIFY_EMAIL, 'New just jokes: signup', email + (wa ? '\nWhatsApp: ' + wa : ''));
    }
  } finally {
    lock.releaseLock();
  }
  return json({ ok: true });
}

// stop anything that looks like a spreadsheet formula from being run
function safe(s) { return /^[=+\-@\t\r]/.test(s) ? "'" + s : s; }
function json(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
