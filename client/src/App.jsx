import { Button } from "@mui/material";
import { Header } from "./Header";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Record } from "./pages/Record";
import { SalesList } from "./pages/SalesList";
import { MounthlyTotal } from "./pages/MounthlyTotal";
const App = () => {
  return (
    <div>
      <Header />

      <BrowserRouter>
        <section className="section">
          <div>
            <div className="columns">
              <div>
                <aside>
                  <p className="menu-label">売上記録</p>
                  <ul>
                    <li>
                      <Link to="/sales/record">記録</Link>
                    </li>
                  </ul>
                  <p className="menu-label">売上管理</p>
                  <ul>
                    <li>
                      <Link to="/sales/list">売上一覧</Link>
                    </li>
                    <li>
                      <Link to="/sales/monthly">売上合計</Link>
                    </li>
                  </ul>
                </aside>
              </div>
            </div>
            <div>
              <Routes>
                <Route path="/sales/record" element={<Record />} />
                <Route path="/sales/list" element={<SalesList />} />
                <Route path="/sales/monthly" element={<MounthlyTotal />} />
              </Routes>
            </div>
          </div>
        </section>
      </BrowserRouter>
    </div>
  );
};

export default App;
