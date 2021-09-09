import classNames from "classnames";
import styles from "./app.module.css";
import WindowBody from "./components/windowBody/windowBody";

function App() {
  return (
    <div className={classNames("window", styles.container)}>
      <div className="title-bar">
        <div className="title-bar-text">redux - piant</div>
        <div className="title-bar-controls">
          <button aria-label="Minimize"></button>
          <button aria-label="Maximize"></button>
          <button aria-label="Close"></button>
        </div>
      </div>
      <WindowBody />
    </div>
  );
}

export default App;
