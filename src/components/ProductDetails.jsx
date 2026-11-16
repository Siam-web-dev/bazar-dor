import Link from "next/link";

const unitBn = {
  kg: "কেজি",
  dozon: "ডজন",
  dozen: "ডজন",
  piece: "পিস",
  litre: "লিটার",
  gram: "গ্রাম",
};

const toBn = (num) =>
  Number(num).toLocaleString("bn-BD", { maximumFractionDigits: 2 });

const toBnAvg = (num) =>
  Number.isInteger(num)
    ? toBn(num)
    : Number(num).toLocaleString("bn-BD", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

const ProductDetails = ({ product }) => {
  const {
    nameBn,
    category,
    categoryNameBn,
    unit,
    image,
    today,
    yesterday,
    change,
    markets = [],
  } = product;

  const unitName = unitBn[unit] || unit;

  const rows = markets
    .map((m) => ({ ...m, avg: (m.min + m.max) / 2 }))
    .sort((a, b) => a.avg - b.avg);

  const lowest = markets.length ? Math.min(...markets.map((m) => m.min)) : 0;
  const highest = markets.length ? Math.max(...markets.map((m) => m.max)) : 0;

  const diff = Math.abs(today - yesterday);
  const isUp = change?.dir === "up";
  const isDown = change?.dir === "down";

  const badgeClass = isUp
    ? "text-red-600"
    : isDown
      ? "text-green-600"
      : "text-gray-500";
  const badgeIcon = isUp ? "▲" : isDown ? "▼" : "–";
  const statusText = isUp ? "বেড়েছে" : isDown ? "কমেছে" : "অপরিবর্তিত";

  return (
    <div className="min-h-screen bg-green-50">
      <div className="mx-auto w-full max-w-4xl px-3 py-4 sm:px-4 sm:py-6">
        {/* Breadcrumb */}
        <nav className="mb-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-600 sm:mb-4">
          <Link href="/" className="hover:text-green-700">
            হোম
          </Link>
          <span>›</span>
          <Link href={`/category/${category}`} className="hover:text-green-700">
            {categoryNameBn}
          </Link>
          <span>›</span>
          <span className="text-gray-900">{nameBn}</span>
        </nav>

        {/* Top card */}
        <div className="flex flex-col gap-4 rounded-2xl border border-green-100 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-3xl sm:h-16 sm:w-16 sm:text-4xl">
              {image}
            </div>

            <div className="min-w-0">
              <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
                {nameBn}
              </h1>
              <p className="text-xs text-gray-500">
                প্রতি {unitName} · {categoryNameBn}
              </p>
              <p className="mt-1 text-xs text-gray-700">
                গতকালের তুলনায় আজ দাম{" "}
                <span className="font-bold">{statusText}</span>
                {diff > 0 && <> · {toBn(diff)} টাকা</>}
              </p>
            </div>
          </div>

          <div className="w-full rounded-xl bg-gray-100 px-6 py-3 text-center sm:w-auto sm:min-w-36">
            <p className="text-xs text-gray-500">আজকের দাম</p>
            <p className="text-3xl font-bold text-gray-900">{toBn(today)}</p>
            <p className="text-xs text-gray-500">টাকা / {unitName}</p>
            <p className={`mt-1 text-xs font-semibold ${badgeClass}`}>
              {badgeIcon} {toBn(change?.pct ?? 0)}%
            </p>
          </div>
        </div>

        {/* Summary + markets */}
        <div className="mt-4 rounded-2xl border border-green-100 bg-white p-4 shadow-sm sm:mt-5 sm:p-5">
          <h2 className="mb-3 font-bold text-gray-900">দামের সারসংক্ষেপ</h2>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
            <div className="rounded-lg border border-gray-200 p-3">
              <p className="text-xs text-gray-500">সর্বনিম্ন দাম</p>
              <p className="font-bold text-green-700">
                <span className="text-xl sm:text-2xl">{toBn(lowest)}</span>{" "}
                <span className="text-sm font-medium">টাকা</span>
              </p>
              <p className="text-xs text-gray-600">সবচেয়ে কম দামের বাজার</p>
            </div>

            <div className="rounded-lg border border-gray-200 p-3">
              <p className="text-xs text-gray-500">সর্বোচ্চ দাম</p>
              <p className="font-bold text-red-600">
                <span className="text-xl sm:text-2xl">{toBn(highest)}</span>{" "}
                <span className="text-sm font-medium">টাকা</span>
              </p>
              <p className="text-xs text-gray-600">সবচেয়ে বেশি দামের বাজার</p>
            </div>

            {/* mobile e puro width, sm e ager moto 1 column */}
            <div className="col-span-2 rounded-lg border border-gray-200 p-3 sm:col-span-1">
              <p className="text-xs text-gray-500">গড় দাম</p>
              <p className="font-bold text-green-700">
                <span className="text-xl sm:text-2xl">{toBn(today)}</span>{" "}
                <span className="text-sm font-medium">টাকা</span>
              </p>
              <p className="text-xs text-gray-600">
                প্রতি {unitName}-এর হিসাবে
              </p>
            </div>
          </div>

          <h2 className="mb-3 mt-6 font-bold text-gray-900">
            বাজারভিত্তিক আজকের দাম
          </h2>

          {/* Mobile: card list */}
          <ul className="space-y-2 sm:hidden">
            {rows.map((m, i) => (
              <li
                key={`${m.market}-${i}`}
                className="rounded-lg border border-gray-200 p-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-medium text-gray-900">{m.market}</p>
                    <p className="text-xs text-gray-500">{m.division}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-[11px] text-gray-500">গড়</p>
                    <p className="font-bold text-gray-900">
                      {toBnAvg(m.avg)} টাকা
                    </p>
                  </div>
                </div>

                <div className="mt-2 flex justify-between border-t border-gray-100 pt-2 text-xs text-gray-600">
                  <span>সর্বনিম্ন: {toBn(m.min)} টাকা</span>
                  <span>সর্বাধিক: {toBn(m.max)} টাকা</span>
                </div>
              </li>
            ))}
          </ul>

          {/* Tablet / Desktop: table */}
          <div className="hidden overflow-x-auto rounded-lg border border-gray-200 sm:block">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-500">
                  <th className="px-3 py-2 text-left font-medium">বাজার</th>
                  <th className="px-3 py-2 text-left font-medium">বিভাগ</th>
                  <th className="px-3 py-2 text-right font-medium">সর্বনিম্ন</th>
                  <th className="px-3 py-2 text-right font-medium">সর্বাধিক</th>
                  <th className="px-3 py-2 text-right font-medium">গড়</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((m, i) => (
                  <tr
                    key={`${m.market}-${i}`}
                    className={`border-t border-gray-200 ${
                      i % 2 === 1 ? "bg-gray-50" : ""
                    }`}
                  >
                    <td className="px-3 py-2.5 font-medium text-gray-900">
                      {m.market}
                    </td>
                    <td className="px-3 py-2.5 text-gray-600">{m.division}</td>
                    <td className="px-3 py-2.5 text-right text-gray-600">
                      {toBn(m.min)} টাকা
                    </td>
                    <td className="px-3 py-2.5 text-right text-gray-600">
                      {toBn(m.max)} টাকা
                    </td>
                    <td className="px-3 py-2.5 text-right font-bold text-gray-900">
                      {toBnAvg(m.avg)} টাকা
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;