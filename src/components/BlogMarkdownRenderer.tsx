import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight, Sparkles, BookOpen, Activity, CheckCircle2 } from 'lucide-react';
import DynamicProductCard from './blog/DynamicProductCard';

interface BlogMarkdownRendererProps {
  content: string;
  className?: string;
  theme?: 'light' | 'dark' | 'auto';
  affiliateUrl?: string;
}

// Normalize URLs to convert internal site links to client-side router paths
function normalizeUrl(rawUrl: string): { url: string; isInternal: boolean; internalPath?: string } {
  if (!rawUrl) return { url: '#', isInternal: false };
  let cleaned = rawUrl.trim();

  // Check if link matches full site domain or localhost
  if (
    cleaned.startsWith('https://123thenextlevel.com') ||
    cleaned.startsWith('http://123thenextlevel.com') ||
    cleaned.startsWith('https://www.123thenextlevel.com') ||
    cleaned.startsWith('http://www.123thenextlevel.com') ||
    cleaned.startsWith('http://localhost')
  ) {
    try {
      const urlObj = new URL(cleaned);
      return {
        url: cleaned,
        isInternal: true,
        internalPath: urlObj.pathname + urlObj.search + urlObj.hash
      };
    } catch {}
  }

  // Relative internal path
  if (cleaned.startsWith('/')) {
    return {
      url: cleaned,
      isInternal: true,
      internalPath: cleaned
    };
  }

  // External web link
  if (!cleaned.startsWith('http://') && !cleaned.startsWith('https://') && !cleaned.startsWith('//') && !cleaned.startsWith('mailto:')) {
    cleaned = 'https://' + cleaned;
  }

  return {
    url: cleaned,
    isInternal: false
  };
}

// Extract attributes from <ProductCard ... /> tag
function extractProductCardProps(tagString: string): {
  id: string;
  productType?: string;
  dealBtnText?: string;
} | null {
  const idMatch = tagString.match(/(?:id|productId|product_id)=["']([^"']+)["']/i);
  if (!idMatch) return null;
  const id = idMatch[1].trim();

  const typeMatch = tagString.match(/(?:productType|type)=["']([^"']+)["']/i);
  const btnMatch = tagString.match(/(?:dealBtnText|btnText)=["']([^"']+)["']/i);

  return {
    id,
    productType: typeMatch ? typeMatch[1].trim() : undefined,
    dealBtnText: btnMatch ? btnMatch[1].trim() : undefined
  };
}

// Extract data-product-id from HTML element
function extractDataProductId(htmlString: string): string | null {
  const match = htmlString.match(/data-product-id=["']([^"']+)["']/i);
  return match ? match[1].trim() : null;
}

