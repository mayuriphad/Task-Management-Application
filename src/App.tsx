import React from 'react';
import { Layout, Typography, Spin, Alert } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Calendar from './components/Calendar';
import Notifications from './components/Notifications';
import Settings from './components/Settings';
import { useTaskStore } from './store/taskStore';
import { Sparkles, Calendar as CalendarIcon, Bell, Settings as SettingsIcon } from 'lucide-react';

const { Content } = Layout;
const { Title } = Typography;

function App() {
  const { error, loading, fetchTasks } = useTaskStore();
  const [isCalendarOpen, setIsCalendarOpen] = React.useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = React.useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);

  React.useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <Layout className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm shadow-lg border-b border-pink-100">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16">
          <div className="flex justify-between items-center h-full">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2"
            >
              <Sparkles className="w-6 h-6 text-pink-500" />
              <Title level={3} className="text-pink-600 m-0">
                Task Manager
              </Title>
            </motion.div>

            <div className="hidden sm:flex items-center gap-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 hover:text-pink-500 hover:bg-pink-50 transition-all"
                onClick={() => setIsCalendarOpen(true)}
              >
                <CalendarIcon className="w-4 h-4" />
                <span>Calendar</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 hover:text-pink-500 hover:bg-pink-50 transition-all"
                onClick={() => setIsNotificationsOpen(true)}
              >
                <Bell className="w-4 h-4" />
                <span>Notifications</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 hover:text-pink-500 hover:bg-pink-50 transition-all"
                onClick={() => setIsSettingsOpen(true)}
              >
                <SettingsIcon className="w-4 h-4" />
                <span>Settings</span>
              </motion.button>
            </div>
          </div>
        </nav>
      </header>

      <Content className="p-8 max-w-5xl mx-auto w-full">
        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4"
            >
              <Alert
                message="Error"
                description={error}
                type="error"
                showIcon
                className="shadow-md"
              />
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <motion.div
            className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-xl border border-pink-100"
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <TaskForm />
          </motion.div>
          {loading ? (
            <div className="flex justify-center p-8">
              <Spin size="large" />
            </div>
          ) : (
            <TaskList />
          )}
        </motion.div>
      </Content>

      <Calendar isOpen={isCalendarOpen} onClose={() => setIsCalendarOpen(false)} />
      <Notifications isOpen={isNotificationsOpen} onClose={() => setIsNotificationsOpen(false)} />
      <Settings isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </Layout>
  );
}

export default App;