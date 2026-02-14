import EmployeePage from "@/components/employee/EmployeePage";
import TopEmployee from "@/components/employee/TopEmployee";

export default function Page() {
  return (
    <div className="space-y-6">
    <div>
      <TopEmployee/>
    </div>
      <EmployeePage />;
    </div>
  )
 
}
