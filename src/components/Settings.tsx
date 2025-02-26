import React from 'react';
import { Modal, Form, Switch, Select, Button, Divider } from 'antd';
import { motion } from 'framer-motion';

interface SettingsProps {
    isOpen: boolean;
    onClose: () => void;
}

const Settings: React.FC<SettingsProps> = ({ isOpen, onClose }) => {
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        console.log('Settings updated:', values);
        onClose();
    };

    return (
        <Modal
            title="Settings"
            open={isOpen}
            onCancel={onClose}
            footer={null}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                initialValues={{
                    notifications: true,
                    theme: 'light',
                    autoArchive: false
                }}
            >
                <Form.Item
                    name="notifications"
                    label="Enable Notifications"
                    valuePropName="checked"
                >
                    <Switch />
                </Form.Item>

                <Form.Item name="theme" label="Theme">
                    <Select>
                        <Select.Option value="light">Light</Select.Option>
                        <Select.Option value="dark">Dark</Select.Option>
                        <Select.Option value="system">System</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="autoArchive"
                    label="Auto-archive Completed Tasks"
                    valuePropName="checked"
                >
                    <Switch />
                </Form.Item>

                <Divider />

                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Save Settings
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default Settings;