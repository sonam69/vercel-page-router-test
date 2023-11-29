import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  title?: string;
  breadcrumb?: { text: string; path: string }[];
  children: ReactNode;
};
const BaseLayout: React.FC<Props> = ({ children, title, breadcrumb }) => {
  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col px-4 py-16 ">
        {title && <h2 className="text-4xl font-bold">{title}</h2>}
        {breadcrumb && (
          <div className="flex gap-2">
            {breadcrumb.map((item) => (
              <Link
                className="mt-1 flex items-center gap-1 text-xs text-gray-500 hover:text-black"
                href={item.path}
              >
                <span>{item.text}</span>
              </Link>
            ))}
          </div>
        )}
        {children}
      </div>
    </main>
  );
};
export default BaseLayout;
