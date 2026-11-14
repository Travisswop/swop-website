// Only a verified, notarized release can enable the public download.
(async () => {
  try {
    const response = await fetch('/ovi-desktop-release.json', { cache: 'no-store' });
    if (!response.ok) return;
    const { release } = await response.json();
    if (!release || release.notarized !== true || release.architecture !== 'arm64' ||
        release.minimumMacOS !== '14.0' || !/^\d+\.\d+\.\d+$/.test(release.version) ||
        !/^[a-f0-9]{64}$/.test(release.sha256) ||
        release.path !== `/downloads/OviDesktop-${release.version}-arm64.zip`) return;
    const link = document.getElementById('desktop-release-download');
    link.href = release.path;
    link.hidden = false;
    document.getElementById('desktop-release-status').textContent = `Version ${release.version} · Signed and notarized for Mac.`;
    const checksum = document.getElementById('desktop-release-checksum');
    checksum.textContent = `SHA-256: ${release.sha256}`;
    checksum.style.overflowWrap = 'anywhere';
    checksum.hidden = false;
  } catch { /* Keep the unavailable state if release metadata cannot be verified. */ }
})();
