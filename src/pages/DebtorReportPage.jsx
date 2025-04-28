

import { BodyDebtorReportPage } from "../DebtorReportPage/BodyDebtorReportPage"
import { NavBarDebtorReport } from "../DebtorReportPage/components/NavBarDebtorReport"

export const DebtorReportPage = () => {
    return (
    <div className="bg-gray-800 text-gray-100">
      <NavBarDebtorReport/>
        <BodyDebtorReportPage/>
    </div>
  )
}
