import { AdminDashboard } from "./admin-dashboard"
import { Navigation } from "/components/navigation"

export const metadata = {
  title: "Admin Dashboard - Sierra Explore",
  description: "Manage your Sierra Explore platform",
}

export default function AdminPage() {
  return (
    <main>
      <Navigation />
      <div className="pt-16">
        <AdminDashboard />
      </div>
    </main>
  )
}
