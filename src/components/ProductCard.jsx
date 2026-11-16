import Link from "next/link";

const unitBn = {
  kg: "প্রতি কেজি",
  dozen: "প্রতি ডজন",
  piece: "প্রতি পিস",
  litre: "প্রতি লিটার",
};
const toBn = (num) =>
  Number(num).toLocaleString("bn-BD", { maximumFractionDigits: 1 });

const ProductCard = ({ product }) => {
  const { nameBn, image, unit, today, change, slug } = product;

  const isUp = change.dir === "up";

  return (
    <div>
      <Link href={`/products/${slug}`}>
        <div className="rounded-2xl border border-green-100 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100 text-2xl">
              {image}
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">{nameBn}</h3>
              <p className="text-xs text-gray-500">{unitBn[unit] || unit}</p>
            </div>
          </div>

          <div className="mt-4 flex items-end justify-between">
            <div>
              <p className="text-xs text-gray-500">আজকের দাম</p>
              <p className="text-lg font-bold text-gray-900">
                {toBn(today)} <span className="text-sm font-medium">টাকা</span>
              </p>
            </div>

            <span
              className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                isUp ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"
              }`}
            >
              {isUp ? "▲" : "▼"} {toBn(change.pct)}%
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
