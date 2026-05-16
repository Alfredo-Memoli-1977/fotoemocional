export const PendingPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-black">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-yellow-600/30 border-t-yellow-600"></div>
      <p className="text-lg text-yellow-600">Cargando...</p>
    </div>
  );
};
