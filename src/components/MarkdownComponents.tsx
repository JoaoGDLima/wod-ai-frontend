const markdownComponents = {
  h1: ({ node, ...props }: any) => (
    <h1 className="text-xl font-bold mt-4 mb-2" {...props} />
  ),
  h2: ({ node, ...props }: any) => (
    <h2 className="text-lg font-semibold mt-3 mb-1" {...props} />
  ),
  h3: ({ node, ...props }: any) => (
    <h3 className="text-base font-medium mt-2 mb-1" {...props} />
  ),
  p: ({ node, ...props }: any) => (
    <p className="text-sm text-gray-800 leading-relaxed mb-2" {...props} />
  ),
  strong: ({ node, ...props }: any) => (
    <strong className="font-semibold text-gray-900" {...props} />
  ),
  ul: ({ node, ...props }: any) => (
    <ul className="list-disc list-inside ml-4 mb-2 text-sm" {...props} />
  ),
  ol: ({ node, ...props }: any) => (
    <ol className="list-decimal list-inside ml-4 mb-2 text-sm" {...props} />
  ),
  li: ({ node, ...props }: any) => (
    <li className="mb-1" {...props} />
  ),
  hr: () => (
    <hr className="my-4 border-t border-gray-300" />
  ),
  blockquote: ({ node, ...props }: any) => (
    <blockquote className="border-l-4 border-gray-400 pl-4 italic text-gray-600 my-2" {...props} />
  ),
  code: ({ node, inline, className, children, ...props }: any) => (
    <code
      className={`bg-gray-100 text-sm px-1 py-0.5 rounded ${className || ''}`}
      {...props}
    >
      {children}
    </code>
  ),
};

export default markdownComponents;
