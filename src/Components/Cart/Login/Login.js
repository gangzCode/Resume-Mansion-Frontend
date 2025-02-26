import "./Login.css";
import React, { useState } from "react";
import {
  getCurrentOrder,
  getPreviousOrders,
  loginUser,
} from "../../../Services/apiCalls";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Context/AuthContext";
import { Typography } from "@mui/material";
import { useSnackbar } from "../../../Context/SnackbarContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await loginUser(email, password);
      const { token, info } = response.data;

      login(token, info);

      showSnackbar("Successfully logged in!", "success");

      const checkToken = () => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
          console.log("Token found: ", storedToken);

          checkOrders();
        } else {
          console.log("asd");

          setTimeout(checkToken, 100);
        }
      };

      const checkOrders = async () => {
        try {
          const currentOrderResponse = await getCurrentOrder();

          console.log(currentOrderResponse.data, "currentOrderResponse");

          if (
            currentOrderResponse.http_status === 200 &&
            currentOrderResponse.data.length !== 0
          ) {
            console.log("currentOrderResponse.data.length > 0");
            const orderDetails = {
              order_id: currentOrderResponse.data.order_id,
              total: currentOrderResponse.data.total,
              currency_code: currentOrderResponse.data.currency_code,
              package: currentOrderResponse.data.package,
              package_id: currentOrderResponse.data.package_id,
              lines: currentOrderResponse.data.lines,
            };

            localStorage.setItem("orderDetails", JSON.stringify(orderDetails));

            navigate("/currentOrder");
            return;
          }

          const previousOrdersResponse = await getPreviousOrders();

          if (
            previousOrdersResponse.http_status === 200 &&
            previousOrdersResponse.data.length !== 0
          ) {
            navigate("/previousOrders");
            return;
          }

          const redirectPath =
            sessionStorage.getItem("redirectAfterLogin") || "/";
          sessionStorage.removeItem("redirectAfterLogin");
          navigate(redirectPath);
        } catch (orderError) {
          console.error("Error checking orders:", orderError);
          const redirectPath =
            sessionStorage.getItem("redirectAfterLogin") || "/";
          sessionStorage.removeItem("redirectAfterLogin");
          navigate(redirectPath);
        }
      };

      checkToken();
    } catch (err) {
      showSnackbar(err.message || "Login failed. Please try again.", "error");
      setError(err.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="class_continer emptycart_bk">
      <div className="continer_main_box">
        <div className="container">
          <div className="login_continer">
            <div className="login_box">
              <div className="login_hero_section">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="218"
                    height="24"
                    viewBox="0 0 218 24"
                    fill="none"
                  >
                    <g clip-path="url(#clip0_331_22866)">
                      <path
                        d="M108.571 11.4501C108.571 10.8915 108.55 10.3328 108.507 9.77421C108.485 9.21556 108.453 8.65692 108.41 8.09828H110.694V10.3866H110.758C111.273 9.50563 111.98 8.83955 112.881 8.38835C113.803 7.93713 114.714 7.71153 115.615 7.71153C116.022 7.71153 116.451 7.7545 116.901 7.84045C117.373 7.92639 117.823 8.08754 118.252 8.32389C118.681 8.53875 119.078 8.8503 119.442 9.25854C119.828 9.66677 120.15 10.1932 120.407 10.8378C120.836 9.87089 121.512 9.10813 122.434 8.54949C123.377 7.99085 124.353 7.71153 125.36 7.71153C127.29 7.71153 128.716 8.2272 129.638 9.25854C130.56 10.2684 131.021 11.7187 131.021 13.6095V23.1816H128.898V14.383C128.898 12.8575 128.63 11.6865 128.094 10.87C127.558 10.0535 126.561 9.64529 125.103 9.64529C124.31 9.64529 123.645 9.80643 123.109 10.1287C122.573 10.4295 122.133 10.8378 121.79 11.3534C121.469 11.8691 121.233 12.46 121.083 13.1261C120.933 13.7706 120.858 14.4475 120.858 15.1565V23.1816H118.735V14.383C118.735 12.8575 118.467 11.6865 117.931 10.87C117.395 10.0535 116.397 9.64529 114.939 9.64529C114.811 9.64529 114.511 9.68826 114.039 9.77421C113.589 9.86015 113.117 10.0965 112.624 10.4832C112.13 10.87 111.68 11.4501 111.273 12.2236C110.887 12.9971 110.694 14.0714 110.694 15.4466V23.1816H108.571V11.4501Z"
                        fill="#237655"
                      />
                      <path
                        d="M143.393 15.6722C142.857 15.6722 142.182 15.7044 141.367 15.7689C140.574 15.8118 139.802 15.9407 139.051 16.1556C138.322 16.349 137.69 16.6605 137.154 17.0903C136.639 17.52 136.382 18.1109 136.382 18.8629C136.382 19.3571 136.478 19.7868 136.671 20.152C136.885 20.4958 137.164 20.7859 137.507 21.0222C137.85 21.2371 138.226 21.3982 138.633 21.5057C139.062 21.5916 139.491 21.6346 139.92 21.6346C140.692 21.6346 141.356 21.5057 141.914 21.2478C142.493 20.99 142.975 20.6462 143.361 20.2165C143.747 19.7653 144.026 19.2496 144.197 18.6695C144.39 18.0679 144.487 17.434 144.487 16.768V15.6722H143.393ZM144.487 13.9318V13.545C144.487 10.9452 143.2 9.64529 140.627 9.64529C138.869 9.64529 137.336 10.2362 136.028 11.4179L134.741 9.90312C136.156 8.44206 138.279 7.71153 141.11 7.71153C141.839 7.71153 142.536 7.81896 143.2 8.03382C143.886 8.24868 144.476 8.58172 144.969 9.03293C145.462 9.46266 145.859 10.0106 146.159 10.6766C146.46 11.3427 146.61 12.1377 146.61 13.0616V19.7975C146.61 20.3776 146.631 20.99 146.674 21.6346C146.738 22.2577 146.803 22.7734 146.867 23.1816H144.808C144.744 22.8163 144.691 22.4188 144.648 21.9891C144.626 21.5594 144.616 21.1404 144.616 20.7322H144.551C143.929 21.742 143.19 22.4726 142.332 22.9238C141.496 23.3535 140.466 23.5683 139.244 23.5683C138.579 23.5683 137.936 23.4717 137.314 23.2783C136.693 23.1064 136.135 22.8378 135.642 22.4726C135.17 22.0858 134.784 21.6238 134.484 21.0867C134.205 20.528 134.066 19.8835 134.066 19.1529C134.066 17.9282 134.377 16.9721 134.999 16.2845C135.642 15.5755 136.435 15.0491 137.379 14.7053C138.344 14.3615 139.362 14.1466 140.434 14.0607C141.528 13.9748 142.525 13.9318 143.425 13.9318H144.487Z"
                        fill="#237655"
                      />
                      <path
                        d="M152.42 8.09828C152.463 8.50652 152.484 8.91476 152.484 9.323C152.506 9.70975 152.516 10.1072 152.516 10.5155H152.581C152.817 10.1072 153.117 9.73123 153.481 9.38745C153.846 9.04367 154.253 8.75361 154.704 8.51726C155.154 8.25943 155.626 8.06605 156.119 7.93713C156.633 7.78673 157.137 7.71153 157.631 7.71153C159.56 7.71153 160.986 8.2272 161.908 9.25854C162.83 10.2684 163.291 11.7187 163.291 13.6095V23.1816H161.169V14.8342C161.169 13.1583 160.879 11.8799 160.3 10.9989C159.721 10.0965 158.649 9.64529 157.084 9.64529C156.977 9.64529 156.676 9.68826 156.183 9.77421C155.69 9.86015 155.165 10.0965 154.607 10.4832C154.071 10.87 153.589 11.4501 153.16 12.2236C152.731 12.9971 152.516 14.0714 152.516 15.4466V23.1816H150.394V11.4179C150.394 11.0097 150.372 10.494 150.329 9.87089C150.308 9.24779 150.276 8.65692 150.233 8.09828H152.42Z"
                        fill="#237655"
                      />
                      <path
                        d="M175.12 11.6757C174.798 11.0526 174.369 10.5585 173.833 10.1932C173.297 9.82792 172.643 9.64529 171.871 9.64529C171.507 9.64529 171.132 9.68826 170.746 9.77421C170.381 9.86015 170.049 9.99981 169.748 10.1932C169.448 10.3651 169.202 10.5907 169.009 10.87C168.837 11.1493 168.751 11.4931 168.751 11.9013C168.751 12.6104 168.998 13.1261 169.491 13.4483C169.984 13.7706 170.724 14.05 171.71 14.2863L173.865 14.802C174.916 15.0383 175.785 15.5218 176.471 16.2523C177.178 16.9613 177.532 17.853 177.532 18.9273C177.532 19.7438 177.361 20.4528 177.018 21.0545C176.696 21.6346 176.256 22.118 175.699 22.5048C175.163 22.87 174.541 23.1386 173.833 23.3105C173.126 23.4824 172.407 23.5683 171.678 23.5683C170.52 23.5683 169.438 23.3535 168.43 22.9238C167.443 22.4726 166.596 21.7098 165.889 20.6355L167.722 19.3785C168.151 20.0661 168.687 20.614 169.33 21.0222C169.995 21.4305 170.778 21.6346 171.678 21.6346C172.107 21.6346 172.536 21.5916 172.965 21.5057C173.394 21.3982 173.769 21.2478 174.091 21.0545C174.434 20.8396 174.702 20.571 174.895 20.2487C175.109 19.9264 175.216 19.5504 175.216 19.1207C175.216 18.3687 174.938 17.8315 174.38 17.5092C173.823 17.1655 173.147 16.8969 172.354 16.7035L170.295 16.2201C170.038 16.1556 169.684 16.0482 169.234 15.8978C168.805 15.7474 168.376 15.5218 167.947 15.221C167.54 14.9202 167.186 14.5334 166.886 14.0607C166.586 13.5665 166.436 12.9649 166.436 12.2559C166.436 11.4824 166.586 10.8055 166.886 10.2254C167.208 9.64529 167.626 9.17259 168.14 8.80733C168.676 8.44206 169.277 8.17348 169.941 8.00159C170.606 7.80822 171.292 7.71153 172 7.71153C173.051 7.71153 174.026 7.91565 174.927 8.32389C175.827 8.73212 176.524 9.43043 177.018 10.4188L175.12 11.6757Z"
                        fill="#237655"
                      />
                      <path
                        d="M182.803 2.29701C182.803 2.74822 182.642 3.12423 182.321 3.42503C181.999 3.70435 181.645 3.84401 181.259 3.84401C180.873 3.84401 180.519 3.70435 180.198 3.42503C179.876 3.12423 179.715 2.74822 179.715 2.29701C179.715 1.8458 179.876 1.48053 180.198 1.20121C180.519 0.900403 180.873 0.75 181.259 0.75C181.645 0.75 181.999 0.900403 182.321 1.20121C182.642 1.48053 182.803 1.8458 182.803 2.29701ZM182.321 23.1816H180.198V8.09828H182.321V23.1816Z"
                        fill="#237655"
                      />
                      <path
                        d="M199.217 15.6399C199.217 14.802 199.078 14.0177 198.799 13.2872C198.542 12.5567 198.166 11.9228 197.673 11.3857C197.18 10.8485 196.58 10.4295 195.872 10.1287C195.186 9.80643 194.403 9.64529 193.524 9.64529C192.645 9.64529 191.852 9.80643 191.144 10.1287C190.458 10.4295 189.868 10.8485 189.375 11.3857C188.903 11.9228 188.528 12.5567 188.249 13.2872C187.992 14.0177 187.863 14.802 187.863 15.6399C187.863 16.4779 187.992 17.2621 188.249 17.9927C188.528 18.7232 188.903 19.357 189.375 19.8942C189.868 20.4314 190.458 20.8611 191.144 21.1834C191.852 21.4842 192.645 21.6346 193.524 21.6346C194.403 21.6346 195.186 21.4842 195.872 21.1834C196.58 20.8611 197.18 20.4314 197.673 19.8942C198.166 19.357 198.542 18.7232 198.799 17.9927C199.078 17.2621 199.217 16.4779 199.217 15.6399ZM201.533 15.6399C201.533 16.7787 201.329 17.8315 200.922 18.7984C200.536 19.7653 199.989 20.6033 199.281 21.3123C198.574 22.0213 197.727 22.58 196.74 22.9882C195.776 23.375 194.703 23.5683 193.524 23.5683C192.366 23.5683 191.294 23.375 190.308 22.9882C189.343 22.58 188.507 22.0213 187.799 21.3123C187.091 20.6033 186.534 19.7653 186.126 18.7984C185.74 17.8315 185.547 16.7787 185.547 15.6399C185.547 14.5012 185.74 13.4483 186.126 12.4815C186.534 11.5146 187.091 10.6766 187.799 9.96758C188.507 9.25854 189.343 8.71064 190.308 8.32389C191.294 7.91565 192.366 7.71153 193.524 7.71153C194.703 7.71153 195.776 7.91565 196.74 8.32389C197.727 8.71064 198.574 9.25854 199.281 9.96758C199.989 10.6766 200.536 11.5146 200.922 12.4815C201.329 13.4483 201.533 14.5012 201.533 15.6399Z"
                        fill="#237655"
                      />
                      <path
                        d="M206.289 8.09828C206.332 8.50652 206.353 8.91476 206.353 9.323C206.375 9.70975 206.385 10.1072 206.385 10.5155H206.45C206.685 10.1072 206.986 9.73123 207.35 9.38745C207.715 9.04367 208.122 8.75361 208.572 8.51726C209.023 8.25943 209.494 8.06605 209.988 7.93713C210.502 7.78673 211.006 7.71153 211.499 7.71153C213.429 7.71153 214.855 8.2272 215.777 9.25854C216.699 10.2684 217.16 11.7187 217.16 13.6095V23.1816H215.037V14.8342C215.037 13.1583 214.748 11.8799 214.169 10.9989C213.59 10.0965 212.518 9.64529 210.953 9.64529C210.845 9.64529 210.545 9.68826 210.052 9.77421C209.559 9.86015 209.033 10.0965 208.476 10.4832C207.94 10.87 207.457 11.4501 207.029 12.2236C206.6 12.9971 206.385 14.0714 206.385 15.4466V23.1816H204.262V11.4179C204.262 11.0097 204.241 10.494 204.198 9.87089C204.177 9.24779 204.145 8.65692 204.102 8.09828H206.289Z"
                        fill="#237655"
                      />
                      <path
                        d="M10.9954 0.75C10.9954 0.335786 11.331 0 11.7451 0H14.7437C15.1578 0 15.4934 0.335787 15.4934 0.75V4.5C15.4934 4.91421 15.1578 5.25 14.7437 5.25H5.74769V23.25H0.5V3H10.9954V0.75Z"
                        fill="#0D5438"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M13.6149 16.8002C13.7438 17.9605 14.1948 18.8629 14.968 19.5075C15.7411 20.1521 16.6754 20.4744 17.7707 20.4744C18.7371 20.4744 19.5425 20.281 20.1868 19.8942C20.8526 19.486 21.4325 18.9811 21.9264 18.3794L24.6969 20.4744C23.7949 21.5916 22.7855 22.3866 21.6687 22.8593C20.5519 23.332 19.3814 23.5684 18.1573 23.5684C16.9975 23.5684 15.9022 23.375 14.8713 22.9882C13.8404 22.6015 12.9492 22.0536 12.1975 21.3445C11.4458 20.6355 10.8444 19.7868 10.3934 18.7984C9.96389 17.7886 9.74912 16.6713 9.74912 15.4466C9.74912 14.2219 9.96389 13.1153 10.3934 12.127C10.8444 11.1171 11.4458 10.2577 12.1975 9.54861C12.9492 8.83957 13.8404 8.29167 14.8713 7.90492C15.9022 7.51817 16.9975 7.32479 18.1573 7.32479C19.2311 7.32479 20.2083 7.51817 21.0888 7.90492C21.9909 8.27019 22.7533 8.80734 23.3761 9.51639C24.0204 10.2254 24.5144 11.1064 24.858 12.1592C25.2231 13.1905 25.4057 14.383 25.4057 15.7366V16.8002H13.6149ZM21.5399 13.8996C21.5184 12.7608 21.164 11.8691 20.4768 11.2245C19.7895 10.5585 18.8338 10.2254 17.6096 10.2254C16.4499 10.2254 15.5264 10.5585 14.8391 11.2245C14.1733 11.8906 13.7653 12.7823 13.6149 13.8996H21.5399Z"
                        fill="#0D5438"
                      />
                      <path
                        d="M36.1434 11.998C35.3917 10.9452 34.3823 10.4188 33.1152 10.4188C32.5997 10.4188 32.095 10.5477 31.6011 10.8056C31.1071 11.0634 30.8601 11.4824 30.8601 12.0625C30.8601 12.5352 31.0641 12.879 31.4722 13.0938C31.8803 13.3087 32.3957 13.4913 33.0185 13.6417C33.6413 13.7921 34.3071 13.9533 35.0159 14.1252C35.7461 14.2756 36.4226 14.5227 37.0454 14.8665C37.6682 15.1887 38.1837 15.64 38.5917 16.2201C38.9998 16.8002 39.2038 17.5952 39.2038 18.6051C39.2038 19.529 38.9998 20.3132 38.5917 20.9578C38.2052 21.5809 37.6897 22.0858 37.0454 22.4726C36.4226 22.8593 35.7138 23.1386 34.9192 23.3105C34.1246 23.4824 33.3299 23.5684 32.5353 23.5684C31.3326 23.5684 30.2265 23.3965 29.2171 23.0527C28.2077 22.7089 27.3057 22.0858 26.5111 21.1834L29.0883 18.7662C29.5822 19.3248 30.1084 19.7868 30.6668 20.1521C31.2467 20.4958 31.9447 20.6677 32.7608 20.6677C33.04 20.6677 33.3299 20.6355 33.6306 20.571C33.9313 20.5066 34.2105 20.3992 34.4682 20.2487C34.7259 20.0983 34.9299 19.9157 35.0803 19.7008C35.2521 19.4645 35.338 19.1959 35.338 18.8951C35.338 18.358 35.134 17.9605 34.7259 17.7026C34.3179 17.4448 33.8024 17.2407 33.1796 17.0903C32.5568 16.9184 31.8802 16.768 31.15 16.6391C30.4413 16.4887 29.7755 16.2631 29.1527 15.9622C28.5299 15.64 28.0144 15.1995 27.6064 14.6408C27.1983 14.0822 26.9943 13.3087 26.9943 12.3203C26.9943 11.4609 27.1661 10.7196 27.5097 10.0965C27.8748 9.45193 28.3473 8.92552 28.9272 8.51728C29.5071 8.10904 30.1728 7.80823 30.9245 7.61486C31.6762 7.42148 32.4386 7.32479 33.2118 7.32479C34.2427 7.32479 35.2628 7.50742 36.2722 7.87269C37.2817 8.21647 38.0978 8.81808 38.7206 9.67753L36.1434 11.998Z"
                        fill="#0D5438"
                      />
                      <path
                        d="M51.5238 23.1816H55.1964V7.71154H51.3306V16.1556C51.3306 16.6713 51.2661 17.1655 51.1373 17.6382C51.0084 18.1109 50.7936 18.5299 50.493 18.8951C50.2138 19.2604 49.8487 19.5504 49.3976 19.7653C48.9681 19.9802 48.4312 20.0876 47.7869 20.0876C47.0996 20.0876 46.5627 19.9372 46.1761 19.6364C45.811 19.3141 45.5318 18.9273 45.3385 18.4761C45.1667 18.0034 45.0593 17.5093 45.0164 16.9936C44.9734 16.4564 44.952 15.973 44.952 15.5433V7.71154H41.0861V17.477C41.0861 18.272 41.1828 19.0348 41.3761 19.7653C41.5694 20.4958 41.8915 21.1512 42.3425 21.7313C42.7935 22.2899 43.3734 22.7411 44.0822 23.0849C44.8124 23.4072 45.6929 23.5684 46.7238 23.5684C48.0124 23.5684 49.0325 23.289 49.7842 22.7304C50.5359 22.1503 51.0943 21.4735 51.4594 20.7H51.5238V23.1816Z"
                        fill="#0D5438"
                      />
                      <path
                        d="M58.2991 7.71154H61.9716V10.1287H62.036C62.3797 9.39821 62.9273 8.75363 63.679 8.19498C64.4522 7.61486 65.4831 7.32479 66.7717 7.32479C69.1985 7.32479 70.8093 8.28093 71.6039 10.1932C72.1623 9.20483 72.8603 8.48505 73.6979 8.03384C74.5355 7.56114 75.5342 7.32479 76.6939 7.32479C77.7248 7.32479 78.5946 7.49668 79.3034 7.84046C80.0121 8.18424 80.5812 8.65694 81.0108 9.25855C81.4618 9.86016 81.7839 10.5692 81.9772 11.3857C82.1705 12.1807 82.2672 13.0401 82.2672 13.964V23.1816H78.4013V14.4152C78.4013 13.9425 78.3584 13.4913 78.2725 13.0616C78.1866 12.6104 78.0362 12.2236 77.8215 11.9014C77.6067 11.5576 77.3168 11.289 76.9517 11.0956C76.5865 10.9022 76.1141 10.8056 75.5342 10.8056C74.9328 10.8056 74.4174 10.9237 73.9879 11.1601C73.5798 11.3749 73.2362 11.6757 72.957 12.0625C72.6993 12.4278 72.506 12.8575 72.3771 13.3517C72.2697 13.8244 72.216 14.3078 72.216 14.802V23.1816H68.3502V13.964C68.3502 12.9972 68.1462 12.2344 67.7381 11.6757C67.3301 11.0956 66.6535 10.8056 65.7086 10.8056C65.0643 10.8056 64.5166 10.913 64.0656 11.1279C63.6361 11.3427 63.271 11.6328 62.9703 11.998C62.6911 12.3633 62.4871 12.7823 62.3582 13.255C62.2293 13.7277 62.1649 14.2219 62.1649 14.7375V23.1816H58.2991V7.71154Z"
                        fill="#0D5438"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M89.8123 19.5075C89.0391 18.8629 88.5881 17.9605 88.4593 16.8002H100.25V15.7366C100.25 14.383 100.067 13.1905 99.7023 12.1592C99.3587 11.1064 98.8647 10.2254 98.2204 9.51639C97.5976 8.80734 96.8352 8.27019 95.9332 7.90492C95.0526 7.51817 94.0754 7.32479 93.0016 7.32479C91.8419 7.32479 90.7465 7.51817 89.7156 7.90492C88.6848 8.29167 87.7935 8.83957 87.0418 9.54861C86.2901 10.2577 85.6888 11.1171 85.2377 12.127C84.8082 13.1153 84.5934 14.2219 84.5934 15.4466C84.5934 16.6713 84.8082 17.7886 85.2377 18.7984C85.6888 19.7868 86.2901 20.6355 87.0418 21.3445C87.7935 22.0536 88.6848 22.6015 89.7156 22.9882C90.7465 23.375 91.8419 23.5684 93.0016 23.5684C94.2258 23.5684 95.3962 23.332 96.513 22.8593C97.6298 22.3866 98.6392 21.5916 99.5413 20.4744L96.7708 18.3794C96.2768 18.9811 95.6969 19.486 95.0311 19.8942C94.3868 20.281 93.5815 20.4744 92.615 20.4744C91.5197 20.4744 90.5855 20.1521 89.8123 19.5075ZM95.3211 11.2245C96.0083 11.8691 96.3627 12.7608 96.3842 13.8996H88.4593C88.6096 12.7823 89.0177 11.8906 89.6834 11.2245C90.3707 10.5585 91.2942 10.2254 92.4539 10.2254C93.6781 10.2254 94.6338 10.5585 95.3211 11.2245Z"
                        fill="#0D5438"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_331_22866">
                        <rect
                          width="217"
                          height="24"
                          fill="white"
                          transform="translate(0.5)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div className="log_hero_topic_continer">
                  <p className="log_hero_topic">Log in to your account</p>
                  <p className="log_hero_pera">
                    In order to save your progress, please login your account
                  </p>
                </div>
                {error && (
                  <Typography variant="body2" color="error" align="center">
                    {error}
                  </Typography>
                )}
                {success && (
                  <Typography variant="body2" color="success" align="center">
                    {success}
                  </Typography>
                )}
              </div>
              <div className="login_action_section">
                <from>
                  <label className="from_label_login">Email</label>
                  <input
                    type="text"
                    className="login_input_field new_btn_log"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <label className="from_label_login">Password</label>
                  <input
                    type="password"
                    className="login_input_field"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <div className="action_continer_login">
                    <div className="remember_me_continer">
                      <input
                        type="checkbox"
                        id="remember_me"
                        className="remember_me_input"
                      />
                      <label htmlFor="remember_me" className="remember_me">
                        Remember for 30 days
                      </label>
                    </div>
                    <p className="Forgot">Forgot password</p>
                  </div>
                  <button className="login_btn" onClick={handleSignIn}>
                    Sign in
                  </button>
                </from>
                <div className="log_hero_bottom_section">
                  <button className="google_log">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="24"
                        viewBox="0 0 25 24"
                        fill="none"
                      >
                        <g clip-path="url(#clip0_40000007_6232)">
                          <path
                            d="M24.2663 12.2763C24.2663 11.4605 24.2001 10.6404 24.059 9.83789H12.7402V14.4589H19.222C18.953 15.9492 18.0888 17.2676 16.8233 18.1054V21.1037H20.6903C22.9611 19.0137 24.2663 15.9272 24.2663 12.2763Z"
                            fill="#4285F4"
                          />
                          <path
                            d="M12.7391 24.0008C15.9756 24.0008 18.705 22.9382 20.6936 21.1039L16.8266 18.1055C15.7507 18.8375 14.3618 19.252 12.7435 19.252C9.61291 19.252 6.95849 17.1399 6.00607 14.3003H2.01562V17.3912C4.05274 21.4434 8.20192 24.0008 12.7391 24.0008Z"
                            fill="#34A853"
                          />
                          <path
                            d="M6.00277 14.3002C5.50011 12.8099 5.50011 11.196 6.00277 9.70569V6.61475H2.01674C0.314734 10.0055 0.314734 14.0004 2.01674 17.3912L6.00277 14.3002Z"
                            fill="#FBBC04"
                          />
                          <path
                            d="M12.7391 4.74966C14.4499 4.7232 16.1034 5.36697 17.3425 6.54867L20.7685 3.12262C18.5991 1.0855 15.7198 -0.034466 12.7391 0.000808666C8.20192 0.000808666 4.05274 2.55822 2.01562 6.61481L6.00166 9.70575C6.94967 6.86173 9.6085 4.74966 12.7391 4.74966Z"
                            fill="#EA4335"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_40000007_6232">
                            <rect
                              width="24"
                              height="24"
                              fill="white"
                              transform="translate(0.5)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    Sign in with Google
                  </button>
                  <button className="apple_login">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M20.8418 17.1447C20.5091 17.9133 20.1153 18.6208 19.659 19.2713C19.0371 20.158 18.5278 20.7719 18.1354 21.1127C17.527 21.6722 16.8752 21.9587 16.1772 21.975C15.6761 21.975 15.0718 21.8324 14.3683 21.5432C13.6626 21.2553 13.014 21.1127 12.421 21.1127C11.7991 21.1127 11.132 21.2553 10.4185 21.5432C9.70396 21.8324 9.12831 21.9832 8.68819 21.9981C8.01884 22.0266 7.35166 21.7319 6.68571 21.1127C6.26066 20.742 5.72901 20.1064 5.09212 19.2061C4.40878 18.2446 3.84698 17.1297 3.40686 15.8587C2.93551 14.4857 2.69922 13.1563 2.69922 11.8692C2.69922 10.3948 3.0178 9.12321 3.65592 8.0576C4.15742 7.20166 4.82459 6.52647 5.65962 6.03081C6.49464 5.53514 7.39688 5.28256 8.36852 5.2664C8.90017 5.2664 9.59736 5.43085 10.4637 5.75405C11.3277 6.07834 11.8824 6.24279 12.1256 6.24279C12.3075 6.24279 12.9237 6.0505 13.9684 5.66714C14.9564 5.31162 15.7902 5.16441 16.4732 5.2224C18.3241 5.37178 19.7147 6.10142 20.6395 7.41595C18.9841 8.41896 18.1653 9.82379 18.1816 11.626C18.1965 13.0297 18.7057 14.1979 19.7066 15.1254C20.1601 15.5558 20.6667 15.8885 21.2302 16.1248C21.108 16.4793 20.979 16.8188 20.8418 17.1447ZM16.5968 0.440125C16.5968 1.54038 16.1948 2.56768 15.3936 3.51854C14.4267 4.64892 13.2572 5.30211 11.989 5.19904C11.9729 5.06705 11.9635 4.92812 11.9635 4.78214C11.9635 3.7259 12.4233 2.59552 13.2399 1.67127C13.6475 1.20331 14.166 0.814209 14.7948 0.503814C15.4221 0.19805 16.0156 0.0289566 16.5737 0C16.59 0.147086 16.5968 0.294182 16.5968 0.440111V0.440125Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                    Sign in with Apple
                  </button>
                  <p className="no_acc">
                    Don’t have an account?
                    <span
                      className="sub_no_acc"
                      onClick={() => (window.location.href = "/register")}
                    >
                      Sign up
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
