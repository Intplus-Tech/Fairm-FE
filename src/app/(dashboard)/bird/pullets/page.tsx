import PulletTable from "@/components/birds/pullet/PulletTable";
import TopPullet from "@/components/birds/pullet/TopPullet";




export default function PulletPage() {
  return (
    <section className="space-y-6">
      <div>
      <TopPullet/>
      </div>
      <div className="bg-white rounded-xl border p-6 space-y-6">
        <h2 className="text-xl font-semibold">Pullet Report</h2>
        <p className="text-sm text-gray-500">
          Achieving weight targets and skeletal development before the first egg.
        </p>
        <PulletTable />
      </div>


     
    </section>
  );
}