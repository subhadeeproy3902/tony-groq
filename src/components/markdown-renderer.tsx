import { Copy } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { toast } from 'sonner';

interface MarkdownRendererProps {
  content: string;
  assisstant: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, assisstant }) => {
  const components: Components = {};

  const copyContent = () => {
    navigator.clipboard.writeText(content);
    toast.success('Copied to clipboard');
  };

  return (
    <div className="whitespace-pre-wrap">
      <div className={`max-w-3xl rounded-xl font-medium markdown-body w-full overflow-x-auto ${assisstant === 'Groq' ? 'sm:pr-20 pt-3 sm:pt-0' : ''
        }`}>
        {/* Copy Button */}
        {
          assisstant === 'Groq' && (
            <button
              onClick={copyContent}
              className="bg-neutral-700/50 text-white rounded-full p-2 top-2 absolute right-2"
            >
              <Copy size={16} />
            </button>
          )
        }

        <ReactMarkdown components={components} remarkPlugins={[remarkGfm]}>
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default MarkdownRenderer;