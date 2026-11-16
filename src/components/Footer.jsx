const Footer = () => {
  return (
    <footer className="border-t border-green-100 bg-white my-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 px-4 py-5 text-center text-xs text-gray-600 sm:flex-row sm:text-left sm:text-sm">
        <p className="font-medium text-gray-800">
          বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>
        <p className="text-gray-500 sm:max-w-md sm:text-right">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
};

export default Footer;