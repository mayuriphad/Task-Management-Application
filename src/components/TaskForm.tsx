import React from 'react';
import { Form, Input, Button, DatePicker, Select } from 'antd';
import { motion } from 'framer-motion';
import { useTaskStore, Priority } from '../store/taskStore';
import { Plus, Sparkle } from 'lucide-react';

const TaskForm: React.FC = () => {
  const [form] = Form.useForm();
  const { addTask, loading } = useTaskStore();

  const onFinish = async (values: any) => {
    await addTask({
      title: values.title,
      description: values.description,
      completed: false,
      isImportant: values.isImportant || false,
      priority: values.priority || 'low',
      dueDate: values.dueDate?.toDate(),
    });
    form.resetFields();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative"
    >
      <Form
        form={form}
        name="taskForm"
        onFinish={onFinish}
        layout="vertical"
        className="space-y-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item
            name="title"
            label={
              <span className="flex items-center gap-2">
                <Sparkle className="w-4 h-4 text-pink-500" />
                Task Title
              </span>
            }
            rules={[{ required: true, message: 'Please enter a task title' }]}
          >
            <Input
              placeholder="What needs to be done?"
              className="rounded-lg text-lg"
              disabled={loading}
            />
          </Form.Item>

          <Form.Item
            name="priority"
            label="Priority"
            initialValue="low"
          >
            <Select>
              <Select.Option value="low">Low</Select.Option>
              <Select.Option value="medium">Medium</Select.Option>
              <Select.Option value="high">High</Select.Option>
            </Select>
          </Form.Item>
        </div>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: 'Please enter a description' }]}
        >
          <Input.TextArea
            placeholder="Add more details about this task..."
            rows={4}
            className="rounded-lg"
            disabled={loading}
          />
        </Form.Item>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item
            name="dueDate"
            label="Due Date"
          >
            <DatePicker className="w-full" />
          </Form.Item>

          <Form.Item
            name="isImportant"
            valuePropName="checked"
            label="Mark as Important"
          >
            <Select>
              <Select.Option value={true}>Yes</Select.Option>
              <Select.Option value={false}>No</Select.Option>
            </Select>
          </Form.Item>
        </div>

        <Form.Item>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              type="primary"
              htmlType="submit"
              icon={<Plus className="w-4 h-4" />}
              className="w-full rounded-lg flex items-center justify-center h-12 text-lg"
              loading={loading}
            >
              Add Task
            </Button>
          </motion.div>
        </Form.Item>
      </Form>
    </motion.div>
  );
};

export default TaskForm