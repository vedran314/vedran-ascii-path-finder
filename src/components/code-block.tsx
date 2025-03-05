type CodeBlockProps = {
  code: string;
};

const CodeBlock = ({ code }: CodeBlockProps) => {
  return (
    <pre className="whitespace-pre font-mono text-sm text-gray-800">
      <code>{code}</code>
    </pre>
  );
};

export { CodeBlock };
