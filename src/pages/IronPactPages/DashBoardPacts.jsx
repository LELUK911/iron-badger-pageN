import { IronPactLayout } from '../../ironPact/ironPactLayout/IronPactLayout'
import { BodyDashboardPage } from '../../ironPact/BodyDashboardPage'

export const DashBoardPacts = () => {
    return (
        <div className="bg-iron-Pact">
            <IronPactLayout>
                <BodyDashboardPage />
            </IronPactLayout>
        </div>
    )
}
