import React, { useEffect, useState } from "react";
import { Card } from "flowbite-react";
import { LuUser } from "react-icons/lu";

export function TotalUserCard() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalNews, setTotalNews] = useState(0);
  const [totalPayments, setTotalPayments] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://192.168.1.14:5000/api/user");
        const data = await response.json();
        setTotalUsers(data.length);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const response = await fetch("http://192.168.1.14:5000/api/news");
        const data = await response.json();
        setTotalNews(data.length);
      } catch (error) {
        console.error("Error fetching news data:", error);
      }
    };
    fetchNewsData();
  }, []);

  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        const response = await fetch("http://192.168.1.14:5000/api/orders");
        const data = await response.json();
        setTotalPayments(data.length);
      } catch (error) {
        console.error("Error fetching news data:", error);
      }
    };
    fetchPaymentData();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        gap: "5%",
      }}
    >
      <Card
        style={{
          backgroundColor: "#f9fafb",
          borderRadius: "2px",
          border: "none",
          width: "30%",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 2fr",
            gap: "20px",
          }}
        >
          <span
            style={{
              fontSize: 40,
              background: "#D7FAE0",
              width: "50px",
              height: "50px",
              borderRadius: 12,
              padding: 4,
            }}
          >
            <LuUser
              style={{
                textAlign: "center",
                margin: "0 auto",
                alignItems: "center",
                color: "#007D3A",
              }}
            />
          </span>
          <span>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {totalUsers}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              USERS
            </p>
          </span>
        </div>
      </Card>

      <Card
        style={{
          backgroundColor: "#f9fafb",
          borderRadius: "2px",
          border: "none",
          width: "30%",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 2fr",
            gap: "20px",
          }}
        >
          <span
            style={{
              fontSize: 40,
              background: "#FF9A9A",
              width: "50px",
              height: "50px",
              borderRadius: 12,
              padding: 4,
            }}
          >
            <LuUser
              style={{
                textAlign: "center",
                margin: "0 auto",
                alignItems: "center",
                color: "#D50000",
              }}
            />
          </span>
          <span>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {totalPayments}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              PAYMENTS
            </p>
          </span>
        </div>
      </Card>

      <Card
        style={{
          backgroundColor: "#f9fafb",
          borderRadius: "2px",
          border: "none",
          width: "30%",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 2fr",
            gap: "20px",
          }}
        >
          <span
            style={{
              fontSize: 40,
              background: "#B8D1F4",
              width: "50px",
              height: "50px",
              borderRadius: 12,
              padding: 4,
            }}
          >
            <LuUser
              style={{
                textAlign: "center",
                margin: "0 auto",
                alignItems: "center",
                color: "#3045FF",
              }}
            />
          </span>
          <span>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {totalNews}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">NEWS</p>
          </span>
        </div>
      </Card>
    </div>
  );
}
