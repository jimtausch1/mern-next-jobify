import Wrapper from '../../assets/wrappers/Dashboard';
import BigSidebar from './BigSidebar';
import Navbar from './Navbar';
import SmallSidebar from './SmallSidebar';

export default function DashboardPage() {
  return (
    <Wrapper>
      <main className="dashboard">
        <SmallSidebar />
        <BigSidebar />
        <div>
          <Navbar />
          <div className="dashboard-page"></div>
        </div>
      </main>
    </Wrapper>
  );
}
