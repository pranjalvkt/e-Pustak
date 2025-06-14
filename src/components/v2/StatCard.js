export default function StatCard({ label, value }) {
  return (
    <div className="m-3 text-center">
      <div className="text-sm text-gray-500">{label}</div>
      <div className="text-2xl font-bold text-gray-800">{value}</div>
    </div>
  );
}
