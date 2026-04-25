import { PageHeader } from '../components/common/PageHeader'
import { Profile } from '../components/common/Profile'

export function ProfilePage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-10">
      <PageHeader title="Profile" subtitle="Manage your personal account details." />
      <Profile />
    </main>
  )
}
