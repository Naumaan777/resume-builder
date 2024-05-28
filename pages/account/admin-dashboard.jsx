import { useEffect } from 'react';
import { useRouter } from 'next/router';

const AdminDashboard = () => {
    const router = useRouter();

    useEffect(() => {
        const isAdmin = true; // Check if the user is an admin
        if (!isAdmin) {
            router.push('/login.jsx'); // Redirect to login page if not an admin
        }
    }, []);

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <div class="kj-row-padding kj-center kj-margin-top kj-margin-bottom">
                <a href="resume_creator.jsx">
                    <div class="kj-third">
                        <div class="kj-card kj-container" style="min-height:400px; color:black">
                            <h3>View All User's</h3><br/>
                            <i class="fa fa-automobile kj-margin-bottom kj-text-theme" style="font-size:120px"></i>
                            <p>User's Information - log data </p>
                            <button href="../admin/user-details.jsx"> Details </button>
                        </div>
                    </div>
                </a>

                <a href="authorise_user.jsx">
                    <div class="kj-third">
                        <div class="kj-card kj-container" style="min-height:400px; color:black">
                            <h3>Analysis for User Resume's</h3><br/>
                            <i class="fa fa-certificate kj-margin-bottom kj-text-theme" style="font-size:120px"></i>
                            <p>Tools - update and delete</p>
                            <button href="../admin/analysis.jsx"> Analysis </button>                      
                        </div>
                    </div>
                </a>

            </div>
        </div>
    );
};

export default AdminDashboard;
