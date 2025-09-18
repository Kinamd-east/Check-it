import {
  Target,
  Flame,
  AlertTriangle,
  Trophy,
  Clock,
  CheckCircle,
  Zap,
  Shield,
  ArrowRight,
} from 'lucide-react'
import { useNavigate } from 'react-router'
import NavigationBar from '@/components/Navbar'

const Home = () => {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col w-full min-h-screen">
      <NavigationBar />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
          <div className="relative max-w-7xl mx-auto px-4 py-20 sm:py-32">
            <div className="text-center">
              <div className="flex justify-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
                  <Target className="w-10 h-10 text-white" />
                </div>
              </div>

              <h1 className="text-5xl sm:text-7xl font-bold text-white mb-6">
                Check-it
              </h1>
              <p className="text-xl sm:text-2xl text-blue-300 mb-4 font-medium">
                Discipline as a Game
              </p>
              <p className="text-lg text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
                Transform your daily schedule into an engaging challenge. Build
                streaks, face consequences, and develop unbreakable discipline
                through gamified habit tracking.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate('/signup')}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg flex items-center justify-center space-x-2 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <span>Sign Up</span>
                </button>
                <button
                  onClick={() => navigate('/login')}
                  className="border-2 border-slate-600 hover:border-slate-500 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:bg-slate-800/50"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-slate-800/30">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">
                Why Check-it is Different
              </h2>
              <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                It's not just task management. It's a discipline-building game
                where consistency is rewarded and missed tasks have real
                consequences.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-slate-800/60 backdrop-blur-sm p-8 rounded-2xl border border-slate-700/50 hover:border-blue-500/50 transition-all">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-6">
                  <Clock className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  Time-Based Tasks
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  Schedule your day with precise timing. Each task has a
                  deadline, and the clock is always ticking.
                </p>
              </div>

              <div className="bg-slate-800/60 backdrop-blur-sm p-8 rounded-2xl border border-slate-700/50 hover:border-red-500/50 transition-all">
                <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center mb-6">
                  <AlertTriangle className="w-6 h-6 text-red-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  Strike System
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  Miss a task? Get a strike. Too many strikes? Your entire
                  progress resets. Real consequences drive real change.
                </p>
              </div>

              <div className="bg-slate-800/60 backdrop-blur-sm p-8 rounded-2xl border border-slate-700/50 hover:border-orange-500/50 transition-all">
                <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center mb-6">
                  <Flame className="w-6 h-6 text-orange-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  Streak Building
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  Complete all tasks without strikes to build your streak. Watch
                  your discipline grow day by day.
                </p>
              </div>

              <div className="bg-slate-800/60 backdrop-blur-sm p-8 rounded-2xl border border-slate-700/50 hover:border-green-500/50 transition-all">
                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-6">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  Real-Time Tracking
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  Monitor your progress throughout the day. See what's
                  completed, what's pending, and what's at risk.
                </p>
              </div>

              <div className="bg-slate-800/60 backdrop-blur-sm p-8 rounded-2xl border border-slate-700/50 hover:border-purple-500/50 transition-all">
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-6">
                  <Trophy className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  Achievement System
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  Track your longest streaks, total completed days, and personal
                  records. Celebrate your growth.
                </p>
              </div>

              <div className="bg-slate-800/60 backdrop-blur-sm p-8 rounded-2xl border border-slate-700/50 hover:border-yellow-500/50 transition-all">
                <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center mb-6">
                  <Zap className="w-6 h-6 text-yellow-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  Game Modes
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  Choose Normal mode (3 strikes) for learning or Strict mode (1
                  strike) for maximum discipline.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">
                How It Works
              </h2>
              <p className="text-xl text-slate-400">
                Simple concept, powerful results
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  Schedule Your Day
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  Add tasks with specific times. "7:00 AM - Morning workout",
                  "9:00 AM - Check emails", etc.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  Complete & Check Off
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  Mark tasks as completed when you finish them. The system
                  tracks your progress in real-time.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  Build Streaks or Reset
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  Complete all tasks to build your streak. Miss too many and
                  start over. It's discipline as a game.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Game Modes */}
        <section className="py-20 bg-slate-800/30">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">
                Choose Your Challenge
              </h2>
              <p className="text-xl text-slate-400">
                Pick the mode that matches your discipline goals
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-slate-800/60 backdrop-blur-sm p-8 rounded-2xl border border-slate-700/50">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mr-4">
                    <Shield className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-white">
                      Normal Mode
                    </h3>
                    <p className="text-blue-400">3 strikes before reset</p>
                  </div>
                </div>
                <p className="text-slate-400 leading-relaxed mb-6">
                  Perfect for building habits gradually. You get three chances
                  to miss tasks before your progress resets. More forgiving
                  while you develop consistency.
                </p>
                <div className="flex items-center text-sm text-slate-500">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Recommended for beginners
                </div>
              </div>

              <div className="bg-slate-800/60 backdrop-blur-sm p-8 rounded-2xl border border-red-700/50">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center mr-4">
                    <Zap className="w-6 h-6 text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-white">
                      Strict Mode
                    </h3>
                    <p className="text-red-400">1 strike and you're out</p>
                  </div>
                </div>
                <p className="text-slate-400 leading-relaxed mb-6">
                  Maximum discipline mode. Miss a single task and your entire
                  progress resets. Only for those serious about building
                  unbreakable habits.
                </p>
                <div className="flex items-center text-sm text-slate-500">
                  <Flame className="w-4 h-4 mr-2" />
                  For the disciplined
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Build Discipline?
            </h2>
            <p className="text-xl text-slate-400 mb-12 leading-relaxed">
              Stop making excuses. Start building habits that stick. Turn your
              daily schedule into a game where consistency wins and discipline
              grows stronger every day.
            </p>
            <button
              onClick={() => navigate('/signup')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-6 rounded-2xl font-bold text-xl flex items-center justify-center space-x-3 mx-auto transition-all shadow-2xl hover:shadow-3xl transform hover:scale-105"
            >
              <Target className="w-6 h-6" />
              <span>Start Your First Day</span>
              <ArrowRight className="w-6 h-6" />
            </button>
            {/*<p className="text-sm text-slate-500 mt-6">
              No signup required • Works offline • Your data stays private
            </p>
*/}{' '}
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-slate-700/50 py-12 bg-slate-800/30">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center space-x-3 mb-4 md:mb-0">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Target className="w-4 h-4 text-white" />
                </div>
                <span className="text-white font-semibold">Check-it</span>
              </div>
              <p className="text-slate-400 text-sm">
                Discipline as a Game • Built for those who want to level up
                their life
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default Home
