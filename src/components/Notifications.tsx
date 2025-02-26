import React, { useState } from 'react';
import { Modal, List, Typography, Badge, Select, Tooltip } from 'antd';
import { useTaskStore, Priority } from '../store/taskStore';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, Star, AlertCircle, Filter } from 'lucide-react';

interface NotificationsProps {
    isOpen: boolean;
    onClose: () => void;
}

const Notifications: React.FC<NotificationsProps> = ({ isOpen, onClose }) => {
    const { tasks } = useTaskStore();
    const [priorityFilter, setPriorityFilter] = useState<Priority | 'all'>('all');
    const [showImportantOnly, setShowImportantOnly] = useState(false);

    const filteredTasks = tasks
        .filter(task => !task.completed)
        .filter(task => priorityFilter === 'all' || task.priority === priorityFilter)
        .filter(task => !showImportantOnly || task.isImportant)
        .sort((a, b) => {
            // Sort by priority first
            const priorityOrder = { high: 3, medium: 2, low: 1 };
            const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
            if (priorityDiff !== 0) return priorityDiff;

            // Then by importance
            if (a.isImportant !== b.isImportant) return b.isImportant ? 1 : -1;

            // Finally by date
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });

    const getPriorityColor = (priority: Priority) => {
        switch (priority) {
            case 'high': return 'red';
            case 'medium': return 'orange';
            case 'low': return 'blue';
        }
    };

    return (
        <Modal
            title="Notifications"
            open={isOpen}
            onCancel={onClose}
            footer={null}
            width={600}
        >
            <div className="mb-4 flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-gray-500" />
                    <Select
                        value={priorityFilter}
                        onChange={setPriorityFilter}
                        style={{ width: 120 }}
                    >
                        <Select.Option value="all">All Priority</Select.Option>
                        <Select.Option value="high">High</Select.Option>
                        <Select.Option value="medium">Medium</Select.Option>
                        <Select.Option value="low">Low</Select.Option>
                    </Select>
                </div>
                <Select
                    value={showImportantOnly}
                    onChange={setShowImportantOnly}
                    style={{ width: 120 }}
                >
                    <Select.Option value={false}>All Tasks</Select.Option>
                    <Select.Option value={true}>Important Only</Select.Option>
                </Select>
            </div>

            <List
                itemLayout="horizontal"
                dataSource={filteredTasks}
                renderItem={(task) => (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <List.Item className="hover:bg-pink-50 p-4 rounded-lg transition-colors">
                            <List.Item.Meta
                                avatar={
                                    <div className="flex items-center gap-2">
                                        <Badge status="processing" color={getPriorityColor(task.priority)} />
                                        {task.isImportant && (
                                            <Tooltip title="Important Task">
                                                <Star className="w-4 h-4 text-yellow-500" />
                                            </Tooltip>
                                        )}
                                        {task.priority === 'high' && (
                                            <Tooltip title="High Priority">
                                                <AlertCircle className="w-4 h-4 text-red-500" />
                                            </Tooltip>
                                        )}
                                    </div>
                                }
                                title={
                                    <Typography.Text strong className="text-gray-800">
                                        {task.title}
                                    </Typography.Text>
                                }
                                description={
                                    <div className="space-y-1">
                                        <div className="text-sm text-gray-500">{task.description}</div>
                                        <div className="flex items-center gap-2 text-xs">
                                            <span className={`px-2 py-1 rounded-full ${task.priority === 'high' ? 'bg-red-100 text-red-700' :
                                                    task.priority === 'medium' ? 'bg-orange-100 text-orange-700' :
                                                        'bg-blue-100 text-blue-700'
                                                }`}>
                                                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                                            </span>
                                            {task.dueDate && (
                                                <span className="flex items-center gap-1">
                                                    <Clock className="w-3 h-3" />
                                                    {new Date(task.dueDate).toLocaleDateString()}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                }
                            />
                        </List.Item>
                    </motion.div>
                )}
            />
        </Modal>
    );
};

export default Notifications