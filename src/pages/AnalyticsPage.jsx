import { PageHeader } from '../components/common/PageHeader'
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  ResponsiveContainer,
} from 'recharts'
import { containerVariants, cardVariants, slideUpVariants } from '../utils/animations'

// Mock data for charts
const correctWrongData = [
  { name: 'Correct', value: 75, color: '#06b6d4' },
  { name: 'Wrong', value: 25, color: '#ef4444' },
]

const categoryScoresData = [
  { category: 'Frontend', score: 85 },
  { category: 'Backend', score: 72 },
  { category: 'Database', score: 90 },
  { category: 'DevOps', score: 68 },
  { category: 'Mobile', score: 78 },
]

const weeklyProgressData = [
  { week: 'Week 1', score: 65 },
  { week: 'Week 2', score: 72 },
  { week: 'Week 3', score: 78 },
  { week: 'Week 4', score: 85 },
  { week: 'Week 5', score: 82 },
  { week: 'Week 6', score: 90 },
]

export function AnalyticsPage() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="mx-auto max-w-7xl px-4 py-10"
    >
      <PageHeader title="Analytics" subtitle="Track quiz engagement and performance trends." />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-4 sm:gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      >
        <motion.section
          variants={cardVariants}
          whileHover="hover"
          className="rounded-2xl border border-app-border bg-gradient-to-br from-app-card to-app-surface p-4 shadow-premium sm:p-6"
        >
          <motion.h3
            variants={slideUpVariants}
            className="mb-4 text-base font-semibold text-app-text sm:text-lg"
          >
            Correct vs Wrong Answers
          </motion.h3>
          <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
            <PieChart>
              <Pie
                data={correctWrongData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={70}
                fill="#8884d8"
                dataKey="value"
                className="text-xs sm:text-sm"
              >
                {correctWrongData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.section>

        {/* Bar Chart: Category Scores */}
        <motion.section
          variants={cardVariants}
          whileHover="hover"
          className="rounded-2xl border border-app-border bg-gradient-to-br from-app-card to-app-surface p-4 shadow-premium sm:p-6"
        >
          <motion.h3
            variants={slideUpVariants}
            className="mb-4 text-base font-semibold text-app-text sm:text-lg"
          >
            Category Scores
          </motion.h3>
          <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
            <BarChart data={categoryScoresData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="category" stroke="#94a3b8" tick={{ fontSize: 12 }} />
              <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
              />
              <Bar dataKey="score" fill="#06b6d4" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.section>

        {/* Line Chart: Weekly Progress */}
        <motion.section
          variants={cardVariants}
          whileHover="hover"
          className="rounded-2xl border border-app-border bg-gradient-to-br from-app-card to-app-surface p-4 shadow-premium sm:p-6 sm:col-span-1 md:col-span-2 lg:col-span-1"
        >
          <motion.h3
            variants={slideUpVariants}
            className="mb-4 text-base font-semibold text-app-text sm:text-lg"
          >
            Weekly Progress
          </motion.h3>
          <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
            <LineChart data={weeklyProgressData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="week" stroke="#94a3b8" tick={{ fontSize: 12 }} />
              <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#06b6d4"
                strokeWidth={3}
                dot={{ fill: '#06b6d4', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#06b6d4', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.section>
      </motion.div>

      {/* Additional Stats Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        <motion.div
          variants={cardVariants}
          whileHover="hover"
          className="rounded-xl border border-app-border bg-gradient-to-br from-app-card to-app-surface p-4 shadow-premium"
        >
          <p className="text-sm text-app-muted">Total Quizzes</p>
          <p className="text-2xl font-bold text-primary-400">24</p>
        </motion.div>
        <motion.div
          variants={cardVariants}
          whileHover="hover"
          className="rounded-xl border border-app-border bg-gradient-to-br from-app-card to-app-surface p-4 shadow-premium"
        >
          <p className="text-sm text-app-muted">Average Score</p>
          <p className="text-2xl font-bold text-primary-400">82%</p>
        </motion.div>
        <motion.div
          variants={cardVariants}
          whileHover="hover"
          className="rounded-xl border border-app-border bg-gradient-to-br from-app-card to-app-surface p-4 shadow-premium"
        >
          <p className="text-sm text-app-muted">Best Category</p>
          <p className="text-2xl font-bold text-primary-400">Database</p>
        </motion.div>
        <motion.div
          variants={cardVariants}
          whileHover="hover"
          className="rounded-xl border border-app-border bg-gradient-to-br from-app-card to-app-surface p-4 shadow-premium"
        >
          <p className="text-sm text-app-muted">Streak</p>
          <p className="text-2xl font-bold text-primary-400">7 days</p>
        </motion.div>
      </motion.div>
    </motion.main>
  )
}
