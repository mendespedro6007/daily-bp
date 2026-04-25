const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxiOtyz17AutJpZodjADKVrtWgEtas9V407VS_c_a0oBuu_x2PT6Pn3wViKPX1AV1s/exec';

module.exports = async (req, res) => {
  const params = req.query || {};
  const qs = new URLSearchParams(params).toString();

  try {
    const response = await fetch(`${APPS_SCRIPT_URL}?${qs}`, {
      redirect: 'follow',
      headers: { 'Content-Type': 'application/json' }
    });
    const text = await response.text();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(text);
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
};
