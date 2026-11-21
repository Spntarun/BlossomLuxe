const https = require('https');

const candidates = [
  'photo-1610030469983-98e550d6193c', // Indian ethnic bridal / lehenga
  'photo-1583391733956-3750e0ff4e8b', // Indian traditional saree
  'photo-1566174053879-31528523f8ae', // Royal red evening gown
  'photo-1515372039744-b8f02a3ae446', // Elegant dress
  'photo-1539109136881-3be0616acf4b', // Fashion model high fashion
  'photo-1509631179647-0177331693ae', // Fashion model portrait styling
  'photo-1490481651871-ab68de25d43d', // Chic outfit
  'photo-1496747611176-843222e1e57c', // Floral dress
  'photo-1518049362265-d5b2a6467637', // Silk satin blouse
  'photo-1529139574466-a303027c1d8b', // Trendy fashion
  'photo-1502716119720-b23a93e5fe1b', // Chic woman dress
  'photo-1572804013309-59a88b7e92f1', // Pink gown
  'photo-1581044777550-4cfa60707c03', // Elegant satin top
  'photo-1558769132-cb1aea458c5e', // Fashion runway
  'photo-1550614000-4895a10e1bfd', // High fashion look
  'photo-1551803091-e20673f15770', // Modern ethnic fusion
  'photo-1567401893414-76b7b1e5a7a5', // Silk luxury fabric
  'photo-1562157873-818bc0726f68', // Luxury fashion dress
  'photo-1576995853123-5a10305d93c0', // Indo-western corset gown
  'photo-1549062572-544a64fb0c52', // Red luxury gown
  'photo-1524504388940-b1c1722653e1', // Woman in dress
  'photo-1534528741775-53994a69daeb', // Model look
  'photo-1517841905240-472988babdf9', // Casual chic
  'photo-1485968579580-b6d095142e6e', // Fashion styling
  'photo-1469334031218-e382a71b716b', // Boho chic fusion
  'photo-1503342217505-b0a15ec3261c', // Modern top
  'photo-1534126511673-b6899657816a', // Chic evening wear
  'photo-1515886657613-9f3515b0c78f', // Bright stylish outfit
  'photo-1554412933-514a83d2f3c8', // Satin corset dress
  'photo-1500917293891-ef795ce70e53'  // Fashion portrait
];

function checkUrl(id) {
  return new Promise((resolve) => {
    const url = `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=80`;
    const req = https.request(url, { method: 'HEAD' }, (res) => {
      resolve({ id, status: res.statusCode, ok: res.statusCode >= 200 && res.statusCode < 400 });
    });
    req.on('error', () => resolve({ id, status: 0, ok: false }));
    req.setTimeout(5000, () => {
      req.destroy();
      resolve({ id, status: 0, ok: false });
    });
    req.end();
  });
}

async function run() {
  const results = await Promise.all(candidates.map(checkUrl));
  const valid = results.filter(r => r.ok).map(r => r.id);
  console.log('VALID COUNT:', valid.length);
  console.log(JSON.stringify(valid, null, 2));
}

run();

