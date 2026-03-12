// app/egg-production/page.tsx
// import EggCollectionTable from "@/components/EggCollectionTable";
// import CollectionIssues from "@/components/CollectionIssues";
// import PhotosEvidence from "@/components/PhotosEvidence";
// import PageNavigation from "@/components/PageNavigation";

import CollectionIssues from "@/components/egg-production/CollectionIssues";
import EggCollectionTable from "@/components/egg-production/EggCollectionTable";
import PageNavigation from "@/components/egg-production/PageNavigation";
import PhotosEvidence from "@/components/egg-production/PhotosEvidence";

export default function EggProductionPage() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <header className="mb-6 bg-purple-600 text-white p-4 rounded-md">
        <h1 className="text-xl font-bold">Daily Egg Production</h1>
        <p className="text-sm">Sunday, February 1, 2026</p>
      </header>

      <section className="mb-6">
        <EggCollectionTable/>
      </section>

      <section>
        <CollectionIssues />
        <PhotosEvidence />
        <PageNavigation />
      </section>
    </div>
  );
}