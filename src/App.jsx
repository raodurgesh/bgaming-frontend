import { useEffect, useState } from "react";
import "./App.css";
import { API } from "./runner_api";

const TOKEN = new URL(document.location).searchParams.get("token");

function App() {
  const [lastRound, setLastRound] = useState(null);
  const [state, setState] = useState(null);

  useEffect(() => {
    API.init(TOKEN).then((state) => {
      setState(state);
    });
  }, []);

  const spinClicked = () => {
    API.play(TOKEN, { bet: 20 }).then((data) => {
      const { balance, resp } = data;

      setLastRound(resp);
      setState((state) => Object.assign({}, state, { balance }));
    });
  };

  const freeBetClicked = () => {
    API.play(TOKEN, { bet: 20, bet_type: "freebet" }).then((data) => {
      const { balance, resp } = data;

      setLastRound(resp);
      setState((state) => Object.assign({}, state, { balance }));
    });
  };

  const buyFreeSpinClicked = () => {
    API.play(TOKEN, { bet: 20, featureToBuy: "FREE_SPINS" }).then((data) => {
      const { balance, resp } = data;

      setLastRound(resp);
      setState((state) => Object.assign({}, state, { balance }));
    });
  };

  return (
    <>
      <h1>BGaming Publishing Game Sample</h1>
      {state ? (
        <div className="card">
          <div>Balance: {state.balance}</div>

          <button onClick={spinClicked}>Spin</button>

          <button onClick={freeBetClicked}>Free bet</button>

          <button onClick={buyFreeSpinClicked}>Buy free spins</button>

          {lastRound?.win === 0 ? <div>You lose! :=(</div> : null}
          {lastRound && lastRound.win > 0 ? (
            <div>You win {lastRound?.win}!</div>
          ) : null}
        </div>
      ) : (
        <div>Loading</div>
      )}
    </>
  );
}

export default App;
