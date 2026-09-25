// Serves the static site; adds byte-range (206) responses for video so iPhone Safari can play it.
export default {
  async fetch(req, env) {
    const res = await env.ASSETS.fetch(new Request(req.url, { method: 'GET' }));
    const range = req.headers.get('Range');
    const m = range && /^bytes=(\d*)-(\d*)$/.exec(range);
    if (!m || res.status !== 200) return req.method === 'HEAD' ? new Response(null, res) : res;
    const buf = await res.arrayBuffer();
    const size = buf.byteLength;
    let start, end;
    if (m[1] === '') { start = Math.max(0, size - Number(m[2])); end = size - 1; }
    else { start = Number(m[1]); end = m[2] ? Math.min(Number(m[2]), size - 1) : size - 1; }
    if (start >= size || start > end) return new Response(null, { status: 416, headers: { 'Content-Range': `bytes */${size}` } });
    const h = new Headers(res.headers);
    h.set('Content-Range', `bytes ${start}-${end}/${size}`);
    h.set('Content-Length', String(end - start + 1));
    h.set('Accept-Ranges', 'bytes');
    return new Response(req.method === 'HEAD' ? null : buf.slice(start, end + 1), { status: 206, headers: h });
  }
};
