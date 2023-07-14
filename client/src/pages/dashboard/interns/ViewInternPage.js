import CoordinatorNav from "../../../pages/reusables/CoordinatorNav";
import DashboardSideNav from "../DashboardSideNav";

function ViewInternsPage(){
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
export default ViewInternsPage;