import React, { useState } from "react";
import {
  Container,
  Form,
  Button,
  InputGroup,
  ListGroup,
  ProgressBar,
} from "react-bootstrap";

function TodoApp() {
  // 1. حالات المكون
  const [inputText, setInputText] = useState("");
  const [tasks, setTasks] = useState([]);

  // 2. إضافة مهمة جديدة
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return; // منع إضافة نص فارغ

    const newTask = {
      id: Date.now(), // استخدام التاريخ كمعرف فريد
      text: inputText.trim(),
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setInputText(""); // تفريغ حقل الإدخال
  };

  // 3. تبديل حالة المهمة (منتهية / غير منتهية)
  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  // 4. حذف مهمة
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // 5. حساب النسبة المئوية لشريط التقدم
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const progressPercentage =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  return (
    <Container className="py-4" style={{ maxWidth: "500px" }}>
      <h3 className="mb-3 text-center">قائمة المهام</h3>

      {/* حقل الإدخال وزر الإضافة */}
      <Form onSubmit={handleAddTask} className="mb-3">
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="أدخل اسم المهمة..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <Button variant="primary" type="submit">
            إضافة
          </Button>
        </InputGroup>
      </Form>

      {/* قائمة المهام */}
      <ListGroup className="mb-4">
        {tasks.map((task) => (
          <ListGroup.Item
            key={task.id}
            className="d-flex justify-content-between align-items-center"
          >
            {/* نص المهمة مع خط في المنتصف إذا كانت مكتملة */}
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
                opacity: task.completed ? 0.6 : 1,
              }}
            >
              {task.text}
            </span>

            {/* أزرار التحكم */}
            <div>
              {/* زر إنهاء المهمة (صح) */}
              <Button
                variant={task.completed ? "success" : "outline-success"}
                size="sm"
                className="me-2"
                onClick={() => toggleTaskCompletion(task.id)}
              >
                ✓
              </Button>

              {/* زر حذف المهمة (إكس) */}
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => deleteTask(task.id)}
              >
                ✕
              </Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>

      {/* شريط التقدم بعرض الشاشة/الحاوية */}
      <div>
        <div className="d-flex justify-content-between mb-1 text-muted small">
          <span>التقدم</span>
          <span>{progressPercentage}%</span>
        </div>
        <ProgressBar
          now={progressPercentage}
          variant="success"
          style={{ height: "10px" }}
        />
      </div>
    </Container>
  );
}

export default TodoApp;
