/**
 * Cloudflare R2 Presigned Download Service
 * Fetches secure presigned URLs from POST /api/get-presigned-guide
 * Supports both individual guide downloads and multi-guide bundle suites.
 */

export interface PresignedDownloadItem {
  id: string;
  title?: string;
  pillar?: string;
  filename?: string;
  downloadUrl: string;
}

export interface PresignedGuideResponse {
  isBundle?: boolean;
  bundleId?: string;
  downloadUrl?: string;
  zipUrl?: string;
  downloads?: PresignedDownloadItem[];
}

/**
 * Triggers a download in the user's browser for a specific URL
 */
export const triggerBrowserDownload = (url: string, filename?: string) => {
  const link = document.createElement('a');
  link.href = url;
  link.target = '_blank';
  if (filename) {
    link.setAttribute('download', filename);
  } else {
    link.setAttribute('download', '');
  }
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Sequentially triggers downloads for multiple items
 */
export const downloadAllItems = (items: PresignedDownloadItem[]) => {
  items.forEach((item, index) => {
    setTimeout(() => {
      triggerBrowserDownload(item.downloadUrl, item.filename);
    }, index * 450);
  });
};

/**
 * Fetches presigned download URL(s) from the backend API
 */
export const fetchPresignedGuideData = async (guideId: string): Promise<PresignedGuideResponse | null> => {
  try {
    const response = await fetch('/api/get-presigned-guide', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ guideId })
    });

    if (!response.ok) {
      throw new Error(`Server returned HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('[guideDownloadService] Error fetching presigned URL:', error);
    return null;
  }
};

/**
 * Initiates secure guide download(s) directly from Cloudflare R2.
 * For bundles (e.g. 6-pillar suite):
 * - If a single ZIP bundle is available (data.zipUrl), triggers the 1-click ZIP download immediately.
 * - Also provides sequential individual triggers.
 */
export const handleSecureGuideDownload = async (
  guideId: string,
  options?: { preferZip?: boolean }
): Promise<{ success: boolean; data?: PresignedGuideResponse }> => {
  const data = await fetchPresignedGuideData(guideId);
  if (!data) return { success: false };

  // 1-Click ZIP bundle takes precedence for clean, browser-unblocked single-click download
  if (data.zipUrl && options?.preferZip !== false) {
    triggerBrowserDownload(data.zipUrl, 'Complete_6_Pillar_Master_Suite-2026.zip');
    return { success: true, data };
  }

  const items = data.downloads && data.downloads.length > 0
    ? data.downloads
    : data.downloadUrl
      ? [{ id: guideId, downloadUrl: data.downloadUrl }]
      : [];

  if (items.length === 0) return { success: false };

  // Sequentially trigger downloads with 450ms spacing
  downloadAllItems(items);

  return { success: true, data };
};
