import React from 'react';
import { ExternalLink } from 'lucide-react';

interface BlogMarkdownRendererProps {
  content: string;
  className?: string;
  theme?: 'light' | 'dark' | 'auto';
  affiliateUrl?: string;
}

export const BlogMarkdownRenderer: React.FC<BlogMarkdownRendererProps> = ({
  content,
  className = '',
  theme = 'auto',
  affiliateUrl
}) => {
  if (!content) return null;

  // If content is pure HTML, render dangerously
  if (content.trim().startsWith('<') && !content.trim().startsWith('<!--')) {
    return (
      <div
        className={`blog-content-rendered ${
          theme === 'dark' ? 'theme-dark dark' : theme === 'light' ? 'theme-light' : ''
        } ${className}`}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }

  // Helper to format inline markdown (bold, italic, inline code, links)
  const renderInlineFormattedText = (rawText: string, keyPrefix: string = 'inline'): React.ReactNode[] => {
    // Regex for:
    // 1. Markdown link: [text](url)
    // 2. Bold: **text**
    // 3. Italic: *text* or _text_
    // 4. Inline code: `text`
    const tokenRegex = /(\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`)/g;

    const nodes: React.ReactNode[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = tokenRegex.exec(rawText)) !== null) {
      // Text before match
      if (match.index > lastIndex) {
        nodes.push(rawText.substring(lastIndex, match.index));
      }

      const [fullMatch, , linkText, linkUrl, boldText, italicText, codeText] = match;

      if (linkText && linkUrl) {
        let validUrl = linkUrl.trim();
        if (!validUrl.startsWith('http://') && !validUrl.startsWith('https://') && !validUrl.startsWith('//') && !validUrl.startsWith('/')) {
          validUrl = 'https://' + validUrl;
        }

        const isInternal = validUrl.startsWith('/') || validUrl.includes('123thenextlevel.com');
        const isStore = validUrl.includes('/store');
        const isQuiz = validUrl.includes('/health-quiz');

        nodes.push(
          <a
            key={`${keyPrefix}-link-${match.index}`}
            href={validUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-baseline gap-1 font-semibold underline decoration-2 underline-offset-2 transition-all duration-200 cursor-pointer ${
              theme === 'dark'
                ? isQuiz
                  ? 'text-emerald-400 decoration-emerald-500/50 hover:text-emerald-300 hover:decoration-emerald-400'
                  : isStore
                  ? 'text-cyan-400 decoration-cyan-500/50 hover:text-cyan-300 hover:decoration-cyan-400'
                  : 'text-blue-400 decoration-blue-500/50 hover:text-blue-300 hover:decoration-blue-400'
                : isQuiz
                ? 'text-emerald-600 decoration-emerald-500/40 hover:text-emerald-700 hover:decoration-emerald-600'
                : isStore
                ? 'text-cyan-600 decoration-cyan-500/40 hover:text-cyan-700 hover:decoration-cyan-600'
                : 'text-blue-600 decoration-blue-500/40 hover:text-blue-800 hover:decoration-blue-600'
            }`}
          >
            <span>{linkText}</span>
            {!isInternal && <ExternalLink size={12} className="inline opacity-75 shrink-0 self-center" />}
          </a>
        );
      } else if (boldText) {
        nodes.push(
          <strong key={`${keyPrefix}-b-${match.index}`} className={theme === 'dark' ? 'font-bold text-white' : 'font-bold text-slate-900'}>
            {boldText}
          </strong>
        );
      } else if (italicText) {
        nodes.push(
          <em key={`${keyPrefix}-i-${match.index}`} className="italic">
            {italicText}
          </em>
        );
      } else if (codeText) {
        nodes.push(
          <code
            key={`${keyPrefix}-c-${match.index}`}
            className={`px-1.5 py-0.5 rounded text-xs font-mono ${
              theme === 'dark' ? 'bg-slate-800 text-cyan-300 border border-slate-700' : 'bg-slate-100 text-slate-800 border border-slate-200'
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

    // 2. Fenced code block (ASCII diagrams, code snippets)
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

    // 2b. Raw HTML Block (e.g. <div class="product-card-box">...</div>)
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
      blocks.push(
        <div
          key={`html-block-${i}`}
          className="my-4 blog-html-block"
          dangerouslySetInnerHTML={{ __html: htmlString }}
        />
      );
      continue;
    }

    // 3. Markdown Table (lines with |)
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

    // 4. Standalone Image: ![alt](url)
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

    // 5. Headings
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

    // 6. Horizontal Rule
    if (trimmed === '---' || trimmed === '***' || trimmed === '___') {
      blocks.push(
        <hr key={`hr-${i}`} className={`my-10 border-0 h-[1px] ${theme === 'dark' ? 'bg-gradient-to-r from-transparent via-slate-700 to-transparent' : 'bg-gradient-to-r from-transparent via-slate-300 to-transparent'}`} />
      );
      i++;
      continue;
    }

    // 7. Blockquote
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

    // 8. Unordered List Items (- or *)
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

    // 9. Ordered List Items (1. 2. etc)
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

    // 10. Standard Paragraph
    blocks.push(
      <p key={`p-${i}`} className={`text-sm sm:text-base leading-relaxed mb-6 font-normal ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
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
