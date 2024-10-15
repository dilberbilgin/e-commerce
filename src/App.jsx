import "./App.css";
import PageContainer from "./container/PageContainer";
import Header from "./components/Header";
import RouterConfig from "./config/RouterConfig";
import Loading from "./components/Loading";
import Drawer from "@mui/material/Drawer";
import { useDispatch, useSelector } from "react-redux";
import { calculateBasket, setDrawer } from "./redux/slices/basketSlice";
import { useEffect } from "react";

function App() {
  const { products, drawer, totalAmount } = useSelector(
    (store) => store.basket
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateBasket());
  }, []);

  return (
    <div>
      <PageContainer>
        <Header />
        <RouterConfig />
        <Loading />
        <Drawer
          className="drawer"
          sx={{ padding: "20px" }}
          onClose={() => dispatch(setDrawer())}
          anchor="right"
          open={drawer}
        >
          {products &&
            products.map((product) => {
              return (
                <div key={product.id}>
                  <div
                    className="flex-row"
                    style={{ padding: "10px" }}
                    key={product.id}
                  >
                    <img
                      style={{ marginRight: "5px" }}
                      src={product.image}
                      width={50}
                      height={50}
                    ></img>
                    <p style={{ width: "320px" }}>
                      {product.title}({product.count})
                    </p>
                    <p style={{ fontWeight: "bold", marginRight: "10px" }}>
                      {product.price}TL
                    </p>
                    <button
                      style={{
                        padding: "5px",
                        borderRadius: "5px",
                        backgroundColor: "orange",
                        color: "#fff",
                        border: "none",
                        width: "60px",
                      }}
                    >
                      Sil
                    </button>
                  </div>
                </div>
              );
            })}
          <div>
            <p style={{ textAlign: "center" }}>Toplam Tutar: {totalAmount}</p>
          </div>
        </Drawer>
      </PageContainer>
    </div>
  );
}

export default App;
