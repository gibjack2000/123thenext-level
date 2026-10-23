/**
 * Triggers a secure, temporary presigned download for a guide directly from Cloudflare R2
 * via the backend endpoint POST /api/get-presigned-guide.
 *
 * @param guideId e.g. 'beginner-home-workout', 'master-meal-planning', 'cortisol-stress-management', 'next-level-lifespan'
 */
export const handleSecureGuideDownload = async (guideId: string): Promise<boolean> => {
  try {
    const response = await fetch('/api/get-presigned-guide', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ guideId })
    });

    if (!response.ok) {
      throw new Error(`Server returned HTTP ${response.status}`);
    }

    const { downloadUrl } = await response.json();

    if (downloadUrl) {
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.target = '_blank';
      link.setAttribute('download', '');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return true;
    } else {
      console.warn('No downloadUrl returned from /api/get-presigned-guide');
      return false;
    }
  } catch (error) {
    console.error('Error fetching presigned R2 download link:', error);
    return false;
  }
};
