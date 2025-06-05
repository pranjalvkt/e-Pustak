import dynamic from "next/dynamic";
import clientPromise from "../../../lib/mongodb";
import ClientDate from "../../components/v2/ClientDate";

const PieChartComponent = dynamic(
  () => import("../../components/v2/PieChartComponent"),
  { ssr: false },
);

export default function StatsPage({ visitorData }) {
  const cityData = getCityDistribution(visitorData);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Visitor Stats Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow p-4">
          <h2 className="text-xl font-semibold mb-4">Visitors by Country</h2>
          <PieChartComponent data={cityData} />
        </div>

        <div className="bg-white rounded-2xl shadow p-4 overflow-x-auto">
          <h2 className="text-xl font-semibold mb-4">Recent Visitors</h2>
          <table className="min-w-full text-sm">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="px-3 py-2">IP</th>
                <th className="px-3 py-2">City</th>
                <th className="px-3 py-2">Region</th>
                <th className="px-3 py-2">Country</th>
                <th className="px-3 py-2">Postal</th>
                <th className="px-3 py-2">Time</th>
              </tr>
            </thead>
            <tbody>
              {visitorData.map((v) => (
                <tr key={v._id} className="border-b hover:bg-gray-50">
                  <td className="px-3 py-2">{v.ip}</td>
                  <td className="px-3 py-2">{v.city || "-"}</td>
                  <td className="px-3 py-2">{v.region || "-"}</td>
                  <td className="px-3 py-2">{v.country || "-"}</td>
                  <td className="px-3 py-2">{v.postal || "-"}</td>
                  <td className="px-3 py-2">
                    <ClientDate isoString={v.timestamp} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function getCityDistribution(data) {
  const countMap = {};
  data.forEach((v) => {
    const city = v.city || "Unknown";
    countMap[city] = (countMap[city] || 0) + 1;
  });
  return Object.entries(countMap).map(([name, value]) => ({ name, value }));
}

export async function getServerSideProps() {
  const client = await clientPromise;
  const db = client.db("geo-analytics");
  const visitors = await db
    .collection("visitors")
    .find()
    .sort({ timestamp: -1 })
    .limit(100)
    .toArray();

  const visitorData = visitors.map((v) => ({
    ...v,
    _id: v._id.toString(),
    timestamp: new Date(v.timestamp).toISOString(),
  }));

  return {
    props: { visitorData },
  };
}
