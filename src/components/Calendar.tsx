import React from 'react';
import { Modal, Calendar as AntCalendar, Badge, Tooltip } from 'antd';
import { useTaskStore } from '../store/taskStore';
import type { Dayjs } from 'dayjs';
import { Star, AlertCircle } from 'lucide-react';

interface CalendarProps {
    isOpen: boolean;
    onClose: () => void;
}

const Calendar: React.FC<CalendarProps> = ({ isOpen, onClose }) => {
    const { tasks } = useTaskStore();

    const getListData = (value: Dayjs) => {
        const dateStr = value.format('YYYY-MM-DD');
        return tasks.filter(task => {
            const taskDate = task.dueDate
                ? new Date(task.dueDate).toISOString().split('T')[0]
                : new Date(task.createdAt).toISOString().split('T')[0];
            return taskDate === dateStr;
        });
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high': return 'red';
            case 'medium': return 'orange';
            case 'low': return 'blue';
            default: return 'blue';
        }
    };

    const dateCellRender = (value: Dayjs) => {
        const listData = getListData(value);
        return (
            <ul className="list-none p-0 m-0">
                {listData.map(item => (
                    <li key={item._id} className="flex items-center gap-1 mb-1">
                        <Badge
                            status={item.completed ? 'success' : 'processing'}
                            color={getPriorityColor(item.priority)}
                        />
                        <Tooltip
                            title={
                                <div>
                                    <p>{item.title}</p>
                                    <p>Priority: {item.priority}</p>
                                    {item.description && <p>{item.description}</p>}
                                </div>
                            }
                        >
                            <span className="flex items-center gap-1 text-xs truncate">
                                {item.isImportant && <Star className="w-3 h-3 text-yellow-500" />}
                                {item.priority === 'high' && <AlertCircle className="w-3 h-3 text-red-500" />}
                                {item.title}
                            </span>
                        </Tooltip>
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <Modal
            title="Task Calendar"
            open={isOpen}
            onCancel={onClose}
            footer={null}
            width={800}
        >
            <div className="mb-4 flex gap-2 items-center text-sm">
                <span className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500" /> Important
                </span>
                <span className="flex items-center gap-1">
                    <AlertCircle className="w-4 h-4 text-red-500" /> High Priority
                </span>
            </div>
            <AntCalendar
                className="p-4"
                cellRender={dateCellRender}
            />
        </Modal>
    );
};

export default Calendar