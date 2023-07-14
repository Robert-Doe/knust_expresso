import DashboardSideNav from "../DashboardSideNav";
import CoordinatorNav from "../../../pages/reusables/CoordinatorNav";

function ViewAllInternsPage(){
    return(
        <section>
            <CoordinatorNav/>
            <main className={'coordinator-main'}>
                <DashboardSideNav/>
                <aside className={'main-body'}>
                </aside>
            </main>
        </section>
    )
}
export default ViewAllInternsPage;