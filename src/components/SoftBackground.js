const SoftBackground = () => {
  return (
    <div className="absolute inset-0 z-[-1] overflow-hidden">
      {/* Animated Gradient Overlay */}
      <div className="absolute inset-0 gradient-animated opacity-70" />

      {/* Edge Fog Blobs */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full blur-[150px] fog-blob-1"
        style={{ top: "20%", left: "15%" }}
      />
      <div
        className="absolute w-[600px] h-[600px] rounded-full blur-[150px] fog-blob-2"
        style={{ top: "25%", right: "10%" }}
      />
      <div
        className="absolute w-[600px] h-[600px] rounded-full blur-[150px] fog-blob-3"
        style={{ bottom: "20%", left: "20%" }}
      />
      <div
        className="absolute w-[600px] h-[600px] rounded-full blur-[150px] fog-blob-4"
        style={{ bottom: "10%", right: "15%" }}
      />

      {/* Center Floating Fog Blob */}
      <div
        className="absolute w-[700px] h-[700px] rounded-full blur-[180px] fog-center"
        style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
      />
    </div>
  );
};

export default SoftBackground;
