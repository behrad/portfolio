export function DiscountBanner() {
  return (
    <div className="mb-6 rounded-2xl overflow-hidden border border-red-200/70 shadow-xl shadow-red-500/10 ring-1 ring-red-500/10">
      <div className="relative flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4 bg-gradient-to-r from-red-600 via-rose-600 to-orange-500 px-4 py-3 md:px-5 md:py-3 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.22),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.12),transparent_30%)] pointer-events-none" />
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl shadow-lg relative">
          🎉
        </div>
        <div className="flex-1 text-right relative">
          <div className="inline-flex items-center gap-2 mb-2 px-3 py-1 rounded-full bg-white/20 text-sm font-bold backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-yellow-300 animate-pulse" />
            تخفیف ۵۰ درصدی دوره‌ها
          </div>
          <p className="text-sm md:text-base font-semibold leading-7" dir="rtl">
            بخاطر شرایط فعلی، هزینه همه دوره‌ها تا اطلاع ثانوی نصف شده تا افرادی که مشغول به کار نیستن هم بتونن ثبت نام کنن، امیدوارم در سرمایه گذاری برای آینده کاری‌ و حرفه‌ای‌تون نقش مهمی داشته باشه.
          </p>
        </div>
      </div>
    </div>
  )
}
