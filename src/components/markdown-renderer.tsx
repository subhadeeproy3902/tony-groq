import { Copy } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const components: Components = {};

  const copyContent = () => {
    navigator.clipboard.writeText(content);
  };

  return (
    <div className="relative text-sm sm:text-base font-medium markdown-body text-wrap whitespace-pre-line">
      {/* Copy Button */}
      <button 
        onClick={copyContent} 
        style={{ position: 'absolute', top: 0, right: 0, padding: '0.5rem', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
      >
        <Copy size={16} />
      </button>

      <ReactMarkdown components={components} remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;