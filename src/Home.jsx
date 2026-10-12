import React from "react";
import { useState, useEffect } from "react";
import {
  Row,
  Col,
  Button,
  Form,
  ListGroup,
  ProgressBar,
} from "react-bootstrap";
const Home = () => {
  const [theme, setTheme] = useState("");
  const [backgroundImg, setBackgroundImg] = useState("");
  const [mode, setMode] = useState("dark");
  const [bgmode, setBgmode] = useState("bgdark");
  const [count, setCount] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [inputText, setInputText] = useState("");
  const [start, setStart] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [inputName, setInputName] = useState("");
  const [generatedList, setGeneratedList] = useState([]);
  const [conter, setConter] = useState(0);
  useEffect(() => {
    document.documentElement.style.setProperty("--color", theme);
  }, [theme]);
  useEffect(() => {
    if (backgroundImg) {
      document.documentElement.style.setProperty(
        "--background-image",
        `url("${backgroundImg}")`,
      );
    }
  }, [backgroundImg]);
  useEffect(() => {
    if (start) {
      const timer = setInterval(() => {
        setCount((count) => count + 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [start]);
  const minutes = String(Math.floor(count / 60)).padStart(2, "0");
  const seconds = String(count % 60).padStart(2, "0");
  const img = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=3840&q=80",
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=3840&q=80",
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=3840&q=80",
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=3840&q=80",
    },
  ];
  const handleNextImage = () => {
    const currentIndex = img.findIndex((item) => item.src === backgroundImg);
    const nextIndex =
      currentIndex === img.length - 1 ? 0 : (currentIndex + 1) % img.length;
    setBackgroundImg(img[nextIndex].src);
  };
  const handlePrevImage = () => {
    const currentIndex = img.findIndex((item) => item.src === backgroundImg);
    const prevIndex =
      currentIndex === 0 || currentIndex === -1
        ? img.length - 1
        : (currentIndex - 1) % img.length;
    setBackgroundImg(img[prevIndex].src);
  };
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    const newTask = {
      id: Date.now(),
      text: inputText.trim(),
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setInputText("");
  };
  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };
  const templates = [
    { id: 1, text: "works as a programmer." },
    { id: 2, text: "'s specialization is in Front-End development." },
    { id: 3, text: "has five years of experience in this field." },
    { id: 4, text: "is currently training at Aladdin Alhallak Academy." },
  ];
  const handleGenerate = (e) => {
    e.preventDefault();
    if (!inputName.trim()) return;
    const trimmedName = inputName.trim();
    const newSentences = templates.map((item) => {
      const sentenceText = item.text.startsWith("'s")
        ? `${trimmedName}${item.text}`
        : `${trimmedName} ${item.text}`;

      return {
        id: `${item.id}-${Date.now()}`,
        text: sentenceText,
      };
    });

    setGeneratedList(newSentences);
    setInputName("");
  };
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const progressPercentage =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);
  const handleLoading = () => {
    setLoadingText("Loading...");
    setTimeout(() => {
      setLoadingText("");
    }, 4000);
  };
  return (
    <div className={`container-fluid h-100 py-5 ${mode}`}>
      <Row className="d-flex ms-auto fixed-top mt-4 justify-content-around align-items-center text-nowrap w-25">
        <Col className="btns text-center ">
          <input
            type="color"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="mb-2"
          />
        </Col>
        <Col>
          <Button
            onClick={() => {
              (setMode(mode === "light" ? "dark" : "light"),
                setBgmode(bgmode === "bglight" ? "bgdark" : "bglight"));
            }}
            className="p-1 mb-2"
          >
            Mode
          </Button>
        </Col>
        <Col>
          <Button onClick={handleNextImage} className="p-1 mb-2">
            Next bg
          </Button>
        </Col>
        <Col>
          <Button onClick={handlePrevImage} className="p-1 mb-2">
            Prev bg
          </Button>
        </Col>
      </Row>
      <Row>
        <Col lg={12} className="text-center">
          <h1 className="mt-3">SLEMAN ALNBKE</h1>
        </Col>
      </Row>
      <hr className="fw-bold opacity-100" />
      <Row className={`justify-content-center ${bgmode} py-4 m-4 rounded-5`}>
        <Col sm={12} className={`p-4 h-100`}>
          <h2 className="text-center">tasks manager</h2>
          <Form onSubmit={handleAddTask} className="">
            <Form.Control
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter a Task here..."
              className=" w-25 p-1"
            />
          </Form>
          <ListGroup className="mt-4 w-25">
            {tasks.map((task) => (
              <ListGroup.Item
                key={task.id}
                className="d-flex justify-content-between align-items-center border-0 bg-transparent text-white"
              >
                <span
                  className="text-nowrap"
                  style={{
                    textDecoration: task.completed ? "line-through" : "none",
                    opacity: task.completed ? 0.6 : 1,
                  }}
                >
                  {task.text}
                </span>

                <div>
                  <Button
                    size="lg"
                    className="px-3 mx-2 mt-2"
                    onClick={() => toggleTaskCompletion(task.id)}
                  >
                    ✓
                  </Button>
                  <Button
                    size="lg"
                    onClick={() => deleteTask(task.id)}
                    className="px-3 mx-2 mt-2"
                  >
                    ✕
                  </Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <div>
            <div className="d-flex justify-content-between small text-muted mb-1 mt-3">
              <span>Progress</span>
              <span>{progressPercentage}%</span>
            </div>
            <ProgressBar
              now={progressPercentage}
              variant="success"
              style={{ height: "8px" }}
              className="rounded-pill mt-2"
            />
          </div>
        </Col>
      </Row>
      <Row className={`justify-content-center m-4 p-4 ${bgmode} rounded-5`}>
        <Col sm={12} className="text-start">
          <h2 className="d-block text-center">
            {minutes}:{seconds}
          </h2>
          <h5 className="mt-3">FOCUS SESSION</h5>
          <Button
            variant="outline-success"
            size="lg"
            className="px-3 me-2 mt-4"
            onClick={() => setStart(!start)}
          >
            Start
          </Button>
          <Button
            variant="outline-danger"
            size="lg"
            className="px-3 mx-2 mt-4"
            onClick={() => {
              setStart(false);
              setCount(0);
            }}
          >
            Reset
          </Button>
        </Col>
      </Row>
      <Row className={`justify-content-center m-4 p-4 ${bgmode} rounded-5`}>
        <Col sm={12} className="text-start">
          <Form className="mt-2 d-flex align-items-center">
            <Form.Control
              type="text"
              placeholder="Enter a Name..."
              className="mt-2 w-25 p-1"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
            />
            <Button
              type="submit"
              variant="outline-primary"
              className="mt-2 ms-2 p-1 rounded-2"
              onClick={handleGenerate}
            >
              Generate
            </Button>
          </Form>
          {generatedList.length > 0 && (
            <ul className="mt-4 list-unstyled ms-2">
              {generatedList.map((item) => (
                <li key={item.id} className="mb-2">
                  {item.text}
                </li>
              ))}
            </ul>
          )}
        </Col>
      </Row>
      <Row
        className={`d-flex justify-content-center align-items-center m-4 p-4 ${bgmode} rounded-5`}
      >
        <Col sm={12} className="text-start">
          <h5>MOTIVATION</h5>
        </Col>
        <Col sm={4}>
          <Button
            variant="outline-success"
            size="lg"
            className="px-3 me-2 mt-4"
            onClick={handleLoading}
          >
            Click to load
          </Button>
        </Col>
        <Col sm={8} className="text-start mt-2">
          <h3 className="text-center">{loadingText}</h3>
        </Col>
      </Row>
      <Row className={`d-flex align-items-center m-4 p-4 ${bgmode} rounded-5`}>
        <Col sm={12}>
          <h5>ANALYTICS</h5>
          <span>
            Task Completed : {completedTasks} / {totalTasks}
          </span>
        </Col>
        <Col sm={12} className="text-start mt-2">
          <h3 className="ms-3">{conter}</h3>
          <Button
            variant="outline-success"
            size="lg"
            className="px-3 me-2 mt-4"
            onClick={() => setConter((conter) => conter + 1)}
          >
            Click +1
          </Button>
          <Button
            variant="outline-danger"
            size="lg"
            className="px-3 me-2 mt-4"
            onClick={() => setConter(0)}
          >
            Reset
          </Button>
        </Col>
      </Row>
    </div>
  );
};
export default Home;
