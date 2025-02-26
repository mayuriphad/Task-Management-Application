import React from 'react';
import { List, Card, Button, Typography, Select, Popconfirm } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, CheckCircle, Edit, ListFilter } from 'lucide-react';
import { useTaskStore, Task } from '../store/taskStore';

const { Title } = Typography;

const TaskList: React.FC = () => {
  const [sortBy, setSortBy] = React.useState<string>('createdAt');
  const { tasks, deleteTask, toggleComplete, loading } = useTaskStore();

  const getSortedTasks = () => {
    return [...tasks].sort((a, b) => {
      if (sortBy === 'createdAt') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      if (sortBy === 'completed') {
        return Number(b.completed) - Number(a.completed);
      }
      return 0;
    });
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, x: -100 }
  };

  return (
    <div className="space-y-6">
      <motion.div
        className="flex justify-between items-center mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Title level={4} className="!m-0 flex items-center gap-2">
          <ListFilter className="w-5 h-5 text-pink-500" />
          Tasks
        </Title>
        <Select
          defaultValue="createdAt"
          style={{ width: 140 }}
          onChange={(value) => setSortBy(value)}
          className="rounded-lg"
          options={[
            { value: 'createdAt', label: 'Date' },
            { value: 'title', label: 'Title' },
            { value: 'completed', label: 'Status' },
          ]}
        />
      </motion.div>
      <AnimatePresence mode="popLayout">
        <List
          grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 3, xl: 3, xxl: 4 }}
          dataSource={getSortedTasks()}
          renderItem={(task: Task) => (
            <motion.div
              key={task._id}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              layout
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <List.Item>
                <Card
                  className={`h-full transform transition-all duration-200 hover:shadow-lg ${task.completed
                      ? 'bg-green-50/50 border-green-100'
                      : 'bg-white/80 backdrop-blur-sm border-pink-100'
                    }`}
                  actions={[
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <Button
                        key="complete"
                        type="text"
                        icon={<CheckCircle className={`w-4 h-4 ${task.completed ? 'text-green-500' : ''}`} />}
                        onClick={() => toggleComplete(task._id)}
                        loading={loading}
                      />
                    </motion.div>,
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <Button
                        key="edit"
                        type="text"
                        icon={<Edit className="w-4 h-4 text-pink-500" />}
                      />
                    </motion.div>,
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <Popconfirm
                        title="Delete task?"
                        onConfirm={() => deleteTask(task._id)}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Button
                          key="delete"
                          type="text"
                          danger
                          icon={<Trash2 className="w-4 h-4" />}
                          loading={loading}
                        />
                      </Popconfirm>
                    </motion.div>
                  ]}
                >
                  <Card.Meta
                    title={
                      <motion.span
                        className={`block ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'
                          }`}
                        animate={{
                          scale: task.completed ? 0.98 : 1
                        }}
                      >
                        {task.title}
                      </motion.span>
                    }
                    description={
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-2 text-gray-600"
                      >
                        {task.description}
                      </motion.p>
                    }
                  />
                </Card>
              </List.Item>
            </motion.div>
          )}
        />
      </AnimatePresence>
    </div>
  );
};

export default TaskList;