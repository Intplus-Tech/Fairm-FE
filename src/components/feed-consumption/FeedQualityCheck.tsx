"use client";

export default function FeedQualityCheck() {
  return (
    <div className="bg-white border rounded-xl p-6">
      <h2 className="font-semibold mb-4">Feed Quality Check</h2>

      <div className="space-y-4 text-sm">

        <div>
          <p className="font-medium mb-2">Appearance</p>
          <div className="flex gap-4">
            {["Good", "Moldy", "Clumped", "Other"].map((item) => (
              <label key={item} className="flex gap-1">
                <input type="radio" name="appearance" />
                {item}
              </label>
            ))}
          </div>
        </div>

        <div>
          <p className="font-medium mb-2">Smell</p>
          <div className="flex gap-4">
            {["Normal", "Rancid", "Musty", "Other"].map((item) => (
              <label key={item} className="flex gap-1">
                <input type="radio" name="smell" />
                {item}
              </label>
            ))}
          </div>
        </div>

        <div>
          <p className="font-medium mb-2">Insects/Pests</p>
          <div className="flex gap-4">
            {["None", "Weevils", "Moths", "Rodent Droppings"].map(
              (item) => (
                <label key={item} className="flex gap-1">
                  <input type="radio" name="pests" />
                  {item}
                </label>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}