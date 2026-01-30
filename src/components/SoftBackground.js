const SoftBackground = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-transparent">
      <div className="absolute w-[600px] h-[600px] rounded-full blur-[150px] opacity-30 bg-blue-100/20 top-[20%] left-[15%]" />
      <div className="absolute w-[600px] h-[600px] rounded-full blur-[150px] opacity-30 bg-pink-100/20 top-[25%] right-[10%]" />
      <div className="absolute w-[700px] h-[700px] rounded-full blur-[180px] opacity-40 bg-white/50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 fog-center" />
    </div>
  );
};

"use client";
export default function SoftBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 bg-transparent" />
  );
}