export const BlogMarkdownRenderer: React.FC<BlogMarkdownRendererProps> = ({
  content,
  className = '',
  theme = 'auto',
  affiliateUrl
}) => {
  if (!content) return null;

  const isDark = theme === 'dark' || (theme === 'auto' && true);

  // Helper to format inline markdown (bold, italic, inline code, links)
  const renderInlineFormattedText = (rawText: string, keyPrefix: string = 'inline'): React.ReactNode[] => {
    if (!rawText) return [];

    // Comprehensive token regex handling:
    // 1. Bold link: **[text](url)**
    // 2. Italic link: *[text](url)* or _[text](url)_
    // 3. Regular link: [text](url)
    // 4. Bold text: **text**
    // 5. Italic text: *text* or _text_
    // 6. Inline code: `text`
    const tokenRegex = /(?:\*\*\[([^\]]+)\]\(([^)]+)\)\*\*|\*\[([^\]]+)\]\(([^)]+)\)\*|\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*|_([^_]+)_|`([^`]+)`)/g;

    const nodes: React.ReactNode[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = tokenRegex.exec(rawText)) !== null) {
      // Unformatted text before match
      if (match.index > lastIndex) {
        nodes.push(rawText.substring(lastIndex, match.index));
      }

      const [
        ,
        boldLinkText,
        boldLinkUrl,
        italicLinkText,
        italicLinkUrl,
        regLinkText,
        regLinkUrl,
        boldText,
        italicTextStar,
        italicTextUnderscore,
        codeText
      ] = match;

      const linkText = boldLinkText || italicLinkText || regLinkText;
      const linkUrl = boldLinkUrl || italicLinkUrl || regLinkUrl;
      const isBoldLink = Boolean(boldLinkText);
      const isItalicLink = Boolean(italicLinkText);
      const plainItalic = italicTextStar || italicTextUnderscore;

      if (linkText && linkUrl) {
        const { url: validUrl, isInternal, internalPath } = normalizeUrl(linkUrl);
        const isQuiz = validUrl.includes('health-quiz') || validUrl.includes('/quiz');
        const isStore = validUrl.includes('/store');
        const isGuide = validUrl.includes('premium-guides') || validUrl.includes('/guides');

        const linkStyles = `inline-flex items-baseline gap-1 font-bold underline decoration-2 underline-offset-2 transition-all duration-200 cursor-pointer ${
          isDark
            ? isQuiz
              ? 'text-emerald-400 decoration-emerald-500/50 hover:text-emerald-300 hover:decoration-emerald-400'
              : isGuide
              ? 'text-indigo-400 decoration-indigo-500/50 hover:text-indigo-300 hover:decoration-indigo-400'
              : isStore
              ? 'text-cyan-400 decoration-cyan-500/50 hover:text-cyan-300 hover:decoration-cyan-400'
              : 'text-blue-400 decoration-blue-500/50 hover:text-blue-300 hover:decoration-blue-400'
            : isQuiz
            ? 'text-emerald-600 decoration-emerald-500/40 hover:text-emerald-700 hover:decoration-emerald-600'
            : isGuide
            ? 'text-indigo-600 decoration-indigo-500/40 hover:text-indigo-700 hover:decoration-indigo-600'
            : isStore
            ? 'text-cyan-600 decoration-cyan-500/40 hover:text-cyan-700 hover:decoration-cyan-600'
            : 'text-blue-600 decoration-blue-500/40 hover:text-blue-800 hover:decoration-blue-600'
        }`;

        const innerContent = (
          <>
            <span className={isBoldLink ? 'font-black' : isItalicLink ? 'italic font-bold' : 'font-bold'}>
              {linkText}
            </span>
            {!isInternal && <ExternalLink size={12} className="inline opacity-75 shrink-0 self-center ml-0.5" />}
          </>
        );

        if (isInternal && internalPath) {
          nodes.push(
            <Link
              key={`${keyPrefix}-link-${match.index}`}
              to={internalPath}
              className={linkStyles}
            >
              {innerContent}
            </Link>
          );
        } else {
          nodes.push(
            <a
              key={`${keyPrefix}-link-${match.index}`}
              href={validUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={linkStyles}
            >
              {innerContent}
            </a>
          );
        }
      } else if (boldText) {
        // If bold text contains nested markdown link e.g. [text](url), parse recursively
        if (boldText.includes('[') && boldText.includes('](')) {
          nodes.push(
            <strong key={`${keyPrefix}-b-${match.index}`} className={isDark ? 'font-black text-white' : 'font-black text-slate-900'}>
              {renderInlineFormattedText(boldText, `${keyPrefix}-b-nested-${match.index}`)}
            </strong>
          );
        } else {
          nodes.push(
            <strong key={`${keyPrefix}-b-${match.index}`} className={isDark ? 'font-bold text-white' : 'font-bold text-slate-900'}>
              {boldText}
            </strong>
          );
        }
      } else if (plainItalic) {
        nodes.push(
          <em key={`${keyPrefix}-i-${match.index}`} className="italic">
            {plainItalic}
          </em>
        );
      } else if (codeText) {
        nodes.push(
          <code
            key={`${keyPrefix}-c-${match.index}`}
            className={`px-1.5 py-0.5 rounded text-xs font-mono ${
              isDark ? 'bg-slate-800 text-cyan-300 border border-slate-700' : 'bg-slate-100 text-slate-800 border border-slate-200'
            }`}
          >
            {codeText}
          </code>
        );
      }

      lastIndex = tokenRegex.lastIndex;
    }

    if (lastIndex < rawText.length) {
      nodes.push(rawText.substring(lastIndex));
    }

    return nodes;
  };

  // Block parser
  const lines = content.split('\n');
  const blocks: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // 1. Empty lines
    if (!trimmed) {
      i++;
      continue;
    }

    // 2. Dynamic Product Card Tag: <ProductCard id="..." /> or <ProductCard ...>...</ProductCard>
    if (/^<ProductCard[\s/>]/i.test(trimmed)) {
      let fullTag = trimmed;
      // If tag spans multiple lines until closing
      if (!trimmed.endsWith('/>') && !trimmed.includes('</ProductCard>')) {
        let j = i + 1;
        while (j < lines.length && !lines[j].includes('/>') && !lines[j].includes('</ProductCard>')) {
          fullTag += ' ' + lines[j].trim();
          j++;
        }
        if (j < lines.length) {
          fullTag += ' ' + lines[j].trim();
          i = j;
        }
      }

      const cardProps = extractProductCardProps(fullTag);
      if (cardProps && cardProps.id) {
        blocks.push(
          <DynamicProductCard
            key={`product-card-${i}-${cardProps.id}`}
            id={cardProps.id}
            theme={theme}
            productType={cardProps.productType}
            dealBtnText={cardProps.dealBtnText}
          />
        );
        i++;
        continue;
      }
    }

    // 3. Fenced code block (ASCII diagrams, code snippets)
    if (trimmed.startsWith('```')) {
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // consume closing ```
      const codeString = codeLines.join('\n');
      blocks.push(
        <div key={`code-${i}`} className="my-8 rounded-2xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-950">
          <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800 text-[11px] text-slate-400 font-mono select-none">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block animate-pulse"></span>
              DIAGNOSTIC TELEMETRY & SYSTEMS FLOWCHART
            </span>
            <span className="text-[10px] uppercase tracking-wider text-slate-500">ASCII Architecture</span>
          </div>
          <pre className="p-4 sm:p-6 overflow-x-auto text-xs sm:text-[13px] font-mono leading-relaxed text-emerald-400 selection:bg-emerald-900 selection:text-white">
            <code>{codeString}</code>
          </pre>
        </div>
      );
      continue;
    }

    // 4. Raw HTML Block (e.g. <div data-product-id="...">, <div class="product-card-box">, or SVG infographics)
    if (
      trimmed.startsWith('<div') ||
      trimmed.startsWith('<section') ||
      trimmed.startsWith('<article') ||
      trimmed.startsWith('<figure') ||
      trimmed.startsWith('<table') ||
      (trimmed.startsWith('<') && !trimmed.startsWith('<!--') && !trimmed.startsWith('<http'))
    ) {
      const htmlLines: string[] = [];
      let depth = 0;
      let j = i;

      while (j < lines.length) {
        const curLine = lines[j];
        htmlLines.push(curLine);

        const opens = (curLine.match(/<(div|section|article|figure|table|svg)[\s>]/gi) || []).length;
        const closes = (curLine.match(/<\/(div|section|article|figure|table|svg)>/gi) || []).length;
        depth += opens - closes;

        if (depth <= 0 && (opens > 0 || closes > 0)) {
          j++;
          break;
        }
        j++;
      }

      const htmlString = htmlLines.join('\n');
      i = j;

      // Check if this HTML block has a data-product-id attribute or an embedded <ProductCard
      const dataProdId = extractDataProductId(htmlString);
      const embeddedCardProps = extractProductCardProps(htmlString);

      if (dataProdId) {
        blocks.push(
          <DynamicProductCard
            key={`html-prod-${i}-${dataProdId}`}
            id={dataProdId}
            theme={theme}
          />
        );
        continue;
      } else if (embeddedCardProps && embeddedCardProps.id) {
        blocks.push(
          <DynamicProductCard
            key={`html-prod-embed-${i}-${embeddedCardProps.id}`}
            id={embeddedCardProps.id}
            theme={theme}
            productType={embeddedCardProps.productType}
            dealBtnText={embeddedCardProps.dealBtnText}
          />
        );
        continue;
      }

      // Check if it's a legacy static product-card-box without data-product-id
      if (htmlString.includes('class="product-card-box"') || htmlString.includes("class='product-card-box'")) {
        // Attempt to extract product ID from amazon ASIN or image in the HTML block
        const asinMatch = htmlString.match(/\/dp\/([A-Z0-9]{10})/i);
        const imgMatch = htmlString.match(/\/shop\/([a-zA-Z0-9_-]+)\.(png|jpg|webp|jpeg)/i);
        const derivedId = imgMatch ? imgMatch[1] : asinMatch ? `amazon-${asinMatch[1]}` : null;

        if (derivedId) {
          blocks.push(
            <DynamicProductCard
              key={`legacy-prod-${i}-${derivedId}`}
              id={derivedId}
              theme={theme}
            />
          );
          continue;
        }
      }

      // Standard HTML Block rendering (e.g. SVG infographics, styled callouts)
      blocks.push(
        <div
          key={`html-block-${i}`}
          className="my-4 blog-html-block"
          dangerouslySetInnerHTML={{ __html: htmlString }}
        />
      );
      continue;
    }

    // 5. Markdown Table (lines with |)
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('|') && lines[i].trim().endsWith('|')) {
        tableLines.push(lines[i].trim());
        i++;
      }

      if (tableLines.length >= 2) {
        const headerRow = tableLines[0]
          .split('|')
          .slice(1, -1)
          .map((c) => c.trim());
        // line 1 is separator |---|---|
        const bodyRows = tableLines.slice(2).map((r) =>
          r
            .split('|')
            .slice(1, -1)
            .map((c) => c.trim())
        );

        blocks.push(
          <div key={`table-${i}`} className="my-8 overflow-x-auto rounded-2xl border border-slate-800 shadow-xl bg-slate-950/60 backdrop-blur-md">
            <table className="w-full text-left border-collapse text-xs sm:text-sm font-sans">
              <thead>
                <tr className={theme === 'dark' ? 'bg-slate-900/90 border-b border-slate-800' : 'bg-slate-100 border-b border-slate-300'}>
                  {headerRow.map((h, hIdx) => (
                    <th key={hIdx} className={`py-3.5 px-4 font-bold uppercase tracking-wider text-[11px] ${theme === 'dark' ? 'text-slate-300' : 'text-slate-800'}`}>
                      {renderInlineFormattedText(h, `th-${hIdx}`)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {bodyRows.map((row, rIdx) => (
                  <tr key={rIdx} className={`${theme === 'dark' ? 'hover:bg-slate-900/40' : 'hover:bg-slate-50'} transition-colors`}>
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className={`py-3 px-4 leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                        {renderInlineFormattedText(cell, `td-${rIdx}-${cIdx}`)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        continue;
      }
    }

    // 6. Standalone Image: ![alt](url)
    const imgMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imgMatch) {
      const alt = imgMatch[1];
      const url = imgMatch[2];
      blocks.push(
        <div key={`img-${i}`} className="my-10 rounded-[2rem] overflow-hidden border border-slate-800 shadow-2xl group relative bg-slate-950">
          <a href={affiliateUrl || url} target="_blank" rel="noopener noreferrer" className="block relative">
            <img src={url} alt={alt} className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-500" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
          </a>
          {alt && <p className="text-center text-xs text-slate-500 py-2.5 bg-slate-950/80 border-t border-slate-800/60">{alt}</p>}
        </div>
      );
      i++;
      continue;
    }

    // 7. Headings
    if (trimmed.startsWith('# ')) {
      blocks.push(
        <h1 key={`h1-${i}`} className={`font-display uppercase tracking-tight text-3xl sm:text-4xl mt-14 mb-8 font-extrabold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
          {renderInlineFormattedText(trimmed.replace('# ', ''), `h1-${i}`)}
        </h1>
      );
      i++;
      continue;
    }
    if (trimmed.startsWith('## ')) {
      blocks.push(
        <h2 key={`h2-${i}`} className={`font-display uppercase tracking-tight text-2xl sm:text-3xl mt-12 mb-6 font-bold pb-2 border-b ${theme === 'dark' ? 'text-white border-slate-800/80' : 'text-slate-900 border-slate-200'}`}>
          {renderInlineFormattedText(trimmed.replace('## ', ''), `h2-${i}`)}
        </h2>
      );
      i++;
      continue;
    }
    if (trimmed.startsWith('### ')) {
      blocks.push(
        <h3 key={`h3-${i}`} className={`font-display uppercase tracking-tight text-xl sm:text-2xl mt-8 mb-4 font-bold ${theme === 'dark' ? 'text-cyan-400' : 'text-slate-800'}`}>
          {renderInlineFormattedText(trimmed.replace('### ', ''), `h3-${i}`)}
        </h3>
      );
      i++;
      continue;
    }
    if (trimmed.startsWith('#### ')) {
      blocks.push(
        <h4 key={`h4-${i}`} className={`font-display uppercase tracking-wider text-base sm:text-lg mt-6 mb-3 font-semibold ${theme === 'dark' ? 'text-slate-200' : 'text-slate-800'}`}>
          {renderInlineFormattedText(trimmed.replace('#### ', ''), `h4-${i}`)}
        </h4>
      );
      i++;
      continue;
    }

    // 8. Horizontal Rule
    if (trimmed === '---' || trimmed === '***' || trimmed === '___') {
      blocks.push(
        <hr key={`hr-${i}`} className={`my-10 border-0 h-[1px] ${theme === 'dark' ? 'bg-gradient-to-r from-transparent via-slate-700 to-transparent' : 'bg-gradient-to-r from-transparent via-slate-300 to-transparent'}`} />
      );
      i++;
      continue;
    }

    // 9. Blockquote
    if (trimmed.startsWith('> ')) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('> ')) {
        quoteLines.push(lines[i].trim().replace(/^>\s*/, ''));
        i++;
      }
      blocks.push(
        <blockquote
          key={`quote-${i}`}
          className={`my-6 pl-5 py-2 border-l-4 italic rounded-r-xl ${
            theme === 'dark'
              ? 'border-blue-500 bg-blue-950/20 text-blue-200'
              : 'border-blue-600 bg-blue-50/50 text-slate-700'
          }`}
        >
          {quoteLines.map((ql, qIdx) => (
            <p key={qIdx} className="my-1">
              {renderInlineFormattedText(ql, `quote-${i}-${qIdx}`)}
            </p>
          ))}
        </blockquote>
      );
      continue;
    }

    // 10. Unordered List Items (- or *)
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      const listItems: string[] = [];
      while (i < lines.length && (lines[i].trim().startsWith('- ') || lines[i].trim().startsWith('* '))) {
        listItems.push(lines[i].trim().replace(/^[-*]\s+/, ''));
        i++;
      }
      blocks.push(
        <ul key={`ul-${i}`} className="my-5 space-y-2 list-none pl-2">
          {listItems.map((item, idx) => (
            <li key={idx} className={`flex items-start gap-2.5 text-sm sm:text-base leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
              <span className={`mt-2 w-1.5 h-1.5 rounded-full shrink-0 ${theme === 'dark' ? 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)]' : 'bg-blue-600'}`}></span>
              <div>{renderInlineFormattedText(item, `ul-${i}-${idx}`)}</div>
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // 11. Ordered List Items (1. 2. etc)
    if (/^\d+\.\s+/.test(trimmed)) {
      const listItems: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        listItems.push(lines[i].trim().replace(/^\d+\.\s+/, ''));
        i++;
      }
      blocks.push(
        <ol key={`ol-${i}`} className="my-5 space-y-2.5 pl-2 list-none">
          {listItems.map((item, idx) => (
            <li key={idx} className={`flex items-start gap-3 text-sm sm:text-base leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
              <span className={`px-2 py-0.5 rounded text-xs font-mono font-bold shrink-0 mt-0.5 ${
                theme === 'dark' ? 'bg-slate-800 text-cyan-400 border border-slate-700' : 'bg-slate-100 text-slate-800 border border-slate-300'
              }`}>
                {idx + 1}
              </span>
              <div>{renderInlineFormattedText(item, `ol-${i}-${idx}`)}</div>
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // 12. Check if the line contains an embedded <ProductCard ... /> inside text
    if (trimmed.includes('<ProductCard') && trimmed.includes('/>')) {
      const parts = trimmed.split(/(<ProductCard\s+[^>]*\/>)/gi);
      parts.forEach((part, partIdx) => {
        const trimmedPart = part.trim();
        if (/^<ProductCard\s+/i.test(trimmedPart)) {
          const cardProps = extractProductCardProps(trimmedPart);
          if (cardProps && cardProps.id) {
            blocks.push(
              <DynamicProductCard
                key={`inline-product-card-${i}-${partIdx}-${cardProps.id}`}
                id={cardProps.id}
                theme={theme}
                productType={cardProps.productType}
                dealBtnText={cardProps.dealBtnText}
              />
            );
          }
        } else if (trimmedPart) {
          blocks.push(
            <p key={`p-split-${i}-${partIdx}`} className={`text-sm sm:text-base leading-relaxed mb-6 font-normal ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
              {renderInlineFormattedText(trimmedPart, `p-split-${i}-${partIdx}`)}
            </p>
          );
        }
      });
      i++;
      continue;
    }

    // 13. Standalone Funnel / Action CTA Link (e.g. 👉 [Take Quiz](...), 📘 [Download Workbook](...), etc.)
    const ctaLineMatch = trimmed.match(/^(?:👉|📘|🎯|⚡|🔗|💡)\s*(?:\*\*)?\[([^\]]+)\]\(([^)]+)\)(?:\*\*)?$/i);
    if (ctaLineMatch) {
      const linkTitle = ctaLineMatch[1].trim();
      const rawTargetUrl = ctaLineMatch[2].trim();
      const { url: finalUrl, isInternal, internalPath } = normalizeUrl(rawTargetUrl);
      const isQuiz = finalUrl.includes('health-quiz') || finalUrl.includes('quiz');
      const isGuide = finalUrl.includes('premium-guides') || finalUrl.includes('workbook') || finalUrl.includes('guide');
      const isStore = finalUrl.includes('store');

      const emojiPrefix = trimmed.match(/^(👉|📘|🎯|⚡|🔗|💡)/)?.[1] || (isQuiz ? '🎯' : isGuide ? '📘' : isStore ? '⚡' : '👉');
      const categoryLabel = isQuiz
        ? '5-MINUTE CLINICAL DIAGNOSTIC'
        : isGuide
        ? 'CLINICAL LONGEVITY PROTOCOL & WORKBOOK'
        : isStore
        ? 'SOVEREIGN HARDWARE'
        : 'NEXT-LEVEL ACTION STEP';

      const btnLabel = isQuiz
        ? 'Take Free Diagnostic Quiz'
        : isGuide
        ? 'Access Protocol & Workbook'
        : isStore
        ? 'Explore Store Hardware'
        : 'Open Resource';

      blocks.push(
        <div
          key={`cta-shortcut-${i}`}
          className={`my-5 p-4 sm:p-5 rounded-2xl border transition-all duration-300 shadow-xl group hover:shadow-cyan-500/10 ${
            isDark
              ? isQuiz
                ? 'bg-gradient-to-r from-emerald-950/70 via-slate-950/90 to-slate-900 border-emerald-500/40 hover:border-emerald-400/80 shadow-emerald-950/20'
                : isGuide
                ? 'bg-gradient-to-r from-indigo-950/70 via-slate-950/90 to-slate-900 border-indigo-500/40 hover:border-indigo-400/80 shadow-indigo-950/20'
                : isStore
                ? 'bg-gradient-to-r from-cyan-950/70 via-slate-950/90 to-slate-900 border-cyan-500/40 hover:border-cyan-400/80 shadow-cyan-950/20'
                : 'bg-gradient-to-r from-slate-900/90 via-slate-950 to-slate-900 border-slate-700/80 hover:border-cyan-400/60'
              : 'bg-gradient-to-r from-slate-50 via-white to-slate-50 border-slate-200 hover:border-blue-400 shadow-sm'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 font-bold text-xl shadow-inner ${
                  isDark
                    ? isQuiz
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : isGuide
                      ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                      : isStore
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                    : isQuiz
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-slate-100 text-slate-800 border border-slate-200'
                }`}
              >
                <span>{emojiPrefix}</span>
              </div>
              <div className="min-w-0">
                <div
                  className={`text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider mb-0.5 ${
                    isDark
                      ? isQuiz
                        ? 'text-emerald-400'
                        : isGuide
                        ? 'text-indigo-400'
                        : isStore
                        ? 'text-cyan-400'
                        : 'text-slate-400'
                      : 'text-slate-500'
                  }`}
                >
                  {categoryLabel}
                </div>
                <div
                  className={`font-display font-extrabold text-sm sm:text-base leading-snug transition-colors ${
                    isDark ? 'text-white group-hover:text-cyan-300' : 'text-slate-900 group-hover:text-blue-600'
                  }`}
                >
                  {linkTitle}
                </div>
              </div>
            </div>

            <div className="shrink-0 flex items-center sm:self-center">
              {isInternal && internalPath ? (
                <Link
                  to={internalPath}
                  className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-md transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer ${
                    isQuiz
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 shadow-emerald-500/25'
                      : isGuide
                      ? 'bg-gradient-to-r from-indigo-500 to-sky-400 hover:from-indigo-400 hover:to-sky-300 text-white shadow-indigo-500/25'
                      : isStore
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 shadow-cyan-500/25'
                      : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white shadow-blue-500/25'
                  }`}
                >
                  <span>{btnLabel}</span>
                  <ArrowRight size={14} className="shrink-0" />
                </Link>
              ) : (
                <a
                  href={finalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-300 hover:to-blue-300 shadow-cyan-500/25 transition-all duration-200 cursor-pointer"
                >
                  <span>{btnLabel}</span>
                  <ExternalLink size={14} className="shrink-0" />
                </a>
              )}
            </div>
          </div>
        </div>
      );
      i++;
      continue;
    }

    // 14. Standard Paragraph
    blocks.push(
      <p key={`p-${i}`} className={`text-sm sm:text-base leading-relaxed mb-6 font-normal ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
        {renderInlineFormattedText(trimmed, `p-${i}`)}
      </p>
    );
    i++;
  }

  return (
    <div
      className={`blog-markdown-renderer ${
        theme === 'dark' ? 'theme-dark dark' : theme === 'light' ? 'theme-light' : ''
      } ${className}`}
    >
      {blocks}
    </div>
  );
};

export default BlogMarkdownRenderer;
