// Example of a simple page in src/app/dashboard/page.js
import PropertyCardsGrid from '../Components/PropertyCard';
import StatsPanel from '../Components/StatsPanel';
import PerformanceGraph from '../Components/PerformanceGraph';

const Dashboard = () => {
    return (
        <div>
            <div className="container mx-auto p-4">
                <StatsPanel />
                <PropertyCardsGrid />
                <PerformanceGraph />
            </div>
        </div>
    );
};

export default Dashboard;
