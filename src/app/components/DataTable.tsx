import { TableHTMLAttributes, forwardRef, ReactNode } from "react";

export const DataTable = forwardRef<
  HTMLTableElement,
  {
    data: [label: ReactNode, value: ReactNode][] | [];
  }
>(function MyComponent({ data, ...props }, ref) {
  if(!data[0] || !data[0].length) {
    return null
  }
  return (
    <table className="table-auto w-auto mt-6" ref={ref} {...props}>
      <tbody>
        {data.map((r, i) => (
          <tr
            key={`table-row-${i}`}
          >
            <td className="px-2 py-2 font-bold text-right">{r[0]}</td>
            <td className="px-2 py-2">{r[1]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
});
