import React from "react";

type Props = {
  title: string;
  content: string;
  className?: string;
};

function ResultRow({ title, content, className }: Props) {
  return (
    <details className={className}>
      <summary className="cursor-pointer bg-inherit px-5 py-3 text-lg">
        {title}
      </summary>
      <div className="bg-inherit px-5 py-3 text-sm font-light">
        <p>{content}</p>
      </div>
    </details>
  );
}

export default ResultRow;
